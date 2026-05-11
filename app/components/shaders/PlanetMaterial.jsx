import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";

const PlanetMaterial = shaderMaterial(
  {
    u_time: 0.0,
    u_mode: 0,
    u_lacunarity: 2.3,
    u_gain: 0.5,
    u_colorA: new THREE.Color("#124dd8"),
    u_colorB: new THREE.Color("#2bffe7"),
    u_cloudTint: new THREE.Color("#001741"),
    // Depth layer
    u_depthColorA: new THREE.Color("blue"),
    u_depthColorB: new THREE.Color("aqua"),
    u_depthAlpha: 0.9,
    // Fresnel layer
    u_fresnelColor: new THREE.Color("#FEB3D9"),
  },
  // Vertex shader
  /* glsl */ `
    varying vec2 v_Uv;
    varying vec3 v_Normal;
    varying vec3 v_ViewDir;

    void main() {
      v_Uv = uv;
      v_Normal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      v_ViewDir = normalize(-mvPosition.xyz);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  // Fragment shader
  /* glsl */ `
    uniform float u_time;
    uniform float u_mode;
    uniform float u_lacunarity;
    uniform float u_gain;
    uniform vec3 u_colorA;
    uniform vec3 u_colorB;
    uniform vec3 u_cloudTint;
    uniform vec3 u_depthColorA;
    uniform vec3 u_depthColorB;
    uniform float u_depthAlpha;
    uniform vec3 u_fresnelColor;
    varying vec2 v_Uv;
    varying vec3 v_Normal;
    varying vec3 v_ViewDir;
    vec4 mod289(vec4 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec4 permute(vec4 x) {
      return mod289(((x * 34.0) + 1.0) * x);
    }

    vec4 taylorInvSqrt(vec4 r) {
      return 1.79284291400159 - 0.85373472095314 * r;
    }

    vec2 fade(vec2 t) {
      return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
    }

    float cnoise(vec2 P) {
      vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
      vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
      Pi = mod289(Pi);
      vec4 ix = Pi.xzxz;
      vec4 iy = Pi.yyww;
      vec4 fx = Pf.xzxz;
      vec4 fy = Pf.yyww;

      vec4 i = permute(permute(ix) + iy);

      vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0;
      vec4 gy = abs(gx) - 0.5;
      vec4 tx = floor(gx + 0.5);
      gx = gx - tx;

      vec2 g00 = vec2(gx.x, gy.x);
      vec2 g10 = vec2(gx.y, gy.y);
      vec2 g01 = vec2(gx.z, gy.z);
      vec2 g11 = vec2(gx.w, gy.w);

      vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
      g00 *= norm.x;
      g01 *= norm.y;
      g10 *= norm.z;
      g11 *= norm.w;

      float n00 = dot(g00, vec2(fx.x, fy.x));
      float n10 = dot(g10, vec2(fx.y, fy.y));
      float n01 = dot(g01, vec2(fx.z, fy.z));
      float n11 = dot(g11, vec2(fx.w, fy.w));

      vec2 fade_xy = fade(Pf.xy);
      vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
      float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
      return 2.3 * n_xy;
    }

    float fbm(vec2 st) {
      const int OCTAVES = 5;
      float value = 0.0;
      float amplitude = 0.6;
      for (int i = 0; i < OCTAVES; i++) {
        value += amplitude * abs(cnoise(st));
        st *= u_lacunarity;
        amplitude *= u_gain;
      }
      return value;
    }

    void main() {
      // === Base noise layer ===
      vec3 f_color = vec3(0.0);
      vec2 st = v_Uv * 0.250;
      float speed = 0.1;
      float f_time = u_time * speed;

      // === Drift (mode 0) ===
      vec2 q0 = vec2(0.0);
      vec2 r0 = vec2(0.0);
      q0.x = fbm(st + 0.00 * f_time);
      q0.y = fbm(st + vec2(1.0));
      r0.x = fbm(st + 1.0 * q0 + vec2(1.7, 9.2) + 0.15 * f_time);
      r0.y = fbm(st + 1.0 * q0 + vec2(8.3, 2.8) + 0.126 * f_time);

      // === Swirl (mode 1) ===
      float angle = f_time * 2.0;
      vec2 rotated = vec2(
        st.x * cos(angle) - st.y * sin(angle),
        st.x * sin(angle) + st.y * cos(angle)
      );
      vec2 q1 = vec2(0.0);
      vec2 r1 = vec2(0.0);
      q1.x = fbm(rotated);
      q1.y = fbm(rotated + vec2(3.1, 7.4));
      r1.x = fbm(rotated + 1.5 * q1 + vec2(1.7, 9.2) + 0.2 * f_time);
      r1.y = fbm(rotated + 1.5 * q1 + vec2(8.3, 2.8) + 0.18 * f_time);

      // === Pulse / Aurora (mode 2) ===
      float dist = length(st - 0.125);
      vec2 pulsed = st + vec2(sin(dist * 20.0 - u_time * 1.5), cos(dist * 15.0 - u_time * 1.2)) * 0.06;
      vec2 q2 = vec2(0.0);
      vec2 r2 = vec2(0.0);
      q2.x = fbm(pulsed + 0.3 * f_time);
      q2.y = fbm(pulsed + vec2(2.0, 5.0) + 0.2 * f_time);
      r2.x = fbm(pulsed + q2 + vec2(1.7, 9.2) + 0.35 * f_time);
      r2.y = fbm(pulsed + q2 + vec2(8.3, 2.8) + 0.28 * f_time);

      // Smooth blend between modes
      float blend01 = clamp(u_mode, 0.0, 1.0);
      float blend12 = clamp(u_mode - 1.0, 0.0, 1.0);

      vec2 q = mix(mix(q0, q1, blend01), q2, blend12);
      vec2 r = mix(mix(r0, r1, blend01), r2, blend12);

      float f = fbm(st + r);

      f_color = mix(u_colorA, u_colorB, clamp((f * f) * 4.0, 0.0, 1.0));
      f_color = mix(f_color, u_cloudTint, clamp(length(q), 0.0, 1.0));
      f_color *= mix(f_color, u_colorA, clamp(length(r.x), 0.0, 1.0));

      // === Depth layer (additive) ===
      float depthFactor = clamp(dot(v_Normal, v_ViewDir), 0.0, 1.0);
      vec3 depthColor = mix(u_depthColorA, u_depthColorB, depthFactor);
      f_color += depthColor * u_depthAlpha;

      // === Fresnel layer (additive) ===
      float fresnel = 1.0 - dot(v_Normal, v_ViewDir);
      fresnel = clamp(pow(fresnel, 2.0), 0.0, 1.0);
      f_color += u_fresnelColor * fresnel;

      gl_FragColor = vec4(f_color, 1.0);
    }
  `
);

export default PlanetMaterial;
