import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [stage, setStage] = useState("envelope");
  const [expand, setExpand] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [showLetters, setShowLetters] = useState(false);
  const [currentLetter, setCurrentLetter] = useState(0);
  const [direction, setDirection] = useState("next");
  const [finalZoom, setFinalZoom] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [typedSignature, setTypedSignature] = useState("");
  const [reverseMode, setReverseMode] = useState(false);
  const [petals, setPetals] = useState([]);

  const scrollRef = useRef(null);

  const signatureText = "— Yours. Always.";

  const letters = [
    {
      title: "The Day We Met",
      content:
        "I didn’t know that a simple moment would quietly change my direction. But it did. And I’m grateful it was you."
    },
    {
      title: "When It Became Real",
      content:
        "It wasn’t fireworks. It was consistency. Comfort. The quiet certainty that even on ordinary days, I still chose you."
    },
    {
      title: "The Future I See",
      content: [
        "Years from now. Growth. Change. Challenges. Ordinary mornings. Unexpected nights. I still see you there.",
        "Years from now. Growth. Change. Challenges. Ordinary mornings. Unexpected nights. I still see you there.",
        "Years from now. Growth. Change. Challenges. Ordinary mornings. Unexpected nights. I still see you there.",
        "Years from now. Growth. Change. Challenges. Ordinary mornings. Unexpected nights. I still see you there.",
        "Years from now. Growth. Change. Challenges. Ordinary mornings. Unexpected nights. I still see you there."
      ]
    }
  ];

  /* Reset scroll when letter changes */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [currentLetter]);

  /* Dynamic scroll fade effect */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;

      const isTop = scrollTop <= 5;
      const isBottom = scrollTop + clientHeight >= scrollHeight - 5;

      el.style.setProperty("--topFade", isTop ? "0" : "1");
      el.style.setProperty("--bottomFade", isBottom ? "0" : "1");
    };

    el.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => el.removeEventListener("scroll", handleScroll);
  }, [currentLetter]);

  /* MOBILE HEIGHT FIX */
  useEffect(() => {
    const setRealHeight = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };

    setRealHeight();
    window.addEventListener("resize", setRealHeight);
    return () => window.removeEventListener("resize", setRealHeight);
  }, []);

  /* PETALS */
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
    if (isOpening) return;
    setIsOpening(true);
    setExpand(true);

    setTimeout(() => {
      setShowLetters(true);
    }, 600);
  };

  const nextLetter = () => {
    if (currentLetter < letters.length - 1) {
      setDirection("next");
      setCurrentLetter(prev => prev + 1);
    }
  };

  const prevLetter = () => {
    if (currentLetter > 0) {
      setDirection("prev");
      setCurrentLetter(prev => prev - 1);
    }
  };

  const handleFinal = () => {
    setStage("final");

    setTimeout(() => setFinalZoom(true), 200);

    setTimeout(() => {
      setShowSignature(true);
      let i = 0;
      const interval = setInterval(() => {
        setTypedSignature(signatureText.slice(0, i));
        i++;
        if (i > signatureText.length) clearInterval(interval);
      }, 60);
    }, 1000);
  };

  const replay = () => {
    setReverseMode(true);

    setTimeout(() => {
      setStage("envelope");
      setExpand(false);
      setIsOpening(false);
      setShowLetters(false);
      setCurrentLetter(0);
      setFinalZoom(false);
      setShowSignature(false);
      setTypedSignature("");
      setReverseMode(false);
    }, 800);
  };

  return (
    <div
      className={`cinemaContainer ${finalZoom ? "zoomFinal" : ""} ${
        reverseMode ? "reverseAnim" : ""
      }`}
    >
      <div className="vignette" />

      {petals.map(p => (
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

        {/* Envelope */}
        {stage === "envelope" && !showLetters && (
          <div className="envelopeSection">
            <div
              className={`envelopeBox pulseEnvelope ${
                isOpening ? "envelopeOpen" : ""
              }`}
              onClick={openEnvelope}
            >
              💌
            </div>
            <h2 className="envelopeTitle">
              There’s something I’ve already decided.
            </h2>
            <p className="openText">Tap the letter to open.</p>
            <div className="tapHint">↓</div>
          </div>
        )}

        {/* Letters */}
        {showLetters && stage !== "final" && (
          <div className="letterCarousel letterReveal">

            <div
              key={currentLetter}
              className={`letterCard ${
                direction === "next"
                  ? "slideInRight"
                  : "slideInLeft"
              }`}
            >
              <h3>{letters[currentLetter].title}</h3>

              <div className="letterContentScroll" ref={scrollRef}>
                {Array.isArray(letters[currentLetter].content)
                  ? letters[currentLetter].content.map((para, index) => (
                      <p key={index}>{para}</p>
                    ))
                  : <p>{letters[currentLetter].content}</p>
                }
              </div>
            </div>

            <div className="navControls">
              <button
                className="glassNavBtn"
                onClick={prevLetter}
                disabled={currentLetter === 0}
              >
                Back
              </button>

              <div className="dotContainer">
                {letters.map((_, index) => (
                  <div
                    key={index}
                    className={`dot ${
                      currentLetter === index ? "activeDot" : ""
                    }`}
                  />
                ))}
              </div>

              {currentLetter === letters.length - 1 ? (
                <button
                  className="glassNavBtn"
                  onClick={handleFinal}
                >
                  Continue
                </button>
              ) : (
                <button
                  className="glassNavBtn"
                  onClick={nextLetter}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}

        {/* Final */}
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
