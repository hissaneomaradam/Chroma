import { useState, useRef, useCallback } from "react";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLocation, useNavigate } from "react-router-dom";
import SoftAurora from "./SoftAurora";
import "./Pick.css";

function VerticalSlider({ pct, onChange, gradient, label }) {
  const trackRef = useRef(null);

  const update = useCallback(
    (clientY) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const v = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
      onChange(v);
    },
    [onChange],
  );

  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    update(e.clientY);
  };

  const onPointerMove = (e) => {
    if (e.buttons > 0) update(e.clientY);
  };

  return (
    <div className="flex h-full min-w-0 flex-col items-center gap-3">
      <span
        className="text-[10px] font-semibold tracking-[0.15em] uppercase"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        {label}
      </span>
      <div
        ref={trackRef}
        className="relative flex-1 w-10 min-h-0 rounded-full cursor-pointer select-none"
        style={{ background: gradient }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
      >
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
          style={{
            width: 26,
            height: 26,
            top: `calc(${pct * 100}% - 13px)`,
            background: "white",
            boxShadow:
              "0 2px 12px rgba(0,0,0,0.5), 0 0 0 2px rgba(255,255,255,0.9)",
          }}
        />
      </div>
    </div>
  );
}

const INITIAL = { huePct: 0.88, satPct: 0.45, litPct: 0.58 };

export default function Pick() {
  const navigate = useNavigate();
  const location = useLocation();
  const targetColor = location.state?.targetColor ?? null;
  const [huePct, setHuePct] = useState(INITIAL.huePct);
  const [satPct, setSatPct] = useState(INITIAL.satPct);
  const [litPct, setLitPct] = useState(INITIAL.litPct);
  const hue = Math.round(huePct * 360);
  const sat = Math.round((1 - satPct) * 100);
  const lit = Math.round((1 - litPct) * 100);

  const cssColor = `hsl(${hue}, ${sat}%, ${lit}%)`;

  const hueGradient = [
    0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360,
  ]
    .map((h) => `hsl(${h},100%,50%)`)
    .join(", ");

  const satGradient = `linear-gradient(to bottom, hsl(${hue},100%,${lit}%), hsl(${hue},0%,${lit}%))`;
  const litGradient = `linear-gradient(to bottom, hsl(${hue},${sat}%,95%), hsl(${hue},${sat}%,50%), hsl(${hue},${sat}%,5%))`;

  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    if (submitted) return;
    setSubmitted(true);
    setTimeout(() => {
      navigate("/results", {
        state: {
          targetColor,
          playerColor: {
            hue,
            saturation: sat,
            lightness: lit,
          },
        },
      });
    }, 350);
  };

  return (
    <main className="pick-page">
      <SoftAurora
        speed={0.6}
        scale={1.5}
        brightness={1}
        color1="#f7f7f7"
        color2="#e100ff"
        noiseFrequency={2.5}
        noiseAmplitude={1}
        bandHeight={0.5}
        bandSpread={1}
        octaveDecay={0.1}
        layerOffset={0}
        colorSpeed={1}
        enableMouseInteraction
        mouseInfluence={0.25}
      />

      <section className="pick-shell">
        <header className="pick-header">
          <p className="pick-kicker">Color picker</p>
          <h1 className="pick-title">Adjust the tone</h1>
        </header>

        <article className="pick-card">
          <div className="pick-card__controls">
            <div className="pick-card__sliders">
              <VerticalSlider
                pct={huePct}
                onChange={setHuePct}
                gradient={`linear-gradient(to bottom, ${hueGradient})`}
                label="Hue"
              />
              <VerticalSlider
                pct={satPct}
                onChange={setSatPct}
                gradient={satGradient}
                label="Sat"
              />
              <VerticalSlider
                pct={litPct}
                onChange={setLitPct}
                gradient={litGradient}
                label="Lit"
              />
            </div>
          </div>

          <div
            className="pick-preview"
            style={{
              background: cssColor,
              transition: "background 0.12s ease",
            }}
          >
            <div className="pick-preview__buttonWrap">
              <motion.button
                onClick={submit}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.88 }}
                animate={submitted ? { scale: [1, 1.25, 1] } : {}}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="pick-preview__button"
                style={{
                  background: submitted ? "#22c55e" : "white",
                  boxShadow: submitted
                    ? "0 4px 24px rgba(34,197,94,0.5)"
                    : "0 4px 20px rgba(0,0,0,0.3)",
                  transition: "background 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                <AnimatePresence>
                  {submitted && (
                    <motion.span
                      key="ripple"
                      className="pick-preview__ripple"
                      style={{ background: "rgba(255,255,255,0.4)" }}
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 2.5, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  )}
                </AnimatePresence>

                <motion.div
                  animate={{ rotate: submitted ? 360 : 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Check
                    size={18}
                    strokeWidth={2.5}
                    className={submitted ? "text-white" : "text-gray-800"}
                    style={{ transition: "color 0.3s ease" }}
                  />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
