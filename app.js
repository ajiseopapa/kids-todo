// ==========================================================
// 일과매니저 - 메인 스크립트 (원본 HTML에서 분리)
// ==========================================================

// ============================================================
// ============================================================
const colorSchemes = {
    child_1: { color:"emerald", dot:"bg-emerald-500", activeText:"text-emerald-600", cardBg:"bg-emerald-50", cardBorder:"border-emerald-100", cardText:"text-emerald-600", cardBold:"text-emerald-800", btnColor:"bg-emerald-600 hover:bg-emerald-700", btnLight:"bg-emerald-100 hover:bg-emerald-200 text-emerald-700", barColor:"bg-emerald-500", hex:"#10b981" },
    child_2: { color:"violet",  dot:"bg-violet-500",  activeText:"text-violet-600",  cardBg:"bg-violet-50",  cardBorder:"border-violet-100",  cardText:"text-violet-600",  cardBold:"text-violet-800",  btnColor:"bg-violet-600 hover:bg-violet-700",   btnLight:"bg-violet-100 hover:bg-violet-200 text-violet-700",   barColor:"bg-violet-500",  hex:"#8b5cf6" },
    child_3: { color:"orange",  dot:"bg-orange-500",  activeText:"text-orange-600",  cardBg:"bg-orange-50",  cardBorder:"border-orange-100",  cardText:"text-orange-600",  cardBold:"text-orange-800",  btnColor:"bg-orange-600 hover:bg-orange-700",   btnLight:"bg-orange-100 hover:bg-orange-200 text-orange-700",   barColor:"bg-orange-500",  hex:"#f97316" }
};

let kidNames = { child_1:"자녀1", child_2:"자녀2", child_3:"자녀3" };
let currentProfile = 'child_1';
let childCount=parseInt(localStorage.getItem('kids_child_count')||'3');
let currentView = 'routine';

const emojiCategories = {
    morning: ["🛏️","⏰","🌅","🥣","🥛","🍳","🪥","🧼","👕","👟","🎒","🌤️","💤","🚿","🪞","🧴"],
    home:    ["🏠","👋","✨","🧺","🧹","🗑️","🪴","🐾","🔑","🚪","👜","🧦","👠","🧤","🧥","🌈"],
    evening: ["🌙","🌟","📖","🛁","🦷","💤","🕯️","🌛","🛌","🧸","🌃","💫","🌜","🌠","🎑","🌒"],
    study:   ["✏️","📚","📓","📐","📏","🖊️","📝","🔬","🎓","💡","🔭","📊","📌","✂️","📎","🖍️"],
    health:  ["💪","🏃","🧘","🤸","🏊","⚽","🏀","🎾","🚴","🏋️","🥗","🥦","🍎","💊","🩺","🏆"],
    fun:     ["🎮","🎨","🎵","🎭","🎪","🎠","🎡","🎢","🎯","🎲","🃏","🎸","🎹","🎬","📸","🎤"],
    etc:     ["🌟","❤️","🎁","🌺","🐶","🐱","🦋","🌸","☀️","🌈","🍭","🍰","🎉","🥳","💎","👑"]
};

let selectedEmoji = "📝";
let currentEmojiCategory = 'morning';

const sampleTaskStore = {
    child_1: [
        { id:101, category:"morning",   name:"이부자리 깔끔하게 정리하기",      emoji:"🛏️", completed_dates:[] },
        { id:102, category:"morning",   name:"치카치카 3분 양치하기",            emoji:"🪥", completed_dates:[] },
        { id:103, category:"afternoon", name:"집에 오자마자 손 씻기",            emoji:"✨", completed_dates:[] },
        { id:104, category:"afternoon", name:"양말이랑 겉옷 세탁바구니에 넣기",  emoji:"🧺", completed_dates:[] },
        { id:105, category:"afternoon", name:"오늘 분량 숙제 끝내기",            emoji:"✏️", completed_dates:[] },
        { id:106, category:"evening",   name:"오늘 있었던 일 일기 쓰기",         emoji:"📖", completed_dates:[] },
        { id:107, category:"evening",   name:"내일 가방 스스로 미리 챙기기",     emoji:"🎒", completed_dates:[] }
    ],
    child_2: [
        { id:201, category:"morning",   name:"이부자리 깔끔하게 정리하기",      emoji:"🛏️", completed_dates:[] },
        { id:202, category:"morning",   name:"치카치카 3분 양치하기",            emoji:"🪥", completed_dates:[] },
        { id:203, category:"afternoon", name:"집에 오자마자 손 씻기",            emoji:"✨", completed_dates:[] },
        { id:204, category:"afternoon", name:"양말이랑 겉옷 세탁바구니에 넣기",  emoji:"🧺", completed_dates:[] },
        { id:205, category:"afternoon", name:"오늘 분량 숙제 끝내기",            emoji:"✏️", completed_dates:[] },
        { id:206, category:"evening",   name:"오늘 있었던 일 일기 쓰기",         emoji:"📖", completed_dates:[] },
        { id:207, category:"evening",   name:"내일 가방 스스로 미리 챙기기",     emoji:"🎒", completed_dates:[] }
    ],
    child_3: [
        { id:301, category:"morning",   name:"이부자리 깔끔하게 정리하기",      emoji:"🛏️", completed_dates:[] },
        { id:302, category:"morning",   name:"치카치카 3분 양치하기",            emoji:"🪥", completed_dates:[] },
        { id:303, category:"afternoon", name:"집에 오자마자 손 씻기",            emoji:"✨", completed_dates:[] },
        { id:304, category:"afternoon", name:"양말이랑 겉옷 세탁바구니에 넣기",  emoji:"🧺", completed_dates:[] },
        { id:305, category:"afternoon", name:"오늘 분량 숙제 끝내기",            emoji:"✏️", completed_dates:[] },
        { id:306, category:"evening",   name:"오늘 있었던 일 일기 쓰기",         emoji:"📖", completed_dates:[] },
        { id:307, category:"evening",   name:"내일 가방 스스로 미리 챙기기",     emoji:"🎒", completed_dates:[] }
    ]
};

let localTaskStore = JSON.parse(JSON.stringify(sampleTaskStore)); // 깊은 복사

let localStickerStore = { child_1:0, child_2:0, child_3:0 };
let rewardedDates     = { child_1:[], child_2:[], child_3:[] }; 
let dailyRecordStore  = { child_1:{}, child_2:{}, child_3:{} };
let streakStore       = { child_1:{}, child_2:{}, child_3:{} }; // { taskId: { lastDate, count } }
let rewardItems       = []; // [{ id, title, cost, emoji }]
let rewardExchanges   = { child_1:[], child_2:[], child_3:[] }; // 교환 기록
let appTitle          = localStorage.getItem('kids_app_title') || '일과 매니저';
let appSubtitle       = localStorage.getItem('kids_app_subtitle') || '모든 일과를 끝마치고 멋진 스티커를 획득해요!';
const celebratedSet   = new Set(); // 세션 내 이미 팡파레 띄운 "childId_date" 기록

let parentPassword = localStorage.getItem('kids_parent_password') || "1234";
const masterBypassKey = "9999";
let currentDate = new Date();

// ============================================================
// 초기화 및 데이터 로드 (마이그레이션 포함)
// ============================================================
window.addEventListener('DOMContentLoaded', () => {
    const ls = (key) => localStorage.getItem(key);
    
    // 일과 로드 및 과거 데이터(단일 is_completed)를 날짜 배열 방식(completed_dates)으로 마이그레이션
    if (ls('kids_routine_local_data')) {
        localTaskStore = JSON.parse(ls('kids_routine_local_data'));
        for (let key in localTaskStore) {
            localTaskStore[key].forEach(t => {
                if (!t.completed_dates) {
                    t.completed_dates = [];
                    if (t.is_completed) t.completed_dates.push(fmtDate(new Date()));
                }
            });
        }
        saveToLocalStorage();
    } else {
        // 최초 실행 시 샘플 데이터로 시작
        saveToLocalStorage();
    }

    if (ls('kids_sticker_store')) localStickerStore = JSON.parse(ls('kids_sticker_store'));
    else saveStickerStore();

    // 스티커 보상 기록 로드 (새로운 날짜 배열 방식 적용)
    if (ls('kids_rewarded_dates_v2')) {
        rewardedDates = JSON.parse(ls('kids_rewarded_dates_v2'));
    } else {
        if (ls('kids_reward_log')) {
            const oldRewardLog = JSON.parse(ls('kids_reward_log'));
            for (let key in oldRewardLog) {
                if (oldRewardLog[key]) {
                    const d = new Date(oldRewardLog[key]);
                    if (!isNaN(d)) rewardedDates[key].push(fmtDate(d));
                }
            }
        }
        saveRewardedDates();
    }

    if (ls('kids_names')) kidNames = JSON.parse(ls('kids_names'));
    else saveKidNames();
    
    if (ls('kids_daily_records')) dailyRecordStore = JSON.parse(ls('kids_daily_records'));
    else saveDailyRecords();

    if (ls('kids_streak_store')) streakStore = JSON.parse(ls('kids_streak_store'));
    else saveStreakStore();

    if (ls('kids_reward_items')) rewardItems = JSON.parse(ls('kids_reward_items'));
    else {
        rewardItems = [
            { id:1, title:"치킨 먹기", cost:20, emoji:"🍗" },
            { id:2, title:"놀이공원 가기", cost:30, emoji:"🎡" },
            { id:3, title:"게임 30분 추가", cost:10, emoji:"🎮" },
        ];
        saveRewardItems();
    }

    if (ls('kids_reward_exchanges')) rewardExchanges = JSON.parse(ls('kids_reward_exchanges'));
    else saveRewardExchanges();

    // 앱 제목 적용
    applyAppTitles();

    updateTodayDate();
    renderProfileSwitcher();
    switchProfile(currentProfile);
    renderApp();
    renderEmojiPicker();

    // 모바일 초기화
    if (isMobile()) {
        showMobileTaskTab('morning');
        const nav = document.getElementById('bottom-nav');
        if (nav) nav.style.display = 'block';
        updateBottomNav('routine');
    }
});

function renderAdminChildSelector() {
    const select = document.getElementById("admin-child-selector");
    if (!select) return;
    select.innerHTML = "";
    Array.from({length: childCount}, (_, i) => `child_${i+1}`).forEach(id => {
        const option = document.createElement("option");
        option.value = id;
        option.textContent = kidNames[id];
        if (id === currentProfile) option.selected = true;
        select.appendChild(option);
    });
}

function changeSelectedChild(id) {
    currentProfile = id;

    renderAdminView();
    renderApp();
}

