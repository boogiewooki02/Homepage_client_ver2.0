export interface Comment {
  id: number;
  postId: number;
  deletedAt: string | null;
}

export interface AnnouncementProps {
  id: number;
  title: string;
  likes: number;
  comments: Comment[];
  created_at: string;
}

export interface CommunityProps {
  id: number;
  title: string;
  likes: number;
  comments: Comment[];
  created_at: string;
  writer: string;
}

export interface ToggleProps {
  toggle: string;
}

export const toggleList: Array<ToggleProps> = [
  { toggle: '공지사항' },
  { toggle: '깔깔깔' },
];
