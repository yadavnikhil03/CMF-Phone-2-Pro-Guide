const guideMeta = {
  landing: { titleEn: "Landing", titleHi: "Landing", file: "wiki/landing.md" },
  tools: { titleEn: "Tools and Drivers Setup", titleHi: "Tools aur Drivers Setup", file: "wiki/tools.md" },
  unlock: { titleEn: "Unlock Bootloader", titleHi: "Bootloader Unlock", file: "wiki/unlock.md" },
  backup: { titleEn: "Backup and Restore", titleHi: "Backup aur Restore", file: "wiki/backup-restore.md" },
  rootMagisk: { titleEn: "Root with Magisk", titleHi: "Magisk se Root", file: "wiki/root-magisk.md" },
  rooting: { titleEn: "Rooting Full Guide", titleHi: "Rooting Full Guide", file: "wiki/rooting.md" },
  ota: { titleEn: "OTA Sideload", titleHi: "OTA Sideload", file: "wiki/ota-sideload.md" },
  stock: { titleEn: "Stock ROM Flashing", titleHi: "Stock ROM Flash", file: "wiki/stock-rom.md" },
  recovery: { titleEn: "Recovery Guide", titleHi: "Recovery Guide", file: "wiki/recovery.md" },
  troubleshoot: { titleEn: "Troubleshooting", titleHi: "Troubleshooting", file: "wiki/troubleshooting.md" },
  faq: { titleEn: "FAQ", titleHi: "FAQ", file: "wiki/faq.md" },
  resources: { titleEn: "Resource Index", titleHi: "Resource Index", file: "wiki/resource-index.md" },
  button: { titleEn: "Essential Button Remap", titleHi: "Essential Button Remap", file: "wiki/essential-button-remap.md" },
  privateSpace: { titleEn: "Private Space Reset", titleHi: "Private Space Reset", file: "wiki/private-space-reset.md" },
  dexopt: { titleEn: "Dexopt Optimization", titleHi: "Dexopt Optimization", file: "wiki/dexopt.md" },
  customRom: { titleEn: "Custom ROM", titleHi: "Custom ROM", file: "wiki/custom-rom.md" }
};

const routes = {
  starter: ["landing", "tools", "unlock", "backup", "faq", "resources"],
  root: ["tools", "unlock", "backup", "rootMagisk", "rooting", "ota", "troubleshoot"],
  ota: ["backup", "ota", "rootMagisk", "troubleshoot", "faq"],
  stock: ["tools", "stock", "recovery", "backup", "troubleshoot"],
  repair: ["troubleshoot", "recovery", "stock", "privateSpace", "button", "faq"]
};

const labels = {
  en: {
    eyebrow: "FOR NEW + ADVANCED USERS",
    heroTitle: "Pick your goal.<br>Follow a clean sequence.",
    heroSub: "This flow builder turns your guide into clear paths so users never get stuck wondering where to start.",
    reset: "Reset Progress",
    pathHeading: "Recommended Path",
    quickHeading: "Quick Access",
    previewHeading: "Guide Preview",
    openFull: "Open full page",
    previewPrompt: "Select a step and click Preview to load guide content here.",
    loading: "Loading guide...",
    loadFailed: "Could not load this guide page in preview. Use Open full page instead.",
    preview: "Preview",
    open: "Open",
    done: "Done",
    undo: "Undo",
    progress: "complete",
    goals: {
      starter: "I am new, start safe",
      root: "I want root access",
      ota: "I need OTA on rooted device",
      stock: "I want to return to stock",
      repair: "I am troubleshooting issues"
    },
    decisionTitle: "Smart Start",
    decisionPill: "Answer quick questions",
    yes: "Yes",
    no: "No",
    usePath: "Use this path",
    decisionPrefix: "Recommended by smart start:",
    decisionQuestions: {
      q1: "Do you want root-level changes on your phone?",
      q2: "Do you need to keep OTA updates working after root?",
      q3: "Is your phone unstable, bootlooping, or failing updates right now?",
      q4: "Do you want a fully clean stock firmware setup?"
    }
  },
  hi: {
    eyebrow: "NAYE AUR ADVANCED USERS KE LIYE",
    heroTitle: "Apna goal chuno.<br>Step by step flow follow karo.",
    heroSub: "Yeh flow builder guide ko clear paths me convert karta hai taaki start point confuse na kare.",
    reset: "Progress Reset",
    pathHeading: "Recommended Path",
    quickHeading: "Quick Access",
    previewHeading: "Guide Preview",
    openFull: "Full page kholo",
    previewPrompt: "Koi step select karke Preview dabao, content yahin load hoga.",
    loading: "Guide load ho raha hai...",
    loadFailed: "Preview load nahi hua. Open full page use karo.",
    preview: "Preview",
    open: "Open",
    done: "Done",
    undo: "Undo",
    progress: "complete",
    goals: {
      starter: "Main naya hoon, safe start",
      root: "Mujhe root access chahiye",
      ota: "Rooted device par OTA chahiye",
      stock: "Mujhe stock par wapas jana hai",
      repair: "Mujhe issues troubleshoot karne hain"
    },
    decisionTitle: "Smart Start",
    decisionPill: "Quick questions ka answer do",
    yes: "Haan",
    no: "Nahi",
    usePath: "Ye path use karo",
    decisionPrefix: "Smart start recommendation:",
    decisionQuestions: {
      q1: "Kya aap phone me root-level changes chahte ho?",
      q2: "Root ke baad OTA updates chalne chahiye?",
      q3: "Kya phone abhi unstable hai, bootloop ho raha hai, ya update fail ho raha hai?",
      q4: "Kya aapko bilkul clean stock firmware setup chahiye?"
    }
  }
};

