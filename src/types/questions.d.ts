export interface Question {
  author: string;
  city: string;
  content: string;
  id: number;
  address: string;
  prefecture: string;
}

export interface SelfQuestion {
  question_id: number;
  displayName: string;
  profileImageUrl: string;
  content: string;
  created_at: string;
}
