const params = new URLSearchParams(window.location.search);
const chapterId = params.get("id") || "prologue";

const chapterContainer = document.getElementById("chapter");
const previousButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const COUNTER_BASE = "https://countapi.mileshilliard.com/api/v1";
const COUNTER_NAMESPACE = "reborn_hour_kawaii_pumkin_7f3a91";
const RAW_BASE = "https://raw.githubusercontent.com/KawaiiPumkin/Reborn-Hour/main/";

const BUILTIN_CHAPTERS = [
  ["prologue","The Angel Was Born","prologue.md"],
  ["chapter-01","A New Beginning","chapter-01.md"],
  ["chapter-02","The Quiet Employee","chapter-02.md"],
  ["chapter-03","You're Training Her","chapter-03.md"],
  ["chapter-04","You're Worse Than Me","chapter-04.md"],
  ["chapter-05","Don't Give Up","chapter-05.md"],
  ["chapter-06","The Smile","chapter-06.md"],
  ["chapter-07","Two Broken People","chapter-07.md"],
  ["chapter-08","The Apartment","chapter-08.md"],
  ["chapter-09","A Strange Advertisement","chapter-09.md"],
  ["chapter-10","Same Building","chapter-10.md"],
  ["chapter-11","Don't Let Me Cook","chapter-11.md"],
  ["chapter-12","Seo-jun Knows","chapter-12.md"],
  ["chapter-13","The First Shadow","chapter-13.md"],
  ["chapter-14","Someone From Before","chapter-14.md"],
  ["chapter-15","Min-seo","chapter-15.md"],
  ["chapter-16","The Difference","chapter-16.md"],
  ["chapter-16.5","Something She Couldn’t Ignore","chapter-16.5.md"],
  ["chapter-17","You Deserve It","chapter-17.md"]
].map(([id,title,file]) => ({id,title,file}));

function trackChapterRead(id) {
  const key = encodeURIComponent(COUNTER_NAMESPACE + "_chapter_" + id);
  const totalKey = encodeURIComponent(COUNTER_NAMESPACE + "_total_reads");
  Promise.all([
    fetch(`${COUNTER_BASE}/hit/${key}`),
    fetch(`${COUNTER_BASE}/hit/${totalKey}`)
  ]).catch(error => console.error("Reader counter error:", error));
}

async function fetchChapterFile(file) {
  const urls = [
    file + "?v=6",
    RAW_BASE + encodeURIComponent(file) + "?v=6"
  ];

  let lastError = null;

  for (const url of urls) {
    try {
      const response = await fetch(url, {cache:"no-store"});
      if (response.ok) return await response.text();
      lastError = new Error("HTTP " + response.status + " for " + url);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("Unable to load " + file);
}

async function loadReader() {
  try {
    let chapters = BUILTIN_CHAPTERS.slice();

    try {
      const response = await fetch("chapters.json?v=6", {cache:"no-store"});
      if (response.ok) {
        const remote = await response.json();
        const map = new Map((Array.isArray(remote) ? remote : []).map(ch => [ch.id,ch]));
        chapters = BUILTIN_CHAPTERS.map(ch => map.get(ch.id) || ch);
        for (const ch of map.values()) {
          if (!chapters.some(x => x.id === ch.id)) chapters.push(ch);
        }
      }
    } catch (error) {
      console.warn("Using built-in chapter list.", error);
    }

    const currentIndex = chapters.findIndex(ch => ch.id === chapterId);
    if (currentIndex === -1) throw new Error("Chapter not found: " + chapterId);

    trackChapterRead(chapterId);

    const chapter = chapters[currentIndex];
    const markdown = await fetchChapterFile(chapter.file);
    const lines = markdown.replace(/^\uFEFF/, "").split(/\r?\n/);

    chapterContainer.innerHTML = lines.map(line => {
      const value = line.trim();
      if (!value) return "<br>";
      if (value.startsWith("# ")) {
        return `<h1>${escapeHtml(value.substring(2))}</h1>`;
      }
      return `<p>${escapeHtml(value)}</p>`;
    }).join("");

    if (currentIndex > 0) {
      previousButton.textContent = "←";
      previousButton.setAttribute("aria-label", "Previous chapter");
      previousButton.title = "Previous chapter";
      previousButton.href = "chapter.html?id=" + encodeURIComponent(chapters[currentIndex - 1].id);
      previousButton.style.display = "";
    } else {
      previousButton.style.display = "none";
    }

    if (currentIndex < chapters.length - 1) {
      nextButton.textContent = "→";
      nextButton.setAttribute("aria-label", "Next chapter");
      nextButton.title = "Next chapter";
      nextButton.href = "chapter.html?id=" + encodeURIComponent(chapters[currentIndex + 1].id);
      nextButton.style.display = "";
    } else {
      nextButton.style.display = "none";
    }
  } catch (error) {
    console.error(error);
    chapterContainer.innerHTML = "<p>Unable to load this chapter right now. Please refresh the page.</p>";
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"]/g, character => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"
  }[character]));
}

document.addEventListener("DOMContentLoaded", loadReader);
