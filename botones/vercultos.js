function mostrarCultos() {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = ""; // Limpiar por si acaso
  contentDiv.style.display = "block";
  contentDiv.style.width = "100%";
  contentDiv.style.minHeight = "100vh";
  contentDiv.style.overflowY = "auto";
  contentDiv.style.padding = "30px 20px";
  contentDiv.style.boxSizing = "border-box";
  contentDiv.style.display = "flex";
  contentDiv.style.flexDirection = "column";
  contentDiv.style.alignItems = "center";
  contentDiv.style.background = "#fff8e7";

  document.getElementById("mainMenu").style.display = "none";
  document.body.style.overflow = "hidden";

  contentDiv.innerHTML = `
    <h2 style="text-align:center; font-size: 24px;">📺 Transmisiones en Vivo y Cultos Anteriores</h2>
    <div id="liveVideo" style="margin: 30px 0; width: 100%; max-width: 700px;"></div>
    <div id="pastVideos" style="width: 100%; max-width: 700px;"></div>
    <button onclick="volverAlMenu()" style="margin: 40px 0 20px; padding: 10px 20px; font-size: 16px; background: #333; color: white; border: none; border-radius: 8px;">⬅️ Volver</button>
  `;

  // Video en vivo
  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      const liveContainer = document.getElementById("liveVideo");
      if (data.items?.length > 0) {
        const videoId = data.items[0].id.videoId;
        liveContainer.innerHTML = `
          <div style="background: #ffdddd; border: 3px solid red; padding: 10px; border-radius: 10px;">
            <iframe width="100%" height="400" src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allowfullscreen></iframe>
          </div>
        `;
      } else {
        liveContainer.innerHTML = `<p style="text-align: center; font-size: 18px; color: gray;">No hay transmisión en vivo en este momento.</p>`;
      }
    });

  // Videos anteriores
  const fechaActual = new Date();
  const fechaLimite = new Date();
  fechaLimite.setMonth(fechaActual.getMonth() - 2);
  const isoLimite = fechaLimite.toISOString();

  fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=30&type=video&publishedAfter=${isoLimite}`)
    .then(res => res.json())
    .then(data => {
      const pastContainer = document.getElementById("pastVideos");
      if (data.items?.length > 0) {
        data.items.forEach(item => {
          const videoId = item.id.videoId;
          const title = item.snippet.title;
          const thumbnail = item.snippet.thumbnails.medium.url;

          const card = document.createElement("div");
          card.style.marginBottom = "30px";
          card.style.background = "#ffdddd";
          card.style.padding = "10px";
          card.style.borderRadius = "10px";
          card.style.textAlign = "center";
          card.style.cursor = "pointer";
          card.onclick = () => window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");

          card.innerHTML = `
            <img src="${thumbnail}" alt="${title}" style="width: 100%; border-radius: 10px; margin-bottom: 10px;">
            <p style="font-size: 16px;">${title}</p>
          `;
          pastContainer.appendChild(card);
        });
      } else {
        pastContainer.innerHTML = `<p style="text-align: center; color: gray;">No se encontraron videos recientes.</p>`;
      }
    });
}