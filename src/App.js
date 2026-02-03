import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [stage, setStage] = useState("envelope");
  const [expand, setExpand] = useState(false);
  const [showMemories, setShowMemories] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [finalZoom, setFinalZoom] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [typedSignature, setTypedSignature] = useState("");
  const [reverseMode, setReverseMode] = useState(false);
  const [petals, setPetals] = useState([]);

  const signatureText = "— Yours. Always.";

  // 🌌 Tilt Glow (Mobile + Mouse)
  useEffect(() => {
    const handleMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const x = clientX / window.innerWidth;
      const y = clientY / window.innerHeight;

      const glowX = x * 100;
      const glowY = y * 100;

      const panel = document.querySelector(".glassPanel");
      if (panel) {
        panel.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.18), rgba(255,255,255,0.07))`;
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
    };
  }, []);

  // 🌹 Generate Petals
  useEffect(() => {
    const p = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 12 + Math.random() * 8,
      size: 6 + Math.random() * 10
    }));
    setPetals(p);
  }, []);

  const openEnvelope = () => {
    setExpand(true);
    setTimeout(() => setShowMemories(true), 1200);
    setTimeout(() => setShowQuestion(true), 4200);
  };

  const handleYes = () => {
    setStage("final");
    setTimeout(() => setFinalZoom(true), 300);

    setTimeout(() => {
      setShowSignature(true);
      let i = 0;
      const interval = setInterval(() => {
        setTypedSignature(signatureText.slice(0, i));
        i++;
        if (i > signatureText.length) clearInterval(interval);
      }, 60);
    }, 2000);
  };

  const replay = () => {
    setReverseMode(true);

    setTimeout(() => {
      setStage("envelope");
      setExpand(false);
      setShowMemories(false);
      setShowQuestion(false);
      setFinalZoom(false);
      setShowSignature(false);
      setTypedSignature("");
      setReverseMode(false);
    }, 1200);
  };

  return (
    <div
      className={`cinemaContainer ${finalZoom ? "zoomFinal" : ""} ${
        reverseMode ? "reverseAnim" : ""
      }`}
    >
      <div className="vignette" />

      {petals.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            width: `${p.size}px`,
            height: `${p.size}px`
          }}
        />
      ))}

      <div className="gifWrapper">
        <img
           src={process.env.PUBLIC_URL + "/jasmin-cat.gif"}
          alt="Romantic"
          className="roundGif"
        />
      </div>

      <div className={`glassPanel ${expand ? "expandPanel" : ""}`}>
        {stage === "envelope" && (
          <div className="envelopeSection">
            <div className="envelopeBox pulseEnvelope" onClick={openEnvelope}>
              💌
            </div>
            <h2 className="envelopeTitle">
              There’s something I’ve already decided.
            </h2>
            <p className="openText">Tap the letter to open.</p>
            <div className="tapHint">↓</div>
          </div>
        )}

        {showMemories && stage !== "final" && (
          <div className="memoryTimeline">
            <div className="memoryCard card1">
              <span className="heartIcon">❤</span>
              <h3>The day we met</h3>
              <p>It quietly changed my direction.</p>
            </div>

            <div className="memoryCard card2">
              <span className="heartIcon">❤</span>
              <h3>When it became real</h3>
              <p>It was consistency. Not perfection.</p>
            </div>

            <div className="memoryCard card3">
              <span className="heartIcon">❤</span>
              <h3>The moment I chose the future</h3>
              <p>I saw years ahead. And you were still there.</p>
            </div>
          </div>
        )}

        {showQuestion && stage !== "final" && (
          <div className="questionBlock fadeInSlow">
            <p className="cinemaQuestion">
              Will you build a life with me —
              <br />
              for the long road ahead?
            </p>
            <button className="cinemaButton" onClick={handleYes}>
              Yes. I will.
            </button>
          </div>
        )}

        {stage === "final" && (
          <div className="finalBlock fadeInSlow">
            <h1 className="finalLine">
              I am choosing you for the long road.
            </h1>

            <p className="finalSubLine">
              Through growth. Through change.
              <br />
              Through ordinary years and unexpected ones.
            </p>

            {showSignature && (
              <>
                <p className="signature">{typedSignature}</p>
                <button className="glassReplayBtn" onClick={replay}>
                  Replay This
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
