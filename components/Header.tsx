'use client';

import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import logo_black from '@/public/image/KAHLUA-black.svg';
import logo_white from '@/public/image/KAHLUA.svg';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import table_menu from '@/public/image/tabler_menu-2.svg';
import table_menu_white from '@/public/image/tabler_menu-2-white.svg';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { createTheme, ThemeProvider } from '@mui/material';
import kahlua_logo from '@/public/image/KAHLUA-black.svg';
import youtube_logo from '@/public/image/youtube-icon.svg';
import kakaotalk_logo from '@/public/image/kakaotalk-icon.svg';
import instagram_logo from '@/public/image/instagram-icon.svg';
import { useRouter } from 'next/navigation';
import { authInstance } from '@/api/auth/axios';
import Cookie from 'js-cookie';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isLoggedInState } from '@/atoms/authAtom';

// MUI 테마 커스텀
const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          '@media (min-width: 360px)': {
            width: '280px',
          },
          '@media (min-width: 834px)': {
            width: '634px',
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: '0px',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          padding: '8px 12px 0 12px',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 360,
      md: 834,
      lg: 1500,
      xl: 1920,
    },
  },
});

// 공통 사용 변수 (URL)
let Url = [
  { name: 'ABOUT', url: '/about' },
  { name: 'PERFORMANCE', url: '/performance' },
  { name: 'TICKET', url: '/ticket' },
  { name: 'RECRUIT', url: '/recruit' },
];