function fmtDate(d) {
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function updateTodayDate() {
    const days = ['일','월','화','수','목','금','토'];
    document.getElementById('today-date').innerText =
        `${currentDate.getFullYear()}년 ${currentDate.getMonth()+1}월 ${currentDate.getDate()}일 (${days[currentDate.getDay()]})`;
}

function changeDate(d) {
    currentDate = new Date(currentDate);
    currentDate.setDate(currentDate.getDate() + d);
    updateTodayDate();
    if (currentView === 'stats') renderStats(currentDate);
    else renderApp();
}

function goToToday() {
    currentDate = new Date();
    updateTodayDate();
    if (currentView === 'stats') renderStats(currentDate);
    else renderApp();
}

function saveToLocalStorage()  { localStorage.setItem('kids_routine_local_data', JSON.stringify(localTaskStore)); }
function saveStickerStore()    { localStorage.setItem('kids_sticker_store',       JSON.stringify(localStickerStore)); }
function saveRewardedDates()   { localStorage.setItem('kids_rewarded_dates_v2',   JSON.stringify(rewardedDates)); }
function saveKidNames()        { localStorage.setItem('kids_names',                JSON.stringify(kidNames)); }
function saveDailyRecords()    { localStorage.setItem('kids_daily_records',        JSON.stringify(dailyRecordStore)); }
function saveStreakStore()     { localStorage.setItem('kids_streak_store',         JSON.stringify(streakStore)); }
function saveRewardItems()     { localStorage.setItem('kids_reward_items',         JSON.stringify(rewardItems)); }
function saveRewardExchanges() { localStorage.setItem('kids_reward_exchanges',     JSON.stringify(rewardExchanges)); }

// ============================================================
// 앱 제목
// ============================================================
function applyAppTitles() {
    const t = document.getElementById('app-main-title');
    const s = document.getElementById('app-main-subtitle');
    if (t) t.innerText = appTitle;
    if (s) s.innerText = appSubtitle;
    // 입력창 초기값
    const ti = document.getElementById('app-title-input');
    const si = document.getElementById('app-subtitle-input');
    if (ti) ti.value = appTitle;
    if (si) si.value = appSubtitle;
}
function saveAppTitle() {
    const v = document.getElementById('app-title-input').value.trim();
    if (!v) return;
    appTitle = v;
    localStorage.setItem('kids_app_title', v);
    applyAppTitles();
    showCustomAlert("✅ 제목 변경 완료", `앱 제목이 '${v}'로 변경되었습니다.`, "bg-emerald-50 text-emerald-500");
}
function saveAppSubtitle() {
    const v = document.getElementById('app-subtitle-input').value.trim();
    if (!v) return;
    appSubtitle = v;
    localStorage.setItem('kids_app_subtitle', v);
    applyAppTitles();
    showCustomAlert("✅ 부제목 변경 완료", `부제목이 변경되었습니다.`, "bg-emerald-50 text-emerald-500");
}

// ============================================================
// 연속 달성 (Streak) 시스템
// ============================================================
function calcStreak(childId, taskId) {
    // completed_dates 기반으로 연속 일수 계산
    const task = localTaskStore[childId]?.find(t => t.id === taskId);
    if (!task || !task.completed_dates?.length) return 0;
    const dates = [...task.completed_dates].sort();
    let streak = 0;
    let checkDate = new Date();
    // 오늘 또는 어제부터 역으로 연속 확인
    const todayStr = fmtDate(new Date());
    const hasToday = dates.includes(todayStr);
    if (!hasToday) {
        // 어제부터 확인
        const yest = new Date(); yest.setDate(yest.getDate()-1);
        checkDate = yest;
    }
    for (let i = 0; i < 365; i++) {
        const ds = fmtDate(checkDate);
        if (dates.includes(ds)) {
            streak++;
            checkDate = new Date(checkDate);
            checkDate.setDate(checkDate.getDate()-1);
        } else break;
    }
    return streak;
}

function getMaxStreak(childId) {
    const tasks = localTaskStore[childId] || [];
    let max = 0;
    tasks.forEach(t => {
        const s = calcStreak(childId, t.id);
        if (s > max) max = s;
    });
    return max;
}

const streakMilestones = [3, 5, 7, 10, 14, 21, 30];
let shownStreakToasts = new Set(); // 이미 보여준 스트릭 알림 (세션 내)

function checkStreakMilestones(childId, taskId) {
    const streak = calcStreak(childId, taskId);
    const task = localTaskStore[childId]?.find(t => t.id === taskId);
    if (!task) return;
    streakMilestones.forEach(m => {
        const key = `${childId}_${taskId}_${m}`;
        if (streak >= m && !shownStreakToasts.has(key)) {
            shownStreakToasts.add(key);
            showStreakToast(task.emoji, task.name, streak, m);
        }
    });
}

function showStreakToast(emoji, taskName, streak, milestone) {
    const emojis = ['🎉','⭐','🔥','✨','🏆'];
    const confettiEmojis = ['🎊','⭐','🌟','🎈','🎁'];
    const toastId = 'streak-toast-' + Date.now();
    const toast = document.createElement('div');
    toast.id = toastId;
    toast.className = 'fixed top-6 left-1/2 z-[999] flex flex-col items-center gap-2 pointer-events-none';
    toast.style.transform = 'translateX(-50%)';
    toast.innerHTML = `
        <div class="streak-badge bg-gradient-to-b from-yellow-50 to-amber-100 border-2 border-amber-400 rounded-3xl px-6 py-4 shadow-2xl text-center max-w-xs">
            <div class="text-4xl mb-2">${emoji}</div>
            <div class="text-amber-800 font-extrabold text-sm mb-1">'${taskName}'</div>
            <div class="text-3xl font-black text-orange-500">🔥 ${streak}일째 연속!</div>
            <div class="text-amber-700 font-bold text-xs mt-1">${milestone}일 연속 달성 🎊</div>
            <div class="flex justify-center gap-1 mt-2 text-xl">${emojis.map(e=>`<span class="streak-badge">${e}</span>`).join('')}</div>
        </div>
    `;
    // 콘페티
    for (let i=0;i<8;i++) {
        const c=document.createElement('div');
        c.className='confetti-piece';
        c.style.left=(Math.random()*200-100)+'px';
        c.style.top=(Math.random()*-30)+'px';
        c.style.animationDelay=(Math.random()*0.5)+'s';
        c.innerText=confettiEmojis[Math.floor(Math.random()*confettiEmojis.length)];
        toast.appendChild(c);
    }
    document.body.appendChild(toast);
    setTimeout(()=>{ if(toast.parentNode) toast.parentNode.removeChild(toast); }, 3500);
}

// ============================================================
// 보상 교환권 시스템
// ============================================================
function openRewardModal() {
    renderRewardModal();
    document.getElementById('reward-modal').classList.remove('hidden');
}
function startEditExchange(idx) {
    const childId = currentProfile;
    const h = rewardExchanges[childId]?.[idx];
    if (!h) return;
    const row = document.getElementById(`exchange-row-${idx}`);
    if (!row) return;
    row.innerHTML = `
        <span class="text-base">${h.emoji}</span>
        <span class="font-semibold flex-1 text-xs text-slate-600">${h.title}</span>
        <span class="text-amber-600 font-bold text-xs shrink-0">-${h.cost}⭐</span>
        <input type="date" id="edit-exchange-date-${idx}" value="${h.date}"
            class="text-[11px] border border-amber-300 rounded-lg px-1 py-0.5 focus:outline-none focus:border-amber-500 shrink-0"/>
        <button onclick="saveEditExchange(${idx})" class="text-[10px] text-white bg-amber-500 hover:bg-amber-600 font-bold px-2 py-0.5 rounded-lg shrink-0">저장</button>
        <button onclick="renderRewardModal()" class="text-[10px] text-slate-400 font-bold shrink-0">취소</button>
    `;
}

function saveEditExchange(idx) {
    const childId = currentProfile;
    const newDate = document.getElementById(`edit-exchange-date-${idx}`)?.value;
    if (!newDate) return;
    rewardExchanges[childId][idx].date = newDate;
    saveRewardExchanges();
    renderRewardModal();
}

function deleteExchange(idx) {
    const childId = currentProfile;
    const h = rewardExchanges[childId]?.[idx];
    if (!h) return;
    showCustomConfirm(
        '🗑 교환 내역 삭제',
        `'${h.title}' 교환 내역을 삭제할까요?\n(스티커는 자동으로 반환되지 않습니다)`,
        () => {
            rewardExchanges[childId].splice(idx, 1);
            saveRewardExchanges();
            renderRewardModal();
        },
        'bg-red-50 text-red-500'
    );
}

function closeRewardModal() { document.getElementById('reward-modal').classList.add('hidden'); }

function renderRewardModal() {
    const childId = currentProfile;
    const stickers = localStickerStore[childId] || 0;
    const name = kidNames[childId];
    document.getElementById('reward-modal-name').innerText = name;
    document.getElementById('reward-modal-stickers').innerText = stickers;
    const list = document.getElementById('reward-items-list');
    list.innerHTML = '';
    if (!rewardItems.length) {
        list.innerHTML = '<p class="text-xs text-slate-400 text-center py-4">부모님이 보상을 아직 등록하지 않으셨어요!</p>';
        return;
    }
    rewardItems.forEach(item => {
        const canAfford = stickers >= item.cost;
        const div = document.createElement('div');
        div.className = `flex items-center justify-between p-3 rounded-xl border ${canAfford ? 'border-amber-200 bg-amber-50' : 'border-slate-100 bg-slate-50 opacity-60'}`;
        div.innerHTML = `
            <div class="flex items-center gap-3">
                <span class="text-2xl">${item.emoji}</span>
                <div>
                    <p class="text-sm font-bold text-slate-800">${item.title}</p>
                    <p class="text-xs font-semibold text-amber-600">⭐ ${item.cost}개 필요</p>
                </div>
            </div>
            <button onclick="exchangeReward(${item.id})" ${canAfford?'':'disabled'}
                class="px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${canAfford ? 'bg-amber-400 hover:bg-amber-500 text-white' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}">
                ${canAfford ? '교환하기!' : '스티커 부족'}
            </button>
        `;
        list.appendChild(div);
    });
    // 교환 내역 전체 표시 + 수정/삭제
    const exchanges = rewardExchanges[childId] || [];
    const histEl = document.getElementById('reward-exchange-history');
    if (!exchanges.length) {
        histEl.innerHTML = '<p class="text-xs text-slate-300 text-center">교환 내역이 없어요</p>';
        return;
    }
    histEl.innerHTML = [...exchanges].reverse().map((h, ri) => {
        const i = exchanges.length - 1 - ri; // 원본 인덱스
        return `
        <div id="exchange-row-${i}" class="flex items-center gap-2 text-xs text-slate-600 py-1 border-b border-slate-100 last:border-0">
            <span class="text-base">${h.emoji}</span>
            <span class="font-semibold flex-1">${h.title}</span>
            <span class="text-amber-600 font-bold shrink-0">-${h.cost}⭐</span>
            <span class="text-slate-300 shrink-0 text-[10px]">${h.date}</span>
            <button onclick="startEditExchange(${i})" class="text-[10px] text-indigo-400 hover:text-indigo-600 font-bold shrink-0 ml-1">수정</button>
            <button onclick="deleteExchange(${i})" class="text-[10px] text-red-400 hover:text-red-600 font-bold shrink-0">삭제</button>
        </div>`;
    }).join('');
}

function exchangeReward(itemId) {
    const item = rewardItems.find(r => r.id === itemId);
    if (!item) return;
    const childId = currentProfile;
    if ((localStickerStore[childId]||0) < item.cost) {
        showCustomAlert("⭐ 스티커 부족!", `'${item.title}'을(를) 위해 스티커가 ${item.cost}개 필요해요.`, "bg-amber-50 text-amber-500");
        return;
    }
    showCustomConfirm(`🎁 '${item.title}' 교환할까요?`,
        `스티커 ${item.cost}개를 사용합니다.\n남은 스티커: ${(localStickerStore[childId]||0) - item.cost}개`,
        () => {
            localStickerStore[childId] = Math.max(0, (localStickerStore[childId]||0) - item.cost);
            saveStickerStore();
            if (!rewardExchanges[childId]) rewardExchanges[childId] = [];
            rewardExchanges[childId].push({ ...item, date: fmtDate(new Date()) });
            saveRewardExchanges();
            renderApp();
            renderRewardModal();
            showCustomAlert("🎉 교환 완료!", `'${item.title}'을(를) 부모님께 신청했어요! 부모님께 보여주세요 😊`, "bg-emerald-50 text-emerald-500");
        }, "bg-amber-50 text-amber-500"
    );
}

// ============================================================
// 🎉 완수 축하 팡파레
// ============================================================
function launchCelebration(name) {
    if (document.getElementById('celebration-root')) return;

    const root = document.createElement('div');
    root.id = 'celebration-root';
    root.style.cssText = 'position:fixed;inset:0;z-index:9000;pointer-events:none;overflow:hidden;';
    document.body.appendChild(root);

    // 배경 오버레이
    const overlay = document.createElement('div');
    overlay.className = 'celebration-overlay';
    overlay.style.cssText = 'position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(255,220,50,0.18) 0%,rgba(255,120,0,0.10) 60%,transparent 100%);';
    root.appendChild(overlay);

    const colors = ['#ff6b6b','#ffd93d','#6bcb77','#4d96ff','#ff922b','#cc5de8','#f06595','#74c0fc'];

    function burst(cx, cy, count) {
        count = count || 28;
        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            const angle = (360/count)*i + (Math.random()*20-10);
            const dist  = 90 + Math.random()*130;
            const rad   = angle*Math.PI/180;
            const tx = Math.cos(rad)*dist, ty = Math.sin(rad)*dist;
            const color = colors[Math.floor(Math.random()*colors.length)];
            const size  = 6 + Math.random()*10;
            const dur   = 0.7 + Math.random()*0.5;
            p.style.cssText = `position:absolute;left:${cx}px;top:${cy}px;width:${size}px;height:${size}px;background:${color};border-radius:${Math.random()>.5?'50%':'3px'};animation:particle-fly ${dur}s ease-out forwards;--tx:${tx}px;--ty:${ty}px;--tr:${Math.random()*720-360}deg;`;
            root.appendChild(p);
            setTimeout(() => p.remove(), dur*1000+100);
        }
    }

    function emojiShower(count) {
        count = count || 22;
        const emojis = ['🎉','⭐','🌟','🎊','🏆','✨','🥳','💫','🎈','🎁','❤️','🔥'];
        for (let i = 0; i < count; i++) {
            const e = document.createElement('div');
            const delay = Math.random()*1.2, dur = 1.0+Math.random()*1.0;
            e.style.cssText = `position:absolute;left:${Math.random()*window.innerWidth}px;top:-30px;font-size:${18+Math.random()*22}px;line-height:1;animation:confetti-fall ${dur}s ${delay}s ease-out forwards;pointer-events:none;`;
            e.innerText = emojis[Math.floor(Math.random()*emojis.length)];
            root.appendChild(e);
            setTimeout(() => e.remove(), (delay+dur)*1000+100);
        }
    }

    // 중앙 축하 카드
    const card = document.createElement('div');
    card.style.cssText = `position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);background:linear-gradient(135deg,#fffbe6,#fff3b0,#ffe066);border:3px solid #ffd700;border-radius:28px;padding:28px 36px;text-align:center;box-shadow:0 8px 48px rgba(255,180,0,.35),0 2px 12px rgba(0,0,0,.10);pointer-events:auto;min-width:260px;`;
    card.innerHTML = `
        <div style="font-size:3.8rem;line-height:1;margin-bottom:8px;animation:trophy-drop .8s cubic-bezier(.34,1.56,.64,1) both;">🏆</div>
        <div style="font-size:1.4rem;font-weight:900;color:#92400e;margin-bottom:4px;animation:text-pop .6s .2s cubic-bezier(.34,1.56,.64,1) both;">${name}아, 대단해!</div>
        <div style="font-size:.95rem;font-weight:700;color:#b45309;margin-bottom:14px;animation:bounce-in-up .7s .4s cubic-bezier(.34,1.56,.64,1) both;">오늘 모든 일과 완수! 🎉</div>
        <div style="font-size:1.8rem;letter-spacing:4px;animation:rainbow-pulse 1.5s linear infinite;">⭐🌟✨💫⭐</div>
        <div style="margin-top:18px;">
            <button onclick="document.getElementById('celebration-root').remove()"
                style="background:linear-gradient(135deg,#f59e0b,#d97706);color:white;border:none;border-radius:14px;padding:10px 28px;font-size:.9rem;font-weight:800;cursor:pointer;box-shadow:0 3px 12px rgba(245,158,11,.4);">
                🙌 신난다!
            </button>
        </div>`;
    root.appendChild(card);

    // 폭죽 발사
    const W = window.innerWidth, H = window.innerHeight;
    [[W*.2,H*.3],[W*.8,H*.3],[W*.5,H*.2],[W*.15,H*.65],[W*.85,H*.65]]
        .forEach(([x,y],i) => setTimeout(() => burst(x,y,26), i*180));
    setTimeout(() => burst(W*.5,H*.45,42), 300);
    emojiShower(26);
    setTimeout(() => { burst(W*.25,H*.35,20); burst(W*.75,H*.35,20); emojiShower(16); }, 1300);

    setTimeout(() => { if (root.parentNode) root.remove(); }, 12000);
}

