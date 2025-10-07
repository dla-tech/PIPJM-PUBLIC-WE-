(() => {
  const contentDiv = document.getElementById("content");
  const mainMenu = document.getElementById("mainMenu");
  if (!contentDiv) return;

  // Ocultar menú principal y configurar el contenido
  mainMenu.style.display = "none";
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

  // Imagen interactiva con ubicación
  const ubicacionBox = document.createElement("div");
  ubicacionBox.style.maxWidth = "800px";
  ubicacionBox.style.width = "100%";
  ubicacionBox.style.marginBottom = "40px";
  ubicacionBox.style.border = "2px solid #ccc";
  ubicacionBox.style.borderRadius = "12px";
  ubicacionBox.style.overflow = "hidden";
  ubicacionBox.style.background = "#fff";

  ubicacionBox.innerHTML = `
    <h2 style="text-align:center;padding:16px 0;background:#f8f9fa;margin:0;font-size:22px;">Ubicación del templo</h2>
    <a href="https://maps.app.goo.gl/Tcfgi3CBb7fGjujy7?g_st=ipc" target="_blank">
      <img src="https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/IMG_7782.jpeg" 
           alt="Ubicación del templo" 
           style="width:100%;display:block;cursor:pointer;">
    <h3 style="margin-bottom: 20px;">Pastora: Nélida Brito Morales Copastor: Marcos River</h3>      
    </a>
  `;

  contentDiv.appendChild(ubicacionBox);

  // Título de historia
  const historiaTitulo = document.createElement("h2");
  historiaTitulo.textContent = "Historia del Templo y Congregación";
  historiaTitulo.style.marginTop = "40px";
  historiaTitulo.style.marginBottom = "20px";
  historiaTitulo.style.textAlign = "center";
  historiaTitulo.style.fontSize = "22px";
  contentDiv.appendChild(historiaTitulo);

  // Espacio para la historia
  const historiaTexto = document.createElement("div");
  historiaTexto.innerHTML = `<p style="text-align:justify;max-width:800px;margin:auto;padding:0 10px;">
    <!-- Aquí puedes añadir el texto de la historia más adelante -->
  </p>`;
  contentDiv.appendChild(historiaTexto);

  // Botón volver (Fijo abajo a la izquierda)
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
    mainMenu.style.display = "flex";
    document.body.style.overflow = "hidden";

    // Eliminar el botón volver para que no quede pegado
    document.body.removeChild(volverBtn);
  };
  document.body.appendChild(volverBtn);
})();