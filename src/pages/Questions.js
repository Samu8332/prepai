
import React, { useMemo, useState } from "react";
import {
  Search,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  CheckCircle2,
  CircleHelp
} from "lucide-react";

import { questions } from "../data/questions";

export default function Questions() {
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState("All");
  const [level, setLevel] = useState("All");
  const [revealed, setRevealed] = useState([]);

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState({});

  const [saved, setSaved] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("prepai-bookmarks") || "[]"
      );
    } catch {
      return [];
    }
  });

  const topics = [
    "All",
    ...new Set(questions.map((q) => q.topic))
  ];

  const filtered = useMemo(
    () =>
      questions.filter(
        (q) =>
          (topic === "All" || q.topic === topic) &&
          (level === "All" || q.level === level) &&
          `${q.question} ${q.topic}`
            .toLowerCase()
            .includes(search.toLowerCase())
      ),
    [search, topic, level]
  );

  const toggleSaved = (id) => {
    const next = saved.includes(id)
      ? saved.filter((n) => n !== id)
      : [...saved, id];

    setSaved(next);

    localStorage.setItem(
      "prepai-bookmarks",
      JSON.stringify(next)
    );
  };

  const selectAnswer = (questionId, index) => {
    if (
      Object.prototype.hasOwnProperty.call(
        submittedAnswers,
        questionId
      )
    ) {
      return;
    }

    setSelectedAnswers((old) => ({
      ...old,
      [questionId]: index
    }));
  };

  const submitAnswer = (question) => {
    const id = question.id;
    const selected = selectedAnswers[id];

    if (selected === undefined) {
      alert("Please select an answer first!");
      return;
    }

    setSubmittedAnswers((old) => ({
      ...old,
      [id]: selected
    }));

    setRevealed((old) =>
      old.includes(id) ? old : [...old, id]
    );
  };

  const tryAgain = (id) => {
    setSelectedAnswers((old) => {
      const next = { ...old };
      delete next[id];
      return next;
    });

    setSubmittedAnswers((old) => {
      const next = { ...old };
      delete next[id];
      return next;
    });
  };

  return (
    <div className="page-stack">
      <section className="page-intro">
        <div>
          <span className="eyebrow">
            <CircleHelp size={14} /> LEARN BY DOING
          </span>
          <h2>Your question bank</h2>
          <p>
            Build strong fundamentals, one question at a time.
          </p>
        </div>

        <div className="intro-count">
          <strong>{filtered.length}</strong>
          <span>questions found</span>
        </div>
      </section>

      <div className="filter-bar">
        <label className="filter-search">
          <Search size={17} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions or topics..."
          />
        </label>

        <label className="select-wrap">
          <span>Topic</span>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            {topics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <ChevronDown size={15} />
        </label>

        <label className="select-wrap">
          <span>Level</span>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            {["All", "Beginner", "Intermediate"].map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <ChevronDown size={15} />
        </label>
      </div>

      <div className="question-list">
        {filtered.map((q, i) => {
          const submitted =
            Object.prototype.hasOwnProperty.call(
              submittedAnswers,
              q.id
            );

          const selected = selectedAnswers[q.id];
          const correct = submitted && selected === q.answer;
          const isRevealed = revealed.includes(q.id);

          return (
            <article
              className="panel question-card"
              key={q.id}
            >
              <div className="question-top">
                <div className="question-tags">
                  <span
                    className={`topic-tag tag-${q.topic.toLowerCase()}`}
                  >
                    {q.topic}
                  </span>
                  <span className="level-tag">{q.level}</span>
                </div>

                <button
                  type="button"
                  className={`icon-button bookmark-button ${
                    saved.includes(q.id) ? "is-saved" : ""
                  }`}
                  onClick={() => toggleSaved(q.id)}
                  title="Save question"
                  aria-label="Save question"
                >
                  {saved.includes(q.id) ? (
                    <BookmarkCheck size={19} />
                  ) : (
                    <Bookmark size={19} />
                  )}
                </button>
              </div>

              <h3>
                <span className="question-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {q.question}
              </h3>

              <div className="answer-options">
                {q.options.map((option, index) => {
                  const isCorrectOption = index === q.answer;
                  const isWrongSelected =
                    submitted &&
                    selected === index &&
                    !isCorrectOption;

                  let className = "answer-option";

                  if (!submitted && selected === index) {
                    className += " answer-selected";
                  }

                  if (submitted && isCorrectOption) {
                    className += " answer-correct";
                  }

                  if (isWrongSelected) {
                    className += " answer-wrong";
                  }

                  return (
                    <button
                      type="button"
                      key={index}
                      className={className}
                      onClick={() => selectAnswer(q.id, index)}
                      disabled={submitted}
                    >
                      <span className="option-letter">
                        {String.fromCharCode(65 + index)}
                      </span>

                      <span>{option}</span>

                      {submitted && isCorrectOption && (
                        <CheckCircle2 size={17} />
                      )}
                    </button>
                  );
                })}
              </div>

              {!submitted ? (
                <button
                  type="button"
                  className="button button-secondary reveal-button"
                  onClick={() => submitAnswer(q)}
                >
                  Submit Answer
                </button>
              ) : (
                <div
                  className={`explanation ${
                    correct ? "answer-correct" : "answer-wrong"
                  }`}
                  role="status"
                >
                  <strong>
                    {correct
                      ? "Correct answer!"
                      : "Incorrect answer"}
                  </strong>

                  <p>
                    Correct answer: {q.options[q.answer]}
                  </p>

                  <p>{q.explanation}</p>

                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={() => tryAgain(q.id)}
                  >
                    Try Again
                  </button>
                </div>
              )}

              {!submitted && (
                <button
                  type="button"
                  className="button button-secondary reveal-button"
                  onClick={() =>
                    setRevealed((old) =>
                      old.includes(q.id)
                        ? old.filter((id) => id !== q.id)
                        : [...old, q.id]
                    )
                  }
                >
                  {isRevealed
                    ? "Hide explanation"
                    : "Reveal answer & explanation"}
                </button>
              )}

              {isRevealed && !submitted && (
                <div className="explanation">
                  <strong>
                    Correct answer: {q.options[q.answer]}
                  </strong>
                  <p>{q.explanation}</p>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <Search size={28} />
          <h3>No questions found</h3>
          <p>Try a different keyword or filter.</p>
          <button
            type="button"
            className="button button-secondary"
            onClick={() => {
              setSearch("");
              setTopic("All");
              setLevel("All");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