// switchView가 확실히 정의되도록 코드 상단부(함수 정의 영역)에 배치
function switchView(view) {
    currentView = view;
    const isRoutine = view === 'routine';
    const routineEl = document.getElementById('view-routine');
    const statsEl   = document.getElementById('view-stats');

    // hidden 클래스 + inline style 둘 다 써서 CSS !important 충돌 방지
    routineEl.classList.toggle('hidden', !isRoutine);
    statsEl.classList.toggle('hidden', isRoutine);
    routineEl.style.display = isRoutine ? '' : 'none';
    statsEl.style.display   = isRoutine ? 'none' : '';

    document.getElementById('date-nav').classList.remove('hidden');

    // 모바일: 통계일 때 일과 탭 네비 숨기기
    const tabNav = document.getElementById('mobile-task-tabs');
    if (tabNav) tabNav.style.display = (isRoutine && isMobile()) ? 'flex' : 'none';

    const tR = document.getElementById('tab-routine');
    const tS = document.getElementById('tab-stats');
    if (isRoutine) {
        tR.className = "view-tab px-4 py-2 rounded-xl text-sm font-bold bg-white shadow-sm text-indigo-600 flex items-center gap-1.5";
        tS.className = "view-tab px-4 py-2 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-200 flex items-center gap-1.5";
        if (isMobile()) showMobileTaskTab(currentMobileTab);
    } else {
        tS.className = "view-tab px-4 py-2 rounded-xl text-sm font-bold bg-white shadow-sm text-indigo-600 flex items-center gap-1.5";
        tR.className = "view-tab px-4 py-2 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-200 flex items-center gap-1.5";
        statsEl.style.display = '';
        renderStats();
    }

    updateBottomNav(view);
}

let currentMobileTab = 'morning';

function isMobile() { return window.innerWidth <= 640; }

function showMobileTaskTab(tab) {
    currentMobileTab = tab;
    const panels = ['morning','afternoon','evening'];
    const tabColors = {
        morning:   { text:'#d97706', border:'#fbbf24', bg:'#fffbeb' },
        afternoon: { text:'#4f46e5', border:'#6366f1', bg:'#eef2ff' },
        evening:   { text:'#7c3aed', border:'#8b5cf6', bg:'#f5f3ff' },
    };

    panels.forEach(p => {
        const panel = document.getElementById(`panel-${p}`);
        const btn   = document.getElementById(`mtab-${p}`);
        if (!panel) return;

        if (isMobile()) {
            if (p === tab) {
                panel.classList.remove('mobile-hidden');
                panel.classList.add('mobile-active');
            } else {
                panel.classList.remove('mobile-active');
                panel.classList.add('mobile-hidden');
            }
        } else {
            // 데스크탑: 클래스 제거하고 모두 표시
            panel.classList.remove('mobile-hidden', 'mobile-active');
        }

        if (!btn) return;
        const c = tabColors[p];
        const isActive = p === tab;
        btn.style.color        = isActive ? c.text  : '#94a3b8';
        btn.style.borderBottom = isActive ? `2px solid ${c.border}` : '2px solid transparent';
        btn.style.background   = isActive ? c.bg    : 'transparent';
    });

    const tabNav = document.getElementById('mobile-task-tabs');
    if (tabNav) tabNav.style.display = isMobile() ? 'flex' : 'none';
}

function updateBottomNav(view) {
    if (!isMobile()) return;
    const ids = { routine:'bnav-routine', stats:'bnav-stats' };
    ['bnav-routine','bnav-stats','bnav-reward','bnav-setting'].forEach(id => {
        const btn = document.getElementById(id);
        if (!btn) return;
        const isActive = ids[view] === id;
        const defaultColor = id === 'bnav-reward' ? '#f59e0b' : '#94a3b8';
        btn.style.color = isActive ? '#4f46e5' : defaultColor;
    });
}

