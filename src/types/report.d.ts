export interface Report {
  id: number;
  address: string;
  author: string;
  content: string;
  title: string;
  lat: number;
  lng: number;
  tags: {
    [key: string]: string;
  };
  imageUrls: {
    [key: string]: string;
  };
  address: string;
  author: string;
  created_at: string;
  user_id: string;
}
