const arcs = [
  {number:"I",label:"VOLUME I",title:"A New Beginning",subtitle:"The first step into a life neither of them expected.",start:1,end:7,ost:{title:"A New Beginning",file:"gzip-base64:H4sICOkd3moCA29zdC10aW55Lm9nZwC9mmtMU2cYgFuo3G9yKRctFCkCciktWApSEAFhiICALYKgRUoxcnEiF+fGGpUFxrzg2IZZtmUEdLAt1GEchm1sWdCJi2Ea3UhYcFsQ2AxuZJcowvZ+SN5vf/3zNiFP0nM4Dw+Uc77vOyfbaMwTWAhWXq8HX1MzXi3PmRe6ZR+sq0036MuEQrXQNLS8QzbbXfD/3YXA6AyzQqhhu+frjbUO8E6mvr5cpYiIiVBERrE9JPBlqN5XU2Y4pIFt+2CbIhY2KqSV+0tr4BufHnjFsnxg9kN5NaW8rBQ+86vxmV8rXQ1C1FsCJ452dhPqTUoL1IuAZ9vL3qCsn+P6VcCByZFQyvpeS9RbAfPj48WU9QYR6q2Bh4YbL1PWS1eh3gY49cD6Bcr6Ca63BeZ8GhpEWf+WFertWP2wjvSTn2eNentgyr8V9ZT1TjaoZydP/femR5T1o1zvCHyoFTlR1jfbot4JWPW7rz1lfZId6p3ZSVep/Yqy/gnXuwC/0A6XUNYP2qN+NfDN8n8SKOuXBwtP9a5AsY9bMWW93BH1bsD2qabDlPW/cr07MCg+doGy/rwT6j3YKO7G1KuU9Xpn1IuBhQUHoinrJS6o9wR2KM01lPU/cL0XsGfMkrS+YzXqvYEzPR9UUtZnu6LeB+irM4RR1tu7oX4NUGUMz6Ssv8r1a9loZ6GV9P/+mDvq2bxMvn3XPcp6jQfqfVm9sjuGsv4R1/sBDwxIv6SsvyRGvRQ41Pz8HGX9QU/U+wN9RrIcKetDvVC/Dvh+xkgsZf001wcAM051/U1Z3+WNehm74t0PIf3bl/igPhD47tL1U5T13mtQvx54RBI5QFl/h+uD2Dh/XPciZf2ZtagPZp9EB/MNyvpMCepDgLPH+/SU9da+qN8A3N129zZl/ddcHwq8ZZcro6xv8kN9GJtgL/14l7I+Tor6cDb0y8m/Qln/F9dHAM1pxyiXFQUX/VEvB3Y2jG6jrK9ch/pI4M3aK9cp64MDUK8A3k/+o5ey/heuVwI/bFT1UNa/J0N9FLvgume5U9YXBqI+mp2FHD45TVkvXo/6jcCxheolyvrvuF7FFld6i/Ip608GoT6G/TK0qpco69ODUc9uqZ193PiAsl4UgvpY4OTp25co64e5Po6tr0tOzFLWH92A+k3Ajya/DaCsV4WiPh44Pt9tSVk/z/UaoK5W+idl/cdhqE8ALo6Xka5u7A9HfSIbap4r8qKsl0WgfjPQKiG8jbL+HtcnAVuGe0lnOW/LUb8FqOmbraOs10WiPhkokzslUta7KlCfwhbU05opb6IKbnJ9KtDDVnaOsr5Vifqt7KRb0XeSsj41CvVpwIqqei1lvSAa9ens7sJg+0+U9Z9x/XPAmDvllA/OmBo2oj4DuFPuY6Ssj1Khfhsw4J3ACMr6Oa7PZPPttrQZyvq+GNRvB7oOObdQ1hvUqM8CHv9ZNkZZ7x+L+mw2xbxVaaasn+D6HPbEmqmEdJzfGYf6HcBqpZ5ygm3K24T6XKDDN5LPKeud41G/PPS7OPOQsn6U6/PZJKuify9l/Ssa1O9kU0yJSE1Zn5SAei2wy2Gxn7J+ket1bKSrt1NQ1g8mor4A6KesW6SsP7wZ9bvYFa+12IWyXp6E+kKgReuZx5T1v3F9EfA1G3fSu5jnt6B+N/DCBXsRZX1pMuqL2RRzOnqasl6SgvoSoLpgkfR5vXGu3wO8PH7kCWV9Ryrq97L6qj2kqxs5W1GvB17r9yQ864nUO7i+FJgrbjHD0f4DoGduLkUwAAA=",subtitle:"Volume I Original Theme"}},
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
      (arc.ost ? '<div class="ost-slot"></div>' : '') +
      '<div class="chapter-list-inner"></div>';

    if (arc.ost) {
      section.querySelector(".ost-slot").appendChild(createOstPlayer(arc.ost));
    }

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

  const copy = document.createElement("div");
  copy.className = "ost-copy";

  const label = document.createElement("span");
  label.className = "ost-label";
  label.textContent = "VOLUME OST";

  const title = document.createElement("strong");
  title.textContent = ost.title;

  const subtitle = document.createElement("span");
  subtitle.textContent = ost.subtitle || "Original Theme";

  copy.append(label, title, subtitle);

  const audio = document.createElement("audio");
  audio.controls = true;
  audio.preload = "metadata";

  if (ost.file.startsWith("gzip-base64:")) {
    try {
      const encoded = ost.file.slice(12);
      const binary = atob(encoded);
      const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
      const compressed = new Blob([bytes], {type:"application/gzip"});
      const decompressed = compressed.stream().pipeThrough(new DecompressionStream("gzip"));
      const out = new Uint8Array(await new Response(decompressed).arrayBuffer());
      const audioUrl = URL.createObjectURL(new Blob([out], {type:"audio/ogg; codecs=opus"}));
      audio.src = audioUrl;
      audio.load();
      audio.addEventListener("error", () => console.error("Reborn Hour OST audio decode error"), {once:true});
    } catch (error) {
      console.error("Reborn Hour OST load error:", error);
    }
  } else {
    const source = document.createElement("source");
    source.src = ost.file;
    source.type = ost.type || "audio/mpeg";
    audio.appendChild(source);
  }

  wrap.append(copy, audio);
  return wrap;
}
