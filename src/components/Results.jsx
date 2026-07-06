import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

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

export default function Results() {
  const location = useLocation();
  const targetColor = location.state?.targetColor ?? null;
  const playerColor = location.state?.playerColor ?? null;
  const finalScore = useMemo(
    () => calculateScore(targetColor, playerColor),
    [targetColor, playerColor],
  );
  return (
    <div className="results__score">
      {getResultMessage(finalScore)}
      {finalScore !== null && <span> {finalScore}%</span>}
    </div>
  );
}
