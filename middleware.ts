import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';

const restrictedPages = {
  undefined: ['/reservation', '/announcement', '/mypage', '/admin'],
  GENERAL: ['/reservation', '/announcement', '/mypage', '/admin'], // 'GENERAL' 사용자가 접근할 수 없는 페이지
  UNREVIEWED: ['/reservation', '/announcement', '/mypage', '/admin'], // 'UNREVIEWED' 사용자가 접근할 수 없는 페이지
  KAHLUA: ['/admin'], // 'KAHLUA' 사용자가 접근할 수 없는 페이지
};

interface DecodedToken {
  role: string;
  exp: number;
}

// token decoding
const validateToken = (token: string): DecodedToken | null => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp && decoded.exp < currentTime) {
      console.warn('Token expired');
      return null; // 만료된 토큰
    }

    return decoded;
  } catch (error) {
    console.error('Invalid token:', error);
    return null; // 유효하지 않은 토큰
  }
};

export function middleware(request: NextRequest) {
  const token = cookies().get('access_token')?.value;

  // accessToken이 null인 경우
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const decodedToken = validateToken(token);

  // accessToken이 유효하지 않은 경우
  if (!decodedToken) {
    const res = NextResponse.redirect(new URL('/login', request.url));
    res.cookies.delete('access_token');

    return res;
  }

  // role 확인
  const userRole = decodedToken.role;

  // 사용자 역할에 따라 접근 제한이 있는 페이지를 확인
  for (const [role, pages] of Object.entries(restrictedPages)) {
    if (userRole === role) {
      for (const page of pages) {
        if (request.nextUrl.pathname.startsWith(page)) {
          const redirectUrl = new URL('/error', request.url);
          redirectUrl.searchParams.set('error', 'access_denied');
          return NextResponse.redirect(redirectUrl); // error page로 리디렉션
        }
      }
    }
  }

  // 요청 허용
  return NextResponse.next();
}

// 미들웨어를 적용할 경로 설정
export const config = {
  matcher: [
    '/reservation/:path*',
    '/announcement/:path*',
    '/mypage/:path*',
    '/admin/:path*',
  ], // 해당 경로에만 적용
};
