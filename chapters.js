const arcs = [
  {number:"I",label:"VOLUME I",title:"A New Beginning",subtitle:"The first step into a life neither of them expected.",start:1,end:7,ost:{title:"A New Beginning",file:"audio/Reborn_Hour_Volume_I_A_New_Beginning_Theme.wav",subtitle:"Volume I Original Theme"}},
  {number:"II",label:"VOLUME II",title:"Under the Same Roof",subtitle:"Two lonely people begin sharing more than a building.",start:8,end:14},
  {number:"III",label:"VOLUME III",title:"The Past Returns",subtitle:"Some things you leave behind do not stay there.",start:15,end:21},
  {number:"IV",label:"VOLUME IV",title:"The Price of Fate",subtitle:"Every future he changes asks for something in return.",start:22,end:25.5},
  {number:"V",label:"VOLUME V",title:"The Future He Chooses",subtitle:"When the future finally demands a choice.",start:26,end:31}
];

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

document.addEventListener("DOMContentLoaded", loadChapters);

async function loadChapters() {
  const list = document.getElementById("chapter-list");
  if (!list) return;

  let chapters = BUILTIN_CHAPTERS.slice();

  try {
    const response = await fetch("chapters.json?v=10", {cache:"no-store"});
    if (response.ok) {
      const remote = await response.json();
      const remoteMap = new Map((Array.isArray(remote) ? remote : []).map(ch => [ch.id,ch]));
      chapters = BUILTIN_CHAPTERS.map(ch => remoteMap.get(ch.id) || ch);
      for (const ch of remoteMap.values()) {
        if (!chapters.some(x => x.id === ch.id)) chapters.push(ch);
      }
    }
  } catch (error) {
    console.error("Chapter list fallback:", error);
  }

  renderChapters(chapters, list);
}

function renderChapters(chapters, list) {
  list.replaceChildren();

  const prologue = chapters.find(ch => ch.id === "prologue");
  if (prologue) list.appendChild(createPrologue(prologue));

  const assigned = new Set(["prologue"]);

  for (const arc of arcs) {
    const matches = chapters.filter(ch => {
      const n = getChapterNumber(ch.id);
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
      (arc.ost ? createOstPlayer(arc.ost) : '') +
      '<div class="chapter-list-inner"></div>';

    const inner = section.querySelector(".chapter-list-inner");
    matches.forEach(ch => {
      inner.appendChild(createChapter(ch));
      assigned.add(ch.id);
    });
    list.appendChild(section);
  }

  const epilogue = chapters.find(ch => ch.id === "epilogue");
  if (epilogue) {
    const section = document.createElement("section");
    section.className = "prologue-section epilogue-section";
    section.innerHTML =
      '<div class="prologue-heading"><span class="prologue-label">THE END</span>' +
      '<h2>Epilogue</h2><p>The future is no longer something to see. It is something to live.</p></div>' +
      '<div class="chapter-list-inner"></div>';
    section.querySelector(".chapter-list-inner").appendChild(createChapter(epilogue, true));
    list.appendChild(section);
    assigned.add("epilogue");
  }

}

function createPrologue(chapter) {
  const section = document.createElement("section");
  section.className = "prologue-section";
  section.innerHTML =
    '<div class="prologue-heading"><span class="prologue-label">BEFORE THE STORY</span>' +
    '<h2>Prologue</h2><p>The beginning of a life that was never meant to be ordinary.</p></div>' +
    '<div class="chapter-list-inner"></div>';
  section.querySelector(".chapter-list-inner").appendChild(createChapter(chapter,true));
  return section;
}

function createChapter(chapter,isPrologue=false) {
  const link = document.createElement("a");
  link.className = "chapter-card";
  link.href = "chapter.html?id=" + encodeURIComponent(chapter.id);
  link.setAttribute("aria-label","Read " + chapter.title);
  const n = getChapterNumber(chapter.id);
  const number = isPrologue ? "00" : formatNumber(n);
  const label = isPrologue ? (chapter.id === "epilogue" ? "EPILOGUE" : "PROLOGUE") : (n % 1 ? "CHAPTER " + n : "CHAPTER " + String(n).padStart(2,"0"));
  link.innerHTML =
    '<span class="chapter-number">' + escapeHtml(number) + '</span>' +
    '<span class="chapter-info"><span class="chapter-label">' + escapeHtml(label) + '</span>' +
    '<span class="chapter-title">' + escapeHtml(chapter.title) + '</span></span>' +
    '<span class="chapter-arrow" aria-hidden="true">↗</span>';
  return link;
}

function getChapterNumber(id) {
  const match = /^chapter-(\d+)(\.5)?$/.exec(id);
  if (!match) return null;
  return Number(match[1]) + (match[2] ? 0.5 : 0);
}

function formatNumber(n) {
  return n % 1 !== 0 ? String(n) : String(n).padStart(2,"0");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[character]));
}


function createOstPlayer(ost) {
  const wrap = document.createElement("div");
  wrap.className = "ost-player";
  wrap.innerHTML =
    '<div class="ost-copy">' +
      '<span class="ost-label">VOLUME OST</span>' +
      '<strong>' + escapeHtml(ost.title) + '</strong>' +
      '<span>' + escapeHtml(ost.subtitle || "Original Theme") + '</span>' +
    '</div>' +
    '<audio controls preload="metadata" autoplay>' +
      '<source src="' + encodeURI(ost.file) + '" type="audio/wav">' +
      'Your browser does not support audio playback.' +
    '</audio>';
  const audio = wrap.querySelector("audio");
  audio.addEventListener("play", () => wrap.classList.add("is-playing"));
  audio.addEventListener("pause", () => wrap.classList.remove("is-playing"));
  audio.addEventListener("ended", () => wrap.classList.remove("is-playing"));
  return wrap;
}
