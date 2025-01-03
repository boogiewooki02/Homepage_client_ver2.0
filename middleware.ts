import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';

const restrictedPages = {
  undefined: ['/reservation', '/announcement', '/mypage', '/admin'],
  GENERAL: ['/reservation', '/announcement', '/mypage', '/admin'], // 'GENERAL' 사용자가 접근할 수 없는 페이지
  KAHLUA: ['/admin'], // 'KAHLUA' 사용자가 접근할 수 없는 페이지
};

interface DecodedToken {
  role: string;
  // 다른 필드들 추가
}

// token decoding하여 userRole 추출
const getUserRole = (token: string | undefined) => {
  try {
    const decodedToken = jwtDecode<DecodedToken>(token!); // JWT 디코딩
    console.log(decodedToken); // 추후 삭제
    return decodedToken.role; // role 추출
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
};

export function middleware(request: NextRequest) {
  const token = cookies().get('access_token')?.value;

  // accessToken이 null인 경우
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // role 확인
  const userRole = getUserRole(token);

  console.log(token);
  console.log(userRole);

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
