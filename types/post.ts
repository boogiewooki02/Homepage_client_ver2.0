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

// 글 타입
export type PostType = 'NOTICE' | 'KAHLUA_TIME';

// 글 목록 조회 시 요청 Params
export type FetchListParams = {
  postType: PostType;
  page: number;
  size: number;
  searchWord?: string;
};

// 글 목록 조회 시 응답
export type PostItem = {
  id: number;
  title: string;
  content?: string;
  writer: string;
  profileImageUrl?: string;
  likes: number;
  postType: PostType;
  commentsCount: number;
  imageUrls?: string | string[];
  createdAt: string;
  updatedAt?: string;
  liked?: boolean;
};

// 페이징 아이템
export type PagedResult = {
  items: PostItem[];
  totalPages: number;
  page: number;
  size: number;
  totalElements: number;
  hasNext?: boolean;
};

// 검색 요청 Params
export interface SearchPostParams {
  query: string;
  postType?: PostType;
  page?: number;
  size?: number;
}
