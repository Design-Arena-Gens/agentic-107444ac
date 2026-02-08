"use client";

import { useState } from "react";
import { Brain, BookOpen, Trophy, CheckCircle, XCircle, ArrowRight, Award } from "lucide-react";

interface Lesson {
  id: number;
  title: string;
  category: string;
  content: string;
  keyPoints: string[];
  completed: boolean;
}

interface Quiz {
  id: number;
  lessonId: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const lessons: Lesson[] = [
  {
    id: 1,
    title: "Introduction to Psychology",
    category: "Foundations",
    content: "Psychology is the scientific study of the mind and behavior. It explores how we think, feel, and act. Modern psychology encompasses diverse subfields including clinical, cognitive, developmental, and social psychology.",
    keyPoints: [
      "Psychology is a scientific discipline",
      "It studies both mind and behavior",
      "Multiple perspectives exist (biological, cognitive, behavioral, etc.)",
      "Evidence-based research is fundamental"
    ],
    completed: false
  },
  {
    id: 2,
    title: "Classical Conditioning",
    category: "Behavioral Psychology",
    content: "Classical conditioning is a learning process discovered by Ivan Pavlov. It occurs when a neutral stimulus becomes associated with a meaningful stimulus, producing a learned response. This fundamental principle explains many learned behaviors and emotional responses.",
    keyPoints: [
      "Discovered by Ivan Pavlov",
      "Involves pairing neutral stimulus with unconditioned stimulus",
      "Creates conditioned response",
      "Explains learned emotional responses"
    ],
    completed: false
  },
  {
    id: 3,
    title: "Cognitive Development",
    category: "Developmental Psychology",
    content: "Jean Piaget proposed that children progress through four stages of cognitive development: sensorimotor, preoperational, concrete operational, and formal operational. Each stage represents different ways of thinking and understanding the world.",
    keyPoints: [
      "Piaget identified 4 stages",
      "Children actively construct knowledge",
      "Development is sequential",
      "Each stage has unique characteristics"
    ],
    completed: false
  },
  {
    id: 4,
    title: "Memory Systems",
    category: "Cognitive Psychology",
    content: "Memory consists of three main systems: sensory memory (brief impressions), short-term/working memory (limited capacity ~7 items), and long-term memory (unlimited storage). Understanding these systems helps explain how we encode, store, and retrieve information.",
    keyPoints: [
      "Three main memory systems",
      "Short-term memory is limited (~7 items)",
      "Long-term memory has unlimited capacity",
      "Encoding and retrieval processes are crucial"
    ],
    completed: false
  },
  {
    id: 5,
    title: "Social Influence",
    category: "Social Psychology",
    content: "Social influence examines how people's thoughts and behaviors are affected by others. Key concepts include conformity (matching group behavior), obedience (following authority), and persuasion (attitude change through communication).",
    keyPoints: [
      "Conformity: matching group norms",
      "Obedience: following authority figures",
      "Persuasion: changing attitudes",
      "Milgram and Asch conducted famous studies"
    ],
    completed: false
  },
  {
    id: 6,
    title: "Psychological Disorders",
    category: "Clinical Psychology",
    content: "Psychological disorders are patterns of behavioral or psychological symptoms that cause significant distress or impairment. The DSM-5 classifies disorders into categories including mood disorders, anxiety disorders, psychotic disorders, and personality disorders.",
    keyPoints: [
      "Defined by distress or impairment",
      "DSM-5 provides classification system",
      "Multiple categories exist",
      "Biological and environmental factors interact"
    ],
    completed: false
  }
];

const quizzes: Quiz[] = [
  {
    id: 1,
    lessonId: 1,
    question: "What is the primary focus of psychology as a scientific discipline?",
    options: [
      "Only treating mental illness",
      "The scientific study of mind and behavior",
      "Reading people's minds",
      "Giving life advice"
    ],
    correctAnswer: 1,
    explanation: "Psychology is the scientific study of the mind and behavior, using empirical methods to understand how we think, feel, and act."
  },
  {
    id: 2,
    lessonId: 2,
    question: "In Pavlov's experiment, what was the conditioned stimulus?",
    options: [
      "Food",
      "Salivation",
      "Bell",
      "Dog"
    ],
    correctAnswer: 2,
    explanation: "The bell was the conditioned stimulus - initially neutral, it became associated with food and eventually triggered salivation on its own."
  },
  {
    id: 3,
    lessonId: 3,
    question: "According to Piaget, which stage involves abstract thinking and hypothetical reasoning?",
    options: [
      "Sensorimotor",
      "Preoperational",
      "Concrete operational",
      "Formal operational"
    ],
    correctAnswer: 3,
    explanation: "The formal operational stage (age 12+) is characterized by abstract thinking, logical reasoning, and the ability to think about hypothetical situations."
  },
  {
    id: 4,
    lessonId: 4,
    question: "Approximately how many items can short-term memory hold?",
    options: [
      "3 items",
      "7 items",
      "15 items",
      "Unlimited"
    ],
    correctAnswer: 1,
    explanation: "Short-term or working memory typically holds about 7 (±2) items, as identified by psychologist George Miller."
  },
  {
    id: 5,
    lessonId: 5,
    question: "What did Asch's conformity experiments demonstrate?",
    options: [
      "People always resist group pressure",
      "People often conform to group opinions even when wrong",
      "Authority figures have no influence",
      "Persuasion never works"
    ],
    correctAnswer: 1,
    explanation: "Asch's experiments showed that people often conform to group opinions, even when the group is obviously wrong, demonstrating the power of social influence."
  },
  {
    id: 6,
    lessonId: 6,
    question: "What manual is primarily used to classify psychological disorders?",
    options: [
      "Psychology Today",
      "DSM-5",
      "IQ Test Manual",
      "Freud's Dream Book"
    ],
    correctAnswer: 1,
    explanation: "The DSM-5 (Diagnostic and Statistical Manual of Mental Disorders, 5th Edition) is the standard classification system for psychological disorders."
  }
];

export default function Home() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizzesTaken, setQuizzesTaken] = useState(0);
  const [view, setView] = useState<"home" | "lessons" | "quiz">("home");

  const completeLesson = (lessonId: number) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const startQuiz = (lessonId: number) => {
    const quiz = quizzes.find(q => q.lessonId === lessonId);
    if (quiz) {
      setActiveQuiz(quiz);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setView("quiz");
    }
  };

  const submitAnswer = () => {
    if (selectedAnswer === null || !activeQuiz) return;

    setShowExplanation(true);
    setQuizzesTaken(quizzesTaken + 1);

    if (selectedAnswer === activeQuiz.correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuiz = () => {
    const currentIndex = quizzes.findIndex(q => q.id === activeQuiz?.id);
    if (currentIndex < quizzes.length - 1) {
      setActiveQuiz(quizzes[currentIndex + 1]);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setActiveQuiz(null);
      setView("lessons");
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Foundations": "bg-blue-500",
      "Behavioral Psychology": "bg-purple-500",
      "Developmental Psychology": "bg-green-500",
      "Cognitive Psychology": "bg-yellow-500",
      "Social Psychology": "bg-pink-500",
      "Clinical Psychology": "bg-red-500"
    };
    return colors[category] || "bg-gray-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView("home")}>
              <Brain className="w-10 h-10 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-900">PsychoLearn</h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <span className="text-lg font-semibold">{score}/{quizzesTaken}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="text-lg font-semibold">{completedLessons.length}/{lessons.length}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Home View */}
        {view === "home" && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-gray-900 mb-4">Master Psychology</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Learn fundamental concepts in psychology through interactive lessons and quizzes.
                Build your knowledge from foundations to advanced topics.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-transform">
                <BookOpen className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">6 Lessons</h3>
                <p className="text-gray-600">Comprehensive psychology topics</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-transform">
                <Brain className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Interactive</h3>
                <p className="text-gray-600">Engage with psychology concepts</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-transform">
                <Award className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Track Progress</h3>
                <p className="text-gray-600">Monitor your learning journey</p>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => setView("lessons")}
                className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-indigo-700 transition-colors inline-flex items-center gap-2"
              >
                Start Learning
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {/* Lessons View */}
        {view === "lessons" && !selectedLesson && (
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Psychology Lessons</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => setSelectedLesson(lesson)}
                >
                  <div className={`h-2 ${getCategoryColor(lesson.category)}`}></div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                        {lesson.category}
                      </span>
                      {completedLessons.includes(lesson.id) && (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{lesson.title}</h3>
                    <p className="text-gray-600 line-clamp-3">{lesson.content}</p>
                    <div className="mt-4 flex items-center text-indigo-600 font-semibold">
                      Start Lesson
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lesson Detail View */}
        {view === "lessons" && selectedLesson && (
          <div>
            <button
              onClick={() => setSelectedLesson(null)}
              className="mb-6 text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              ← Back to Lessons
            </button>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className={`inline-block px-4 py-2 rounded-full text-white text-sm font-semibold mb-4 ${getCategoryColor(selectedLesson.category)}`}>
                {selectedLesson.category}
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{selectedLesson.title}</h2>

              <div className="prose max-w-none mb-8">
                <p className="text-lg text-gray-700 leading-relaxed">{selectedLesson.content}</p>
              </div>

              <div className="bg-indigo-50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Points</h3>
                <ul className="space-y-2">
                  {selectedLesson.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    completeLesson(selectedLesson.id);
                    setSelectedLesson(null);
                  }}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Mark as Complete
                </button>
                <button
                  onClick={() => startQuiz(selectedLesson.id)}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Take Quiz
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quiz View */}
        {view === "quiz" && activeQuiz && (
          <div>
            <button
              onClick={() => {
                setView("lessons");
                setActiveQuiz(null);
              }}
              className="mb-6 text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              ← Back to Lessons
            </button>
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Quiz</h2>

              <div className="mb-8">
                <p className="text-xl text-gray-800 font-semibold mb-6">{activeQuiz.question}</p>

                <div className="space-y-3">
                  {activeQuiz.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => !showExplanation && setSelectedAnswer(index)}
                      disabled={showExplanation}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        selectedAnswer === index
                          ? showExplanation
                            ? index === activeQuiz.correctAnswer
                              ? "border-green-500 bg-green-50"
                              : "border-red-500 bg-red-50"
                            : "border-indigo-600 bg-indigo-50"
                          : showExplanation && index === activeQuiz.correctAnswer
                          ? "border-green-500 bg-green-50"
                          : "border-gray-300 hover:border-indigo-400"
                      } ${showExplanation ? "cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <div className="flex items-center gap-3">
                        {showExplanation && index === activeQuiz.correctAnswer && (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        )}
                        {showExplanation && selectedAnswer === index && index !== activeQuiz.correctAnswer && (
                          <XCircle className="w-6 h-6 text-red-600" />
                        )}
                        <span className="text-lg">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {showExplanation && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
                  <h4 className="font-bold text-lg mb-2">Explanation</h4>
                  <p className="text-gray-700">{activeQuiz.explanation}</p>
                </div>
              )}

              <div className="flex gap-4">
                {!showExplanation ? (
                  <button
                    onClick={submitAnswer}
                    disabled={selectedAnswer === null}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={nextQuiz}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    {quizzes.findIndex(q => q.id === activeQuiz.id) < quizzes.length - 1 ? "Next Quiz" : "Finish"}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white mt-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-600">
          <p>© 2026 PsychoLearn - Your Interactive Psychology Learning Platform</p>
        </div>
      </footer>
    </div>
  );
}
