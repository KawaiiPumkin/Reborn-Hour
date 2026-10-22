const arcs = [
  {
    number: "I",
    label: "VOLUME I",
    title: "A New Beginning",
    subtitle: "The first step into a life neither of them expected.",
    start: 1,
    end: 7
  },
  {
    number: "II",
    label: "VOLUME II",
    title: "Under the Same Roof",
    subtitle: "Two lonely people begin sharing more than a building.",
    start: 8,
    end: 14
  },
  {
    number: "III",
    label: "VOLUME III",
    title: "The Past Returns",
    subtitle: "Some things you leave behind do not stay there.",
    start: 15,
    end: 21
  },
  {
    number: "IV",
    label: "VOLUME IV",
    title: "The Price of Fate",
    subtitle: "Every future he changes asks for something in return.",
    start: 22,
    end: 25
  },
  {
    number: "V",
    label: "VOLUME V",
    title: "The Future He Chooses",
    subtitle: "When the future finally demands a choice.",
    start: 26,
    end: 30
  }
];

document.addEventListener("DOMContentLoaded", loadChapters);

async function loadChapters() {
  const list = document.getElementById("chapter-list");
  if (!list) return;

  try {
    const response = await fetch("chapters.json?v=4", { cache: "no-store" });
    if (!response.ok) throw new Error("Unable to load chapters.");
    const chapters = await response.json();

    list.replaceChildren();

    const prologue = chapters.find(chapter => chapter.id === "prologue");
    if (prologue) {
      list.appendChild(createPrologue(prologue));
    }

    const assigned = new Set(["prologue"]);

    for (const arc of arcs) {
      const matches = chapters.filter(chapter => {
        const n = getChapterNumber(chapter.id);
        return n !== null && n >= arc.start && n <= arc.end;
      });

      if (!matches.length) continue;

      const section = document.createElement("section");
      section.className = "volume volume-" + arc.number.toLowerCase();

      section.innerHTML =
        '<div class="volume-heading">' +
          '<div class="volume-number">' + escapeHtml(arc.number) + '</div>' +
          '<div class="volume-copy">' +
            '<span class="volume-label">' + escapeHtml(arc.label) + '</span>' +
            '<h2>' + escapeHtml(arc.title) + '</h2>' +
            '<p>' + escapeHtml(arc.subtitle) + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="chapter-list-inner"></div>';

      const inner = section.querySelector(".chapter-list-inner");

      matches.forEach(chapter => {
        inner.appendChild(createChapter(chapter));
        assigned.add(chapter.id);
      });

      list.appendChild(section);
    }

    const remaining = chapters.filter(chapter => !assigned.has(chapter.id));
    if (remaining.length) {
      const section = document.createElement("section");
      section.className = "volume volume-more";
      section.innerHTML =
        '<div class="volume-heading">' +
          '<div class="volume-number">+</div>' +
          '<div class="volume-copy"><span class="volume-label">MORE</span><h2>Chapters</h2><p>More of the story.</p></div>' +
        '</div>' +
        '<div class="chapter-list-inner"></div>';

      const inner = section.querySelector(".chapter-list-inner");
      remaining.forEach(chapter => inner.appendChild(createChapter(chapter)));
      list.appendChild(section);
    }
  } catch (error) {
    console.error(error);
    list.innerHTML = '<p class="chapter-error">The chapters could not be loaded. Please refresh the page.</p>';
  }
}

function createPrologue(chapter) {
  const section = document.createElement("section");
  section.className = "prologue-section";

  section.innerHTML =
    '<div class="prologue-heading">' +
      '<span class="prologue-label">BEFORE THE STORY</span>' +
      '<h2>Prologue</h2>' +
      '<p>The beginning of a life that was never meant to be ordinary.</p>' +
    '</div>' +
    '<div class="chapter-list-inner"></div>';

  section.querySelector(".chapter-list-inner").appendChild(createChapter(chapter, true));
  return section;
}

function createChapter(chapter, isPrologue = false) {
  const link = document.createElement("a");
  link.className = "chapter-card";
  link.href = "chapter.html?id=" + encodeURIComponent(chapter.id);
  link.setAttribute("aria-label", "Read " + chapter.title);

  const n = getChapterNumber(chapter.id);
  const number = isPrologue ? "00" : formatNumber(n);
  const label = isPrologue ? "PROLOGUE" : (n % 1 ? "CHAPTER " + n : "CHAPTER " + String(n).padStart(2, "0"));

  link.innerHTML =
    '<span class="chapter-number">' + escapeHtml(number) + '</span>' +
    '<span class="chapter-info">' +
      '<span class="chapter-label">' + escapeHtml(label) + '</span>' +
      '<span class="chapter-title">' + escapeHtml(chapter.title) + '</span>' +
    '</span>' +
    '<span class="chapter-arrow" aria-hidden="true">↗</span>';

  return link;
}

function getChapterNumber(id) {
  const match = /^chapter-(\d+)(\.5)?$/.exec(id);
  if (!match) return null;
  return Number(match[1]) + (match[2] ? 0.5 : 0);
}

function formatNumber(n) {
  if (n % 1 !== 0) return String(n);
  return String(n).padStart(2, "0");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[character]));
}
