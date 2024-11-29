export interface AnnouncementProps {
  title: string;
  like: number;
  comment: number;
  date: string;
}

export interface CommunityProps {
  title: string;
  like: number;
  comment: number;
  writer: string;
  date: string;
}

export interface ToggleProps {
  toggle: string;
}

export const toggleList: Array<ToggleProps> = [
  { toggle: '공지사항' },
  { toggle: '깔깔깔' },
];