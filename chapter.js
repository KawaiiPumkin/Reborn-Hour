const params = new URLSearchParams(window.location.search);
const chapterId = params.get("id");

fetch("chapters.json")
  .then(response => response.json())
  .then(chapters => {
    const currentIndex = chapters.findIndex(chapter => chapter.id === chapterId);

    if (currentIndex === -1) {
      document.getElementById("chapter-content").innerHTML =
        "<p>Chapter not found.</p>";
      return;
    }

    const chapter = chapters[currentIndex];

    document.getElementById("chapter-title").textContent = chapter.title;

    const previousButton = document.getElementById("previous-chapter");
    const nextButton = document.getElementById("next-chapter");

    if (currentIndex > 0) {
      previousButton.onclick = () => {
        window.location.href =
          `chapter.html?id=${chapters[currentIndex - 1].id}`;
      };
      previousButton.disabled = false;
    } else {
      previousButton.disabled = true;
    }

    if (currentIndex < chapters.length - 1) {
      nextButton.onclick = () => {
        window.location.href =
          `chapter.html?id=${chapters[currentIndex + 1].id}`;
      };
      nextButton.disabled = false;
    } else {
      nextButton.disabled = true;
    }

    return fetch(chapter.file);
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Chapter file could not be loaded.");
    }
    return response.text();
  })
  .then(markdown => {
    const content = document.getElementById("chapter-content");

    const lines = markdown.split(/\r?\n/);

    content.innerHTML = lines.map(line => {
      const trimmed = line.trim();

      if (!trimmed) {
        return "<br>";
      }

      if (trimmed.startsWith("# ")) {
        return `<h1>${trimmed.substring(2)}</h1>`;
      }

      return `<p>${trimmed}</p>`;
    }).join("");
  })
  .catch(error => {
    console.error(error);

    document.getElementById("chapter-content").innerHTML =
      "<p>Unable to load this chapter.</p>";
  });
