fetch("chapters.json")
  .then(response => response.json())
  .then(chapters => {
    const list = document.getElementById("chapter-list");

    if (!list) return;

    list.innerHTML = "";

    chapters.forEach(chapter => {
      const link = document.createElement("a");
      link.className = "chapter-link";
      link.href = "chapter.html?id=" + encodeURIComponent(chapter.id);
      link.textContent = chapter.title;
      list.appendChild(link);
    });
  })
  .catch(error => {
    console.error(error);
    const list = document.getElementById("chapter-list");
    if (list) list.innerHTML = "<p>Unable to load chapters.</p>";
  });