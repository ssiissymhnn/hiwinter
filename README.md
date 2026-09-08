# HI WINTER

> Ready for Your Winter.

스노보드 시즌 준비 플랫폼 **HI WINTER**의 모바일 웹앱 프로토타입입니다.
HTML / CSS / Vanilla JavaScript로만 제작했으며, 프레임워크와 외부 이미지를 사용하지 않습니다.

## 실행

두 가지 방법 중 하나를 선택하세요.

| 방법 | 파일 |
| --- | --- |
| 분리 구조 | `index.html` + `style.css` + `script.js` (같은 폴더에 두고 `index.html` 실행) |
| 단일 파일 | `hi-winter-single-file.html` (이 파일 하나만 열면 됨) |

## 화면 구성

- **HOME** — 검색, 주요 기능 바로가기(PLAN / OUTFIT / COMMUNITY / MARKET), 베이스 스키장 D-day, 인기 게시글, 라이딩 메이트, 시즌방, 인기 장비
- **PLAN** — 시즌 준비 체크리스트(RIDING / GEAR / OUTFIT / STAY / RIDE MATE), 항목 직접 추가, 시즌 플래너, 베이스 스키장 관리, 시즌권 가격 비교
- **OUTFIT** — AI 가상 피팅 (JACKET / PANTS / GOGGLE / HELMET / GLOVE), 옷 추가, 코디 생성, LOOK 저장·공유, MY LOOKS
- **COMMUNITY** — 라이딩 메이트, 시즌방/숙소, 정보/팁, Q&A, OUTFIT, GEAR, 마켓. 목적별 구조화된 작성 양식 제공
- **MARKET** — COMMUNITY 내부에서 접근. 장비 / 웨어 / 액세서리 거래, 상품 상세, 찜, 판매하기
- **MY** — 프로필, MY OUTFIT, 찜한 상품, 저장한 글, 활동 내역, 거래 내역, 내 스키장, 설정

## 디자인

| 항목 | 값 |
| --- | --- |
| Primary | `#1CB4FF` |
| Text | `#111111` / Secondary `#6B7280` |
| Border | `#E5E7EB` |
| Background | `#F7F9FA` |
| Font | Pretendard (400 / 500 / 600 / 700) |
| 기준 화면 | iPhone 16 · 393 × 852 |

## 참고

- 실제 AI API와 서버 연동은 없으며, 모든 데이터는 더미 데이터입니다.
- 체크 상태, 저장한 LOOK, 찜한 상품, 작성한 글·상품, 베이스 스키장은 `localStorage`에 저장되어 새로고침 후에도 유지됩니다.
- 사진·상품 이미지는 외부 파일 없이 SVG로 생성됩니다.
