import React, { useState } from "react";
import "./App.css";

const categories = {
  Vocabulary: [
    { word: "Bonjour", translation: "[Translate:Hello or Good morning]", pronunciation: "bon-ZHOOR" },
    { word: "Merci", translation: "[Translate:Thank you]", pronunciation: "mehr-SEE" },
    { word: "Eau", translation: "[Translate:Water]", pronunciation: "oh" },
    { word: "Livre", translation: "[Translate:Book]", pronunciation: "leev-ruh" },
    { word: "Maison", translation: "[Translate:House]", pronunciation: "meh-zon" },
    { word: "Soleil", translation: "[Translate:Sun]", pronunciation: "so-lay" },
    { word: "Amour", translation: "[Translate:Love]", pronunciation: "ah-moor" },
    { word: "Ville", translation: "[Translate:City]", pronunciation: "veel" },
    { word: "Fleur", translation: "[Translate:Flower]", pronunciation: "flur" },
    { word: "Musique", translation: "[Translate:Music]", pronunciation: "myoo-zeek" },
  ],
  Grammar: [
    { word: "Le", translation: "[Translate:The (masculine)]", pronunciation: "luh" },
    { word: "La", translation: "[Translate:The (feminine)]", pronunciation: "lah" },
    { word: "Être", translation: "[Translate:To be]", pronunciation: "eh-truh" },
    { word: "Avoir", translation: "[Translate:To have]", pronunciation: "ah-vwar" },
    { word: "Faire", translation: "[Translate:To do, to make]", pronunciation: "fair" },
    { word: "Aller", translation: "[Translate:To go]", pronunciation: "ah-lay" },
    { word: "Pouvoir", translation: "[Translate:Can, to be able to]", pronunciation: "poo-vwar" },
  ],
};

function App() {
  const [currentCategory, setCurrentCategory] = useState("Vocabulary");
  const [flashcards, setFlashcards] = useState(categories[currentCategory]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const [quizMode, setQuizMode] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);

  const changeCategory = (category) => {
    setCurrentCategory(category);
    setFlashcards(categories[category]);
    setCurrentCardIndex(0);
    setShowAnswer(false);
    setQuizMode(false);
  };

  const nextCard = () => {
    setShowAnswer(false);
    setCurrentCardIndex((prev) => (prev + 1) % flashcards.length);
  };

  const createQuiz = (cards) =>
    cards.map(({ word, translation }) => ({
      question: `[Translate:What is the meaning of] "${word}"?`,
      options: [
        translation,
        "[Translate:Goodbye]",
        "[Translate:Please]",
        "[Translate:Sorry]",
      ].sort(() => Math.random() - 0.5), //shuffle
      answer: translation,
    }));

  const startQuiz = () => {
    const questions = createQuiz(flashcards);
    setQuizQuestions(questions);
    setQuizIndex(0);
    setQuizScore(0);
    setQuizAnswered(false);
    setQuizMode(true);
  };

  const answerQuiz = (option) => {
    if (quizAnswered) return;
    setQuizAnswered(true);
    if (option === quizQuestions[quizIndex].answer) {
      setQuizScore((score) => score + 1);
    }
  };

  const nextQuizQuestion = () => {
    setQuizAnswered(false);
    if (quizIndex + 1 < quizQuestions.length) {
      setQuizIndex((index) => index + 1);
    } else {
      alert(`[Translate:Quiz finished!] Score: ${quizScore}/${quizQuestions.length}`);
      setQuizMode(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>French Language Learning App</h1>
        <div className="category-selector">
          {Object.keys(categories).map((cat) => (
            <button
              key={cat}
              className={cat === currentCategory ? "btn active" : "btn"}
              onClick={() => changeCategory(cat)}
              disabled={quizMode}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {!quizMode ? (
        <div className="flashcard-container">
          <div className="flashcard">
            <div className="word">{flashcards[currentCardIndex].word}</div>
            {showAnswer && (
              <div className="translation-pronunciation">
                <div className="translation">{flashcards[currentCardIndex].translation}</div>
                <div className="pronunciation">({flashcards[currentCardIndex].pronunciation})</div>
              </div>
            )}
          </div>
          <div className="buttons">
            <button onClick={() => setShowAnswer((s) => !s)} className="btn show-btn">
              {showAnswer ? "Hide Translation" : "Show Translation"}
            </button>
            <button onClick={nextCard} className="btn next-btn">
              Next
            </button>
            <button
              onClick={startQuiz}
              className="btn quiz-btn"
              disabled={flashcards.length === 0}
            >
              Take Quiz
            </button>
          </div>
        </div>
      ) : (
        <div className="quiz-container">
          <h3>{quizQuestions[quizIndex].question}</h3>
          <div className="options">
            {quizQuestions[quizIndex].options.map((option, idx) => (
              <button
                key={idx}
                className={`btn option-btn ${
                  quizAnswered
                    ? option === quizQuestions[quizIndex].answer
                      ? "correct"
                      : ""
                    : ""
                }`}
                onClick={() => answerQuiz(option)}
                disabled={quizAnswered}
              >
                {option}
              </button>
            ))}
          </div>
          {quizAnswered && (
            <button onClick={nextQuizQuestion} className="btn next-btn">
              {quizIndex + 1 < quizQuestions.length ? "Next Question" : "Finish Quiz"}
            </button>
          )}
        </div>
      )}

      <footer className="footer">Powered by React</footer>
    </div>
  );
}

export default App;
