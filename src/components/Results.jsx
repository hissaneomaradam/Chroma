import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SoftAurora from "./SoftAurora";
import "./Results.css";
import BorderGlow from "./BorderGlow";

function calculateScore(targetColor, playerColor) {
  if (!targetColor || !playerColor) return null;

  const hueDiff = Math.min(
    Math.abs(targetColor.hue - playerColor.hue),
    360 - Math.abs(targetColor.hue - playerColor.hue),
  );
  const satDiff = Math.abs(targetColor.saturation - playerColor.saturation);
  const litDiff = Math.abs(targetColor.lightness - playerColor.lightness);

  const hueScore = 100 - (hueDiff / 180) * 100;
  const satScore = 100 - satDiff;
  const litScore = 100 - litDiff;

  return Math.max(
    0,
    Math.round(hueScore * 0.6 + satScore * 0.2 + litScore * 0.2),
  );
}

function getResultMessage(score) {
  if (score === null) return "Missing color data";
  if (score >= 90) return "Excellent!";
  if (score >= 80) return "Good!";
  if (score >= 70) return "Not bad!";
  return "Keep practicing!";
}

function toHsl(color) {
  if (!color) return "rgba(255, 255, 255, 0.12)";
  return `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`;
}

export default function Results() {
  const location = useLocation();
  const targetColor = location.state?.targetColor ?? null;
  const playerColor = location.state?.playerColor ?? null;
  const finalScore = useMemo(
    () => calculateScore(targetColor, playerColor),
    [targetColor, playerColor],
  );
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    console.log("Target color from ColorCardRandom:", targetColor);
    console.log("Player color from Pick:", playerColor);
  }, [targetColor, playerColor]);

  useEffect(() => {
    if (finalScore === null) {
      setDisplayScore(0);
      return;
    }

    let animationFrameId;
    const duration = 900;
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(finalScore * eased));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(update);
      }
    }

    animationFrameId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationFrameId);
  }, [finalScore]);

  const targetHsl = toHsl(targetColor);
  const playerHsl = toHsl(playerColor);

  return (
    <main className="results-page">
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

      <section className="results-shell">
        <header className="results-header">
          <p className="results-kicker">Results</p>
          <h1 className="results-title">
            {finalScore === null ? "--" : `${displayScore}%`}
          </h1>
          <p className="results-subtitle">{getResultMessage(finalScore)}</p>
          <Link className="results-play-again" to="/play">
            Play again
          </Link>
        </header>
        <BorderGlow
          edgeSensitivity={30}
          glowColor="40 80 80"
          backgroundColor="#120F17"
          borderRadius={28}
          glowRadius={40}
          glowIntensity={1}
          coneSpread={25}
          animated={false}
          colors={["#c084fc", "#f472b6", "#38bdf8"]}
        >
          <article className="results-card">
            <div className="results-stack" aria-label="Color comparison">
              <section className="results-swatch results-swatch--target">
                <div
                  className="results-swatch__color"
                  style={{ backgroundColor: targetHsl }}
                />
                <div className="results-swatch__meta">
                  <p className="results-swatch__label">Original</p>
                  <p className="results-swatch__value">{targetHsl}</p>
                </div>
              </section>

              <section className="results-swatch results-swatch--player">
                <div
                  className="results-swatch__color"
                  style={{ backgroundColor: playerHsl }}
                />
                <div className="results-swatch__meta">
                  <p className="results-swatch__label">Your guess</p>
                  <p className="results-swatch__value">{playerHsl}</p>
                </div>
              </section>
            </div>
          </article>
        </BorderGlow>
      </section>
    </main>
  );
}
