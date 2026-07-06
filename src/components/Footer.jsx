import { Link } from "react-router-dom";
import "./Footer.css";
import ClickSpark from "./ClickSpark";
import { useRef } from "react";
import VariableProximity from "./VariableProximity";

export default function Footer() {
  const containerRef = useRef(null);

  return (
    <footer className="app-footer" aria-label="Site footer">
      <ClickSpark
        sparkColor="#ffffff"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <div className="app-footer__inner">
          <p className="app-footer__brand">CHROMA</p>
          <p className="app-footer__copyright">
            &copy; {new Date().getFullYear()} All rights
            reserved.
          </p>

          <div ref={containerRef} style={{ position: "relative" }}>
            <VariableProximity
              label={"Made with ❤️ by Hissane Omar Adam"}
              className={"variable-proximity-demo"}
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={containerRef}
              radius={100}
              falloff="linear"
            />
          </div>

          <nav className="app-footer__nav" aria-label="Footer navigation">
            <a
              href="https://www.linkedin.com/in/hissaneomaradam/"
              className="app-footer__link"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/hissaneomaradam"
              className="app-footer__link"
            >
              GitHub
            </a>
            <a
              href="https://www.hissaneomaradam.dev/"
              className="app-footer__link"
            >
              Portfolio
            </a>
          </nav>
        </div>
      </ClickSpark>
    </footer>
  );
}