const decisionFlow = {
  q1: { yes: "q2", no: "q3" },
  q2: { yes: "ota", no: "root" },
  q3: { yes: "repair", no: "q4" },
  q4: { yes: "stock", no: "starter" }
};

const stepList = document.getElementById("stepList");
const quickLinks = document.getElementById("quickLinks");
const progressStat = document.getElementById("progressStat");
const markdownView = document.getElementById("markdownView");
const openRaw = document.getElementById("openRaw");
const resetAll = document.getElementById("resetAll");
const goalButtons = [...document.querySelectorAll(".goal[data-goal]")];
const langButtons = [...document.querySelectorAll(".lang[data-lang]")];
const pathHeading = document.getElementById("pathHeading");
const quickHeading = document.getElementById("quickHeading");
const previewHeading = document.getElementById("previewHeading");
const eyebrowText = document.getElementById("eyebrowText");
const heroTitle = document.getElementById("heroTitle");
const heroSub = document.getElementById("heroSub");
const decisionTitle = document.getElementById("decisionTitle");
const decisionPill = document.getElementById("decisionPill");
const decisionQuestion = document.getElementById("decisionQuestion");
const decisionResult = document.getElementById("decisionResult");
const decisionYes = document.getElementById("decisionYes");
const decisionNo = document.getElementById("decisionNo");
const applyDecision = document.getElementById("applyDecision");

let activeGoal = "starter";
let activeLang = localStorage.getItem("cmf-lang") || "en";
let decisionNode = "q1";
let decisionGoal = "";

function txt(path) {
  const parts = path.split(".");
  let out = labels[activeLang] || labels.en;
  for (const part of parts) {
    out = out?.[part];
  }
  return out ?? "";
}

function titleFor(item) {
  return activeLang === "hi" ? item.titleHi : item.titleEn;
}

function keyFor(goal) {
  return `cmf-progress-${goal}`;
}

function readProgress(goal) {
  const raw = localStorage.getItem(keyFor(goal));
  return raw ? JSON.parse(raw) : {};
}

function writeProgress(goal, data) {
  localStorage.setItem(keyFor(goal), JSON.stringify(data));
}

function setGoal(goal) {
  activeGoal = goal;
  goalButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.goal === goal));
  renderRoute();
}

function renderStaticText() {
  document.documentElement.lang = activeLang;
  eyebrowText.textContent = txt("eyebrow");
  heroTitle.innerHTML = txt("heroTitle");
  heroSub.textContent = txt("heroSub");
  resetAll.textContent = txt("reset");
  pathHeading.textContent = txt("pathHeading");
  quickHeading.textContent = txt("quickHeading");
  previewHeading.textContent = txt("previewHeading");
  openRaw.textContent = txt("openFull");
  decisionTitle.textContent = txt("decisionTitle");
  decisionPill.textContent = txt("decisionPill");
  decisionYes.textContent = txt("yes");
  decisionNo.textContent = txt("no");
  applyDecision.textContent = txt("usePath");
  goalButtons.forEach((btn) => {
    const key = btn.dataset.goal;
    btn.textContent = txt(`goals.${key}`);
  });
  if (!markdownView.dataset.loaded) {
    markdownView.textContent = txt("previewPrompt");
  }
  langButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.lang === activeLang));
}

