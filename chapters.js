fetch("chapters.json")
  .then(response => response.json())
  .then(chapters => {
    const list = document.getElementById("chapter-list");
    if (!list) return;

    list.innerHTML = "";

    const arcs = [
      { title: "Arc 1 — A New Beginning", start: 1, end: 7 },
      { title: "Arc 2 — Under the Same Roof", start: 8, end: 14 },
      { title: "Arc 3 — The Past Returns", start: 15, end: 21 },
      { title: "Arc 4 — The Price of Fate", start: 22, end: 25 },
      { title: "Arc 5 — The Future He Chooses", start: 26, end: 30 }
    ];

    const prologue = chapters.find(chapter => chapter.id === "prologue");
    if (prologue) list.appendChild(createChapterCard(prologue, "Prologue"));

    arcs.forEach(arc => {
      const section = document.createElement("section");
      section.className = "arc-section";

      const heading = document.createElement("div");
      heading.className = "arc-heading";
      heading.innerHTML = `<span></span><h2>${arc.title}</h2><span></span>`;
      section.appendChild(heading);

      chapters
        .filter(chapter => {
          const match = chapter.id.match(/^chapter-(\\d+)(?:\\.5)?$/);
          if (!match) return false;
          const number = parseFloat(match[1] + (chapter.id.includes(".5") ? ".5" : ""));
          return number >= arc.start && number <= arc.end;
        })
        .forEach(chapter => section.appendChild(createChapterCard(chapter)));

      if (section.children.length > 1) list.appendChild(section);
    });

    const assigned = new Set(["prologue"]);
    arcs.forEach(arc => {
      chapters.filter(chapter => {
        const match = chapter.id.match(/^chapter-(\\d+)(?:\\.5)?$/);
        if (!match) return false;
        const number = parseFloat(match[1] + (chapter.id.includes(".5") ? ".5" : ""));
        return number >= arc.start && number <= arc.end;
      }).forEach(chapter => assigned.add(chapter.id));
    });

    const unassigned = chapters.filter(chapter => !assigned.has(chapter.id));
    if (unassigned.length) {
      const section = document.createElement("section");
      section.className = "arc-section";
      const heading = document.createElement("div");
      heading.className = "arc-heading";
      heading.innerHTML = "<span></span><h2>More Chapters</h2><span></span>";
      section.appendChild(heading);
      unassigned.forEach(chapter => section.appendChild(createChapterCard(chapter)));
      list.appendChild(section);
    }
  })
  .catch(error => {
    console.error(error);
    const list = document.getElementById("chapter-list");
    if (list) list.innerHTML = "<p class='chapter-error'>Unable to load chapters.</p>";
  });

function createChapterCard(chapter, label = "") {
  const link = document.createElement("a");
  link.className = "chapter-card";
  link.href = "chapter.html?id=" + encodeURIComponent(chapter.id);

  let displayNumber = "";
  const match = chapter.id.match(/^chapter-(\\d+)(?:\\.5)?$/);
  if (match) displayNumber = match[1] + (chapter.id.includes(".5") ? ".5" : "");

  const numberText = displayNumber ? String(displayNumber).padStart(2, "0") : "—";
  const smallLabel = label || (displayNumber ? "Chapter" : "");

  link.innerHTML = `
    <span class="chapter-number">${numberText}</span>
    <span class="chapter-info">
      <span class="chapter-label">${smallLabel}</span>
      <span class="chapter-title">${escapeHtml(chapter.title)}</span>
    </span>
    <span class="chapter-arrow">→</span>
  `;
  return link;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[character]));
}