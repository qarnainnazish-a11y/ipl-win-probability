// ------- Fixture list for main page -------

const fixtures = [
  {
    id: "match-1",
    dayTag: "OPENING NIGHT",
    date: "2026-03-28",
    timeLocal: "19:30 IST",
    venue: "Chennai",
    ground: "MA Chidambaram Stadium",
    teamA: "CSK",
    teamB: "RCB",
    teamAName: "Chennai Super Kings",
    teamBName: "Royal Challengers Bengaluru",
    teamAForm: 0.74,
    teamBForm: 0.61,
    venueBatFirstTilt: 0.62,
    venueChaseTilt: 0.38,
    h2hAWinRate: 0.56,
    h2hBWinRate: 0.44,
    avgFirstInnings: 168,
    totalMatchesAtVenue: 82,
    isNight: true
  },
  {
    id: "match-2",
    dayTag: "DOUBLE HEADER",
    date: "2026-03-29",
    timeLocal: "15:30 IST",
    venue: "Mumbai (WS)",
    ground: "Wankhede Stadium",
    teamA: "MI",
    teamB: "GT",
    teamAName: "Mumbai Indians",
    teamBName: "Gujarat Titans",
    teamAForm: 0.68,
    teamBForm: 0.7,
    venueBatFirstTilt: 0.47,
    venueChaseTilt: 0.53,
    h2hAWinRate: 0.48,
    h2hBWinRate: 0.52,
    avgFirstInnings: 179,
    totalMatchesAtVenue: 79,
    isNight: false
  },
  {
    id: "match-3",
    dayTag: "NORTH RIVALRY",
    date: "2026-03-29",
    timeLocal: "19:30 IST",
    venue: "Delhi",
    ground: "Arun Jaitley Stadium",
    teamA: "DC",
    teamB: "KKR",
    teamAName: "Delhi Capitals",
    teamBName: "Kolkata Knight Riders",
    teamAForm: 0.6,
    teamBForm: 0.65,
    venueBatFirstTilt: 0.52,
    venueChaseTilt: 0.48,
    h2hAWinRate: 0.49,
    h2hBWinRate: 0.51,
    avgFirstInnings: 165,
    totalMatchesAtVenue: 70,
    isNight: true
  },
  {
    id: "match-4",
    dayTag: "HIGH SCORER",
    date: "2026-03-30",
    timeLocal: "19:30 IST",
    venue: "Bengaluru",
    ground: "M. Chinnaswamy Stadium",
    teamA: "RCB",
    teamB: "SRH",
    teamAName: "Royal Challengers Bengaluru",
    teamBName: "Sunrisers Hyderabad",
    teamAForm: 0.61,
    teamBForm: 0.63,
    venueBatFirstTilt: 0.45,
    venueChaseTilt: 0.55,
    h2hAWinRate: 0.45,
    h2hBWinRate: 0.55,
    avgFirstInnings: 187,
    totalMatchesAtVenue: 82,
    isNight: true
  },
  {
    id: "match-5",
    dayTag: "SPIN ASSIST",
    date: "2026-03-31",
    timeLocal: "19:30 IST",
    venue: "Jaipur",
    ground: "Sawai Mansingh Stadium",
    teamA: "RR",
    teamB: "LSG",
    teamAName: "Rajasthan Royals",
    teamBName: "Lucknow Super Giants",
    teamAForm: 0.67,
    teamBForm: 0.58,
    venueBatFirstTilt: 0.58,
    venueChaseTilt: 0.42,
    h2hAWinRate: 0.55,
    h2hBWinRate: 0.45,
    avgFirstInnings: 162,
    totalMatchesAtVenue: 53,
    isNight: true
  },
  {
    id: "match-6",
    dayTag: "RUN FEST?",
    date: "2026-04-01",
    timeLocal: "19:30 IST",
    venue: "Mohali",
    ground: "IS Bindra Stadium",
    teamA: "PBKS",
    teamB: "MI",
    teamAName: "Punjab Kings",
    teamBName: "Mumbai Indians",
    teamAForm: 0.54,
    teamBForm: 0.68,
    venueBatFirstTilt: 0.51,
    venueChaseTilt: 0.49,
    h2hAWinRate: 0.4,
    h2hBWinRate: 0.6,
    avgFirstInnings: 172,
    totalMatchesAtVenue: 60,
    isNight: true
  }
];

let currentMatchId = null;
let predictionMode = "simple";
let userPicks = loadUserPicks();

// ------- Local storage helpers -------

