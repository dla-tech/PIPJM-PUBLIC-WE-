const API_KEY = "AIzaSyCB6xSzxeycNfGMYCMAXsDQjx3-dHFflj0";
const CHANNEL_ID = "UCIecC8LfuWsK82SnPIjbqGQ";

const contentDiv = document.createElement("div");
contentDiv.id = "content";
document.body.appendChild(contentDiv);
document.getElementById("mainMenu").style.display = "none";

document.body.style.background = "#fff8e7";
document.body.style.overflowY = "auto";
document.body.style.overflowX = "hidden";

contentDiv.innerHTML = `
  <div style="width: 100%; min-height: 100vh; padding: 30px 20px; box-sizing: border-box; display: flex; flex-direction: column; align-items: center;">
    <h2 style="text-align:center; font-size: 24px;">📺 Transmisiones en Vivo y Cultos Anteriores</h2>
    <div id="liveVideo" style="margin-bottom: 40px; width: 100%; max-width: 700px;"></div>
    <div id="pastVideos" style="width: 100%; max-width: 700px;"></div>
    <button onclick="volverAlMenu()" style="margin-top: 40px; padding: 10px 20px; font-size: 16px; background: #333; color: white; border: none; border-radius: 8px;">⬅️ Volver</button>
  </div>
`;

// Mostrar video en vivo si hay
fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${API_KEY}`)
  .then(response => response.json())
  .then(data => {
    const liveContainer = document.getElementById("liveVideo");
    if (data.items && data.items.length > 0) {
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

// Mostrar videos anteriores (últimos 2 meses)
const fechaActual = new Date();
const fechaLimite = new Date();
fechaLimite.setMonth(fechaActual.getMonth() - 2);

const isoLimite = fechaLimite.toISOString();

fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=20&type=video&publishedAfter=${isoLimite}`)
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
        videoCard.style.background = "#ffdddd";
        videoCard.style.padding = "10px";
        videoCard.style.borderRadius = "10px";
        videoCard.style.textAlign = "center";
        videoCard.style.cursor = "pointer";

        videoCard.onclick = () => {
          window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
        };

        videoCard.innerHTML = `
          <img src="${thumbnail}" alt="${title}" style="width: 100%; border-radius: 10px; margin-bottom: 10px;">
          <p style="font-size: 16px;">${title}</p>
        `;

        pastContainer.appendChild(videoCard);
      });
    } else {
      pastContainer.innerHTML = `<p style="text-align: center; color: gray;">No se encontraron videos recientes.</p>`;
    }
  });

function volverAlMenu() {
  const content = document.getElementById("content");
  if (content) content.remove();
  const mainMenu = document.getElementById("mainMenu");
  if (mainMenu) mainMenu.style.display = "flex";
  document.body.style.background = "url('https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/IMG_8023.jpeg') no-repeat center center fixed";
  document.body.style.backgroundSize = "cover";
  document.body.style.overflow = "hidden";
}