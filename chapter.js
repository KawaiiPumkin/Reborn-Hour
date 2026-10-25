const params = new URLSearchParams(window.location.search);
const chapterId = params.get("id") || "prologue";

const chapterContainer = document.getElementById("chapter");
const previousButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const COUNTER_BASE = "https://countapi.mileshilliard.com/api/v1";
const COUNTER_NAMESPACE = "reborn_hour_kawaii_pumkin_7f3a91";
const RAW_BASE = "https://raw.githubusercontent.com/KawaiiPumkin/Reborn-Hour/main/";
const OST_BY_VOLUME = [
  {start:1,end:7,label:"VOLUME I",title:"A New Beginning",subtitle:"Volume I Original Theme",file:"gzip-base64:H4sICOkd3moCA29zdC10aW55Lm9nZwC9mmtMU2cYgFuo3G9yKRctFCkCciktWApSEAFhiICALYKgRUoxcnEiF+fGGpUFxrzg2IZZtmUEdLAt1GEchm1sWdCJi2Ea3UhYcFsQ2AxuZJcowvZ+SN5vf/3zNiFP0nM4Dw+Uc77vOyfbaMwTWAhWXq8HX1MzXi3PmRe6ZR+sq0036MuEQrXQNLS8QzbbXfD/3YXA6AyzQqhhu+frjbUO8E6mvr5cpYiIiVBERrE9JPBlqN5XU2Y4pIFt+2CbIhY2KqSV+0tr4BufHnjFsnxg9kN5NaW8rBQ+86vxmV8rXQ1C1FsCJ452dhPqTUoL1IuAZ9vL3qCsn+P6VcCByZFQyvpeS9RbAfPj48WU9QYR6q2Bh4YbL1PWS1eh3gY49cD6Bcr6Ca63BeZ8GhpEWf+WFertWP2wjvSTn2eNentgyr8V9ZT1TjaoZydP/femR5T1o1zvCHyoFTlR1jfbot4JWPW7rz1lfZId6p3ZSVep/Yqy/gnXuwC/0A6XUNYP2qN+NfDN8n8SKOuXBwtP9a5AsY9bMWW93BH1bsD2qabDlPW/cr07MCg+doGy/rwT6j3YKO7G1KuU9Xpn1IuBhQUHoinrJS6o9wR2KM01lPU/cL0XsGfMkrS+YzXqvYEzPR9UUtZnu6LeB+irM4RR1tu7oX4NUGUMz6Ssv8r1a9loZ6GV9P/+mDvq2bxMvn3XPcp6jQfqfVm9sjuGsv4R1/sBDwxIv6SsvyRGvRQ41Pz8HGX9QU/U+wN9RrIcKetDvVC/Dvh+xkgsZf001wcAM051/U1Z3+WNehm74t0PIf3bl/igPhD47tL1U5T13mtQvx54RBI5QFl/h+uD2Dh/XPciZf2ZtagPZp9EB/MNyvpMCepDgLPH+/SU9da+qN8A3N129zZl/ddcHwq8ZZcro6xv8kN9GJtgL/14l7I+Tor6cDb0y8m/Qln/F9dHAM1pxyiXFQUX/VEvB3Y2jG6jrK9ch/pI4M3aK9cp64MDUK8A3k/+o5ey/heuVwI/bFT1UNa/J0N9FLvgume5U9YXBqI+mp2FHD45TVkvXo/6jcCxheolyvrvuF7FFld6i/Ip608GoT6G/TK0qpco69ODUc9uqZ193PiAsl4UgvpY4OTp25co64e5Po6tr0tOzFLWH92A+k3Ajya/DaCsV4WiPh44Pt9tSVk/z/UaoK5W+idl/cdhqE8ALo6Xka5u7A9HfSIbap4r8qKsl0WgfjPQKiG8jbL+HtcnAVuGe0lnOW/LUb8FqOmbraOs10WiPhkokzslUta7KlCfwhbU05opb6IKbnJ9KtDDVnaOsr5Vifqt7KRb0XeSsj41CvVpwIqqei1lvSAa9ens7sJg+0+U9Z9x/XPAmDvllA/OmBo2oj4DuFPuY6Ssj1Khfhsw4J3ACMr6Oa7PZPPttrQZyvq+GNRvB7oOObdQ1hvUqM8CHv9ZNkZZ7x+L+mw2xbxVaaasn+D6HPbEmqmEdJzfGYf6HcBqpZ5ygm3K24T6XKDDN5LPKeud41G/PPS7OPOQsn6U6/PZJKuify9l/Ssa1O9kU0yJSE1Zn5SAei2wy2Gxn7J+ket1bKSrt1NQ1g8mor4A6KesW6SsP7wZ9bvYFa+12IWyXp6E+kKgReuZx5T1v3F9EfA1G3fSu5jnt6B+N/DCBXsRZX1pMuqL2RRzOnqasl6SgvoSoLpgkfR5vXGu3wO8PH7kCWV9Ryrq97L6qj2kqxs5W1GvB17r9yQ864nUO7i+FJgrbjHD0f4DoGduLkUwAAA=",type:"audio/mpeg"},
  {start:8,end:14,label:"VOLUME II",title:"Under the Same Roof",subtitle:"Volume II Original Theme",file:"",type:"audio/mpeg"},
  {start:15,end:21,label:"VOLUME III",title:"The Past Returns",subtitle:"Volume III Original Theme",file:"",type:"audio/mpeg"},
  {start:22,end:25.5,label:"VOLUME IV",title:"The Price of Fate",subtitle:"Volume IV Original Theme",file:"",type:"audio/mpeg"},
  {start:26,end:31,label:"VOLUME V",title:"The Future He Chooses",subtitle:"Volume V Original Theme",file:"",type:"audio/mpeg"}
];

function getVolumeOst(id) {
  const match = /^chapter-(\d+)(\.5)?$/.exec(id);
  if (!match) return null;
  const n = Number(match[1]) + (match[2] ? 0.5 : 0);
  const ost = OST_BY_VOLUME.find(item => n >= item.start && n <= item.end) || null;
  return ost && ost.file ? ost : null;
}

function createReaderOst(ost) {
  const wrap = document.createElement("section");
  wrap.className = "reader-ost";
  wrap.innerHTML =
    '<div class="reader-ost-heading">' +
      '<span class="ost-label">' + escapeHtml(ost.label) + ' · ORIGINAL SOUNDTRACK</span>' +
      '<h2>' + escapeHtml(ost.title) + '</h2>' +
      '<p>' + escapeHtml(ost.subtitle) + '</p>' +
    '</div>' +
    '<audio controls preload="metadata">' +
      'Your browser does not support audio playback.' +
    '</audio>';

  const audio = wrap.querySelector("audio");
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
    source.type = ost.type;
    audio.appendChild(source);
  }
  return wrap;
}


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
    file + "?v=11",
    RAW_BASE + encodeURIComponent(file) + "?v=11"
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
      const response = await fetch("chapters.json?v=11", {cache:"no-store"});
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

    chapterContainer.replaceChildren();
    const ost = getVolumeOst(chapter.id);
    if (ost) chapterContainer.appendChild(createReaderOst(ost));

    const story = document.createElement("div");
    story.className = "chapter-story";
    story.innerHTML = lines.map(line => {
      const value = line.trim();
      if (!value) return "<br>";
      if (value.startsWith("# ")) {
        return `<h1>${escapeHtml(value.substring(2))}</h1>`;
      }
      return `<p>${escapeHtml(value)}</p>`;
    }).join("");
    chapterContainer.appendChild(story);

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
