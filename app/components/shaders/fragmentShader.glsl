varying vec2 vUv;

uniform float uTime;
uniform vec3 uColor;

void main() {
  vec3 colorB = vec3(0.95, 0.9, 1.0);

  float t = sin(vUv.x * 4.0 + uTime) * 0.5 + 0.5;
  vec3 color = mix(uColor, colorB, t);

  gl_FragColor = vec4(color, 1.0);
}