function renderRoute() {
  const sequence = routes[activeGoal] || [];
  const progress = readProgress(activeGoal);
  stepList.innerHTML = "";

  sequence.forEach((id, index) => {
    const item = guideMeta[id];
    if (!item) {
      return;
    }

    const row = document.createElement("div");
    row.className = `step ${progress[id] ? "done" : ""}`;
    row.style.setProperty("--d", `${index * 45}ms`);

    const doneLabel = progress[id] ? txt("undo") : txt("done");

    row.innerHTML = `
      <div class="step-index">${index + 1}</div>
      <div class="step-meta">
        <div class="step-title">${titleFor(item)}</div>
        <div class="step-file">${item.file}</div>
      </div>
      <div class="step-actions">
        <button class="btn primary" data-preview="${item.file}">${txt("preview")}</button>
        <a class="btn linkish" href="${item.file}" target="_blank" rel="noopener">${txt("open")}</a>
        <button class="btn success" data-done="${id}">${doneLabel}</button>
      </div>
    `;

    stepList.appendChild(row);
  });

  bindStepActions();
  renderQuickLinks();
  updateProgressStat();
}

function renderQuickLinks() {
  const keys = ["landing", "tools", "unlock", "rootMagisk", "ota", "stock", "troubleshoot", "faq"];
  quickLinks.innerHTML = keys
    .map((k) => guideMeta[k])
    .filter(Boolean)
    .map((item) => `<a class="quick-link" href="${item.file}" target="_blank" rel="noopener">${titleFor(item)}</a>`)
    .join("");
}

function updateProgressStat() {
  const sequence = routes[activeGoal] || [];
  const progress = readProgress(activeGoal);
  const completed = sequence.filter((id) => !!progress[id]).length;
  progressStat.textContent = `${completed} / ${sequence.length} ${txt("progress")}`;
}

function isGoal(node) {
  return Object.prototype.hasOwnProperty.call(routes, node);
}

function renderDecision() {
  if (isGoal(decisionNode)) {
    decisionGoal = decisionNode;
    decisionQuestion.textContent = "";
    decisionResult.textContent = `${txt("decisionPrefix")} ${txt(`goals.${decisionGoal}`)}`;
    applyDecision.hidden = false;
    decisionYes.disabled = true;
    decisionNo.disabled = true;
    return;
  }

  decisionGoal = "";
  decisionQuestion.textContent = txt(`decisionQuestions.${decisionNode}`);
  decisionResult.textContent = "";
  applyDecision.hidden = true;
  decisionYes.disabled = false;
  decisionNo.disabled = false;
}

function nextDecision(answer) {
  const branch = decisionFlow[decisionNode];
  if (!branch) {
    decisionNode = "q1";
    renderDecision();
    return;
  }

  decisionNode = answer === "yes" ? branch.yes : branch.no;
  renderDecision();
}

function resetDecision() {
  decisionNode = "q1";
  decisionGoal = "";
  renderDecision();
}

async function loadMarkdown(path) {
  try {
    markdownView.textContent = txt("loading");
    openRaw.href = path;
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed: ${response.status}`);
    }
    const markdown = await response.text();
    markdownView.innerHTML = marked.parse(markdown);
    markdownView.dataset.loaded = "yes";
    markdownView.scrollTop = 0;
  } catch (error) {
    markdownView.textContent = txt("loadFailed");
  }
}

function bindStepActions() {
  [...document.querySelectorAll("[data-preview]")].forEach((btn) => {
    btn.addEventListener("click", () => {
      const path = btn.getAttribute("data-preview");
      if (path) {
        loadMarkdown(path);
      }
    });
  });

  [...document.querySelectorAll("[data-done]")].forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-done");
      const current = readProgress(activeGoal);
      current[id] = !current[id];
      writeProgress(activeGoal, current);
      renderRoute();
    });
  });
}

goalButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const goal = btn.dataset.goal;
    if (goal) {
      setGoal(goal);
    }
  });
});

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const selected = btn.dataset.lang;
    if (!selected || selected === activeLang) {
      return;
    }
    activeLang = selected;
    localStorage.setItem("cmf-lang", activeLang);
    renderStaticText();
    renderRoute();
    renderDecision();
  });
});

decisionYes.addEventListener("click", () => nextDecision("yes"));
decisionNo.addEventListener("click", () => nextDecision("no"));

applyDecision.addEventListener("click", () => {
  if (!decisionGoal) {
    return;
  }
  setGoal(decisionGoal);
  resetDecision();
});

resetAll.addEventListener("click", () => {
  Object.keys(routes).forEach((goal) => localStorage.removeItem(keyFor(goal)));
  renderRoute();
  resetDecision();
});

renderStaticText();
renderRoute();
renderDecision();
loadMarkdown("wiki/landing.md");
