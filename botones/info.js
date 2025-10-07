(() => {
  const contentDiv = document.getElementById("content");
  const mainMenu = document.getElementById("mainMenu");
  if (!contentDiv) return;

  // Ocultar menú principal y configurar el contenido
  if (mainMenu) mainMenu.style.display = "none";
  contentDiv.style.display = "flex";
  contentDiv.style.flexDirection = "column";
  contentDiv.style.alignItems = "center";
  contentDiv.style.padding = "20px";
  contentDiv.style.boxSizing = "border-box";
  contentDiv.style.width = "100%";
  contentDiv.style.height = "100vh";
  contentDiv.style.overflowY = "auto";
  contentDiv.style.background = "#fff8e7"; // Fondo crema
  contentDiv.innerHTML = "";

  // === Recuadro: Ubicación del templo (con imagen interactiva + pastora/copastor dentro) ===
  const ubicacionBox = document.createElement("div");
  ubicacionBox.style.maxWidth = "800px";
  ubicacionBox.style.width = "100%";
  ubicacionBox.style.marginBottom = "40px";
  ubicacionBox.style.border = "2px solid #ccc";
  ubicacionBox.style.borderRadius = "12px";
  ubicacionBox.style.overflow = "hidden";
  ubicacionBox.style.background = "#fff";
  ubicacionBox.style.boxShadow = "0 10px 30px rgba(0,0,0,.10)";

  ubicacionBox.innerHTML = `
    <h2 style="text-align:center;padding:16px 0;background:#f8f9fa;margin:0;font-size:22px;">
      Ubicación del templo
    </h2>
    <a href="https://maps.app.goo.gl/Tcfgi3CBb7fGjujy7?g_st=ipc" target="_blank" style="text-decoration:none;color:inherit;">
      <img
        src="https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/IMG_7782.jpeg"
        alt="Ubicación del templo"
        style="width:100%;display:block;cursor:pointer;"
      >
      <h6 style="text-align:center; font-size: 20px; margin: 12px 0 16px 0;">
        Pastora: Nélida Brito Morales &nbsp;&nbsp;|&nbsp;&nbsp; Copastor: Marcos Rivera
      </h6>
    </a>
  `;
  contentDiv.appendChild(ubicacionBox);

  // === Tarjeta de Historia (misma estética 'card' que te gustó) ===
  const historiaCard = document.createElement("div");
  historiaCard.style.maxWidth = "800px";
  historiaCard.style.width = "100%";
  historiaCard.style.borderRadius = "16px";
  historiaCard.style.background = "#ffffff";
  historiaCard.style.boxShadow = "0 10px 30px rgba(0,0,0,.12)";
  historiaCard.style.overflow = "hidden";
  historiaCard.style.marginBottom = "28px";

  historiaCard.innerHTML = `
    <div style="background:#f8f9fa; padding:16px 18px;">
      <h2 style="margin:0; text-align:center; font-size:22px;">
        Historia del Templo y Congregación
      </h2>
    </div>

    <div style="padding:18px;">
      <div
        id="historiaContenido"
        style="
          border:2px dashed #e5e7eb;
          border-radius:12px;
          background:#fafafa;
          padding:16px;
          color:#374151;
          line-height:1.6;
          text-align:center;
        "
      >
        ✍️ <strong>Puedes pegar aquí la historia cuando la tengas lista.</strong>
        <div style="font-size:14px;color:#6b7280;margin-top:6px;">
          Este recuadro está preparado para que, cuando tengas el texto,
          lo reemplaces dentro de este contenedor.
        </div>
      </div>
    </div>
  `;
  contentDiv.appendChild(historiaCard);

  // === Botón volver (fijo abajo a la izquierda, sin afectar scroll) ===
  const volverBtn = document.createElement("button");
  volverBtn.textContent = "⬅️ Volver";
  volverBtn.style.position = "fixed";
  volverBtn.style.bottom = "20px";
  volverBtn.style.left = "20px";
  volverBtn.style.zIndex = "999";
  volverBtn.style.padding = "10px 20px";
  volverBtn.style.fontSize = "16px";
  volverBtn.style.background = "#333";
  volverBtn.style.color = "white";
  volverBtn.style.border = "none";
  volverBtn.style.borderRadius = "8px";
  volverBtn.style.boxShadow = "2px 2px 6px rgba(0,0,0,0.3)";
  volverBtn.onclick = () => {
    // Restaurar menú principal
    contentDiv.innerHTML = "";
    contentDiv.style.display = "none";
    if (mainMenu) mainMenu.style.display = "flex";
    document.body.style.overflow = "hidden";

    // Eliminar el botón volver para que no quede pegado
    document.body.removeChild(volverBtn);
  };
  document.body.appendChild(volverBtn);
})();