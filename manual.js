// Venue presets (approx last 6 seasons style) [web:39][web:42][web:43]
const venuePresets = {
  CHEP: { avgFirstInnings: 165, chaseWinRate: 0.45, tilt: "Bat-first friendly" },
  WANKHEDE: { avgFirstInnings: 178, chaseWinRate: 0.56, tilt: "Chase-friendly" },
  CHINNASWAMY: { avgFirstInnings: 185, chaseWinRate: 0.61, tilt: "Strong chase tilt" },
  ARUN_JAITLEY: { avgFirstInnings: 170, chaseWinRate: 0.55, tilt: "Slight chase tilt" },
  EDEN: { avgFirstInnings: 175, chaseWinRate: 0.52, tilt: "Neutral" },
  JAIPUR: { avgFirstInnings: 162, chaseWinRate: 0.47, tilt: "Bat-first friendly" },
  MOHALI: { avgFirstInnings: 175, chaseWinRate: 0.5, tilt: "Neutral" },
  AHMEDABAD: { avgFirstInnings: 180, chaseWinRate: 0.51, tilt: "Slight neutral-high" }
};

function computeProbabilitiesManual(match) {
  const formDiff = match.teamAForm - match.teamBForm;
  const h2hDiff = match.h2hAWinRate - match.h2hBWinRate;
  const venueTiltA = match.venueBatFirstTilt;

  let baseA = 0.5 + formDiff * 0.25 + h2hDiff * 0.2 + (venueTiltA - 0.5) * 0.18;

  let probA = baseA;
  probA = Math.max(0.25, Math.min(0.75, probA));
  const probB = 1 - probA;

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

  return { probAperc, probBperc, edge, minScore, maxScore, formPulse };
}

function runManualScenario() {
  const teamA = document.getElementById("manualTeamA").value;
  const teamB = document.getElementById("manualTeamB").value;
  const playersA = (document.getElementById("manualTeamAPlayers").value || "").trim();
  const playersB = (document.getElementById("manualTeamBPlayers").value || "").trim();
  const venueKey = document.getElementById("manualVenue").value;

  const formA = parseFloat(document.getElementById("manualFormA").value);
  const formB = parseFloat(document.getElementById("manualFormB").value);
  const h2hA = parseFloat(document.getElementById("manualH2HA").value);
  const h2hB = 1 - h2hA;

  const vPreset = venuePresets[venueKey] || venuePresets.WANKHEDE;

  const pseudoMatch = {
    teamA,
    teamB,
    teamAForm: formA,
    teamBForm: formB,
    h2hAWinRate: h2hA,
    h2hBWinRate: h2hB,
    venueBatFirstTilt: 1 - vPreset.chaseWinRate,
    venueChaseTilt: vPreset.chaseWinRate,
    avgFirstInnings: vPreset.avgFirstInnings
  };

  const probs = computeProbabilitiesManual(pseudoMatch);
  applyManualOutput(pseudoMatch, probs, playersA, playersB, vPreset);
}

function applyManualOutput(match, probs, playersA, playersB, vPreset) {
  document.getElementById("manualProbTeamA").textContent = match.teamA;
  document.getElementById("manualProbTeamB").textContent = match.teamB;
  document.getElementById("manualProbAFavour").textContent = match.teamA;
  document.getElementById("manualProbBFavour").textContent = match.teamB;

  const barFill = document.getElementById("manualProbBarFill");
  const aFrac = probs.probAperc / 100;
  barFill.style.setProperty("--a", `${aFrac * 100}%`);
  barFill.style.setProperty("--b", `${(1 - aFrac) * 100}%`);

  document.getElementById("manualProbAValue").textContent = `${probs.probAperc}%`;
  document.getElementById("manualProbBValue").textContent = `${probs.probBperc}%`;

  const edge = probs.edge;
  document.getElementById("manualModelEdge").textContent =
    edge < 8
      ? "Tight toss-up"
      : edge < 15
      ? `Mild lean (${edge} pts)`
      : `Clear tilt (${edge} pts)`;

  document.getElementById("manualScoreBand").textContent =
    `${probs.minScore} – ${probs.maxScore}`;

  document.getElementById("manualGroundTilt").textContent =
    `${vPreset.tilt} (chase win ~${Math.round(vPreset.chaseWinRate * 100)}%)`;

  const playersSummaryA = playersA ? `A: ${playersA}` : "";
  const playersSummaryB = playersB ? `B: ${playersB}` : "";
  const combo = [playersSummaryA, playersSummaryB].filter(Boolean).join(" | ");

  const formPulseText =
    combo && probs.formPulse !== "Evenly balanced"
      ? `${probs.formPulse} · ${combo}`
      : combo || probs.formPulse;

  document.getElementById("manualFormPulse").textContent = formPulseText || "Evenly balanced";

  document.getElementById("manualSelectedTitle").textContent =
    `${match.teamA} vs ${match.teamB} · manual custom scenario`;
}

function initManual() {
  const formAEl = document.getElementById("manualFormA");
  const formALabel = document.getElementById("manualFormALabel");
  const formBEl = document.getElementById("manualFormB");
  const formBLabel = document.getElementById("manualFormBLabel");
  const h2hEl = document.getElementById("manualH2HA");
  const h2hLabel = document.getElementById("manualH2HALabel");

  if (formAEl && formALabel) {
    formALabel.textContent = parseFloat(formAEl.value).toFixed(2);
    formAEl.addEventListener("input", () => {
      formALabel.textContent = parseFloat(formAEl.value).toFixed(2);
    });
  }
  if (formBEl && formBLabel) {
    formBLabel.textContent = parseFloat(formBEl.value).toFixed(2);
    formBEl.addEventListener("input", () => {
      formBLabel.textContent = parseFloat(formBEl.value).toFixed(2);
    });
  }
  if (h2hEl && h2hLabel) {
    h2hLabel.textContent = parseFloat(h2hEl.value).toFixed(2);
    h2hEl.addEventListener("input", () => {
      h2hLabel.textContent = parseFloat(h2hEl.value).toFixed(2);
    });
  }
}

document.addEventListener("DOMContentLoaded", initManual);
