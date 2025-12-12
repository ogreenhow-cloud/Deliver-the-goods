export interface Story {
  id: string;
  headline: string;
  summary: string;
  excerpt: string;
  author: string;
  date: string;
  tags: string[];
  imageUrl?: string;
  fullContent?: string; // HTML allowed
  embedUrl?: string; // Video or tweet
}

export interface LeaderUpdate {
  id: string;
  name: string;
  title: string;
  photoUrl: string;
  content: string;
  email: string; // Kept for reference, but reply button removed from UI
  date: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  explanation: string;
}

export interface Poll {
  id: string;
  question: string;
  options: { value: string; label: string }[];
}

export interface Resource {
  id: string;
  title: string;
  type: 'PDF' | 'Video' | 'Link';
  url: string;
  description: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'Webinar' | 'Townhall' | 'Training' | 'Social';
}

export interface PerformanceMetric {
  id: string;
  label: string;
  value: string;
  trend: string;
  isPositive: boolean;
}

export interface NewsletterData {
  meta: {
    title: string;
    month: string;
    year: string;
    editorNote: string;
    quickLinks: { label: string; actionId: string }[];
  };
  performance: PerformanceMetric[];
  news: Story[];
  leadership: LeaderUpdate[];
  popQuiz: QuizQuestion[];
  resources: Resource[];
  calendar: CalendarEvent[];
  poll?: Poll;
}