function loadUserPicks() {
  try {
    const raw = localStorage.getItem("ipl-2026-picks");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function saveUserPicks() {
  try {
    localStorage.setItem("ipl-2026-picks", JSON.stringify(userPicks));
  } catch {
    // ignore
  }
}

// ------- Common helpers -------

function setTodayLabel() {
  const today = new Date();
  const label = today.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
  const el = document.getElementById("todayLabel");
  if (el) el.textContent = label;
}

// ------- Main page: fixtures list -------

function renderMatches() {
  const listEl = document.getElementById("matchesList");
  if (!listEl) return;
  listEl.innerHTML = "";

  fixtures.forEach((fx) => {
    const card = document.createElement("article");
    card.className = "match-card";
    card.dataset.id = fx.id;

    const main = document.createElement("div");
    main.className = "match-main";

    const row1 = document.createElement("div");
    row1.className = "match-row";

    const teamTagA = document.createElement("div");
    teamTagA.className = "team-tag";
    teamTagA.innerHTML = `
      <span class="team-pill">${fx.teamA[0]}</span>
      <span>${fx.teamA}</span>
    `;

    const vs = document.createElement("div");
    vs.className = "vs";
    vs.textContent = "vs";

    const teamTagB = document.createElement("div");
    teamTagB.className = "team-tag";
    teamTagB.innerHTML = `
      <span class="team-pill">${fx.teamB[0]}</span>
      <span>${fx.teamB}</span>
    `;

    row1.appendChild(teamTagA);
    row1.appendChild(vs);
    row1.appendChild(teamTagB);

    const row2 = document.createElement("div");
    row2.className = "match-meta";
    const meta1 = document.createElement("span");
    meta1.textContent = `${fx.ground}, ${fx.venue}`;
    const meta2 = document.createElement("span");
    meta2.textContent = `${fx.date} • ${fx.timeLocal}`;
    const meta3 = document.createElement("span");
    meta3.className = "meta-chip";
    meta3.textContent = fx.dayTag;

    row2.appendChild(meta1);
    row2.appendChild(meta2);
    row2.appendChild(meta3);

    main.appendChild(row1);
    main.appendChild(row2);

    const formCol = document.createElement("div");
    formCol.className = "form-rows";
    formCol.innerHTML = `
      <div class="form-row">
        <div class="form-label">
          <span>Form index</span>
          <div>${fx.teamA} vs ${fx.teamB}</div>
        </div>
        <div class="form-value">
          ${Math.round(fx.teamAForm * 100)} / ${Math.round(fx.teamBForm * 100)}
        </div>
      </div>
      <div class="form-row">
        <div class="form-label">
          <span>Venue tilt</span>
          <div>Bat first vs chase</div>
        </div>
        <div class="form-value">
          ${Math.round(fx.venueBatFirstTilt * 100)}% / ${Math.round(fx.venueChaseTilt * 100)}%
        </div>
      </div>
    `;

    const actionCol = document.createElement("div");
    actionCol.innerHTML = `
      <button type="button" class="btn-primary">
        Analyse
      </button>
    `;

    card.appendChild(main);
    card.appendChild(formCol);
    card.appendChild(actionCol);

    card.addEventListener("click", () => {
      selectMatch(fx.id);
    });

    listEl.appendChild(card);
  });
}

function selectMatch(id) {
  currentMatchId = id;
  const match = fixtures.find((f) => f.id === id);
  if (!match) return;

  document
    .querySelectorAll(".match-card")
    .forEach((el) => el.classList.remove("selected"));
  const selectedCard = document.querySelector(`.match-card[data-id="${id}"]`);
  if (selectedCard) selectedCard.classList.add("selected");

  const titleEl = document.getElementById("selectedMatchTitle");
  if (titleEl) {
    titleEl.textContent = `${match.teamAName} vs ${match.teamBName} · ${match.ground}, ${match.venue} · ${match.date} ${match.timeLocal}`;
  }

  document.getElementById("probTeamA").textContent = match.teamA;
  document.getElementById("probTeamB").textContent = match.teamB;
  document.getElementById("probAFavour").textContent = match.teamA;
  document.getElementById("probBFavour").textContent = match.teamB;

  const probs = computeProbabilities(match, predictionMode);
  applyProbabilities(match, probs);
  renderFanPoll(match, probs);
  updateFanPollMeta(match, probs);
}

// ------- Core probability engine -------

function computeProbabilities(match, mode) {
  const formDiff = match.teamAForm - match.teamBForm;
  const h2hDiff = match.h2hAWinRate - match.h2hBWinRate;
  const venueTiltA = match.venueBatFirstTilt;
  const venueTiltB = match.venueChaseTilt;

  let baseA = 0.5 + formDiff * 0.25 + h2hDiff * 0.2;
  if (mode === "advanced") {
    baseA += (venueTiltA - 0.5) * 0.18;
  } else {
    baseA += (venueTiltA - 0.5) * 0.08;
  }

  let probA = baseA;
  let probB = 1 - probA;

  probA = Math.max(0.25, Math.min(0.75, probA));
  probB = 1 - probA;

  const probAperc = Math.round(probA * 100);
  const probBperc = 100 - probAperc;

  const edge = Math.abs(probAperc - probBperc);

  const avg = match.avgFirstInnings;
  let minScore = Math.round(avg - 15);
  let maxScore = Math.round(avg + 15);

  if (match.venueBatFirstTilt > 0.55) {
    maxScore += 10;
  } else if (match.venueChaseTilt > 0.55) {
    minScore -= 5;
  }

  minScore = Math.max(130, minScore);
  maxScore = Math.min(230, maxScore);

  const formPulse =
    match.teamAForm > match.teamBForm
      ? `${match.teamA} slightly warmer`
      : match.teamBForm > match.teamAForm
      ? `${match.teamB} slightly warmer`
      : "Evenly balanced";

  let groundTilt = "Neutral";
  const diffTilt = match.venueBatFirstTilt - match.venueChaseTilt;
  if (diffTilt > 0.08) groundTilt = "Bat-first friendly";
  else if (diffTilt < -0.08) groundTilt = "Chase-friendly";

  return {
    probAperc,
    probBperc,
    edge,
    minScore,
    maxScore,
    groundTilt,
    formPulse
  };
}

// ------- Gauge + fan poll -------

function applyProbabilities(match, probs) {
  const barFill = document.getElementById("probBarFill");

  const { probAperc, probBperc, edge, minScore, maxScore, groundTilt, formPulse } = probs;

  const aFrac = probAperc / 100;
  barFill.style.setProperty("--a", `${aFrac * 100}%`);
  barFill.style.setProperty("--b", `${(1 - aFrac) * 100}%`);

  document.getElementById("probAValue").textContent = `${probAperc}%`;
  document.getElementById("probBValue").textContent = `${probBperc}%`;

  const modelEdgeEl = document.getElementById("modelEdge");
  modelEdgeEl.textContent =
    edge < 8
      ? "Tight toss-up"
      : edge < 15
      ? `Mild lean (${edge} pts)`
      : `Clear tilt (${edge} pts)`;

  document.getElementById("scoreBand").textContent = `${minScore} – ${maxScore}`;
  document.getElementById("groundTilt").textContent = groundTilt;
  document.getElementById("formPulse").textContent = formPulse;
}

function renderFanPoll(match, probs) {
  const optionsEl = document.getElementById("fanPollOptions");
  optionsEl.innerHTML = "";

  const aLabel = `${match.teamA} to win`;
  const bLabel = `${match.teamB} to win`;
  const tieLabel = "Super over / washout";

  const options = [
    { id: "A", label: aLabel },
    { id: "B", label: bLabel },
    { id: "X", label: tieLabel }
  ];

  const pickKey = `${match.id}`;
  const existing = userPicks.find((p) => p.matchId === pickKey);

  options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "fan-option";
    btn.dataset.opt = opt.id;
    btn.textContent = opt.label;

    if (existing && existing.pick === opt.id) {
      btn.classList.add("selected");
    }

    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".fan-option")
        .forEach((el) => el.classList.remove("selected"));
      btn.classList.add("selected");
      updateFanPollMeta(match, probs, opt.id);
    });

    optionsEl.appendChild(btn);
  });

  if (!existing) {
    updateFanPollMeta(match, probs, null);
  } else {
    updateFanPollMeta(match, probs, existing.pick);
  }
}

