import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SoftAurora from "./SoftAurora";
import "./ColorCardRandom.css";

function createRandomColorParts() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 41) + 60;
  const lightness = Math.floor(Math.random() * 31) + 35;
  return { hue, saturation, lightness };
}

export default function ColorCardRandom({ color }) {
  const navigate = useNavigate();
  const [parts] = useState(() => createRandomColorParts());
  const [count, setCount] = useState(10);

  useEffect(() => {
    if (count <= 0) {
      navigate("/pick", {
        replace: true,
        state: {
          targetColor: parts,
        },
      });
      return;
    }

    const timer = setInterval(() => {
      setCount((prevCount) => Math.max(prevCount - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [count, navigate, parts]);

  const displayColor =
    color ?? `hsl(${parts.hue}, ${parts.saturation}%, ${parts.lightness}%)`;

  return (
    <main className="color-card-random-page">
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

      <section className="color-card-random-shell">
        <header className="color-card-random__header">
          <p className="color-card-random__kicker">Random color</p>
          <h1 className="color-card-random__title">Memorize the tone</h1>
        </header>

        <article className="color-card-random">
          <div
            className="color-card-random__swatch"
            style={{ backgroundColor: displayColor }}
            aria-label={`Selected color ${displayColor}`}
          >
            <span className="color-card-random__counter">{count}</span>
          </div>
        </article>
      </section>
    </main>
  );
}
