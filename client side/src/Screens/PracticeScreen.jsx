import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import RankScreen from "./RankScreen";

function PracticeScreen() {
  const options = ["Adjective", "Adverb", "Noun", "Verb"];

  const [Word, setWord] = useState([""]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answer, setAnswer] = useState();
  const [showScore, setShowScore] = useState(false);
  const [progress, setProgress] = useState(0);



  const handleAnswerOptionClick = (z) => {
    setProgress(((currentQuestion+1)/(Word.length))*100)
    if (z.toLowerCase() === Word[currentQuestion].pos) {
      setScore(score + 1);
      setIsCorrect(true);
      setAnswer(true);
      setTimeout(() => {
        setIsCorrect(false);
      }, 700);
    } else {
      setIsCorrect(true);
      setAnswer(false);
      setTimeout(() => {
        setIsCorrect(false);
      }, 700);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < Word.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  async function getWord() {
    let result = await axios.get("http://localhost:5000/getwords");

    setWord(result.data);

  }

  useEffect(() => {
    getWord();
  }, []);

  return (
    <>
      {showScore && !isCorrect ? (
        <>
          <RankScreen
            Word={Word.length}
            score={score}
            setScore={setScore}
            setShowScore={setShowScore}
            getWord={getWord}
            setCurrentQuestion={setCurrentQuestion}
            setProgress={setProgress}
          />
        </>
      ) : (
        <>
          <h1 className="text-center mb-5">
            Set Words According To Their Part Of Speech
          </h1>

          <div className="progress col-11 col-md-6 mx-auto my-4 border border-primary shadow">
            <div className="progress-bar progress-bar-striped progress-bar-animated " role="progressbar" aria-label="Example with label" style={{width: `${progress}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                {progress}%
            </div>
          </div>


          <div className="container col-11 col-md-6 rounded bg-light py-5 mb-5 border border-primary shadow">
            {isCorrect ? (
              <div className="text-center py-5 h4">
                {answer ? (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-success border border-success border border-4 rounded-circle p-3 fs-1 "
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faX}
                    className="text-danger border border-danger border border-4 rounded-circle py-3 px-4 fs-1 "
                  />
                )}
              </div>
            ) : (
              <>
                <h1 className="h5 text-center pb-4">
                  " {Word[currentQuestion].word} "
                </h1>
                <div className="container w-75">
                  <div className="row">
                    {options.map((z, index) => (
                      <div key={index} className="col-md-6 my-2">
                        <div className="d-grid gap-2">
                          <button
                            onClick={() => handleAnswerOptionClick(z)}
                            className="btn btn-outline-primary"
                            type="button"
                          >
                            {z}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default PracticeScreen;
