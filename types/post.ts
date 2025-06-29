export interface MyPost {
  id: number;
  title: string;
  content: string;
  writer: string;
  likes: number;
  commentsCount: number;
  imageUrls: string;
  created_at: string;
  updated_at: string;
  deletedAt: string | null;
  liked: boolean;
}
