(() => {
  const scriptEmailJS = document.createElement('script');
  scriptEmailJS.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js';
  scriptEmailJS.onload = () => emailjs.init('AzWZTx6GexhwPU2UJ');
  document.head.appendChild(scriptEmailJS);

  const contentDiv = document.getElementById("content");
  const mainMenu = document.getElementById("mainMenu");
  const originalBodyBg = getComputedStyle(document.body).backgroundImage || '';

  if (!contentDiv || !mainMenu) return;

  contentDiv.style.display = "block";
  contentDiv.style.background = "#fff8e7";
  contentDiv.style.padding = "30px 20px";
  contentDiv.style.boxSizing = "border-box";
  contentDiv.style.overflowY = "auto";
  contentDiv.style.overflowX = "hidden";
  contentDiv.style.height = "100vh";

  mainMenu.style.display = "none";
  document.body.style.overflow = "hidden";

  let etapa = 0;
  let ultimaEtapa = 0;

  function mostrarPreguntaInicial() {
    etapa = 0;
    contentDiv.innerHTML = `
      <div style="text-align:center;">
      <h3 style="margin-bottom: 20px;">Pastora: Nélida Brito Morales Copastor: Marcos Rivera</h3>
        <h2>🙏 Petición o Necesidad</h2>
        <p style="font-size:18px;">¿Asistes a una congregación?</p>
        <div style="margin:20px;">
          <button id="btnSi" style="padding:12px 24px;font-size:16px;">Sí</button>
          <button id="btnNo" style="padding:12px 24px;font-size:16px;">No</button>
        </div>
        <small style="color:#6b7280">“Solicitamos los campos obligatorios para poder dar un mejor seguimiento y brindarle un servicio más cálido y acorde a sus necesidades.”</small>
      </div>
    `;
    agregarBotonVolver();
    document.getElementById("btnSi").onclick = () => {
      ultimaEtapa = etapa;
      etapa = 2;
      renderFormSi();
    };
    document.getElementById("btnNo").onclick = () => {
      ultimaEtapa = etapa;
      etapa = 1;
      renderOpciones();
    };
  }

  function renderFormSi() {
    etapa = 2;
    contentDiv.innerHTML = `
      <h2>🙏 Petición o Necesidad</h2>
      <label>Nombre completo <span style="color:#d00">(obligatorio)</span>:</label>
      <input type="text" id="nombre" style="width:100%;margin-bottom:10px;" required>

      <label>Nombre de tu congregación <span style="color:#007a00">(opcional)</span>:</label>
      <input type="text" id="congregacion" style="width:100%;margin-bottom:10px;">

      <label>Escribe tu petición o necesidad <span style="color:#d00">(obligatorio)</span>:</label>
      <textarea id="peticion" rows="5" style="width:100%;margin-bottom:10px;"></textarea>

      <label>Número telefónico <span style="color:#007a00">(opcional)</span>:</label>
      <input type="text" id="telefono" style="width:100%;margin-bottom:10px;">

      <button id="enviarBtn" disabled style="background:#d1d5db;color:white;padding:10px 20px;border:none;border-radius:8px;">Enviar</button>
    `;
    agregarBotonVolver();

    const nombreInput = document.getElementById("nombre");
    const peticionInput = document.getElementById("peticion");
    const enviarBtn = document.getElementById("enviarBtn");

    function validar() {
      if (nombreInput.value.trim() !== "" && peticionInput.value.trim() !== "") {
        enviarBtn.disabled = false;
        enviarBtn.style.backgroundColor = "#0b74de"; // azul activo
      } else {
        enviarBtn.disabled = true;
        enviarBtn.style.backgroundColor = "#d1d5db"; // gris desactivado
      }
    }
    nombreInput.addEventListener("input", validar);
    peticionInput.addEventListener("input", validar);

    enviarBtn.addEventListener("click", () => {
      enviarPeticion();
    });
  }

  function renderOpciones() {
    etapa = 1;
    contentDiv.innerHTML = `<h2>🙏 Petición o Necesidad</h2><p>Selecciona tu necesidad:</p>`;
    const opciones = [
      "Oración por enfermedad",
      "Oración por la familia",
      "Oración por matrimonio",
      "Oración por hijos",
      "Oración por salvación",
      "Oración por liberación",
      "Oración por reconciliación",
      "Otros"
    ];
    opciones.forEach(op => {
      const b = document.createElement("button");
      b.textContent = op;
      b.style.cssText = "display:block;width:100%;padding:15px;margin:8px 0;font-size:16px;";
      b.onclick = () => {
        ultimaEtapa = etapa; // Guardamos que venimos de esta lista
        renderFormularioPredeterminado(op);
      };
      contentDiv.appendChild(b);
    });
    agregarBotonVolver();
  }

  function renderFormularioPredeterminado(razon) {
    etapa = 2;
    const telLabel = (["Oración por salvación", "Oración por reconciliación"].includes(razon))
      ? '<span style="color:#d00">(obligatorio)</span>'
      : '<span style="color:#007a00">(opcional)</span>';
    const telReqAttr = (["Oración por salvación", "Oración por reconciliación"].includes(razon)) ? "required" : "";
    const extra = razon === "Otros"
      ? `<label>Escribe tu necesidad <span style="color:#d00">(obligatorio)</span>:</label><textarea id="peticion" rows="4" style="width:100%;margin-bottom:10px;"></textarea>`
      : `<div style="margin-bottom:10px;font-weight:600;color:#111;">${razon}</div>`;

    contentDiv.innerHTML = `
      <h2>🙏 Petición o Necesidad</h2>
      ${extra}
      <label>Nombre completo <span style="color:#d00">(obligatorio)</span>:</label>
      <input type="text" id="nombre" style="width:100%;margin-bottom:10px;" required>

      <label>Número telefónico ${telLabel}:</label>
      <input type="text" id="telefono" ${telReqAttr} style="width:100%;margin-bottom:10px;">

      <button id="enviarBtn" disabled style="background:#d1d5db;color:white;padding:10px 20px;border:none;border-radius:8px;">Enviar</button>
    `;
    agregarBotonVolver();

    const nombreInput = document.getElementById("nombre");
    const peticionInput = document.getElementById("peticion");
    const enviarBtn = document.getElementById("enviarBtn");

    function validar() {
      if (peticionInput) {
        if (nombreInput.value.trim() !== "" && peticionInput.value.trim() !== "") {
          enviarBtn.disabled = false;
          enviarBtn.style.backgroundColor = "#0b74de"; // azul activo
        } else {
          enviarBtn.disabled = true;
          enviarBtn.style.backgroundColor = "#d1d5db"; // gris desactivado
        }
      } else {
        if (nombreInput.value.trim() !== "") {
          enviarBtn.disabled = false;
          enviarBtn.style.backgroundColor = "#0b74de";
        } else {
          enviarBtn.disabled = true;
          enviarBtn.style.backgroundColor = "#d1d5db";
        }
      }
    }
    nombreInput.addEventListener("input", validar);
    if (peticionInput) peticionInput.addEventListener("input", validar);

    enviarBtn.addEventListener("click", () => {
      enviarPeticion(razon);
    });
  }

  function enviarPeticion(razon) {
    const nombre = document.getElementById("nombre")?.value.trim();
    const peticion = document.getElementById("peticion")?.value.trim() || razon || "";
    const telefono = document.getElementById("telefono")?.value.trim() || "";
    const congregacion = document.getElementById("congregacion")?.value.trim() || "";

    if (!nombre || !peticion) {
      alert("Por favor completa los campos requeridos.");
      return;
    }

    if (peticion.toLowerCase().includes("suicidio") && telefono === "") {
      alert("Por razones de seguridad, por favor incluye un número telefónico.");
      return;
    }

    const btn = document.getElementById("enviarBtn");
    btn.disabled = true;
    btn.textContent = "Enviando...";

    emailjs.send('service_wjbpiik', 'template_89ugs9a', {
      nombre,
      telefono,
      razon: razon || "Petición directa",
      mensaje: peticion,
      congregacion
    }).then(() => {
      alert("✅ ¡Petición enviada con éxito!");
      mostrarPreguntaInicial();
    }).catch((err) => {
      console.error("Error al enviar:", err);
      alert("❌ Error al enviar. Intenta más tarde.");
    }).finally(() => {
      btn.disabled = false;
      btn.textContent = "Enviar";
      btn.style.backgroundColor = "#0b74de";
    });
  }

  function agregarBotonVolver() {
    eliminarBotonVolver();

    const volver = document.createElement("button");
    volver.textContent = "⬅️ Volver";
    volver.id = "btnFlotanteVolver";
    volver.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      padding: 12px 20px;
      font-size: 16px;
      background: #333;
      color: white;
      border: none;
      border-radius: 8px;
      z-index: 9999;
    `;
    volver.onclick = () => {
      if (etapa === 2) {
        if (ultimaEtapa === 1) {
          renderOpciones();
        } else {
          mostrarPreguntaInicial();
        }
      } else if (etapa === 1) {
        mostrarPreguntaInicial();
      } else {
        volverAlMenu();
      }
    };
    document.body.appendChild(volver);
  }

  function eliminarBotonVolver() {
    const btn = document.getElementById("btnFlotanteVolver");
    if (btn) btn.remove();
  }

  function volverAlMenu() {
    contentDiv.innerHTML = "";
    contentDiv.style.display = "none";
    document.body.style.overflow = "hidden";
    if (originalBodyBg && originalBodyBg !== 'none') {
      document.body.style.background = originalBodyBg;
    } else {
      document.body.style.background = "#fff";
    }
    mainMenu.style.display = "flex";
    eliminarBotonVolver();
    etapa = 0;
    ultimaEtapa = 0;
  }

  mostrarPreguntaInicial();
})();