import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function RankScreen({
  Word,
  score,
  setScore,
  setShowScore,
  getWord,
  setCurrentQuestion,
  setProgress,
}) {
  let navigate = useNavigate();
  const FinalScore = (score / Word) * 100;

  const [rank, setRank] = useState();


  async function getRank() {
    let result = await axios.post("http://localhost:5000/getRank",
    {"score": FinalScore}
    );

    setRank(result.data.message);

  }

  const tryAgain = () => {
    setShowScore(false);
    setCurrentQuestion(0);
    setScore(0);
    setProgress(0);
    navigate("/");
    getWord();
  };

  useEffect(() => {
    getRank();
  }, []);

  return (
    <>
      <div className="container col-11 col-md-6  text-center bg-white py-5 border border-primary shadow rounded">
        <h3 className="pb-3">Your {rank}</h3>
         
        <div>
          <button
            onClick={tryAgain}
            className="btn btn-primary"
            type="button"
          >
            try again
          </button>
        </div>
      </div>
    </>
  );
}

export default RankScreen;