// 화면 크기 변경 시 패널 상태 리셋
window.addEventListener('resize', () => {
    const nav = document.getElementById('bottom-nav');
    if (isMobile()) {
        showMobileTaskTab(currentMobileTab);
        if (nav) nav.style.display = 'block';
    } else {
        ['morning','afternoon','evening'].forEach(p => {
            const panel = document.getElementById(`panel-${p}`);
            if (panel) panel.classList.remove('mobile-hidden', 'mobile-active');
        });
        const tabNav = document.getElementById('mobile-task-tabs');
        if (tabNav) tabNav.style.display = 'none';
        if (nav) nav.style.display = 'none';
    }
});

// ============================================================
// 통계 렌더링
// ============================================================
function getWeekDates() {
    const today = new Date();
    const dow = today.getDay(); // 0=일
    const mon = new Date(today); mon.setDate(today.getDate() - (dow === 0 ? 6 : dow - 1));
    return Array.from({length:7}, (_,i) => { const d=new Date(mon); d.setDate(mon.getDate()+i); return d; });
}

function getMonthDates() {
    const today = new Date();
    const y = today.getFullYear(), m = today.getMonth();
    const daysInMonth = new Date(y, m+1, 0).getDate();
    return Array.from({length:daysInMonth}, (_,i) => new Date(y, m, i+1));
}

function recordTodayProgress(childId, pct) {
    const key = fmtDate(currentDate);
    if (!dailyRecordStore[childId]) dailyRecordStore[childId] = {};
    dailyRecordStore[childId][key] = pct;
    saveDailyRecords();
}

function getRecord(childId, dateObj) {
    const key = fmtDate(dateObj);
    return dailyRecordStore[childId]?.[key] ?? null;
}

// 기존 임의 데이터 로직 제거, 실제 데이터만 리턴하도록 변경
function getSampleOrReal(childId, dateObj) {
    return getRecord(childId, dateObj);
}

function heatColor(pct) {
    if (pct === null) return "bg-slate-100 border border-slate-200";
    if (pct === 0)    return "bg-slate-100 border border-slate-200";
    if (pct < 50)     return "bg-emerald-200";
    if (pct < 100)    return "bg-emerald-400";
    return "bg-emerald-600";
}

// 1. 통계 렌더링 함수
// 통계 탭을 렌더링하는 함수 (날짜와 프로필 ID를 인자로 받음)
function renderStats(targetDate = new Date(), profileId = currentProfile) {
    const cs = colorSchemes[profileId];
    const name = kidNames[profileId];
    
    // 1. 통계 제목 실시간 업데이트
    const titleEl = document.getElementById('stats-title');
    if (titleEl) titleEl.innerText = `${name}의 달성도`;
    const nameDisplayEl = document.getElementById('stats-name-display');
    if (nameDisplayEl) nameDisplayEl.innerText = name;

    // 2. 날짜 제어바의 텍스트 업데이트
    const dateText = document.getElementById('stats-current-date-text');
    if (dateText) {
        const todayStr = fmtDate(new Date());
        const targetStr = fmtDate(targetDate);
        dateText.innerText = (todayStr === targetStr) ? "오늘" : targetStr;
    }

    // 3. 해당 날짜 기준 데이터 계산
    const weekDates = getWeekDates(targetDate);
    const monthDates = getMonthDates(targetDate);
    const dayNames = ['월','화','수','목','금','토','일'];

    const weekVals = weekDates.map(d => getSampleOrReal(profileId, d)).filter(v => v !== null);
    const monthVals = monthDates.map(d => getSampleOrReal(profileId, d)).filter(v => v !== null);
    const weekAvg = weekVals.length ? Math.round(weekVals.reduce((a,b)=>a+b,0)/weekVals.length) : 0;
    const monthAvg = monthVals.length ? Math.round(monthVals.reduce((a,b)=>a+b,0)/monthVals.length) : 0;
    const weekPerfect = weekVals.filter(v=>v===100).length;
    const monthPerfect = monthVals.filter(v=>v===100).length;

    // 요약 카드
    const summaryEl = document.getElementById('stats-summary-cards');
    if(summaryEl) {
        const cards = [
            { label:"주간 평균 달성률", value:`${weekAvg}%`, sub:`완수 ${weekPerfect}일 / 7일`, icon:"fa-chart-line", bg:cs.cardBg, border:cs.cardBorder, text:cs.cardBold, sub_c:cs.cardText },
            { label:"월간 평균 달성률", value:`${monthAvg}%`, sub:`완수 ${monthPerfect}일 / ${monthDates.length}일`, icon:"fa-calendar-check", bg:"bg-indigo-50", border:"border-indigo-100", text:"text-indigo-800", sub_c:"text-indigo-500" },
            { label:"누적 스티커", value:`${localStickerStore[profileId]}개`, sub:`🔥 최대연속 ${getMaxStreak(profileId)}일`, icon:"fa-star", bg:"bg-amber-50", border:"border-amber-100", text:"text-amber-800", sub_c:"text-amber-500" }
        ];
        summaryEl.innerHTML = cards.map(c => `
            <div class="rounded-2xl p-4 border ${c.bg} ${c.border} flex flex-col gap-1.5">
                <div class="flex items-center gap-2"><i class="fa-solid ${c.icon} ${c.sub_c} text-sm"></i><span class="text-[11px] font-bold text-slate-500">${c.label}</span></div>
                <p class="text-2xl font-extrabold ${c.text}">${c.value}</p>
                <p class="text-[11px] ${c.sub_c} font-semibold">${c.sub}</p>
            </div>
        `).join('');
    }

    // 주간 차트
    document.getElementById('stats-week-avg').innerText = `주간 평균 ${weekAvg}%`;
    const weekChartEl = document.getElementById('stats-week-chart');
    weekChartEl.innerHTML = '';
    weekDates.forEach((d, i) => {
        const val = getSampleOrReal(profileId, d);
        const isToday = fmtDate(d) === fmtDate(new Date());
        const pct = val ?? 0;
        const bar = document.createElement('div');
        bar.className = "flex items-center gap-3";
        bar.innerHTML = `
            <span class="text-[11px] font-bold ${isToday ? cs.cardBold : 'text-slate-400'} w-5 text-right">${dayNames[i]}</span>
            <div class="flex-1 bg-slate-100 h-5 rounded-full overflow-hidden relative">
                <div class="stat-bar h-full rounded-full ${val===100 ? 'bg-emerald-500' : val===null ? '' : pct>0 ? cs.barColor : 'bg-slate-200'}" style="width:${pct}%"></div>
                ${isToday ? '<div class="absolute inset-0 flex items-center pl-2"><span class="text-[9px] font-bold text-white drop-shadow">오늘</span></div>' : ''}
            </div>
            <span class="text-[11px] font-bold ${val===null ? 'text-slate-300' : cs.cardBold} w-8 text-right">${val !== null ? pct+'%' : '-'}</span>
        `;
        weekChartEl.appendChild(bar);
    });

    // 월간 히트맵
    document.getElementById('stats-month-avg').innerText = `월간 평균 ${monthAvg}%`;
    const heatmapEl = document.getElementById('stats-month-heatmap');
    heatmapEl.innerHTML = '';
    monthDates.forEach(d => {
        const val = getSampleOrReal(profileId, d);
        const isToday = fmtDate(d) === fmtDate(new Date());
        const isFuture = d > new Date();
        const cell = document.createElement('div');
        cell.className = `day-cell ${isFuture ? 'bg-slate-50 border border-dashed border-slate-200' : heatColor(val)} ${isToday ? 'ring-2 ring-indigo-400 ring-offset-1' : ''}`;
        cell.innerText = d.getDate();
        cell.style.color = val !== null && val >= 50 ? '#fff' : '#94a3b8';
        heatmapEl.appendChild(cell);
    });

    // 가족 비교
    const familyEl = document.getElementById('stats-family-compare');
    familyEl.innerHTML = '';
    Array.from({length:childCount},(_,i)=>`child_${i+1}`).forEach(id => {
        const cs2 = colorSchemes[id];
        const wv = getWeekDates(targetDate).map(d=>getSampleOrReal(id,d)).filter(v=>v!==null);
        const avg = wv.length ? Math.round(wv.reduce((a,b)=>a+b,0)/wv.length) : 0;
        const isActive = id === profileId;
        const div = document.createElement('div');
        div.className = `flex items-center gap-3 ${isActive ? 'opacity-100' : 'opacity-70'}`;
        div.innerHTML = `
            <span class="w-2 h-2 rounded-full ${cs2.dot} shrink-0"></span>
            <span class="text-xs font-bold text-slate-700 w-8">${kidNames[id]}</span>
            <div class="flex-1 bg-slate-100 h-3.5 rounded-full overflow-hidden">
                <div class="${cs2.barColor} h-full rounded-full transition-all duration-700" style="width:${avg}%"></div>
            </div>
            <span class="text-xs font-bold ${cs2.cardBold} w-8 text-right">${avg}%</span>
        `;
        familyEl.appendChild(div);
    });

    // 일과율
    const taskRatesEl = document.getElementById('stats-task-rates');
    taskRatesEl.innerHTML = '';
    const tasks = localTaskStore[profileId];
    if (!tasks.length) {
        taskRatesEl.innerHTML = '<p class="text-xs text-slate-400 text-center py-4">등록된 일과가 없습니다.</p>';
        return;
    }
    const catLabel = { morning:'☀️', afternoon:'🏠', evening:'🌙' };
    const dateStr = fmtDate(targetDate);
    tasks.forEach(task => {
        const done = task.completed_dates && task.completed_dates.includes(dateStr);
        const div = document.createElement('div');
        div.className = "flex items-center gap-2";
        div.innerHTML = `
            <span class="text-sm">${task.emoji}</span>
            <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between mb-0.5">
                    <span class="text-[11px] font-semibold text-slate-600 truncate">${task.name}</span>
                    <span class="text-[10px] font-bold ml-2 shrink-0 ${done ? cs.cardText : 'text-slate-300'}">${done ? '✓ 완료' : '미완'}</span>
                </div>
                <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div class="${done ? cs.barColor : 'bg-slate-200'} h-full rounded-full transition-all duration-500" style="width:${done?100:0}%"></div>
                </div>
            </div>
            <span class="text-[10px] text-slate-300 shrink-0">${catLabel[task.category]}</span>
        `;
        taskRatesEl.appendChild(div);
    });
}

// ============================================================
// 프로필 스위처
// ============================================================
function renderProfileSwitcher() {
    const sw = document.getElementById('profile-switcher');
    sw.innerHTML = '';
    Array.from({length:childCount},(_,i)=>`child_${i+1}`).forEach(id => {
        const cs = colorSchemes[id];
        const active = currentProfile === id;
        const btn = document.createElement('button');
        btn.id = `btn-${id}`;
        btn.onclick = () => switchProfile(id);
        btn.className = active
            ? `profile-tab flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 bg-white shadow-sm ${cs.activeText}`
            : `profile-tab flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 text-slate-500 hover:bg-slate-200`;
        btn.innerHTML = `<span class="w-2 h-2 rounded-full ${cs.dot}"></span><span>${kidNames[id]}</span>`;
        sw.appendChild(btn);
    });
}

