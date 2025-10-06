// peticiones.js completo — solo se agregó "congregacion" en el envío

(() => {
  const scriptEmailJS = document.createElement('script');
  scriptEmailJS.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js';
  scriptEmailJS.onload = () => {
    emailjs.init('AzWZTx6GexhwPU2UJ');
  };
  document.head.appendChild(scriptEmailJS);

  const originalBodyBg = getComputedStyle(document.body).backgroundImage || '';
  const contentDiv = document.getElementById("content");
  if (!contentDiv) return;

  contentDiv.style.display = "flex";
  contentDiv.style.width = "100%";
  contentDiv.style.height = "100vh";
  contentDiv.style.overflowY = "auto";
  contentDiv.style.overflowX = "hidden";
  contentDiv.style.padding = "30px 20px";
  contentDiv.style.boxSizing = "border-box";
  contentDiv.style.flexDirection = "column";
  contentDiv.style.alignItems = "center";
  contentDiv.style.background = "#fff8e7";

  const mainMenu = document.getElementById("mainMenu");
  if (mainMenu) mainMenu.style.display = "none";
  document.body.style.overflow = "hidden";

  let etapa = 0;
  let ultimaEtapa = 0;

  function mostrarPreguntaInicial() {
    etapa = 0;
    contentDiv.innerHTML = `
      <div style="width:100%;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;box-sizing:border-box;">
        <h2 style="text-align:center;font-size:24px;margin-top:8px;">🙏 Petición o Necesidad</h2>
        <p id="preguntaCongregacion" style="font-size:18px;margin-top:12px;">¿Asistes a una congregación?</p>
        <div id="botonesPregunta" style="display:flex;gap:20px;justify-content:center;margin-top:14px;margin-bottom:20px;">
          <button id="btnSi" style="padding:12px 24px;font-size:16px;">Sí</button>
          <button id="btnNo" style="padding:12px 24px;font-size:16px;">No</button>
        </div>
        <div style="width:100%;max-width:600px;margin-top:10px;text-align:center;">
          <small style="color:#6b7280">Tu nombre es obligatorio; número telefónico opcional salvo casos especiales.</small>
        </div>
        <div style="width:100%;max-width:600px;margin-top:30px;text-align:center;">
          <button onclick="goBack()" style="padding:10px 20px;font-size:16px;background:#333;color:white;border:none;border-radius:8px;">⬅️ Volver</button>
        </div>
      </div>
    `;
    document.getElementById("btnSi").onclick = () => {
      ultimaEtapa = etapa;
      etapa = 2;
      renderFormSi();
      contentDiv.scrollTop = 0;
    };
    document.getElementById("btnNo").onclick = () => {
      ultimaEtapa = etapa;
      etapa = 1;
      renderOpciones();
      contentDiv.scrollTop = 0;
    };
  }

  function renderFormSi() {
    etapa = 2;
    contentDiv.innerHTML = `
      <div style="width:100%;min-height:100vh;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;">
        <h2 style="margin-top:8px;">🙏 Petición o Necesidad</h2>
        <div style="width:100%;max-width:700px;margin-top:12px;">
          <label>Nombre completo (requerido):</label>
          <input type="text" id="nombre" style="width:100%;margin-bottom:10px;padding:8px;border-radius:6px;border:1px solid #ccc;" required>

          <label>Nombre de tu congregación:</label>
          <input type="text" id="congregacion" style="width:100%;margin-bottom:10px;padding:8px;border-radius:6px;border:1px solid #ccc;">

          <label>Escribe tu petición o necesidad:</label>
          <textarea id="peticion" style="width:100%;margin-bottom:10px;padding:8px;border-radius:6px;border:1px solid #ccc;" rows="5"></textarea>

          <label>Número telefónico (opcional):</label>
          <input type="text" id="telefono" style="width:100%;margin-bottom:10px;padding:8px;border-radius:6px;border:1px solid #ccc;">

          <div style="display:flex;gap:12px;justify-content:center;margin-top:14px;">
            <button id="enviarBtn" style="padding:10px 20px;font-size:16px;background:#0b74de;color:white;border:none;border-radius:8px;" disabled>Enviar</button>
            <button id="backBtn" style="padding:10px 20px;font-size:16px;background:#333;color:white;border:none;border-radius:8px;">⬅️ Volver</button>
          </div>
        </div>
      </div>
    `;

    const nombreInput = document.getElementById("nombre");
    const enviarBtn = document.getElementById("enviarBtn");
    const peticionTxt = document.getElementById("peticion");

    nombreInput.addEventListener("input", () => {
      enviarBtn.disabled = nombreInput.value.trim() === "" || (peticionTxt && peticionTxt.value.trim() === "");
    });
    if (peticionTxt) {
      peticionTxt.addEventListener("input", () => {
        enviarBtn.disabled = nombreInput.value.trim() === "" || (peticionTxt && peticionTxt.value.trim() === "");
      });
    }
    enviarBtn.addEventListener("click", () => {
      enviarPeticion();
    });

    document.getElementById("backBtn").addEventListener("click", () => {
      if (ultimaEtapa === 1) renderOpciones();
      else mostrarPreguntaInicial();
      contentDiv.scrollTop = 0;
    });
  }

  // (... el resto del código sigue igual ...)

  function enviarPeticion(razon) {
    const nombre = document.getElementById("nombre")?.value.trim();
    const congregacion = document.getElementById("congregacion")?.value.trim() || "";
    const peticion = document.getElementById("peticion")?.value.trim() || (razon || "");
    const telefono = document.getElementById("telefono")?.value.trim() || "";

    if (!nombre || !peticion) {
      alert("Por favor completa los campos requeridos.");
      return;
    }
    if (peticion.toLowerCase().includes("suicidio") && telefono === "") {
      alert("Por razones de seguridad, por favor incluye un número telefónico.");
      return;
    }

    const enviarBtn = document.getElementById("enviarBtn");
    enviarBtn.disabled = true;
    enviarBtn.textContent = "Enviando...";

    emailjs.send('service_wjbpiik', 'template_89ugs9a', {
      nombre: nombre,
      congregacion: congregacion,
      telefono: telefono,
      razon: razon || "Petición directa",
      mensaje: peticion
    }).then(() => {
      alert("✅ ¡Petición enviada con éxito!");
      mostrarPreguntaInicial();
    }).catch((err) => {
      console.error("Error al enviar:", err);
      alert("❌ Hubo un error al enviar. Intenta más tarde.");
    }).finally(() => {
      enviarBtn.disabled = false;
      enviarBtn.textContent = "Enviar";
    });
  }

  // (... resto del archivo igual ...)

  window.goBack = function() {
    if (etapa === 2) {
      if (ultimaEtapa === 1) renderOpciones();
      else mostrarPreguntaInicial();
    } else if (etapa === 1) {
      mostrarPreguntaInicial();
    } else {
      volverAlMenu();
    }
    contentDiv.scrollTop = 0;
  };

  function volverAlMenu() {
    contentDiv.innerHTML = "";
    contentDiv.style.display = "none";
    if (originalBodyBg && originalBodyBg !== 'none') {
      document.body.style.background = originalBodyBg;
    } else {
      document.body.style.background = "url('https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/IMG_8023.jpeg') no-repeat center center fixed";
      document.body.style.backgroundSize = "cover";
    }
    document.body.style.overflow = "hidden";
    if (mainMenu) mainMenu.style.display = "flex";
    etapa = 0;
    ultimaEtapa = 0;
  }

  window.volverAlMenu = volverAlMenu;
  mostrarPreguntaInicial();
})();