function updateFanPollMeta(match, probs, chosenOpt = null) {
  const hintEl = document.getElementById("fanPollHint");
  const rightEl = document.getElementById("fanPollMetaRight");

  if (!currentMatchId) {
    hintEl.textContent = "Select a match first.";
    rightEl.textContent = "";
    return;
  }

  let baseHint = "";
  if (!chosenOpt) {
    baseHint = "Click a team above to record your fun prediction.";
  } else if (chosenOpt === "A") {
    baseHint = `You are backing ${match.teamAName}.`;
  } else if (chosenOpt === "B") {
    baseHint = `You are backing ${match.teamBName}.`;
  } else {
    baseHint = "You are expecting a thriller / weather twist.";
  }

  const lean =
    probs.probAperc > probs.probBperc
      ? `${match.teamA} edge`
      : probs.probBperc > probs.probAperc
      ? `${match.teamB} edge`
      : "Pure coin toss";

  hintEl.textContent = baseHint;
  rightEl.textContent = `Model view: ${lean}, ${probs.probAperc}/${probs.probBperc}.`;
}

function saveCurrentPick() {
  if (!currentMatchId) return;
  const match = fixtures.find((f) => f.id === currentMatchId);
  if (!match) return;

  const selectedBtn = document.querySelector(".fan-option.selected");
  if (!selectedBtn) {
    alert("Choose a fun pick (team or super over) before saving.");
    return;
  }
  const opt = selectedBtn.dataset.opt;

  const existingIndex = userPicks.findIndex((p) => p.matchId === match.id);
  const payload = {
    matchId: match.id,
    matchTitle: `${match.teamA} vs ${match.teamB}`,
    venue: `${match.ground}, ${match.venue}`,
    dateTime: `${match.date} ${match.timeLocal}`,
    pick: opt,
    savedAt: new Date().toISOString()
  };

  if (existingIndex >= 0) {
    userPicks[existingIndex] = payload;
  } else {
    userPicks.push(payload);
  }

  saveUserPicks();
  renderUserPicks();
}

