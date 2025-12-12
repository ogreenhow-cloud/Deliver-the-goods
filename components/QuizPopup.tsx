import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../types';
import { X, CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { saveQuizScore } from '../services/contentService';

interface QuizPopupProps {
  questions: QuizQuestion[];
}

const QuizPopup: React.FC<QuizPopupProps> = ({ questions }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Trigger pop-up after 5 seconds
    const timer = setTimeout(() => {
        if (!localStorage.getItem('quiz_dismissed')) {
            setIsVisible(true);
        }
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const currentQ = questions[currentQIndex];

  const handleOptionClick = (optId: string, isCorrect: boolean) => {
    if (isAnswered) return;
    setSelectedOption(optId);
    setIsAnswered(true);
    if (isCorrect) {
        saveQuizScore(currentQ.id, 100);
    }
  };

  const handleNext = () => {
      if (currentQIndex < questions.length - 1) {
          setCurrentQIndex(prev => prev + 1);
          setSelectedOption(null);
          setIsAnswered(false);
      } else {
          handleDismiss();
      }
  };

  const handleDismiss = () => {
      setIsVisible(false);
      setDismissed(true);
      localStorage.setItem('quiz_dismissed', 'true');
  };

  if (!isVisible || dismissed || !currentQ) return null;

  if (isMinimized) {
      return (
          <button 
            onClick={() => setIsMinimized(false)}
            className="fixed bottom-4 right-4 z-50 bg-accent text-white p-3 rounded-full shadow-lg hover:bg-accent-dark transition-colors animate-fade-in"
          >
              <HelpCircle size={24} />
          </button>
      );
  }

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 w-full max-w-sm animate-slide-in-right">
      <div className="bg-white text-black shadow-2xl rounded-sm overflow-hidden border-t-4 border-accent">
        {/* Header */}
        <div className="bg-gray-100 px-4 py-2 flex justify-between items-center border-b border-gray-200">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Quick Quiz</span>
            <div className="flex gap-2">
                <button onClick={() => setIsMinimized(true)} className="text-gray-400 hover:text-black"><span className="sr-only">Minimize</span>_</button>
                <button onClick={handleDismiss} className="text-gray-400 hover:text-red-500"><X size={16} /></button>
            </div>
        </div>

        {/* Content */}
        <div className="p-5">
            <h4 className="font-bold text-lg mb-4 leading-tight">{currentQ.question}</h4>
            
            <div className="space-y-2 mb-4">
                {currentQ.options.map((opt) => {
                    let btnClass = "w-full text-left p-2 text-sm border rounded hover:bg-gray-50 transition-colors";
                    if (isAnswered) {
                        if (opt.isCorrect) btnClass = "w-full text-left p-2 text-sm border border-green-500 bg-green-50 text-green-700 font-bold";
                        else if (selectedOption === opt.id) btnClass = "w-full text-left p-2 text-sm border border-red-500 bg-red-50 text-red-700";
                        else btnClass = "w-full text-left p-2 text-sm border border-gray-100 text-gray-400";
                    } else if (selectedOption === opt.id) {
                        btnClass = "w-full text-left p-2 text-sm border border-black bg-gray-100";
                    }

                    return (
                        <button 
                            key={opt.id}
                            onClick={() => handleOptionClick(opt.id, opt.isCorrect)}
                            disabled={isAnswered}
                            className={btnClass}
                        >
                            <div className="flex justify-between items-center">
                                {opt.text}
                                {isAnswered && opt.isCorrect && <CheckCircle size={14} className="text-green-600"/>}
                                {isAnswered && !opt.isCorrect && selectedOption === opt.id && <XCircle size={14} className="text-red-600"/>}
                            </div>
                        </button>
                    );
                })}
            </div>

            {isAnswered && (
                <div className="animate-fade-in">
                    <p className="text-xs text-gray-600 mb-3 bg-gray-100 p-2 rounded">
                        <span className="font-bold">Fact:</span> {currentQ.explanation}
                    </p>
                    <button 
                        onClick={handleNext}
                        className="w-full bg-black text-white py-2 text-sm font-bold uppercase tracking-wide hover:bg-accent transition-colors"
                    >
                        {currentQIndex < questions.length - 1 ? 'Next Question' : 'Finish'}
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default QuizPopup;