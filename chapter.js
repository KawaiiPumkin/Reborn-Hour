const params = new URLSearchParams(window.location.search);
const chapterId = params.get("id") || "prologue";

const chapterContainer = document.getElementById("chapter");
const previousButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const COUNTER_BASE = "https://countapi.mileshilliard.com/api/v1";
const COUNTER_NAMESPACE = "reborn_hour_kawaii_pumkin_7f3a91";
const RAW_BASE = "https://raw.githubusercontent.com/KawaiiPumkin/Reborn-Hour/main/";

const BUILTIN_CHAPTERS = [
  {
    "id": "prologue",
    "title": "The Angel Was Born",
    "file": "prologue.md"
  },
  {
    "id": "chapter-01",
    "title": "A New Beginning",
    "file": "chapter-01.md"
  },
  {
    "id": "chapter-02",
    "title": "The Quiet Employee",
    "file": "chapter-02.md"
  },
  {
    "id": "chapter-03",
    "title": "You're Training Her",
    "file": "chapter-03.md"
  },
  {
    "id": "chapter-04",
    "title": "You're Worse Than Me",
    "file": "chapter-04.md"
  },
  {
    "id": "chapter-05",
    "title": "Don't Give Up",
    "file": "chapter-05.md"
  },
  {
    "id": "chapter-06",
    "title": "The Smile",
    "file": "chapter-06.md"
  },
  {
    "id": "chapter-07",
    "title": "Two Broken People",
    "file": "chapter-07.md"
  },
  {
    "id": "chapter-08",
    "title": "The Apartment",
    "file": "chapter-08.md"
  },
  {
    "id": "chapter-09",
    "title": "A Strange Advertisement",
    "file": "chapter-09.md"
  },
  {
    "id": "chapter-10",
    "title": "Same Building",
    "file": "chapter-10.md"
  },
  {
    "id": "chapter-11",
    "title": "Don't Let Me Cook",
    "file": "chapter-11.md"
  },
  {
    "id": "chapter-12",
    "title": "Seo-jun Knows",
    "file": "chapter-12.md"
  },
  {
    "id": "chapter-13",
    "title": "The First Shadow",
    "file": "chapter-13.md"
  },
  {
    "id": "chapter-14",
    "title": "Someone From Before",
    "file": "chapter-14.md"
  },
  {
    "id": "chapter-15",
    "title": "Min-seo",
    "file": "chapter-15.md"
  },
  {
    "id": "chapter-16",
    "title": "The Difference",
    "file": "chapter-16.md"
  },
  {
    "id": "chapter-16.5",
    "title": "Something She Couldn’t Ignore",
    "file": "chapter-16.5.md"
  },
  {
    "id": "chapter-17",
    "title": "You Deserve It",
    "file": "chapter-17.md"
  },
  {
    "id": "chapter-18",
    "title": "What Happened to Me",
    "file": "chapter-18.md"
  },
  {
    "id": "chapter-18.5",
    "title": "The Girl at the Café",
    "file": "chapter-18.5.md"
  },
  {
    "id": "chapter-19",
    "title": "Seo-jun’s Problem",
    "file": "chapter-19.md"
  },
  {
    "id": "chapter-19.5",
    "title": "Their First Date",
    "file": "chapter-19.5.md"
  },
  {
    "id": "chapter-20",
    "title": "The Mysterious CEO",
    "file": "chapter-20.md"
  },
  {
    "id": "chapter-21",
    "title": "I’ll Find You",
    "file": "chapter-21.md"
  },
  {
    "id": "chapter-22",
    "title": "One Hour Ahead",
    "file": "chapter-22.md"
  },
  {
    "id": "chapter-23",
    "title": "Living Together",
    "file": "chapter-23.md"
  },
  {
    "id": "chapter-24",
    "title": "The People Around Us",
    "file": "chapter-24.md"
  },
  {
    "id": "chapter-25",
    "title": "The Past Doesn’t Deserve Your Death",
    "file": "chapter-25.md"
  },
  {
    "id": "chapter-25.5",
    "title": "What We Were",
    "file": "chapter-25.5.md"
  },
  {
    "id": "chapter-26",
    "title": "The Black Figure",
    "file": "chapter-26.md"
  },
  {
    "id": "chapter-27",
    "title": "Something Is Coming",
    "file": "chapter-27.md"
  },
  {
    "id": "chapter-28",
    "title": "The Storm",
    "file": "chapter-28.md"
  },
  {
    "id": "chapter-29",
    "title": "One Hour",
    "file": "chapter-29.md"
  },
  {
    "id": "chapter-30",
    "title": "The Future I Choose",
    "file": "chapter-30.md"
  },
  {
    "id": "chapter-31",
    "title": "Ten Years",
    "file": "chapter-31.md"
  },
  {
    "id": "epilogue",
    "title": "The Future",
    "file": "epilogue.md"
  }
];

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
    file + "?v=8",
    RAW_BASE + encodeURIComponent(file) + "?v=8"
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
      const response = await fetch("chapters.json?v=8", {cache:"no-store"});
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
