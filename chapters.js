const params = new URLSearchParams(window.location.search);

fetch("chapters.json?v=2")
  .then(response => {
    if (!response.ok) throw new Error("Chapter list could not be loaded.");
    return response.json();
  })
  .then(chapters => {
    const list = document.getElementById("chapter-list");
    if (!list) return;

    const arcs = [
      { title: "Arc 1 — A New Beginning", start: 1, end: 7 },
      { title: "Arc 2 — Under the Same Roof", start: 8, end: 14 },
      { title: "Arc 3 — The Past Returns", start: 15, end: 21 },
      { title: "Arc 4 — The Price of Fate", start: 22, end: 25 },
      { title: "Arc 5 — The Future He Chooses", start: 26, end: 30 }
    ];

    list.replaceChildren();

    const prologue = chapters.find(chapter => chapter.id === "prologue");
    if (prologue) {
      const section = createSection("Prologue");
      section.appendChild(createChapterCard(prologue, "Prologue"));
      list.appendChild(section);
    }

    const assigned = new Set(["prologue"]);

    arcs.forEach(arc => {
      const matches = chapters.filter(chapter => {
        const number = getChapterNumber(chapter.id);
        return number !== null && number >= arc.start && number <= arc.end;
      });

      if (!matches.length) return;

      const section = createSection(arc.title);
      matches.forEach(chapter => {
        section.appendChild(createChapterCard(chapter));
        assigned.add(chapter.id);
      });
      list.appendChild(section);
    });

    const unassigned = chapters.filter(chapter => !assigned.has(chapter.id));
    if (unassigned.length) {
      const section = createSection("More Chapters");
      unassigned.forEach(chapter => section.appendChild(createChapterCard(chapter)));
      list.appendChild(section);
    }
  })
  .catch(error => {
    console.error(error);
    const list = document.getElementById("chapter-list");
    if (list) {
      list.innerHTML = "<p class='chapter-error'>Unable to load chapters right now.</p>";
    }
  });

function getChapterNumber(id) {
  const match = id.match(/^chapter-(\d+)(\.5)?$/);
  if (!match) return null;
  return Number(match[1]) + (match[2] ? 0.5 : 0);
}

function createSection(title) {
  const section = document.createElement("section");
  section.className = "arc-section";

  const heading = document.createElement("div");
  heading.className = "arc-heading";
  heading.innerHTML = `
    <span class="arc-line"></span>
    <h2>${escapeHtml(title)}</h2>
    <span class="arc-line"></span>
  `;

  section.appendChild(heading);
  return section;
}

function createChapterCard(chapter, label = "") {
  const link = document.createElement("a");
  link.className = "chapter-card";
  link.href = "chapter.html?id=" + encodeURIComponent(chapter.id);
  link.setAttribute("aria-label", "Read " + chapter.title);

  const number = getChapterNumber(chapter.id);
  const numberText = number === null
    ? "—"
    : String(number).replace(".5", ".5").padStart(2, "0");

  const smallLabel = label || (number !== null ? "Chapter" : "");

  link.innerHTML = `
    <span class="chapter-number">${escapeHtml(numberText)}</span>
    <span class="chapter-info">
      <span class="chapter-label">${escapeHtml(smallLabel)}</span>
      <span class="chapter-title">${escapeHtml(chapter.title)}</span>
    </span>
    <span class="chapter-arrow" aria-hidden="true">→</span>
  `;

  return link;
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
