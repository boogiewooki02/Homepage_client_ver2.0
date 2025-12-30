# Homepage_FE_Nextjs
kahluaproject Next.js version

![Kahlua (1)](https://github.com/kahluaband/Homepage_FE_20th/assets/109282927/0dc8d6f6-08e0-4339-ab41-a0adf53e2b0a)
🧷 https://kahluaband.com

# KAHLUA_BE
**KAHLUA BAND website** Frontend using Next.js 14

## 프로젝트 소개
아~ 우리는 깔!깔!깔!깔루아!! 저희는 홍익대학교 컴퓨터공학과 밴드부 깔루아입니다.

매년 정기 공연을 진행하면서 공연 참석 희망자 수요 조사만 진행하고 현장예매로 티켓을 판매하였습니다. 이에 따라 수요 조사가 정확하지 않다는 단점도 있었고 현장 예매에 많은 시간이 소모된다는 단점이 존재했습니다.

따라서, 저희는 깔루아 공연을 보러오시는 관객분들이 조금 더 편하게 예매를 하실 수 있도록 예매 사이트를 만들었습니다. 예매 뿐만 아니라 동아리를 홍보하고 신입생 지원기간에는 지원도 사이트에서 함께 진행할 수 있도록 하였습니다.

추가로 수동으로 진행했던 동아리방 예약과 공지사항 전송 기능까지 한 사이트에서 모두 진행할 수 있도록 동아리방 시간 예약 페이지와 게시판 페이지를 추가했습니다.

## Frontend Member 

<div align="left">

| **김동욱** | **원채영** |
| :------: |  :------: |
| [<img src="https://avatars.githubusercontent.com/u/128466405?v=4" height=200 width=200> <br/> @boogiewooki02](https://github.com/boogiewooki02) | [<img src="https://avatars.githubusercontent.com/u/127955729?v=4" height=200 width=200> <br/> @chaeyoungwon](https://github.com/chaeyoungwon) |

</div>

## 개발 환경
* Framework: Next.js 14 (App Router)
* Language: TypeScript
* Styling: Tailwind CSS, NextUI, MUI, styled-components
* State Management: Recoil
* Real-time: WebSocket & STOMP


## 주요 기능
- 공연 안내 · 티켓
  - 포스터/일정/장소/가격/예매 상태(D-DAY) 카드 + 스켈레톤 로딩
  - 링크 복사, 카카오맵 위치 안내 제공
  - 스크롤 시 포스터 페이드
- 티켓 구매/조회
  - 예매 가능 상태 여부에 따른 UI 제공
  - 일반 예매/새내기 예매 
- 공연 기록
  - 동아리 소개와 활동 사진
  - 지난 공연 정보/영상 카드 그리드
- 동아리방 사용 예약
  - STOMP WebSocket 실시간 예약/해제
  - 예약 현황 즉시 반영
  - UX를 고려한 예약 일자 선택
- 모집/지원
  - 기수별 지원 폼 작성·제출, 입력 검증, 제출 완료 알림
- 공지/게시판
  - 공지 및 커뮤니티 기능 제공
- 관리자 대시보드
  - Chart.js+datalabels로 지원자·예매자 통계 제공
  - 동아리 멤버 관리
