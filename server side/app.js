const express = require("express");
const Data = require("./DB/TestData.json");
const app = express();
const cors = require('cors');
const port = 5000;

app.use(express.json())

app.use(cors());



app.get("/getwords", (req, res) => {
  // put each option in a separated array
  const adverb = (Data.wordList.filter(x => x.pos.includes("adverb")))
  const adjective = (Data.wordList.filter(x => x.pos.includes("adjective")))
  const noun = (Data.wordList.filter(x => x.pos.includes("noun")))
  const verb = (Data.wordList.filter(x => x.pos.includes("verb")))

  const arr = [];

  for (let i = 0; arr.length < 10; i++) {
    // set first four indexes with an object that has pos equal to  adjective & adverb & noun & verb 
    // to make sure that the list include at least one of each of them
    if (i === 0) {
        arr.push(adjective[Math.floor(Math.random() * adjective.length)]) //select randomly one object from adjective array
    }
    if (i === 1) {
        arr.push(adverb[Math.floor(Math.random() * adverb.length)]) //select randomly one object from adverb array
    }
    if (i === 2) {
        arr.push(noun[Math.floor(Math.random() * noun.length)]) //select randomly one object from noun array
    }
    if (i === 3) {
        arr.push(verb[Math.floor(Math.random() * verb.length)]) //select randomly one object from verb array
    }
    if (i > 3) { // set the rest indexes randomly worldList array
        const random_word = Math.floor(Math.random() * Data.wordList.length);
        const isInclude = arr.map((x) => x.id).includes(Data.wordList[random_word].id);
        if (!isInclude) {
            arr.push(Data.wordList[random_word]);


        }
    }


}

const ListOfWord = [...arr].sort(() => Math.random() - 0.5); // shuffel the arr array 

  res.json(ListOfWord);
});

app.post("/getRank", (req,res) => {
    const {score} = req.body;
    const scoreNum = []

    for (let i = 0; i < Data.scoresList.length; i++) {
        if (Data.scoresList[i] < score) {
            scoreNum.push(Data.scoresList[i]) // to knew how many scores in scoreList array less than Score that recived from the body and put them in array 
        }
    }
    // (scores less than my score / sum of scorList items) * 100 ==> to the nearest hundredth
    const Rank = Math.round(((scoreNum.length/Data.scoresList.length)*100)*100)/100


    res.status(200).json({ message: " Rank : "+Rank +" %"})
})

app.listen(port, () => console.log(`server running on port ${port}`));
