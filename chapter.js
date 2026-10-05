const params = new URLSearchParams(window.location.search);
const chapterId = params.get("id") || "prologue";

const chapterContainer = document.getElementById("chapter");
const previousButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

fetch("chapters.json")
  .then(response => response.json())
  .then(chapters => {
    const currentIndex = chapters.findIndex(
      chapter => chapter.id === chapterId
    );

    if (currentIndex === -1) {
      chapterContainer.innerHTML = "<p>Chapter not found.</p>";
      return;
    }

    const chapter = chapters[currentIndex];

    return fetch(chapter.file)
      .then(response => {
        if (!response.ok) {
          throw new Error("Chapter file could not be loaded.");
        }
        return response.text();
      })
      .then(markdown => {
        const lines = markdown.split(/\r?\n/);

        chapterContainer.innerHTML = lines.map(line => {
          const text = line.trim();

          if (!text) {
            return "<br>";
          }

          if (text.startsWith("# ")) {
            return `<h1>${text.substring(2)}</h1>`;
          }

          return `<p>${text}</p>`;
        }).join("");

        if (currentIndex > 0) {
          previousButton.textContent = "Previous Chapter";
          previousButton.href =
            `chapter.html?id=${chapters[currentIndex - 1].id}`;
        } else {
          previousButton.style.display = "none";
        }

        if (currentIndex < chapters.length - 1) {
          nextButton.textContent = "Next Chapter";
          nextButton.href =
            `chapter.html?id=${chapters[currentIndex + 1].id}`;
        } else {
          nextButton.style.display = "none";
        }
      });
  })
  .catch(error => {
    console.error(error);
    chapterContainer.innerHTML =
      "<p>Unable to load this chapter.</p>";
  });
