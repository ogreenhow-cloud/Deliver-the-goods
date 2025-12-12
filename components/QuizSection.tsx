import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle, XCircle, Trophy, RefreshCw } from 'lucide-react';
import { saveQuizScore } from '../services/contentService';

interface QuizSectionProps {
  questions: QuizQuestion[];
}

const QuizSection: React.FC<QuizSectionProps> = ({ questions }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const currentQ = questions[currentQIndex];

  const handleOptionClick = (optId: string, isCorrect: boolean) => {
    if (isAnswered) return;
    setSelectedOption(optId);
    setIsAnswered(true);
    if (isCorrect) {
        setScore(score + 1);
        saveQuizScore(currentQ.id, 100);
    }
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
        setCurrentQIndex(prev => prev + 1);
        setSelectedOption(null);
        setIsAnswered(false);
    } else {
        setShowSummary(true);
    }
  };

  const resetQuiz = () => {
      setCurrentQIndex(0);
      setScore(0);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowSummary(false);
  };

  if (!questions || questions.length === 0) return null;

  return (
    <section id="quiz" className="py-16 bg-gradient-to-br from-zinc-900 to-black text-white relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-3xl rounded-full"></div>
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
            <h2 className="text-3xl font-bold uppercase tracking-wide mb-2">Test Your Knowledge</h2>
            <p className="text-zinc-400">Challenge yourself with this month's industry trivia.</p>
        </div>

        <div className="bg-black border border-zinc-800 p-8 rounded-sm shadow-2xl relative overflow-hidden min-h-[400px] flex flex-col justify-center">
            {showSummary ? (
                <div className="text-center animate-fade-in">
                    <Trophy className="mx-auto text-accent mb-6" size={64} />
                    <h3 className="text-2xl font-bold mb-4">Quiz Complete!</h3>
                    <p className="text-xl mb-8">You scored <span className="text-accent font-bold">{score}</span> out of <span className="text-white">{questions.length}</span></p>
                    <button 
                        onClick={resetQuiz}
                        className="inline-flex items-center px-6 py-3 bg-accent hover:bg-accent-dark text-white font-bold uppercase tracking-wider transition-colors"
                    >
                        <RefreshCw size={18} className="mr-2" /> Play Again
                    </button>
                </div>
            ) : (
                <div className="w-full">
                    <div className="flex justify-between items-center mb-8 text-sm text-zinc-500 font-mono">
                        <span>QUESTION {currentQIndex + 1} OF {questions.length}</span>
                        <span>SCORE: {score}</span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold mb-8 leading-relaxed">{currentQ.question}</h3>
                    
                    <div className="grid gap-4">
                        {currentQ.options.map((opt) => {
                            let btnClass = "w-full text-left p-4 border border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-500 transition-all duration-200 flex justify-between items-center group";
                            
                            if (isAnswered) {
                                if (opt.isCorrect) {
                                    btnClass = "w-full text-left p-4 border border-green-500 bg-green-500/10 text-green-400 font-bold flex justify-between items-center";
                                } else if (selectedOption === opt.id) {
                                    btnClass = "w-full text-left p-4 border border-red-500 bg-red-500/10 text-red-400 flex justify-between items-center";
                                } else {
                                    btnClass = "w-full text-left p-4 border border-zinc-800 bg-black text-zinc-600 flex justify-between items-center opacity-50";
                                }
                            }

                            return (
                                <button
                                    key={opt.id}
                                    onClick={() => handleOptionClick(opt.id, opt.isCorrect)}
                                    disabled={isAnswered}
                                    className={btnClass}
                                >
                                    <span className="flex items-center gap-3">
                                        <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs ${isAnswered && opt.isCorrect ? 'border-green-500 text-green-500' : 'border-zinc-500 text-zinc-500'}`}>
                                            {opt.id.toUpperCase()}
                                        </span>
                                        {opt.text}
                                    </span>
                                    
                                    {isAnswered && opt.isCorrect && <CheckCircle className="text-green-500" size={20} />}
                                    {isAnswered && !opt.isCorrect && selectedOption === opt.id && <XCircle className="text-red-500" size={20} />}
                                </button>
                            );
                        })}
                    </div>

                    {isAnswered && (
                        <div className="mt-8 pt-6 border-t border-zinc-800 animate-slide-up">
                             <div className="bg-zinc-900 p-4 mb-4 border-l-4 border-accent">
                                <span className="block text-accent text-xs font-bold uppercase mb-1">Explanation</span>
                                <p className="text-sm text-zinc-300">{currentQ.explanation}</p>
                             </div>
                             <button 
                                onClick={handleNext}
                                className="float-right px-6 py-2 bg-white text-black font-bold uppercase text-sm hover:bg-gray-200 transition-colors"
                             >
                                {currentQIndex < questions.length - 1 ? 'Next Question' : 'View Results'} &rarr;
                             </button>
                        </div>
                    )}
                </div>
            )}
        </div>
      </div>
    </section>
  );
};

export default QuizSection;