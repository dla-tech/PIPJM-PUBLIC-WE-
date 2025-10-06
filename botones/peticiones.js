// peticiones.js (versión corregida)
// Usa el <div id="content"> que ya existe en el HTML (NO crear uno nuevo)

(() => {
  // --- Configuración inicial ---
  const originalBodyBg = getComputedStyle(document.body).backgroundImage || '';
  const contentDiv = document.getElementById("content");
  if (!contentDiv) {
    console.error("No se encontró #content en el HTML.");
    return;
  }

  // Mostrar el contenedor existente y aplicarle estilos para scroll
  contentDiv.style.display = "block";
  contentDiv.style.width = "100%";
  contentDiv.style.height = "100vh";
  contentDiv.style.overflowY = "auto";
  contentDiv.style.overflowX = "hidden";
  contentDiv.style.padding = "30px 20px";
  contentDiv.style.boxSizing = "border-box";
  contentDiv.style.display = "flex";
  contentDiv.style.flexDirection = "column";
  contentDiv.style.alignItems = "center";
  contentDiv.style.background = "#fff8e7";

  // Ocultar menú principal
  const mainMenu = document.getElementById("mainMenu");
  if (mainMenu) mainMenu.style.display = "none";

  // Bloquear scroll del body para que el scroll sea dentro de #content
  document.body.style.overflow = "hidden";

  // Estado de la navegación dentro de peticiones:
  // etapa: 0 = pregunta inicial, 1 = opciones (No), 2 = formulario (Sí o detalle seleccionado)
  let etapa = 0;
  let ultimaEtapa = 0; // para recordar si venimos de opciones o pregunta

  // --- Funciones de render ---
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
    // Asignar handlers
    document.getElementById("btnSi").onclick = () => {
      ultimaEtapa = etapa;
      etapa = 2;
      renderFormSi();
      // aseguramos scroll top
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

    // activar validación simple: nombre requerido
    const nombreInput = document.getElementById("nombre");
    const enviarBtn = document.getElementById("enviarBtn");
    const peticionTxt = document.getElementById("peticion");
    const telefonoInput = document.getElementById("telefono");

    nombreInput.addEventListener("input", () => {
      enviarBtn.disabled = nombreInput.value.trim() === "" || (peticionTxt && peticionTxt.value.trim() === "");
    });

    // Si escriben peticion también se valida (opcional aquí)
    if (peticionTxt) {
      peticionTxt.addEventListener("input", () => {
        enviarBtn.disabled = nombreInput.value.trim() === "" || (peticionTxt && peticionTxt.value.trim() === "");
      });
    }

    enviarBtn.addEventListener("click", () => {
      enviarPeticion();
    });

    document.getElementById("backBtn").addEventListener("click", () => {
      // si venimos desde opciones (ultimaEtapa==1) volvemos a opciones, sino a pregunta
      if (ultimaEtapa === 1) renderOpciones();
      else mostrarPreguntaInicial();
      contentDiv.scrollTop = 0;
    });
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
    contentDiv.innerHTML = `
      <div style="width:100%;min-height:100vh;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;">
        <h2 style="margin-top:8px;">🙏 Petición o Necesidad</h2>
        <div style="width:100%;max-width:700px;margin-top:12px;">
          <p style="margin-bottom:12px;">Selecciona tu necesidad:</p>
          <div id="botonesOpciones" style="display:flex;flex-direction:column;gap:12px;margin-bottom:20px;"></div>
        </div>

        <div style="width:100%;max-width:700px;text-align:center;margin-top:auto;margin-bottom:20px;">
          <button id="backToQuestion" style="padding:10px 20px;font-size:16px;background:#333;color:white;border:none;border-radius:8px;">⬅️ Volver</button>
        </div>
      </div>
    `;

    const contBtns = document.getElementById("botonesOpciones");
    opciones.forEach(op => {
      const b = document.createElement("button");
      b.textContent = op;
      b.style.cssText = "padding:18px 28px;font-size:18px;width:100%;border-radius:8px;border:1px solid rgba(0,0,0,0.06);background:#fff;";
      b.onclick = () => {
        renderCustom(op);
        contentDiv.scrollTop = 0;
      };
      contBtns.appendChild(b);
    });

    // El botón de volver en esta pantalla regresa a la pregunta inicial
    document.getElementById("backToQuestion").addEventListener("click", () => {
      mostrarPreguntaInicial();
      contentDiv.scrollTop = 0;
    });

    // Aseguramos que el contenedor pueda scrollear si hay muchos botones
    contentDiv.style.overflowY = "auto";
  }

  function renderCustom(razon) {
    etapa = 2;
    const telLabel = (["Oración por salvación", "Oración por reconciliación"].includes(razon)) ? "(requerido)" : "(opcional)";
    const telReqAttr = (["Oración por salvación", "Oración por reconciliación"].includes(razon)) ? "required" : "";
    const extra = razon === "Otros"
      ? `<label>Escribe tu necesidad:</label><textarea id="peticion" rows="4" style="width:100%;margin-bottom:10px;padding:8px;border-radius:6px;border:1px solid #ccc;"></textarea>`
      : `<div style="margin-bottom:10px;font-weight:600;color:#111;">${razon}</div>`;

    contentDiv.innerHTML = `
      <div style="width:100%;min-height:100vh;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;">
        <h2 style="margin-top:8px;">🙏 Petición o Necesidad</h2>
        <div style="width:100%;max-width:700px;margin-top:12px;">
          ${extra}
          <label>Nombre completo (requerido):</label>
          <input type="text" id="nombre" style="width:100%;margin-bottom:10px;padding:8px;border-radius:6px;border:1px solid #ccc;" required>

          <label>Número telefónico ${telLabel}:</label>
          <input type="text" id="telefono" ${telReqAttr} style="width:100%;margin-bottom:10px;padding:8px;border-radius:6px;border:1px solid #ccc;">
          
          <div style="display:flex;gap:12px;justify-content:center;margin-top:14px;">
            <button id="enviarBtn" style="padding:10px 20px;font-size:16px;background:#0b74de;color:white;border:none;border-radius:8px;" disabled>Enviar</button>
            <button id="backToOptions" style="padding:10px 20px;font-size:16px;background:#333;color:white;border:none;border-radius:8px;">⬅️ Volver</button>
          </div>
        </div>
      </div>
    `;

    // handlers para validación y botones
    document.getElementById("nombre").addEventListener("input", activarBtnEnviar);
    if (razon === "Otros") {
      document.getElementById("peticion").addEventListener("input", activarBtnEnviar);
    }

    document.getElementById("enviarBtn").addEventListener("click", () => {
      enviarPeticion(razon);
    });

    document.getElementById("backToOptions").addEventListener("click", () => {
      // Al volver desde formulario de una opción, ir a la pantalla de opciones (no a la pregunta)
      renderOpciones();
      contentDiv.scrollTop = 0;
    });

    // Garantizar scroll interno si contenido largo
    contentDiv.style.overflowY = "auto";
  }

  function activarBtnEnviar() {
    const nombre = document.getElementById("nombre")?.value.trim();
    const peticion = document.getElementById("peticion")?.value.trim();
    const enviarBtn = document.getElementById("enviarBtn");
    if (!enviarBtn) return;
    // si existe textarea peticion (en "Otros") hay que validar que no esté vacío
    if (document.getElementById("peticion")) {
      enviarBtn.disabled = !nombre || nombre === "" || !peticion || peticion === "";
    } else {
      enviarBtn.disabled = !nombre || nombre === "";
    }
  }

  function enviarPeticion(razon) {
    const nombre = document.getElementById("nombre")?.value.trim();
    const peticion = document.getElementById("peticion")?.value.trim() || (razon || "");
    const telefono = document.getElementById("telefono")?.value.trim() || "";
    if (!nombre || !peticion) {
      alert("Por favor completa los campos requeridos.");
      return;
    }
    // Si detecta "suicidio" en el texto, exigir teléfono
    if (peticion.toLowerCase().includes("suicidio") && telefono === "") {
      alert("Por razones de seguridad, por favor incluye un número telefónico.");
      return;
    }

    // Preparar mensaje y abrir mailto (como lo tenías)
    const mensaje = `Petición desde el formulario\nNombre: ${nombre}\nPetición: ${peticion}\nTeléfono: ${telefono || "No provisto"}`;
    const mailtoLink = `mailto:pipjm1@gmail.com?subject=Petición desde formulario&body=${encodeURIComponent(mensaje)}`;
    window.location.href = mailtoLink;

    // Nota: después del mailto no re-renderizamos nada; si quieres mostrar una confirmación local,
    // lo podemos añadir aquí antes de redirigir.
  }

  // goBack: navegación de retroceso paso a paso
  window.goBack = function() {
    if (etapa === 2) {
      // Si estamos en formulario: volver a opciones si venimos de opciones, si no volver a pregunta
      if (ultimaEtapa === 1) {
        renderOpciones();
      } else {
        mostrarPreguntaInicial();
      }
    } else if (etapa === 1) {
      // Si estamos en opciones, volver a pregunta inicial
      mostrarPreguntaInicial();
    } else {
      // etapa === 0 -> volver al menú principal
      volverAlMenu();
    }
    contentDiv.scrollTop = 0;
  };

  // volverAlMenu: NO eliminar #content, solo ocultarlo y limpiarlo
  function volverAlMenu() {
    // limpiar y ocultar contenido
    contentDiv.innerHTML = "";
    contentDiv.style.display = "none";
    // restaurar estilos por defecto del body (fondo original y scroll oculto)
    if (originalBodyBg && originalBodyBg !== 'none') {
      document.body.style.background = originalBodyBg;
    } else {
      document.body.style.background = "url('https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/IMG_8023.jpeg') no-repeat center center fixed";
      document.body.style.backgroundSize = "cover";
    }
    document.body.style.overflow = "hidden";

    // mostrar menú principal
    if (mainMenu) mainMenu.style.display = "flex";

    // reset estado
    etapa = 0;
    ultimaEtapa = 0;
  }

  // Exponer volverAlMenu globalmente (para botones que usen onclick="volverAlMenu()")
  window.volverAlMenu = volverAlMenu;

  // iniciar mostrando la pregunta inicial
  mostrarPreguntaInicial();
})();