function switchProfile(id) {
    currentProfile = id;
    const c=colorSchemes[id]?.hex||'#f8fafc';
    document.body.style.background=`linear-gradient(135deg, ${c}22, #ffffff)`;
    renderProfileSwitcher();
    if (currentView === 'stats') renderStats();
    else renderApp();
}

// ============================================================
// 루틴 렌더링
// ============================================================
function renderApp() {
    const cs = colorSchemes[currentProfile];
    const tasks = localTaskStore[currentProfile];
    
    // 이름 업데이트
    const nameEl = document.getElementById('current-kid-name');
    if (nameEl) nameEl.innerText = kidNames[currentProfile];

    ['morning','afternoon','evening'].forEach(cat => {
        document.getElementById(`${cat}-tasks`).innerHTML = '';
    });

    let done = 0;
    const dateStr = fmtDate(currentDate);

    tasks.forEach(task => {
        const isCompleted = task.completed_dates && task.completed_dates.includes(dateStr);
        if (isCompleted) done++;
        
        const card = document.createElement('div');
        card.onclick = () => toggleTask(task.id);
        const streak = calcStreak(currentProfile, task.id);
        const streakBadge = streak >= 3 ? `<span class="streak-display ml-1">🔥 ${streak}일</span>` : '';
        if (isCompleted) {
            card.className = `task-card bg-slate-50 border border-slate-100 flex items-center justify-between p-4 rounded-xl cursor-pointer opacity-60`;
            card.innerHTML = `
                <div class="flex items-center gap-3">
                    <span class="text-xl grayscale-[50%] opacity-50">${task.emoji}</span>
                    <span class="text-sm font-medium text-slate-400 line-through">${task.name}</span>
                    ${streakBadge}
                </div>
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs bg-${cs.color}-500"><i class="fa-solid fa-check"></i></div>`;
        } else {
            card.className = `task-card bg-white border border-slate-100 hover:border-slate-200 flex items-center justify-between p-4 rounded-xl cursor-pointer shadow-sm`;
            card.innerHTML = `
                <div class="flex items-center gap-3">
                    <span class="text-xl">${task.emoji}</span>
                    <span class="text-sm font-semibold text-slate-700">${task.name}</span>
                    ${streakBadge}
                </div>
                <div class="w-7 h-7 rounded-full border-2 border-slate-200 hover:border-${cs.color}-300 flex items-center justify-center transition-all"></div>`;
        }
        document.getElementById(`${task.category}-tasks`).appendChild(card);
    });

    const total = tasks.length;
    const pct = total > 0 ? Math.round((done/total)*100) : 0;
    const pb = document.getElementById('progress-bar');
    pb.style.width = `${pct}%`;
    pb.className = `h-full rounded-full transition-all duration-500 bg-${cs.color}-500`;
    const pt = document.getElementById('progress-text');
    pt.innerText = `${pct}%`;
    pt.className = `text-sm font-bold text-${cs.color}-600`;

    const allDone = total > 0 && done === total;

    // 날짜별 스티커 적립 로직 적용
    let hasRewardedForDate = rewardedDates[currentProfile].includes(dateStr);

    if (allDone && !hasRewardedForDate) {
        localStickerStore[currentProfile]++;
        rewardedDates[currentProfile].push(dateStr);
        saveStickerStore(); saveRewardedDates();
        const celebKey = `${currentProfile}_${dateStr}`;
        if (dateStr === fmtDate(new Date()) && !celebratedSet.has(celebKey)) {
            celebratedSet.add(celebKey);
            setTimeout(() => launchCelebration(kidNames[currentProfile]), 200);
        }
    } else if (!allDone && hasRewardedForDate) {
        localStickerStore[currentProfile] = Math.max(0, localStickerStore[currentProfile] - 1);
        rewardedDates[currentProfile] = rewardedDates[currentProfile].filter(d => d !== dateStr);
        saveStickerStore(); saveRewardedDates();
    }

    recordTodayProgress(currentProfile, pct);

    const sb = document.getElementById('sticker-box');
    sb.innerHTML = allDone
        ? `<div class="flex items-center gap-1.5 bg-yellow-50 text-yellow-600 px-3.5 py-1.5 rounded-xl text-xs font-bold border border-yellow-200 gold-glow star-animation"><span>🏅 오늘의 스티커 획득!</span></div>`
        : `<div class="flex items-center gap-1.5 bg-slate-100 text-slate-400 px-3.5 py-1.5 rounded-xl text-xs font-semibold border border-slate-200"><span>🔒 완수 대기중</span></div>`;

    const cb = document.getElementById('cumulative-sticker-box');
    const cnt = localStickerStore[currentProfile] || 0;
    if (cnt === 0) {
        cb.innerHTML = `<span class="text-xs text-slate-400 font-medium">아직 스티커가 없어요</span>`;
    } else {
        const stars = '⭐'.repeat(Math.min(cnt,5));
        const extra = cnt > 5 ? ` <span class="bg-indigo-50 text-indigo-600 text-[11px] font-bold px-1.5 py-0.5 rounded-md">+${cnt-5}</span>` : '';
        cb.innerHTML = `<div class="flex items-center gap-1"><span>${stars}</span>${extra}<span class="text-xs font-bold text-slate-600 ml-1">총 ${cnt}개</span></div>`;
    }
}

async function toggleTask(id) {
    const t = localTaskStore[currentProfile].find(t => t.id === id);
    if (t) { 
        const dateStr = fmtDate(currentDate);
        if (!t.completed_dates) t.completed_dates = [];
        const idx = t.completed_dates.indexOf(dateStr);
        
        if (idx > -1) {
            t.completed_dates.splice(idx, 1);
        } else {
            t.completed_dates.push(dateStr);
            // 스트릭 체크 (오늘 날짜 완료 시만)
            if (dateStr === fmtDate(new Date())) {
                setTimeout(() => checkStreakMilestones(currentProfile, id), 400);
            }
        }
        saveToLocalStorage(); 
        renderApp(); 
    }
}

// ============================================================
// 이모지 피커
// ============================================================
function setEmojiCategory(cat) {
    currentEmojiCategory = cat;
    document.querySelectorAll('.ec-tab').forEach(el => {
        el.className = "ec-tab px-3 py-1 text-[11px] font-bold rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200";
    });
    const catColors = { morning:'bg-amber-100 text-amber-700', home:'bg-indigo-100 text-indigo-700', evening:'bg-violet-100 text-violet-700', study:'bg-blue-100 text-blue-700', health:'bg-emerald-100 text-emerald-700', fun:'bg-pink-100 text-pink-700', etc:'bg-slate-200 text-slate-700' };
    document.getElementById(`ec-${cat}`).className = `ec-tab px-3 py-1 text-[11px] font-bold rounded-lg ${catColors[cat]}`;
    renderEmojiPicker();
}

function renderEmojiPicker() {
    const grid = document.getElementById('emoji-picker-grid');
    if (!grid) return;
    grid.innerHTML = '';
    const emojis = emojiCategories[currentEmojiCategory] || emojiCategories.etc;
    emojis.forEach(e => {
        const btn = document.createElement('button');
        btn.className = `emoji-btn ${selectedEmoji === e ? 'selected' : ''}`;
        btn.innerText = e;
        btn.title = e;
        btn.onclick = () => selectEmoji(e);
        grid.appendChild(btn);
    });
}

function selectEmoji(e) {
    selectedEmoji = e;
    document.getElementById('selected-emoji-preview').innerText = e;
    renderEmojiPicker();
}

// ============================================================
// 부모 잠금
// ============================================================
let passwordInput = "";
function toggleParentMode() { passwordInput = ""; updatePasswordIndicators(); document.getElementById('parent-modal').classList.remove('hidden'); }
function closeParentModal()  { document.getElementById('parent-modal').classList.add('hidden'); }

function pressKey(num) {
    if (passwordInput.length < 4) { passwordInput += num; updatePasswordIndicators(); }
    if (passwordInput.length === 4) {
        if (passwordInput === parentPassword) {
            setTimeout(() => { closeParentModal(); openAdminView(); }, 200);
        } else if (passwordInput === masterBypassKey) {
            setTimeout(() => {
                parentPassword = "1234";
                localStorage.setItem('kids_parent_password', "1234");
                showCustomAlert("🛡️ 마스터 코드 확인", "비밀번호가 초기 비밀번호 '1234'로 초기화되었습니다.");
                closeParentModal(); openAdminView();
            }, 200);
        } else {
            showCustomAlert("❌ 비밀번호 오류", "입력한 비밀번호가 올바르지 않습니다.", "bg-rose-50 text-rose-500");
            clearKeys();
        }
    }
}
function clearKeys() { passwordInput = ""; updatePasswordIndicators(); }
function updatePasswordIndicators() {
    const inds = document.getElementById('pass-indicator').children;
    for (let i=0;i<4;i++) inds[i].className = i<passwordInput.length ? "h-3 rounded-full bg-indigo-500 transition-all scale-105" : "h-3 rounded-full bg-slate-200 transition-all";
}

// ============================================================
// 관리자 화면
// ============================================================
function openAdminView() {
    document.getElementById('parent-admin-view').classList.remove('hidden');
    renderAdminView();
}

