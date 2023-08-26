export interface Question {
  author: string;
  city: string;
  content: string;
  profileImageUrl: string;
  displayName: string;
  id: number;
  address: string;
  prefecture: string;
  question_id: number;
  reward: number;
  created_at: string;
}

export interface SelfQuestion {
  question_id: number;
  displayName: string;
  profileImageUrl: string;
  displayName: string;
  content: string;
  created_at: string;
  reward: number;
}
