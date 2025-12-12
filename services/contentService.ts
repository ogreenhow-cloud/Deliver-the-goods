import { NewsletterData } from '../types';

// Using fetch instead of import allows the content/data.json file to be edited
// and updated without recompiling the JavaScript application.
export const fetchContent = async (): Promise<NewsletterData> => {
  try {
    const response = await fetch('content/data.json');
    if (!response.ok) {
      throw new Error(`Failed to load content configuration: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data as NewsletterData;
  } catch (error) {
    console.error("Error fetching newsletter content. Ensure 'content/data.json' exists and is valid JSON.", error);
    throw error;
  }
};

export const savePollVote = (pollId: string, value: string) => {
  const key = `poll_vote_${pollId}`;
  localStorage.setItem(key, value);
};

export const getPollVote = (pollId: string): string | null => {
  return localStorage.getItem(`poll_vote_${pollId}`);
};

export const saveQuizScore = (quizId: string, score: number) => {
    const history = JSON.parse(localStorage.getItem('quiz_history') || '[]');
    history.push({ quizId, score, date: new Date().toISOString() });
    localStorage.setItem('quiz_history', JSON.stringify(history));
};