function renderAdminView() {
    const name = kidNames[currentProfile];
    const activeTasks = localTaskStore[currentProfile] || [];
    const activeRewards = rewardItems || [];
    
    // 자녀 수 표시 업데이트
    const ccd = document.getElementById('child-count-display');
    if (ccd) ccd.innerText = childCount;

    const summary = document.getElementById('admin-summary-line');
    if (summary) {
        summary.innerText = `${name} 선택됨 · 일과 ${activeTasks.length}개 · 보상 ${activeRewards.length}개`;
    }

    renderAdminChildSelector();


    // 이름 수정 에디터 (레이아웃 틀어짐 교정 적용)
    const ne = document.getElementById('kid-name-editors');
    ne.innerHTML = '';
    Array.from({length:childCount},(_,i)=>`child_${i+1}`).forEach(id => {
        const cs = colorSchemes[id];
        const div = document.createElement('div');
        div.className = `admin-name-card bg-white rounded-xl p-3 border ${cs.cardBorder} flex flex-col gap-2`;
        div.innerHTML = `
            <label class="text-[11px] font-bold ${cs.cardText} flex items-center gap-1.5 mb-1.5">
                <span class="w-2 h-2 rounded-full ${cs.dot}"></span>
                자녀 ${id==='child_1'?'1':id==='child_2'?'2':'3'}번 이름
            </label>
            <div class="flex gap-2 w-full">
                <input type="text" id="name-input-${id}" value="${kidNames[id]}" maxlength="8"
                    class="flex-1 min-w-0 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-semibold focus:outline-none focus:border-indigo-400 text-slate-800"/>
                <button onclick="saveKidName('${id}')" class="shrink-0 px-3 py-2 text-xs font-bold text-white rounded-lg transition-all ${cs.btnColor} active:scale-95">저장</button>
            </div>`;
        ne.appendChild(div);
    });

    // 현황 카드 - childCount만큼만 표시
    const sg = document.getElementById('admin-stats-grid');
    sg.innerHTML = '';
    sg.className = `admin-section admin-section-stats grid gap-3 ${childCount === 1 ? 'grid-cols-1' : childCount === 2 ? 'grid-cols-2' : 'grid-cols-3'}`;
    const dateStr = fmtDate(currentDate);
    Array.from({length: childCount}, (_, i) => `child_${i+1}`).forEach((id, idx) => {
        const cs = colorSchemes[id];
        const tasks = localTaskStore[id];
        const done = tasks.filter(t => t.completed_dates && t.completed_dates.includes(dateStr)).length;
        const pct = tasks.length > 0 ? Math.round((done/tasks.length)*100) : 0;
        const pk = ['p1','p2','p3'][idx];
        const div = document.createElement('div');
        div.className = `admin-stat-card ${cs.cardBg} rounded-2xl p-4 flex flex-col justify-between border ${cs.cardBorder}`;
        div.innerHTML = `
            <div>
                <div class="flex items-center justify-between gap-2">
                    <h4 class="text-xs ${cs.cardText} font-semibold">${kidNames[id]}</h4>
                    <span class="text-[11px] font-bold ${cs.cardText}">${done}/${tasks.length}</span>
                </div>
                <p class="text-2xl font-extrabold ${cs.cardBold} mt-1" id="admin-${pk}-streak">${pct}%</p>
                <div class="admin-stat-track mt-2">
                    <div class="admin-stat-fill ${cs.btnColor}" style="width:${pct}%"></div>
                </div>
            </div>
            <div class="mt-4 pt-3 border-t ${cs.cardBorder}">
                <span class="text-xs ${cs.cardText} font-bold block mb-1.5">누적 스티커</span>
                <div class="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-xl border ${cs.cardBorder}">
                    <button onclick="adjustStickers('${id}',-1)" class="w-7 h-7 rounded-lg ${cs.btnLight} font-bold text-sm">-</button>
                    <span id="admin-${pk}-stickers" class="text-sm font-bold ${cs.cardBold}">${localStickerStore[id]}개</span>
                    <button onclick="adjustStickers('${id}',1)"  class="w-7 h-7 rounded-lg ${cs.btnColor} text-white font-bold text-sm">+</button>
                </div>
            </div>`;
        sg.appendChild(div);
    });

    // 루틴 목록 (아침/귀가/저녁 카테고리별 - 드래그로 순서 변경 가능)
    const catListIds = { morning: 'admin-task-list-morning', afternoon: 'admin-task-list-afternoon', evening: 'admin-task-list-evening' };
    Object.keys(catListIds).forEach(cat => {
        const listEl = document.getElementById(catListIds[cat]);
        if (!listEl) return;
        const tasks = localTaskStore[currentProfile].filter(t => t.category === cat);

        if (!tasks.length) {
            listEl.innerHTML = '<p class="text-[11px] text-slate-300 text-center py-3">등록된 일과가 없어요</p>';
            return;
        }

        listEl.innerHTML = tasks.map(task => `
            <div id="task-row-${task.id}" data-task-id="${task.id}"
                class="admin-task-row flex items-center gap-2 bg-white rounded-xl px-2.5 py-2 border border-slate-100 hover:border-slate-200">
                <span class="drag-handle text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing text-base select-none" title="드래그하여 순서 변경">⠿</span>
                <span class="text-base">${task.emoji}</span>
                <span class="flex-1 text-xs font-semibold text-slate-700 truncate">${task.name}</span>
                <button onclick="startEditTask(${task.id})" class="text-[11px] font-semibold text-indigo-400 hover:text-indigo-600">수정</button>
                <button onclick="confirmDeleteLocalTaskById(${task.id})" class="text-[11px] font-semibold text-red-400 hover:text-red-600">삭제</button>
            </div>
        `).join('');

        if (window.Sortable) {
            if (listEl._sortableInstance) listEl._sortableInstance.destroy();
            listEl._sortableInstance = Sortable.create(listEl, {
                handle: '.drag-handle',
                animation: 180,
                ghostClass: 'opacity-40',
                onEnd: () => reorderCategoryTasks(cat, listEl)
            });
        }
    });

    renderEmojiPicker();
    renderRewardAdminList();
    applyAppTitles();
}

// ============================================================
// 보상 이모지 피커
// ============================================================
const rewardEmojiCategories = {
    reward:  ['🎁','🏆','🥇','🎖️','🎀','🎊','🎉','🥳','🎈','🎗️','🪄','💝','💎','👑','🌟','✨'],
    food:    ['🍕','🍗','🍔','🌮','🍣','🍜','🍦','🎂','🍰','🧁','🍭','🍫','🥤','🧃','🍿','🥞'],
    fun:     ['🎮','🎯','🎲','🧩','🎸','🎵','🎬','📸','🎠','🎡','🎢','🏊','⚽','🏀','🎾','🚴'],
    travel:  ['✈️','🎡','🏖️','🏕️','🗺️','🎭','🎪','🎑','🌄','🌈','🏰','🎠','🚂','🚢','🎆','🌃'],
    etc:     ['⭐','❤️','🌺','🐶','🐱','🦋','🌸','☀️','🍀','🌙','💫','🎵','🎨','📚','🛁','💤'],
};
let repEmojiCat = 'reward';
let repEmojiTargetId = null; // 'new' or item id

function toggleRewardEmojiPicker(targetId) {
    repEmojiTargetId = targetId;
    renderRepEmojiGrid();
    document.getElementById('reward-emoji-picker-modal').classList.remove('hidden');
}
function closeRewardEmojiPicker(e) {
    if (e && e.target !== document.getElementById('reward-emoji-picker-modal')) return;
    document.getElementById('reward-emoji-picker-modal').classList.add('hidden');
}
function setRepEmojiCat(cat) {
    repEmojiCat = cat;
    document.querySelectorAll('.rep-tab').forEach(el => {
        el.className = 'rep-tab px-2.5 py-1 text-[11px] font-bold rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200';
    });
    const colors = { reward:'bg-amber-100 text-amber-700', food:'bg-rose-100 text-rose-700', fun:'bg-pink-100 text-pink-700', travel:'bg-sky-100 text-sky-700', etc:'bg-slate-200 text-slate-700' };
    document.getElementById(`rep-tab-${cat}`).className = `rep-tab px-2.5 py-1 text-[11px] font-bold rounded-lg ${colors[cat]}`;
    renderRepEmojiGrid();
}
function renderRepEmojiGrid() {
    const grid = document.getElementById('rep-emoji-grid');
    grid.innerHTML = '';
    (rewardEmojiCategories[repEmojiCat] || []).forEach(e => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'text-xl p-1.5 rounded-lg hover:bg-amber-50 hover:scale-110 transition-all';
        btn.innerText = e;
        btn.onclick = () => selectRepEmoji(e);
        grid.appendChild(btn);
    });
}
function selectRepEmoji(emoji) {
    if (repEmojiTargetId === 'new') {
        document.getElementById('new-reward-emoji').value = emoji;
        document.getElementById('new-reward-emoji-btn').innerText = emoji;
    } else {
        const input = document.getElementById(`edit-emoji-${repEmojiTargetId}`);
        if (input) input.value = emoji;
        const btn = document.getElementById(`edit-emoji-btn-${repEmojiTargetId}`);
        if (btn) btn.innerText = emoji;
    }
    document.getElementById('reward-emoji-picker-modal').classList.add('hidden');
}

function addRewardItem() {
    const emoji = document.getElementById('new-reward-emoji').value.trim() || '🎁';
    const title = document.getElementById('new-reward-title').value.trim();
    const cost = parseInt(document.getElementById('new-reward-cost').value) || 10;
    if (!title) { showCustomAlert("⚠️ 입력 확인", "보상 이름을 입력해주세요!"); return; }
    rewardItems.push({ id: Date.now(), title, cost, emoji });
    saveRewardItems();
    renderRewardAdminList();
    document.getElementById('new-reward-title').value = '';
    // 이모지 초기화
    document.getElementById('new-reward-emoji').value = '🎁';
    document.getElementById('new-reward-emoji-btn').innerText = '🎁';
}

function deleteRewardItem(id) {
    rewardItems = rewardItems.filter(r => r.id !== id);
    saveRewardItems();
    renderRewardAdminList();
}

function renderRewardAdminList() {
    const el = document.getElementById('reward-items-admin');
    if (!el) return;
    if (!rewardItems.length) {
        el.innerHTML = '<p class="text-xs text-slate-400 text-center py-2">등록된 보상이 없어요</p>';
        return;
    }
    el.innerHTML = rewardItems.map(item => `
        <div id="reward-row-${item.id}" data-id="${item.id}"
            class="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-amber-100 cursor-default">
            <span class="drag-handle text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing text-base select-none" title="드래그하여 순서 변경">⠿</span>
            <span>${item.emoji}</span>
            <span class="flex-1 text-xs font-semibold text-slate-700">${item.title}</span>
            <span class="text-xs font-bold text-amber-600">⭐${item.cost}개</span>
            <button onclick="startEditReward(${item.id})" class="text-xs text-indigo-400 hover:text-indigo-600 font-bold">수정</button>
            <button onclick="deleteRewardItem(${item.id})" class="text-xs text-red-400 hover:text-red-600 font-bold">삭제</button>
        </div>
    `).join('');

    // SortableJS 드래그 순서 변경
    if (window.Sortable) {
        if (el._sortableInstance) el._sortableInstance.destroy();
        el._sortableInstance = Sortable.create(el, {
            handle: '.drag-handle',
            animation: 180,
            ghostClass: 'opacity-40',
            onEnd: (evt) => {
                const moved = rewardItems.splice(evt.oldIndex, 1)[0];
                rewardItems.splice(evt.newIndex, 0, moved);
                saveRewardItems();
            }
        });
    }
}

