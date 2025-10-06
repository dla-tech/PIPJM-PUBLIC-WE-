// REEMPLAZA con tu API KEY y el ID del canal
const API_KEY = "AIzaSyCB6xSzxeycNfGMYCMAXsDQjx3-dHFflj0";
const CHANNEL_ID = "UCIecC8LfuWsK82SnPIjbqGQ";

// Crear contenedor y ocultar el menú
const contentDiv = document.createElement("div");
contentDiv.id = "content";
document.body.appendChild(contentDiv);

document.getElementById("mainMenu").style.display = "none";
document.body.style.background = "#fff8e7";
document.body.style.overflowY = "auto";
document.body.style.overflowX = "hidden";

function volverAlMenu() {
  contentDiv.remove();
  document.getElementById("mainMenu").style.display = "flex";
  document.body.style.background = "url('https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/IMG_8023.jpeg') no-repeat center center fixed";
  document.body.style.backgroundSize = "cover";
  document.body.style.overflow = "hidden";
}

async function cargarCultos() {
  contentDiv.innerHTML = `
    <div style="padding:30px 20px;max-width:800px;margin:auto;">
      <h2 style="text-align:center;margin-bottom:20px;">📺 Cultos en Línea</h2>
      <div id="live" style="margin-bottom:40px;text-align:center;"></div>
      <div id="anteriores" style="display:flex;flex-direction:column;gap:30px;"></div>
      <button onclick="volverAlMenu()" style="margin:40px auto 0;display:block;padding:10px 20px;font-size:16px;background:#333;color:white;border:none;border-radius:8px;">⬅️ Volver</button>
    </div>
  `;

  await mostrarLive();
  await mostrarVideosAnteriores();
}

async function mostrarLive() {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  const liveDiv = document.getElementById("live");

  if (data.items && data.items.length > 0) {
    const liveId = data.items[0].id.videoId;
    const titulo = data.items[0].snippet.title;
    liveDiv.innerHTML = `
      <div style="background:#ffdddd;padding:10px;border:3px solid red;border-radius:10px;">
        <iframe width="100%" height="315" src="https://www.youtube.com/embed/${liveId}?autoplay=1" frameborder="0" allowfullscreen></iframe>
        <p style="margin-top:10px;font-weight:bold;">🔴 ${titulo}</p>
      </div>
    `;
  } else {
    liveDiv.innerHTML = `
      <div style="background:#ffecec;padding:10px;border:2px dashed gray;border-radius:10px;">
        <p style="text-align:center;font-weight:bold;">No hay transmisión en vivo actualmente.</p>
      </div>
    `;
  }
}

async function mostrarVideosAnteriores() {
  const fechaInicio = "2025-08-07T00:00:00Z"; // hace 2 meses
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=20&order=date&type=video&publishedAfter=${fechaInicio}&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  const contenedor = document.getElementById("anteriores");

  for (const video of data.items) {
    const videoId = video.id.videoId;
    const titulo = video.snippet.title;
    const thumbnail = video.snippet.thumbnails.medium.url;

    const tarjeta = document.createElement("div");
    tarjeta.style.background = "#ffe5e5";
    tarjeta.style.borderRadius = "10px";
    tarjeta.style.padding = "10px";
    tarjeta.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
    tarjeta.style.cursor = "pointer";
    tarjeta.style.transition = "transform 0.2s";
    tarjeta.onclick = () => {
      window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
    };

    tarjeta.innerHTML = `
      <img src="${thumbnail}" alt="${titulo}" style="width:100%;border-radius:8px;">
      <p style="text-align:center;font-weight:bold;margin-top:8px;">${titulo}</p>
    `;

    contenedor.appendChild(tarjeta);
  }
}

cargarCultos();
