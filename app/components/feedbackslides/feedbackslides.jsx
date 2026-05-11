"use client";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import "./feedbackslides.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

const CARDS = [
  {
    id: "g1",
    image: "/footer/g1.jpg",
    title: "Indigo Violet",
    description:
      "A soft diagonal gradient that blends indigo into violet. Calm on the eyes with enough contrast to feel alive.",
    tags: ["Gradient", "Indigo", "Violet"],
  },
  {
    id: "g2",
    image: "/footer/g2.jpg",
    title: "Sunset Ember",
    description:
      "Warm amber melts into coral. A golden-hour feel that brings depth to any hero section without stealing attention.",
    tags: ["Warm", "Amber", "Coral"],
  },
  {
    id: "g3",
    image: "/footer/g3.jpg",
    title: "Ocean Mist",
    description:
      "A cool cyan drifts into deep teal. Clean, modern, and built to breathe beside dense content.",
    tags: ["Cool", "Cyan", "Teal"],
  },
  {
    id: "g4",
    image: "/footer/g4.jpg",
    title: "Forest Mint",
    description:
      "Evergreen deepens into mint. Earthy and calm — at home next to long-form content.",
    tags: ["Earthy", "Green", "Mint"],
  },
];

const DECK_POSITIONS = [
  { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 },
  { x: -12, y: 0, rotation: -4, scale: 0.96, opacity: 1 },
  { x: 12, y: 0, rotation: 4, scale: 0.93, opacity: 1 },
  { x: -20, y: 0, rotation: -7, scale: 0.9, opacity: 1 },
];

const PARKED_POSITION = { x: 0, y: 250, rotation: 0, scale: 0.92, opacity: 1 };

const DISMISS_THRESHOLD = 30;
const DRAG_MAX_Y = 80;
const ENTER_DURATION = 0.55;
const ENTER_EASE = "power3.out";

export default function FeedbackSlides({ theme = "dark" }) {
  const [{ deck, parked }, setState] = useState({ deck: CARDS, parked: [] });
  const cardRefs = useRef({});
  const stateRef = useRef({ deck: CARDS, parked: [] });
  const hasInitialized = useRef(false);

  useEffect(() => {
    stateRef.current = { deck, parked };
  }, [deck, parked]);

  const dismiss = useCallback((cardId) => {
    const current = stateRef.current;
    const idx = current.deck.findIndex((c) => c.id === cardId);
    if (idx === -1) return;

    const dismissed = current.deck[idx];
    const restDeck = [
      ...current.deck.slice(0, idx),
      ...current.deck.slice(idx + 1),
    ];
    const hadParked = current.parked.length > 0;

    setState({
      deck: restDeck,
      parked: [...current.parked, dismissed],
    });

    if (hadParked) {
      setTimeout(() => {
        setState((prev) => {
          if (prev.parked.length < 2) return prev;
          const [returning, ...restParked] = prev.parked;
          return {
            deck: [...prev.deck, returning],
            parked: restParked,
          };
        });
      }, ENTER_DURATION * 1000);
    }
  }, []);

  useLayoutEffect(() => {
    const isFirst = !hasInitialized.current;
    hasInitialized.current = true;

    const place = (el, target, z) => {
      if (!el) return;
      gsap.set(el, { zIndex: z });
      if (isFirst) {
        gsap.set(el, target);
      } else {
        gsap.to(el, {
          ...target,
          duration: ENTER_DURATION,
          ease: ENTER_EASE,
        });
      }
    };

    deck.forEach((card, i) => {
      const base = DECK_POSITIONS[Math.min(i, DECK_POSITIONS.length - 1)];
      const target = {
        ...base,
        rotation: base.rotation + (Math.random() - 0.5) * 10,
      };
      place(cardRefs.current[card.id], target, 30 - i);
    });
    parked.forEach((card, i) => {
      place(cardRefs.current[card.id], PARKED_POSITION, 40 + i);
    });
  }, [deck, parked]);

  useEffect(() => {
    const instances = CARDS.map((card) => {
      const el = cardRefs.current[card.id];
      if (!el) return null;
      return Draggable.create(el, {
        type: "y",
        inertia: false,
        cursor: "grab",
        activeCursor: "grabbing",
        zIndexBoost: false,
        onDragStart() {
          this._startY = this.y;
          this._fired = false;
        },
        onDrag() {
          if (this.y < this._startY) {
            gsap.set(this.target, { y: this._startY });
            this.y = this._startY;
          }
          const delta = this.y - this._startY;
          if (delta > DRAG_MAX_Y) {
            const clamped = this._startY + DRAG_MAX_Y;
            gsap.set(this.target, { y: clamped });
            this.y = clamped;
          }
          const inDeck = stateRef.current.deck.some((c) => c.id === card.id);
          if (inDeck && delta > DISMISS_THRESHOLD && !this._fired) {
            this._fired = true;
            this.endDrag(this.pointerEvent);
            dismiss(card.id);
          }
        },
        onDragEnd() {
          if (this._fired) return;
          const inDeck = stateRef.current.deck.some((c) => c.id === card.id);
          gsap.to(el, {
            y: inDeck ? 0 : PARKED_POSITION.y,
            duration: 0.35,
            ease: "power3.out",
          });
        },
      })[0];
    });

    return () => {
      instances.forEach((d) => d && d.kill());
    };
  }, [dismiss]);

  return (
    <div className="reviews-container" data-theme={theme}>
      <div className="stack">
        {[...deck, ...parked].map((card) => (
          <div
            key={card.id}
            ref={(el) => {
              cardRefs.current[card.id] = el;
            }}
            className="review-card stack-card"
          >
            <img src={card.image} alt="" className="review-image" />
            <div className="review-content">
              <h3 className="review-title">{card.title}</h3>
              <p className="review-body">{card.description}</p>
              <div className="review-tags">
                {card.tags.map((tag) => (
                  <span key={tag} className="review-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <button type="button" className="review-button">
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
