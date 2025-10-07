function cargarCultos() {
  const API_KEY = "AIzaSyCB6xSzxeycNfGMYCMAXsDQjx3-dHFflj0";
  const CHANNEL_ID = "UCIecC8LfuWsK82SnPIjbqGQ";

  const contentDiv = document.getElementById("content");

  // Resetear todo el contenedor
  contentDiv.innerHTML = "";
  contentDiv.removeAttribute("style");
  contentDiv.style.display = "flex";
  contentDiv.style.flexDirection = "column";
  contentDiv.style.alignItems = "center";
  contentDiv.style.width = "100%";
  contentDiv.style.height = "100vh";
  contentDiv.style.overflowY = "scroll";
  contentDiv.style.padding = "30px 20px";
  contentDiv.style.boxSizing = "border-box";
  contentDiv.style.background = "#fff8e7";
  contentDiv.style.position = "relative"; // Para que el botón fijo se coloque correctamente

  // Ocultar menú principal
  const mainMenu = document.getElementById("mainMenu");
  if (mainMenu) mainMenu.style.display = "none";

  document.body.style.overflow = "hidden";

  // Crear estructura base (sin el botón aquí)
  contentDiv.innerHTML = `
    <h5 style="text-align:center; font-size: 24px;">Pastora: Nélida Brito Morales Copastor: Marcos Rivera</h5>
    <h2 style="text-align:center; font-size: 24px;">📺 Transmisiones en Vivo y Cultos Anteriores</h2>
    <div id="liveVideo" style="margin: 30px 0; width: 100%; max-width: 700px;"></div>
    <div id="pastVideos" style="width: 100%; max-width: 700px;"></div>
  `;

  // Crear botón volver fijo
  const btnVolver = document.createElement("button");
  btnVolver.textContent = "⬅️ Volver";
  btnVolver.style.position = "fixed";
  btnVolver.style.bottom = "20px";
  btnVolver.style.left = "20px";
  btnVolver.style.padding = "10px 20px";
  btnVolver.style.fontSize = "16px";
  btnVolver.style.background = "#333";
  btnVolver.style.color = "white";
  btnVolver.style.border = "none";
  btnVolver.style.borderRadius = "8px";
  btnVolver.style.zIndex = "9999";
  btnVolver.addEventListener("click", () => {
    contentDiv.innerHTML = "";
    contentDiv.style.display = "none";
    contentDiv.removeAttribute("style");

    mainMenu.style.display = "flex";

    document.body.style.background = "url('https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/IMG_8023.jpeg') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
    document.body.style.overflow = "hidden";

    // quitar botón volver fijo
    btnVolver.remove();
  });
  document.body.appendChild(btnVolver);

  // Mostrar video en vivo si hay
  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      const liveContainer = document.getElementById("liveVideo");
      if (data.items && data.items.length > 0) {
        const videoId = data.items[0].id.videoId;
        liveContainer.innerHTML = `
          <div style="background: #c90808; border: 3px solid red; padding: 10px; border-radius: 10px;">
            <iframe width="100%" height="400" src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allowfullscreen></iframe>
          </div>
        `;
      } else {
        liveContainer.innerHTML = `<p style="text-align: center; font-size: 18px; color: gray;">No hay transmisión en vivo en este momento.</p>`;
      }
    });

  // Mostrar videos anteriores (últimos 2 meses)
  const fechaActual = new Date();
  const fechaLimite = new Date();
  fechaLimite.setMonth(fechaActual.getMonth() - 2);
  const isoLimite = fechaLimite.toISOString();

  fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=30&type=video&publishedAfter=${isoLimite}`)
    .then(response => response.json())
    .then(data => {
      const pastContainer = document.getElementById("pastVideos");
      if (data.items && data.items.length > 0) {
        data.items.forEach(item => {
          const videoId = item.id.videoId;
          const title = item.snippet.title;
          const thumbnail = item.snippet.thumbnails.medium.url;

          const videoCard = document.createElement("div");
          videoCard.style.marginBottom = "30px";
          videoCard.style.background = "#c90808";
          videoCard.style.padding = "10px";
          videoCard.style.borderRadius = "10px";
          videoCard.style.textAlign = "center";
          videoCard.style.cursor = "pointer";

          videoCard.onclick = () => {
            window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
          };

          videoCard.innerHTML = `
  <img src="${thumbnail}" alt="${title}" style="width: 100%; border-radius: 10px; margin-bottom: 10px;">
  <p style="font-size:16px; color:#fff; margin:8px 0 0;">
    <strong>${title}</strong>
  </p>
`;

          pastContainer.appendChild(videoCard);
        });
      } else {
        pastContainer.innerHTML = `<p style="text-align: center; color: gray;">No se encontraron videos recientes.</p>`;
      }
    });
}

// Autoejecutar al cargar el archivo
cargarCultos();