let KahluaUrl = [
  { name: 'RESERVATION', url: '/reservation' },
  { name: 'ANNOUNCEMENT', url: '/announcement' },
  { name: 'MYPAGE', url: '/mypage' },
  { name: 'ADMIN', url: '/admin' },
];

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLink, setCurrentLink] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState); // Recoil 상태 업데이트 함수

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // cookie에서 토큰 확인
      const accessToken = Cookie.get('access_token');
      const refreshToken = Cookie.get('refresh_token');
      setIsLoggedIn(!!(accessToken && refreshToken));
    }
  }, [Cookie, setIsLoggedIn]);

  const handleLogout = async () => {
    try {
      const response = await authInstance.post('/auth/sign-out', {});
      if (response.data.isSuccess === true) {
        alert(response.data.result);
      }

      // 쿠키 삭제
      Cookie.remove('access_token');
      Cookie.remove('refresh_token');

      // recoil 상태 업데이트
      setIsLoggedIn(false);

      router.push('/');
    } catch (error) {}
  };
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  const [isKahluaClicked, setIsKahluaClicked] = useState(false); // Drawer 내부 KAHLUA 클릭 여부
  const [kahluaRightOffset, setKahluaRightOffset] = useState(0); // 추가 요소 위치
  const kahluaRef = useRef<HTMLDivElement>(null); // 데스크탑 KAHLUA 요소 참조
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setIsDrawerOpen(newOpen);

    if (!newOpen) setIsKahluaClicked(false); // Drawer가 닫힐 때 isKahluaClicked를 초기화
  };

  const handleLinkClick = (name: string) => {
    if (name !== 'KAHLUA') {
      router.push(`/${name.toLowerCase()}`);
      setCurrentLink(name);
    }
  };

  // 화면 크기 변경 시 width 업데이트
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const DrawerList = (
    <Box
      role="presentation"
      // KAHLUA 클릭 시 Drawer가 닫히지 않도록 설정
      onClick={(event) => {
        const target = event.target as HTMLElement;
        if (target.textContent !== 'KAHLUA') {
          setIsKahluaClicked(false); // KAHLUA 외의 항목을 클릭했을 때 Drawer 닫기
          toggleDrawer(false)();
        }
      }}
    >
      {/* 상단 로고 */}
      <div className="w-auto mt-8 ml-8 mb-8">
        {width <= 834 ? (
          <Image src={kahlua_logo} alt="kahlua_logo" height={16} width={94} />
        ) : (
          <Image src={kahlua_logo} alt="kahlua_logo" height={24} width={140} />
        )}
      </div>

      {/* 페이지 부분 */}
      <section
        className="flex-1 overflow-y-scroll px-4 pb-10"
        style={{ maxHeight: 'calc(100vh - 300px)' }}
      >
        <List>
          {['ABOUT', 'PERFORMANCE', 'TICKET', 'RECRUIT', 'KAHLUA'].map(
            (section) => (
              <ListItem key={section} disablePadding>
                <ListItemButton>
                  <div
                    className={`w-[610px] rounded-[20px] flex items-center ${width <= 834 ? 'pl-5 h-[40px]' : 'pl-5 h-[43px]'} ${section === currentLink ? 'bg-primary-50' : ''} ${section === 'KAHLUA' && isKahluaClicked ? 'bg-primary-50 rounded-b-none' : ''}`}
                    onClick={() => {
                      if (section === 'KAHLUA') {
                        setIsKahluaClicked(!isKahluaClicked);
                      } else {
                        handleLinkClick(section);
                      }
                    }}
                  >
                    <ListItemText
                      primary={section}
                      className={`font-pretendard font-medium ${section === currentLink || (section === 'KAHLUA' && isKahluaClicked) ? 'text-gray-0' : 'text-gray-70'} ${width <= 834 ? 'text-base' : 'text-lg'}`}
                    />
                  </div>
                </ListItemButton>
              </ListItem>
            )
          )}
          {isKahluaClicked && (
            <ul
              className={`pl-11 mx-3 rounded-b-[20px] ${isKahluaClicked ? 'bg-primary-50' : ''}`}
            >
              {KahluaUrl.map((url) => (
                <li key={url.name}>
                  <Link href={url.url} passHref>
                    <div
                      className={`py-2 cursor-pointer font-pretendard font-normal text-gray-60 ${isKahluaClicked ? 'text-primary-10' : ''} ${width <= 834 ? 'text-sm' : 'text-base'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLinkClick(url.name);
                      }}
                    >
                      {url.name}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </List>
      </section>

      {/* 하단 로고 및 SNS 버튼 */}
      <div className="fixed bottom-14 left-8">
        <div className="mb-3">
          <button className="text-gray-50 font-medium leading-6 text-md pad:text-lg">
            {isLoggedIn ? (
              <p
                onClick={() => {
                  handleLogout();
                }}
              >
                로그아웃
              </p>
            ) : (
              <p
                onClick={() => {
                  window.location.href = '/login';
                }}
              >
                로그인 | 회원가입
              </p>
            )}
          </button>
        </div>
        {width <= 834 ? (
          <Image
            src={kahlua_logo}
            alt="kahlua_logo"
            height={24}
            className="pb-6"
          />
        ) : (
          <Image
            src={kahlua_logo}
            alt="kahlua_logo"
            height={32}
            className="pb-6"
          />
        )}
        <List className="flex gap-4">
          <Link href="https://www.youtube.com/@kahluaband8409">
            <div className="w-12 h-12 rounded-full bg-primary-50 flex justify-center items-center">
              <Image
                src={youtube_logo}
                alt="youtube_logo"
                width={24}
                height={24}
              />
            </div>
          </Link>
          <Link href="https://instagram.com/kahlua_band_?igshid=MzRlODBiNWFlZA==">
            <div className="w-12 h-12 rounded-full bg-primary-50 flex justify-center items-center">
              <Image
                src={instagram_logo}
                alt="instagram_logo"
                width={24}
                height={24}
              />
            </div>
          </Link>
          <Link href="http://pf.kakao.com/_UaIZG/chat">
            <div className="w-12 h-12 rounded-full bg-primary-50 flex justify-center items-center">
              <Image
                src={kakaotalk_logo}
                alt="youtube_logo"
                width={24}
                height={24}
              />
            </div>
          </Link>
        </List>
      </div>
    </Box>
  );

  // 데스크탑에서 KAHLUA 요소에 대한 hover 상태 관리 및 함수
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    kahluaRef.current?.onmouseover;
    setIsHovered(true);
  };
  const handleLeave = () => {
    kahluaRef.current?.onmouseout;
    setIsHovered(false);
  };

  useEffect(() => {
    // KAHLUA 요소의 위치를 가져와 설정
    if (kahluaRef.current) {
      const { right } = kahluaRef.current.getBoundingClientRect();
      setKahluaRightOffset(window.innerWidth - right); // 오른쪽 기준 위치로 조정
    }
  }, [isHovered, width]); // 크기 변경이나 hover 상태 변경 시 업데이트

  return (
    <ThemeProvider theme={theme}>
      <Drawer open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <div className={`flex flex-col ${isHovered ? 'mt-[64px]' : ''}`}>
        {/* 기존 Header */}
        <div
          className={`font-pretendard w-full min-h-[64px] max-h-[104px] fixed top-0 bg-gray-0 flex flex-row justify-center min-[1500px]:justify-between items-center px-0 min-[1500px]:px-[150px] z-50 
            ${pathname === '/recruit' || pathname === '/contributors' ? 'bg-gray-90/20 ' : 'bg-gray-0'}}`}
        >
          <div className="min-[1500px]:hidden cursor-pointer fixed left-6">
            {pathname === '/recruit' || pathname === '/contributors' ? (
              <Image
                src={table_menu_white}
                alt="moblie_menu_button"
                width={24}
                onClick={toggleDrawer(true)}
              />
            ) : (
              <Image
                src={table_menu}
                alt="moblie_menu_button"
                width={24}
                onClick={toggleDrawer(true)}
              />
            )}
          </div>
          <div>
            <Link
              href="/"
              key="home"
              onClick={() => {
                setCurrentLink('/');
              }}
            >
              {pathname === '/recruit' || pathname === '/contributors' ? (
                <Image
                  src={logo_white}
                  width={140}
                  alt="logo-white"
                  className="h-4 min-[834px]:h-6"
                />
              ) : (
                <Image
                  src={logo_black}
                  width={140}
                  alt="logo-black"
                  className="h-4 min-[834px]:h-6"
                />
              )}
            </Link>
          </div>
          {/* KAHLUA와 추가 요소를 감싸는 공통 div */}

          <div className="hidden min-[1500px]:flex flex-row gap-[64px] absolute right-72">
            <ul className="hidden min-[1500px]:flex flex-row gap-[64px]">
              {Url.map((url) => (
                <li
                  key={url.name}
                  className={`font-medium text-center text-[18px] leading-6 ${
                    pathname === '/recruit' || pathname === '/contributors'
                      ? 'text-gray-0'
                      : ''
                  }`}
                >
                  <Link href={url.url} passHref>
                    <div
                      onClick={() => {
                        handleLinkClick(url.name);
                      }}
                    >
                      {url.name}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <span
              className={`font-medium text-center text-[18px] leading-6 ${
                pathname === '/recruit' || pathname === '/contributors'
                  ? 'text-gray-0'
                  : ''
              }`}
              onMouseOver={handleHover}
              ref={kahluaRef}
            >
              KAHLUA
            </span>
          </div>

          <div className="hidden min-[1500px]:flex ">
            {isLoggedIn ? (
              <button
                className="text-lg text-danger-40 text-center"
                onClick={() => {
                  handleLogout();
                }}
              >
                로그아웃
              </button>
            ) : (
              <button
                className="text-lg text-gray-50 text-center"
                onClick={() => {
                  window.location.href = '/login';
                }}
              >
                로그인
              </button>
            )}
          </div>
        </div>

        {/* 추가 요소를 헤더 아래에 위치시키기 위해 마진 조정 */}
        {isHovered && (
          <div
            className="absolute top-[64px] text-gray-60 h-10 hidden min-[1500px]:flex z-50"
            style={{ right: `${kahluaRightOffset - 24}px` }}
            onMouseOver={handleHover}
            onMouseOut={handleLeave}
          >
            <div className="w-full">
              <ul
                className={`gap-[60px] w-full h-full flex flex-row justify-end ${
                  pathname === '/recruit' || pathname === '/contributors'
                    ? 'text-gray-0'
                    : ''
                }`}
              >
                {KahluaUrl.map((url) => (
                  <li key={url.name}>
                    <Link href={url.url} passHref>
                      <div
                        onClick={() => {
                          handleLinkClick(url.name);
                        }}
                      >
                        {url.name}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Header;
