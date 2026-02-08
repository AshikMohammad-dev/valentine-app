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
  const [reverseMode, setReverseMode] = useState(false);
  const [petals, setPetals] = useState([]);
  const [showBottomShadow, setShowBottomShadow] = useState(false);
  const [isOpeningStage, setIsOpeningStage] = useState(false);


  const scrollRef = useRef(null);

  const letters = [
    {
      title: "The Day We Met",
      content: [
        "Orma undo ponuveeee the day first we texted?🫠",
        "Oru sadharana conversation ayrn. Ath nmmmde orumich ulla yathrayk oru thudakam kurich🥺🫠",
        "Never thought I'd fall in love with you pashe ath nte ponuuuninodoppam ayrnu nn orkumbo I'm so grateful and I'm lucky🫠.",
      ]
    },
    {
      title: "The day you held my arm",
      content: [
        "Ann nmml first time nerit kandpo nte kayyime pidiche orma undo ponuveee?🫠",
        "Ann ninte kayyil nte kayy cherna aa nimisham, njan ottek alla nn ee lokham thane enod choondi kanich thanna pole thoni...",
        " Aa nimisham thott thane nte muzhuvan lokham ninnil othungi🥹🫠"
 
      ]
    },

    {
      title: "Those little things",
      content:[
        "Enikk vendi nte ponuuu karanja nimishangal… athil njan nte ponuvinte hridayathnte sathyam kandit und, sneham manslakt und.🫠", 
        "Ijj enne ‘ikkuvee’ nn vilikkumbo enik nth santhosham anenn aryoo, ponuveeee. 🫠🥺 ",
        "Ponuveee, ni aarkm kodkathe enik mathrm thanna aa attention,aa priority, ninte care, nte kude spent cheyth oroo nimishangal nte ponuvinee koodthl bhangi akeete ull😭😭🥺",
        "Nte ponuuu enik oroo vettam enik oru urula choor vaari therumbo athinte ruchi koodeete ull🫠 ",
        "Ithokke cheriya karyangal pole thonnm... pashe enik valya karyngl ahn, ponuveeee🫠❤️"
      ]
    },
    {
      title: "The Future I See",
      content: [
        "Varshangal kadann poyalum, jeevitham nammle pala vazhililoode kondupoyalum, santhoshavum vedhanakalum nammle parikshichalum…",
        "Njan kaanunna bhaviyil nammal randuperum koode nadakkunna oru yaathra ahn, ponuveeee. 🫠",
        "Kaalam maariyalum, sthalangal maariyalum, nte mansil oru sthanam und… athil nammde per ahn ezhuthi vechkrn ponuveeee🫠🫠.",
        "Nte bhaviyude oro chithrathilum nte ponuvineee alland vere aareyum njan kaanunnilla…🫠 Ah chithrathil njanm ninte koodee undaakm nnth nte urapp ahn, ponuveeee.🫠",
        "I’ll always choose my tomorrows with you, ponuveeee. 🫠❤️"
  ]

    }
  ];

  /* Reset scroll when letter changes */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
      checkScroll();
    }
  }, [currentLetter]);

  /* Detect scroll */
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const isScrollable = el.scrollHeight > el.clientHeight;
    const atBottom =
      el.scrollTop + el.clientHeight >= el.scrollHeight - 5;

    setShowBottomShadow(isScrollable && !atBottom);
  };

  /* Petals */
  useEffect(() => {
    const p = Array.from({ length: 64 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 14 + Math.random() * 10,
      size: 6 + Math.random() * 14,
      opacity: 0.3 + Math.random() * 0.4

    }));
    setPetals(p);
  }, []);

const openEnvelope = () => {
  if (isOpeningStage) return;

  setIsOpeningStage(true);

  // After zoom + shake
  setTimeout(() => {
    setExpand(true);
  }, 400);

  // Reveal letter sliding from inside
  setTimeout(() => {
    setShowLetters(true);
  }, 800);
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
              I need your attention for a second.😒
            </h2>
            <p className="openText">Tap the letter to open.👉👈</p>
            <div className="tapHint">↓</div>
          </div>
        )}

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
              <div
                className="letterContentScroll"
                ref={scrollRef}
                onScroll={checkScroll}
              >
                <h3>{letters[currentLetter].title}</h3>

                {letters[currentLetter].content.map((para, index) => (
                  <p key={index}>{para}</p>
                ))}
              </div>

              {showBottomShadow && (
                <div className="bottomScrollShadow" />
              )}
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

        {stage === "final" && (
          <div className="finalBlock fadeInSlow">
            <h1 className="finalLine">
              Ee Neenda Yaathrayil, Ninte Koode
            </h1>

            <p className="finalSubLine">
              Through growth. Through tough times. Through change. 
              <br />
              Through ordinary years and unexpected ones.
            </p>

            <button className="glassReplayBtn" onClick={replay}>
              Replay This
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
