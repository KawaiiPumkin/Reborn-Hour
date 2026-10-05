fetch("chapters.json")
  .then(response => response.json())
  .then(chapters => {
    const list = document.getElementById("chapter-list");

    chapters.forEach(chapter => {
      const link = document.createElement("a");

      link.href = `chapter.html?id=${chapter.id}`;
      link.textContent = chapter.title;

      list.appendChild(link);
    });
  })
  .catch(error => {
    console.error("Error loading chapters:", error);
  });
