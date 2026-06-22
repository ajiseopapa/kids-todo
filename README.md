# 일과매니저 - 아이패드 웹앱 버전

기존 `일과매니저_v2_...통합판.html` 파일을 html / css / js 로 분리하고,
아이패드에서 "진짜 앱처럼" 쓸 수 있도록 PWA(manifest, 서비스워커, 아이콘)를 추가한 버전입니다.

## 폴더 구조

```
daily-routine-ipad/
 ├ index.html          ← 화면 구조 (HTML)
 ├ style.css           ← 디자인 (원본 <style> 두 블록을 합친 것)
 ├ app.js              ← 모든 기능 로직 (원본 <script> 내용)
 ├ manifest.json       ← PWA 설정 (앱 이름, 아이콘, 색상)
 ├ service-worker.js   ← 오프라인 지원 (인터넷 끊겨도 앱은 열림)
 ├ vercel.json         ← Vercel 배포 설정
 ├ icons/
 │  ├ icon-180.png     ← 아이폰/아이패드 홈화면 아이콘
 │  ├ icon-192.png
 │  └ icon-512.png
 └ .gitignore
```

기능은 원본과 **완전히 동일**합니다 (코드를 그대로 옮긴 것뿐). 추가된 건 아이콘 + PWA 설정뿐이에요.

---

## 1단계. 로컬에서 먼저 확인하기

VSCode에서 이 폴더를 열고, 확장 마켓에서 **"Live Server"** 설치 →
`index.html` 우클릭 → **"Open with Live Server"**

브라우저가 열리면 기존 파일과 똑같이 동작하는지 확인하세요.
(아이패드와 PC가 같은 와이파이라면, 아이패드 사파리에서 `PC의 IP:포트`로 접속해서 미리 볼 수도 있어요.)

---

## 2단계. GitHub에 올리기

1. github.com에서 새 저장소(Repository) 생성 (이름 예: `daily-routine-ipad`)
2. VSCode 터미널에서 이 폴더 기준으로:

```bash
git init
git add .
git commit -m "init: 아이패드용 일과매니저"
git branch -M main
git remote add origin https://github.com/내깃허브계정/daily-routine-ipad.git
git push -u origin main
```

(터미널이 어렵다면 VSCode 왼쪽 "소스 제어" 아이콘 클릭 → Initialize Repository → 체크 아이콘으로 커밋 → Publish Branch 클릭으로도 동일하게 가능합니다)

---

## 3단계. Vercel 연결

1. vercel.com 접속 → **GitHub 계정으로 로그인**
2. **Add New → Project** 클릭
3. 방금 올린 `daily-routine-ipad` 저장소 선택 → **Import**
4. Framework Preset: **Other** 선택 (정적 파일이라 빌드 설정 불필요)
5. **Deploy** 클릭

1분 정도 기다리면 `https://daily-routine-ipad-xxxx.vercel.app` 같은 주소가 생성됩니다.

> 이후부터는 GitHub에 `git push`만 하면 Vercel이 자동으로 재배포해줍니다.
> 코드 수정 → push → 몇 초 뒤 자동 반영, 이 흐름만 기억하면 됩니다.

---

## 4단계. 아이패드에서 앱처럼 설치하기

1. 아이패드 **Safari**로 Vercel 주소 접속 (꼭 Safari여야 합니다 — 크롬 등에서는 "홈 화면에 추가"가 PWA로 동작 안 함)
2. 하단/상단 **공유 버튼(□↑)** 탭
3. **"홈 화면에 추가"** 선택
4. 이름 확인 후 **추가**

이제 홈 화면 아이콘을 누르면 주소창 없는 풀스크린 앱처럼 열립니다.
처음 한 번 접속해두면 `service-worker.js`가 파일들을 캐싱해서, 와이파이가 없는 곳에서도 앱이 열려요
(단, 데이터는 기기 로컬저장소에 저장되는 구조라 기기별로 별도 저장됩니다 — 여러 기기 동기화는 별도 작업 필요).

---

## 나중에 코드를 수정하고 싶다면

```bash
# 코드 수정 후
git add .
git commit -m "수정 내용 설명"
git push
```

push 하면 Vercel이 자동으로 다시 배포합니다. 아이패드에서는 앱을 한 번 완전히 종료 후 재실행하면
서비스워커가 새 버전을 받아옵니다 (즉시 안 보이면 홈 버튼으로 앱 스위처에서 위로 스와이프해서 완전히 끄고 재실행).
