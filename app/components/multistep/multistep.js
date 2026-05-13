"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import "./multistep.css";
import useMeasure from "react-use-measure"

const STEPS = [
  {
    image: "/multistep1.png",
    imageHeight: 260,
    generated: "MIDJOURNEY",
    location: "UNKNOWN",
    description:
      "A pale aurora unfolding over the bay, captured at the slow blue edge of midnight.",
    date: "MARCH 20",
  },
  {
    image: "/multistep2.png",
    imageHeight: 160,
    generated: "MIDJOURNEY",
    location: "NOT AVAILABLE",
    description:
      "Petals settling on a still pond, a study in soft contrast and patient bloom.",
    date: "FEB 23",
  },
  {
    image: "/multistep3.png",
    imageHeight: 260,
    generated: "MIDJOURNEY",
    location: "CLASSIFIED",
    description:
      "A moody warehouse interior smothered in fog and warm static lights.",
    date: "JAN 14",
  },
  {
    image: "/multistep4.png",
    imageHeight: 160,
    generated: "MIDJOURNEY",
    location: "UNKNOWN",
    description:
      "Last light brushing the rooftops in a velvet, slow rolling evening palette.",
    date: "APR 02",
  },
];

export default function MultiStepComponent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [ref, bounds] = useMeasure();
  const [direction, setDirection] = useState(1);

  const content = useMemo(() => {
    const step = STEPS[currentStep];
    return (
      <>
        <div className="step-image-frame" style={{ height: step.imageHeight }}>
          <img
            src={step.image}
            alt=""
            className="step-image"
          />
        </div>
        <div className="step-meta">
          <div className="step-meta-left">
            <div className="step-fields">
              <span className="step-field">
                <span className="step-field-label">Generated:</span>
                <span className="step-field-value">{step.generated}</span>
              </span>
              <span className="step-field">
                <span className="step-field-label">Location:</span>
                <span className="step-field-value">{step.location}</span>
              </span>
            </div>
            <p className="step-description">{step.description}</p>
          </div>
          <div className="step-meta-right">
            <span className="step-count">
              {currentStep + 1}/{STEPS.length}
            </span>
            <span className="step-date">{step.date}</span>
          </div>
        </div>
      </>
    );
  }, [currentStep]);

  const isLast = currentStep === STEPS.length - 1;

  return (
    <MotionConfig transition={{ duration: 0.5, type: "spring", bounce: 0 }}>
    <motion.div
      animate={{ height: bounds.height ? bounds.height + 12 : "auto" }}
      className="multi-step-wrapper"
    >
      <div ref={ref} className="multi-step-inner">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={{
              initial: (dir) => ({ x: `${dir * 110}%`, opacity: 0 }),
              animate: { x: 0, opacity: 1 },
              exit: (dir) => ({ x: `${dir * -110}%`, opacity: 0 }),
            }}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {content}
          </motion.div>
        </AnimatePresence>

        <motion.div layout className="actions">
          <button
            className="secondary-button"
            disabled={currentStep === 0}
            onClick={() => {
              if (currentStep === 0) return;
              setDirection(-1)
              setCurrentStep((prev) => prev - 1);
            }}
          >
            Back
          </button>
          <button
            className={isLast ? "primary-button restart" : "primary-button"}
            onClick={() => {
              if (isLast) {
                setCurrentStep(0);
                setDirection(-1);
                return;
              }
              setDirection(1)
              setCurrentStep((prev) => prev + 1);
            }}
          >
            {isLast ? "Restart" : "Continue"}
          </button>
        </motion.div>
      </div>
    </motion.div>
            
    </MotionConfig>
  );
}