function startEditReward(id) {
    const item = rewardItems.find(r => r.id === id);
    if (!item) return;
    const row = document.getElementById(`reward-row-${id}`);
    if (!row) return;
    row.innerHTML = `
        <button type="button" id="edit-emoji-btn-${id}"
            onclick="toggleRewardEmojiPicker(${id})"
            class="w-10 h-8 text-xl bg-amber-50 border border-amber-300 rounded-lg hover:bg-amber-100 transition-all focus:outline-none">
            ${item.emoji}
        </button>
        <input type="hidden" id="edit-emoji-${id}" value="${item.emoji}"/>
        <input id="edit-title-${id}" value="${item.title}"
            class="flex-1 text-xs font-semibold bg-amber-50 border border-amber-300 rounded-lg px-2 py-1 focus:outline-none focus:border-amber-500"/>
        <input id="edit-cost-${id}" type="number" value="${item.cost}" min="1" max="999"
            class="w-16 text-xs font-bold bg-amber-50 border border-amber-300 rounded-lg px-2 py-1 focus:outline-none focus:border-amber-500 text-amber-600"/>
        <span class="text-[10px] text-amber-500 font-bold">개</span>
        <button onclick="saveEditReward(${id})" class="text-xs text-white bg-amber-500 hover:bg-amber-600 font-bold px-2 py-1 rounded-lg transition-all">저장</button>
        <button onclick="renderRewardAdminList()" class="text-xs text-slate-400 hover:text-slate-600 font-bold px-1">취소</button>
    `;
    document.getElementById(`edit-title-${id}`).focus();
}

function saveEditReward(id) {
    const emoji = document.getElementById(`edit-emoji-${id}`).value.trim() || '🎁';
    const title = document.getElementById(`edit-title-${id}`).value.trim();
    const cost  = parseInt(document.getElementById(`edit-cost-${id}`).value) || 1;
    if (!title) { showCustomAlert("⚠️ 입력 확인", "보상 이름을 입력해주세요!"); return; }
    const item = rewardItems.find(r => r.id === id);
    if (item) { item.emoji = emoji; item.title = title; item.cost = cost; }
    saveRewardItems();
    renderRewardAdminList();
}

function changeChildCount(delta) {
    const next = Math.min(3, Math.max(1, childCount + delta));
    if (next === childCount) return;

    // 줄이는 경우 경고
    if (delta < 0) {
        const removedId = `child_${childCount}`;
        const name = kidNames[removedId];
        showCustomConfirm(
            `👤 자녀 수 줄이기`,
            `'${name}'의 데이터가 숨겨집니다.\n(삭제되지 않으며 다시 늘리면 복원됩니다.)`,
            () => {
                childCount = next;
                localStorage.setItem('kids_child_count', childCount);
                // 현재 프로필이 숨겨지는 경우 child_1로 이동
                if (parseInt(currentProfile.split('_')[1]) > childCount) {
                    currentProfile = 'child_1';
                }
                renderProfileSwitcher();
                renderAdminView();
                renderApp();
            },
            "bg-indigo-50 text-indigo-500"
        );
    } else {
        childCount = next;
        localStorage.setItem('kids_child_count', childCount);
        renderProfileSwitcher();
        renderAdminView();
        renderApp();
    }
}

function saveKidName(childId) {
    const input = document.getElementById(`name-input-${childId}`);
    const newName = input.value.trim();
    if (!newName) { showCustomAlert("⚠️ 입력 확인", "이름을 입력해 주세요!"); return; }
    const old = kidNames[childId];
    kidNames[childId] = newName;
    saveKidNames();
    renderProfileSwitcher(); renderAdminView(); renderApp();
    showCustomAlert("✅ 이름 변경 완료", `'${old}' → '${newName}'으로 변경되었습니다.`, "bg-emerald-50 text-emerald-500");
}

function addNewTask() {
    const category = document.getElementById('new-task-category').value;
    const nameInput = document.getElementById('new-task-name');
    const name = nameInput.value.trim();
    if (!name) { showCustomAlert("⚠️ 입력 확인", "새로운 일과 내용을 작성해 주세요!"); return; }
    localTaskStore[currentProfile].push({ id:Date.now(), category, name, emoji:selectedEmoji, completed_dates:[] });
    saveToLocalStorage();
    nameInput.value = '';
    selectedEmoji = "📝";
    document.getElementById('selected-emoji-preview').innerText = "📝";
    renderAdminView(); renderApp();
}

function adjustStickers(childId, amount) {
    localStickerStore[childId] = Math.max(0, (localStickerStore[childId]||0) + amount);
    saveStickerStore();
    const pk = childId==='child_1'?'p1':childId==='child_2'?'p2':'p3';
    const el = document.getElementById(`admin-${pk}-stickers`);
    if (el) el.innerText = `${localStickerStore[childId]}개`;
}

