import React from "react";
import ShinyText from "./ShinyText.jsx";
import "./Home.css";
import GlassSurface from "./GlassSurface";
import SoftAurora from "./SoftAurora";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <main className="home">
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
      <section className="home-content">
        <h1 className="home-title">Welcome to CHROMA</h1>

        <Link to="/play">
          <GlassSurface
            className="home-glass"
            width="min(82vw, 300px)"
            height="64px"
            borderRadius={999}
            backgroundOpacity={0.11}
            displace={0.5}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            brightness={50}
            opacity={0.93}
            mixBlendMode="screen"
          >
            <ShinyText
              className="home-cta-text"
              text="Play Now"
              color="#ffffff"
              shineColor="#e100ff"
              spread={45}
              speed={2}
              delay={0.5}
              pauseOnHover
              direction="left"
            />
          </GlassSurface>
        </Link>
      </section>
    </main>
  );
}
