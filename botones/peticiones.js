// peticiones.js (versión completa con botón Volver flotante corregido)

// Inicializar EmailJS al cargar
(() => {
  const scriptEmailJS = document.createElement('script');
  scriptEmailJS.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js';
  scriptEmailJS.onload = () => {
    emailjs.init('AzWZTx6GexhwPU2UJ');
  };
  document.head.appendChild(scriptEmailJS);

  const originalBodyBg = getComputedStyle(document.body).backgroundImage || '';
  const contentDiv = document.getElementById("content");
  const mainMenu = document.getElementById("mainMenu");
  if (!contentDiv || !mainMenu) return;

  document.body.style.overflow = "hidden";
  contentDiv.style.display = "block";
  contentDiv.style.background = "#fff8e7";
  contentDiv.style.width = "100%";
  contentDiv.style.height = "100vh";
  contentDiv.style.overflowY = "auto";
  contentDiv.style.padding = "30px 20px";
  contentDiv.style.boxSizing = "border-box";
  contentDiv.style.display = "flex";
  contentDiv.style.flexDirection = "column";
  contentDiv.style.alignItems = "center";
  mainMenu.style.display = "none";

  let etapa = 0, ultimaEtapa = 0;

  function agregarBotonVolverFlotante() {
    if (document.getElementById("btnVolverFlotante")) return;
    const btn = document.createElement("button");
    btn.id = "btnVolverFlotante";
    btn.textContent = "⬅️ Volver";
    btn.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      padding: 10px 20px;
      background: #333;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      z-index: 9999;
    `;
    btn.onclick = goBack;
    document.body.appendChild(btn);
  }

  function eliminarBotonVolver() {
    const btn = document.getElementById("btnVolverFlotante");
    if (btn) btn.remove();
  }

  function mostrarPreguntaInicial() {
    etapa = 0;
    contentDiv.innerHTML = `
      <h2 style="text-align:center;font-size:24px;margin-top:8px;">🙏 Petición o Necesidad</h2>
      <p style="font-size:18px;margin-top:12px;">¿Asistes a una congregación?</p>
      <div style="display:flex;gap:20px;justify-content:center;margin-top:14px;">
        <button id="btnSi" style="padding:12px 24px;font-size:16px;">Sí</button>
        <button id="btnNo" style="padding:12px 24px;font-size:16px;">No</button>
      </div>
    `;
    document.getElementById("btnSi").onclick = () => { ultimaEtapa = etapa; etapa = 2; renderFormSi(); };
    document.getElementById("btnNo").onclick = () => { ultimaEtapa = etapa; etapa = 1; renderOpciones(); };
    agregarBotonVolverFlotante();
  }

  function renderFormSi() {
    etapa = 2;
    contentDiv.innerHTML = `
      <h2 style="margin-top:8px;">🙏 Petición o Necesidad</h2>
      <div style="width:100%;max-width:700px;margin-top:12px;">
        <label>Nombre completo (requerido):</label>
        <input type="text" id="nombre" style="width:100%;margin-bottom:10px;padding:8px;" required>

        <label>Nombre de tu congregación:</label>
        <input type="text" id="congregacion" style="width:100%;margin-bottom:10px;padding:8px;">

        <label>Escribe tu petición o necesidad:</label>
        <textarea id="peticion" rows="5" style="width:100%;margin-bottom:10px;padding:8px;"></textarea>

        <label>Número telefónico (opcional):</label>
        <input type="text" id="telefono" style="width:100%;margin-bottom:10px;padding:8px;">

        <div style="text-align:center;margin-top:14px;">
          <button id="enviarBtn" style="padding:10px 20px;background:#0b74de;color:white;border:none;border-radius:8px;" disabled>Enviar</button>
        </div>
      </div>
    `;
    const nombreInput = document.getElementById("nombre");
    const peticionInput = document.getElementById("peticion");
    const enviarBtn = document.getElementById("enviarBtn");

    function validar() {
      enviarBtn.disabled = !(nombreInput.value.trim() && peticionInput.value.trim());
    }

    nombreInput.oninput = validar;
    peticionInput.oninput = validar;

    enviarBtn.onclick = () => {
      const nombre = nombreInput.value.trim();
      const congregacion = document.getElementById("congregacion").value.trim();
      const peticion = peticionInput.value.trim();
      const telefono = document.getElementById("telefono").value.trim();
      enviarBtn.disabled = true;
      enviarBtn.textContent = "Enviando...";
      emailjs.send('service_wjbpiik', 'template_89ugs9a', {
        nombre, congregacion, mensaje: peticion, telefono, razon: "Formulario completo"
      }).then(() => {
        alert("✅ ¡Petición enviada!");
        mostrarPreguntaInicial();
      }).catch(err => {
        console.error(err);
        alert("❌ Error al enviar");
      }).finally(() => {
        enviarBtn.disabled = false;
        enviarBtn.textContent = "Enviar";
      });
    };
    agregarBotonVolverFlotante();
  }

  function renderOpciones() {
    etapa = 1;
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
    contentDiv.innerHTML = `<h2 style="margin-top:8px;">🙏 Petición o Necesidad</h2>`;
    const contenedor = document.createElement("div");
    contenedor.style.width = "100%";
    contenedor.style.maxWidth = "700px";
    contenedor.style.marginTop = "12px";
    contenedor.style.display = "flex";
    contenedor.style.flexDirection = "column";
    contenedor.style.gap = "12px";
    contentDiv.appendChild(contenedor);

    opciones.forEach(op => {
      const btn = document.createElement("button");
      btn.textContent = op;
      btn.style.cssText = "padding:16px;font-size:16px;border-radius:8px;";
      btn.onclick = () => renderCustom(op);
      contenedor.appendChild(btn);
    });
    agregarBotonVolverFlotante();
  }

  function renderCustom(razon) {
    etapa = 2;
    const obligatorioTel = ["Oración por salvación", "Oración por reconciliación"].includes(razon);
    contentDiv.innerHTML = `
      <h2 style="margin-top:8px;">🙏 ${razon}</h2>
      <div style="width:100%;max-width:700px;margin-top:12px;">
        ${razon === "Otros" ? `<label>Necesidad:</label><textarea id="peticion" rows="4" style="width:100%;margin-bottom:10px;padding:8px;"></textarea>` : ''}
        <label>Nombre completo:</label>
        <input type="text" id="nombre" style="width:100%;margin-bottom:10px;padding:8px;" required>
        <label>Teléfono ${obligatorioTel ? "(requerido)" : "(opcional)"}:</label>
        <input type="text" id="telefono" ${obligatorioTel ? "required" : ""} style="width:100%;margin-bottom:10px;padding:8px;">
        <div style="text-align:center;margin-top:14px;">
          <button id="enviarBtn" style="padding:10px 20px;background:#0b74de;color:white;border:none;border-radius:8px;" disabled>Enviar</button>
        </div>
      </div>
    `;
    const nombre = document.getElementById("nombre");
    const peticion = document.getElementById("peticion");
    const enviarBtn = document.getElementById("enviarBtn");

    function validar() {
      const n = nombre.value.trim();
      const p = peticion ? peticion.value.trim() : "✓";
      enviarBtn.disabled = !n || !p;
    }

    nombre.oninput = validar;
    if (peticion) peticion.oninput = validar;

    enviarBtn.onclick = () => {
      const telefono = document.getElementById("telefono").value.trim();
      const mensaje = peticion ? peticion.value.trim() : razon;
      const nombreVal = nombre.value.trim();
      if (mensaje.toLowerCase().includes("suicidio") && telefono === "") {
        alert("Por seguridad, incluye tu teléfono.");
        return;
      }
      enviarBtn.disabled = true;
      enviarBtn.textContent = "Enviando...";
      emailjs.send('service_wjbpiik', 'template_89ugs9a', {
        nombre: nombreVal,
        mensaje,
        telefono,
        razon
      }).then(() => {
        alert("✅ ¡Petición enviada!");
        mostrarPreguntaInicial();
      }).catch(() => {
        alert("❌ Error al enviar");
      }).finally(() => {
        enviarBtn.disabled = false;
        enviarBtn.textContent = "Enviar";
      });
    };
    agregarBotonVolverFlotante();
  }

  window.goBack = function () {
    if (etapa === 2) {
      if (ultimaEtapa === 1) renderOpciones();
      else mostrarPreguntaInicial();
    } else if (etapa === 1) {
      mostrarPreguntaInicial();
    } else {
      volverAlMenu();
    }
  };

  function volverAlMenu() {
    contentDiv.innerHTML = "";
    contentDiv.style.display = "none";
    mainMenu.style.display = "flex";
    document.body.style.background = originalBodyBg || "#fff";
    document.body.style.overflow = "hidden";
    eliminarBotonVolver();
    etapa = 0;
    ultimaEtapa = 0;
  }

  window.volverAlMenu = volverAlMenu;
  mostrarPreguntaInicial();
})();