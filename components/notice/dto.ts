export interface Reply {
  id: string;
  user: string;
  date: string;
  content: string;
  replying: boolean;
  deleted?: boolean;
}

export interface Comment {
  id: string;
  postId: number;
  user: string;
  date: string;
  content: string;
  parentCommentId?: string | null;
  deletedAt?: string | null;
  replies?: Comment[];
  created_at: string;
}
