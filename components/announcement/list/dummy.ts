import {
  AnnouncementProps,
  CommunityProps,
} from '@/components/announcement/list/dto';

export const dummyAnnouncement: AnnouncementProps[] = [
  {
    id: 1,
    title: '2024년 크리스마스 공연',
    likes: 20,
    comments_count: 6,
    created_at: '2024-11-15T00:00:00.000Z',
  },
];

export const dummyCommunity: CommunityProps[] = [
  {
    id: 1,
    title: '2024년 크리스마스 공연',
    likes: 20,
    comments_count: 6,
    created_at: '2024-11-15T00:00:00.000Z',
    writer: '심수연',
  },
];