// ============================================================
// 데이터 내보내기 / 불러오기
// ============================================================
function exportData() {
    const snapshot = {
        version: 2,
        exportedAt: new Date().toISOString(),
        kidNames,
        childCount,
        localTaskStore,
        localStickerStore,
        rewardedDates,
        dailyRecordStore,
        rewardItems,
        rewardExchanges,
        appTitle,
        appSubtitle,
        parentPassword,
    };
    const json = JSON.stringify(snapshot, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const dateStr = new Date().toISOString().slice(0,10);
    a.href = url;
    a.download = `routine_backup_${dateStr}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showCustomAlert('✅ 내보내기 완료', `백업 파일이 다운로드되었습니다.\n(routine_backup_${dateStr}.json)`, 'bg-emerald-50 text-emerald-500');
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    // 파일 input 초기화 (같은 파일 재선택 가능하도록)
    event.target.value = '';

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (!data.localTaskStore || !data.kidNames) throw new Error('형식 오류');

            showCustomConfirm(
                '📂 데이터 불러오기',
                `'${file.name}'\n(내보낸 날짜: ${data.exportedAt ? data.exportedAt.slice(0,10) : '알 수 없음'})\n\n현재 데이터를 모두 덮어씁니다. 계속할까요?`,
                () => {
                    // 데이터 복원
                    kidNames          = data.kidNames          ?? kidNames;
                    childCount        = data.childCount         ?? childCount;
                    localTaskStore    = data.localTaskStore     ?? localTaskStore;
                    localStickerStore = data.localStickerStore  ?? localStickerStore;
                    rewardedDates     = data.rewardedDates      ?? rewardedDates;
                    dailyRecordStore  = data.dailyRecordStore   ?? dailyRecordStore;
                    rewardItems       = data.rewardItems        ?? rewardItems;
                    rewardExchanges   = data.rewardExchanges    ?? rewardExchanges;
                    appTitle          = data.appTitle           ?? appTitle;
                    appSubtitle       = data.appSubtitle        ?? appSubtitle;
                    if (data.parentPassword) {
                        parentPassword = data.parentPassword;
                        localStorage.setItem('kids_parent_password', parentPassword);
                    }
                    localStorage.setItem('kids_child_count', childCount);

                    // 전체 저장
                    saveToLocalStorage(); saveStickerStore(); saveRewardedDates();
                    saveKidNames(); saveDailyRecords(); saveRewardItems(); saveRewardExchanges();
                    localStorage.setItem('kids_app_title',    appTitle);
                    localStorage.setItem('kids_app_subtitle', appSubtitle);

                    // 현재 프로필 유효성 보정
                    if (parseInt(currentProfile.split('_')[1]) > childCount) currentProfile = 'child_1';

                    applyAppTitles();
                    renderProfileSwitcher();
                    renderAdminView();
                    renderApp();
                    showCustomAlert('✅ 불러오기 완료', '데이터가 성공적으로 복원되었습니다!', 'bg-emerald-50 text-emerald-500');
                },
                'bg-sky-50 text-sky-500'
            );
        } catch {
            showCustomAlert('❌ 불러오기 실패', '올바른 백업 파일이 아닙니다.\n내보내기로 생성된 .json 파일을 선택해 주세요.', 'bg-red-50 text-red-500');
        }
    };
    reader.readAsText(file);
}

function confirmFullReset() {
    showCustomConfirm(
        '⚠️ 전체 초기화',
        '모든 데이터가 완전히 삭제됩니다.\n\n· 아이 이름\n· 모든 일과 항목\n· 달성 기록 및 스티커\n· 보상 교환권 목록 및 내역\n· 앱 제목\n\n이 작업은 되돌릴 수 없습니다.\n정말 초기화하시겠습니까?',
        () => {
            // 2차 확인
            showCustomConfirm(
                '🚨 마지막 확인',
                '정말로 모든 데이터를 삭제할까요?\n백업이 없으면 복구 불가합니다.',
                () => {
                    const keysToRemove = [
                        'kids_routine_local_data',
                        'kids_sticker_store',
                        'kids_rewarded_dates_v2',
                        'kids_names',
                        'kids_daily_records',
                        'kids_streak_store',
                        'kids_reward_items',
                        'kids_reward_exchanges',
                        'kids_app_title',
                        'kids_app_subtitle',
                        'kids_child_count',
                        'kids_parent_password',
                        'kids_reward_log',
                    ];
                    keysToRemove.forEach(k => localStorage.removeItem(k));

                    // 메모리 변수도 초기화
                    kidNames        = { child_1:'자녀1', child_2:'자녀2', child_3:'자녀3' };
                    childCount      = 1;
                    currentProfile  = 'child_1';
                    localTaskStore  = JSON.parse(JSON.stringify(sampleTaskStore));
                    localStickerStore = { child_1:0, child_2:0, child_3:0 };
                    rewardedDates   = { child_1:[], child_2:[], child_3:[] };
                    dailyRecordStore= { child_1:{}, child_2:{}, child_3:{} };
                    streakStore     = { child_1:{}, child_2:{}, child_3:{} };
                    rewardItems     = [];
                    rewardExchanges = { child_1:[], child_2:[], child_3:[] };
                    appTitle        = '일과 매니저';
                    appSubtitle     = '모든 일과를 끝마치고 멋진 스티커를 획득해요!';
                    parentPassword  = '1234';
                    celebratedSet.clear();

                    // 빈 상태로 localStorage 저장 (재로드 시 샘플 데이터 방지)
                    saveToLocalStorage();
                    saveStickerStore();
                    saveRewardedDates();
                    saveKidNames();
                    saveDailyRecords();
                    saveStreakStore();
                    saveRewardItems();
                    saveRewardExchanges();
                    localStorage.setItem('kids_child_count', '1');
                    localStorage.setItem('kids_app_title', appTitle);
                    localStorage.setItem('kids_app_subtitle', appSubtitle);

                    // 모달 닫고 전체 리렌더
                    document.getElementById('parent-admin-view').classList.add('hidden');
                    applyAppTitles();
                    renderProfileSwitcher();
                    switchProfile('child_1');
                    renderApp();
                    showCustomAlert('✅ 초기화 완료', '모든 데이터가 삭제되었습니다.', 'bg-emerald-50 text-emerald-500');
                },
                'bg-red-50 text-red-500'
            );
        },
        'bg-red-50 text-red-500'
    );
}

function closeAdminView() {
    document.getElementById('parent-admin-view').classList.add('hidden');
    renderApp();
}

// ============================================================
// 커스텀 모달
// ============================================================
function showCustomAlert(title, msg, ic="bg-indigo-50 text-indigo-500") {
    document.getElementById('custom-alert-title').innerText = title;
    document.getElementById('custom-alert-message').innerText = msg;
    document.getElementById('custom-alert-icon').className = `w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3.5 text-lg ${ic}`;
    document.getElementById('custom-alert-modal').classList.remove('hidden');
}
function closeCustomAlert() { document.getElementById('custom-alert-modal').classList.add('hidden'); }

function showCustomConfirm(title, msg, onYes, ic="bg-red-50 text-red-500") {
    document.getElementById('custom-confirm-title').innerText = title;
    document.getElementById('custom-confirm-message').innerText = msg;
    document.getElementById('custom-confirm-icon').className = `w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3.5 text-lg ${ic}`;
    document.getElementById('custom-confirm-yes-btn').onclick = () => {
        closeCustomConfirm();
        setTimeout(() => onYes(), 50); // 닫힌 후 콜백 실행
    };
    document.getElementById('custom-confirm-modal').classList.remove('hidden');
}
function closeCustomConfirm() { document.getElementById('custom-confirm-modal').classList.add('hidden'); }

let newPasswordInput = "";
function openChangePasswordModal() { newPasswordInput=""; updateNewPasswordIndicators(); document.getElementById('password-change-modal').classList.remove('hidden'); }
function closeChangePasswordModal() { document.getElementById('password-change-modal').classList.add('hidden'); }
function pressNewPassKey(num) {
    if (newPasswordInput.length < 4) { newPasswordInput += num; updateNewPasswordIndicators(); }
    if (newPasswordInput.length === 4) {
        setTimeout(() => {
            parentPassword = newPasswordInput;
            localStorage.setItem('kids_parent_password', newPasswordInput);
            closeChangePasswordModal();
            showCustomAlert("✅ 비밀번호 변경 완료","부모 모드 비밀번호가 변경되었습니다.","bg-emerald-50 text-emerald-500");
        }, 200);
    }
}
function clearNewPassKeys() { newPasswordInput=""; updateNewPasswordIndicators(); }
function updateNewPasswordIndicators() {
    const inds = document.getElementById('new-pass-indicator').children;
    for (let i=0;i<4;i++) inds[i].className = i<newPasswordInput.length ? "h-3 rounded-full bg-emerald-500 transition-all scale-105" : "h-3 rounded-full bg-slate-200 transition-all";
}

function openResetConfirmModal() {
    showCustomConfirm("🚨 현재 날짜 진행상황을 초기화할까요?","현재 화면에 표시된 날짜의 달성도가 0%로 초기화됩니다.\n(해당 날짜에 획득한 스티커도 회수됩니다.)", () => {
        const dateStr = fmtDate(currentDate);
        for (let key in localTaskStore) {
            localTaskStore[key].forEach(t => {
                if(t.completed_dates) {
                    t.completed_dates = t.completed_dates.filter(d => d !== dateStr);
                }
            });
            if (rewardedDates[key].includes(dateStr)) {
                rewardedDates[key] = rewardedDates[key].filter(d => d !== dateStr);
                localStickerStore[key] = Math.max(0, localStickerStore[key] - 1);
            }
        }
        saveToLocalStorage(); saveRewardedDates(); saveStickerStore();
        renderAdminView(); renderApp();
        showCustomAlert("🧹 리셋 완료",`${dateStr}의 일과가 리셋되었습니다.`,"bg-emerald-50 text-emerald-500");
    });
}

function confirmDeleteLocalTask(index) {
    showCustomConfirm("🗑️ 일과 삭제","이 일과 항목을 루틴 목록에서 영구 제거하시겠습니까?", () => {
        localTaskStore[currentProfile].splice(index, 1);
        saveToLocalStorage(); renderAdminView(); renderApp();
    });
}

// ============================================================
// 일과 항목 수정
// ============================================================
let taskEmojiTargetId = null; // 'new' or task id (현재는 수정용으로만 사용)
let tepEmojiCategory = 'morning'; // 일과 수정 모달 전용 카테고리 상태 (새 일과 추가 폼의 currentEmojiCategory와 분리)

function startEditTask(id) {
    const task = localTaskStore[currentProfile].find(t => t.id === id);
    if (!task) return;
    const row = document.getElementById(`task-row-${id}`);
    if (!row) return;
    const categoryOptions = [
        { value: 'morning',   label: '☀️ 아침 일과' },
        { value: 'afternoon', label: '🏠 귀가 일과' },
        { value: 'evening',   label: '🌙 저녁 일과' },
    ].map(o => `<option value="${o.value}" ${task.category === o.value ? 'selected' : ''}>${o.label}</option>`).join('');

    row.innerHTML = `
        <button type="button" id="edit-task-emoji-btn-${id}"
            onclick="toggleTaskEmojiPicker(${id})"
            class="w-10 h-8 text-xl bg-indigo-50 border border-indigo-300 rounded-lg hover:bg-indigo-100 transition-all focus:outline-none">
            ${task.emoji}
        </button>
        <input type="hidden" id="edit-task-emoji-${id}" value="${task.emoji}"/>
        <select id="edit-task-category-${id}"
            class="text-[11px] font-semibold bg-indigo-50 border border-indigo-300 rounded-lg px-1.5 py-1 focus:outline-none focus:border-indigo-500">
            ${categoryOptions}
        </select>
        <input id="edit-task-name-${id}" value="${task.name}"
            class="flex-1 min-w-0 text-xs font-semibold bg-indigo-50 border border-indigo-300 rounded-lg px-2 py-1 focus:outline-none focus:border-indigo-500"/>
        <button onclick="saveEditTask(${id})" class="text-xs text-white bg-indigo-500 hover:bg-indigo-600 font-bold px-2 py-1 rounded-lg transition-all shrink-0">저장</button>
        <button onclick="renderAdminView()" class="text-xs text-slate-400 hover:text-slate-600 font-bold px-1 shrink-0">취소</button>
    `;
    document.getElementById(`edit-task-name-${id}`).focus();
}

function saveEditTask(id) {
    const emoji    = document.getElementById(`edit-task-emoji-${id}`).value.trim() || '📝';
    const category = document.getElementById(`edit-task-category-${id}`).value;
    const name     = document.getElementById(`edit-task-name-${id}`).value.trim();
    if (!name) { showCustomAlert("⚠️ 입력 확인", "일과 내용을 입력해 주세요!"); return; }
    const task = localTaskStore[currentProfile].find(t => t.id === id);
    if (task) { task.emoji = emoji; task.category = category; task.name = name; }
    saveToLocalStorage();
    renderAdminView(); renderApp();
}

// 일과 수정 시 사용하는 이모지 피커 (보상 모달과 동일한 모달을 일과용 카테고리로 재사용)
function toggleTaskEmojiPicker(targetId) {
    taskEmojiTargetId = targetId;
    tepEmojiCategory = 'morning';
    renderTaskEmojiModalTabs();
    renderTaskEmojiModalGrid();
    document.getElementById('task-emoji-picker-modal').classList.remove('hidden');
}
function closeTaskEmojiPicker(e) {
    if (e && e.target !== document.getElementById('task-emoji-picker-modal')) return;
    document.getElementById('task-emoji-picker-modal').classList.add('hidden');
}
function setTaskEmojiModalCategory(cat) {
    tepEmojiCategory = cat;
    renderTaskEmojiModalTabs();
    renderTaskEmojiModalGrid();
}
function renderTaskEmojiModalTabs() {
    const catColors = { morning:'bg-amber-100 text-amber-700', home:'bg-indigo-100 text-indigo-700', evening:'bg-violet-100 text-violet-700', study:'bg-blue-100 text-blue-700', health:'bg-emerald-100 text-emerald-700', fun:'bg-pink-100 text-pink-700', etc:'bg-slate-200 text-slate-700' };
    document.querySelectorAll('.tep-tab').forEach(el => {
        const cat = el.dataset.cat;
        el.className = `tep-tab px-2.5 py-1 text-[11px] font-bold rounded-lg ${tepEmojiCategory === cat ? catColors[cat] : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`;
    });
}
function renderTaskEmojiModalGrid() {
    const grid = document.getElementById('task-emoji-picker-grid');
    if (!grid) return;
    grid.innerHTML = '';
    const emojis = emojiCategories[tepEmojiCategory] || emojiCategories.etc;
    emojis.forEach(e => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'text-xl p-1.5 rounded-lg hover:bg-indigo-50 hover:scale-110 transition-all';
        btn.innerText = e;
        btn.onclick = () => selectTaskEditEmoji(e);
        grid.appendChild(btn);
    });
}
function selectTaskEditEmoji(emoji) {
    if (taskEmojiTargetId !== null) {
        const input = document.getElementById(`edit-task-emoji-${taskEmojiTargetId}`);
        if (input) input.value = emoji;
        const btn = document.getElementById(`edit-task-emoji-btn-${taskEmojiTargetId}`);
        if (btn) btn.innerText = emoji;
    }
    document.getElementById('task-emoji-picker-modal').classList.add('hidden');
}

function confirmDeleteLocalTaskById(id) {
    showCustomConfirm("🗑️ 일과 삭제","이 일과 항목을 루틴 목록에서 영구 제거하시겠습니까?", () => {
        localTaskStore[currentProfile] = localTaskStore[currentProfile].filter(t => t.id !== id);
        saveToLocalStorage(); renderAdminView(); renderApp();
    });
}

// 관리자 화면에서 같은 분류(아침/귀가/저녁) 안에서 드래그로 순서를 바꾸면 호출됨.
// 화면에 보이는 새 순서를 읽어서 localTaskStore에 반영하고, 메인 일과 화면도 즉시 갱신한다.
function reorderCategoryTasks(category, listEl) {
    const newIds = Array.from(listEl.children)
        .map(el => el.dataset && el.dataset.taskId)
        .filter(Boolean)
        .map(Number);

    const tasksById = {};
    localTaskStore[currentProfile].forEach(t => { tasksById[t.id] = t; });
    const newCategoryOrder = newIds.map(id => tasksById[id]).filter(Boolean);

    const categoryOrder = ['morning', 'afternoon', 'evening'];
    const rebuilt = [];
    categoryOrder.forEach(cat => {
        if (cat === category) {
            rebuilt.push(...newCategoryOrder);
        } else {
            rebuilt.push(...localTaskStore[currentProfile].filter(t => t.category === cat));
        }
    });

    localTaskStore[currentProfile] = rebuilt;
    saveToLocalStorage();
    renderApp();
}