function renderUserPicks() {
  const listEl = document.getElementById("userPredictionsList");
  const countEl = document.getElementById("savedCount");
  if (!listEl || !countEl) return;

  if (!userPicks.length) {
    listEl.innerHTML = `<span class="user-pred-pill">No picks yet. Save a prediction from the right panel.</span>`;
    countEl.textContent = "0 picks";
    return;
  }

  listEl.innerHTML = "";
  userPicks.forEach((p) => {
    const pill = document.createElement("div");
    pill.className = "user-pred-pill";

    let pickLabel =
      p.pick === "A"
        ? "Team A"
        : p.pick === "B"
        ? "Team B"
        : "Super over / washout";

    pill.innerHTML = `
      <strong>${p.matchTitle}</strong>
      <span>· ${p.dateTime}</span>
      <span>· ${pickLabel}</span>
    `;

    listEl.appendChild(pill);
  });

  countEl.textContent = `${userPicks.length} pick${userPicks.length > 1 ? "s" : ""}`;
}

function resetAll() {
  currentMatchId = null;
  renderUserPicks();

  document
    .querySelectorAll(".match-card")
    .forEach((el) => el.classList.remove("selected"));
  const fanOptionsEl = document.getElementById("fanPollOptions");
  if (fanOptionsEl) fanOptionsEl.innerHTML = "";
  const hintEl = document.getElementById("fanPollHint");
  const rightEl = document.getElementById("fanPollMetaRight");
  if (hintEl) hintEl.textContent = "Select a match first.";
  if (rightEl) rightEl.textContent = "";
  const titleEl = document.getElementById("selectedMatchTitle");
  if (titleEl) {
    titleEl.textContent =
      "Select a match on the left to see model output.";
  }

  const barFill = document.getElementById("probBarFill");
  if (barFill) {
    barFill.style.setProperty("--a", "50%");
    barFill.style.setProperty("--b", "50%");
  }

  const ids = [
    "probTeamA",
    "probTeamB",
    "probAFavour",
    "probBFavour",
    "probAValue",
    "probBValue",
    "modelEdge",
    "scoreBand",
    "groundTilt",
    "formPulse"
  ];
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (id === "probTeamA" || id === "probTeamB" || id === "probAFavour" || id === "probBFavour") {
      el.textContent = "Team " + (id.includes("A") ? "A" : "B");
    } else if (id === "modelEdge") {
      el.textContent = "–";
    } else if (id === "probAValue" || id === "probBValue") {
      el.textContent = "–%";
    } else {
      el.textContent = "–";
    }
  });
}

function setMode(mode) {
  predictionMode = mode;
  const simpleBtn = document.getElementById("modeSimpleBtn");
  const advBtn = document.getElementById("modeAdvancedBtn");
  if (simpleBtn && advBtn) {
    simpleBtn.classList.toggle("active", mode === "simple");
    advBtn.classList.toggle("active", mode === "advanced");
  }

  if (currentMatchId) {
    const match = fixtures.find((f) => f.id === currentMatchId);
    const probs = computeProbabilities(match, predictionMode);
    applyProbabilities(match, probs);
    updateFanPollMeta(match, probs);
  }
}

// ------- Init (main page only) -------

function init() {
  setTodayLabel();
  renderMatches();
  renderUserPicks();
  resetAll();
}

document.addEventListener("DOMContentLoaded", init);
