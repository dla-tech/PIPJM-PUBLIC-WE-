// peticiones_en.js — same behavior as Spanish version, only text translated

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
        <h3 style="margin-bottom: 20px;">Pastor: Nélida Brito Morales  Co-pastor: Marcos Rivera</h3>
        <h2>🙏 Prayer Request or Need</h2>
        <p style="font-size:18px;">Do you attend a congregation?</p>
        <div style="margin:20px;">
          <button id="btnSi" style="padding:12px 24px;font-size:16px;">Yes</button>
          <button id="btnNo" style="padding:12px 24px;font-size:16px;">No</button>
        </div>
        <small style="color:#6b7280"><strong>
          “The requested fields help us provide better service according to your needs. Please complete them all if possible. Thank you!”
        </strong></small>
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
      <h2>🙏 Prayer Request or Need</h2>
      <label>Full name <span style="color:#d00">(required)</span>:</label>
      <input type="text" id="nombre" style="width:100%;margin-bottom:10px;" required>

      <label>Your congregation name <span style="color:#007a00">(optional)</span>:</label>
      <input type="text" id="congregacion" style="width:100%;margin-bottom:10px;">

      <label>Write your request or need <span style="color:#d00">(required)</span>:</label>
      <textarea id="peticion" rows="5" style="width:100%;margin-bottom:10px;"></textarea>

      <label>Phone number <span style="color:#007a00">(optional)</span>:</label>
      <input type="text" id="telefono" style="width:100%;margin-bottom:10px;">

      <button id="enviarBtn" disabled style="background:#d1d5db;color:white;padding:10px 20px;border:none;border-radius:8px;">Send</button>
    `;
    agregarBotonVolver();

    const nombreInput = document.getElementById("nombre");
    const peticionInput = document.getElementById("peticion");
    const enviarBtn = document.getElementById("enviarBtn");

    function validar() {
      if (nombreInput.value.trim() !== "" && peticionInput.value.trim() !== "") {
        enviarBtn.disabled = false;
        enviarBtn.style.backgroundColor = "#0b74de"; // active blue
      } else {
        enviarBtn.disabled = true;
        enviarBtn.style.backgroundColor = "#d1d5db"; // disabled gray
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
    contentDiv.innerHTML = `<h2>🙏 Prayer Request or Need</h2><p>Select your need:</p>`;
    const opciones = [
      "Prayer for illness",
      "Prayer for the family",
      "Prayer for marriage",
      "Prayer for children",
      "Prayer for salvation",
      "Prayer for deliverance",
      "Prayer for reconciliation",
      "Other"
    ];
    opciones.forEach(op => {
      const b = document.createElement("button");
      b.textContent = op;
      b.style.cssText = "display:block;width:100%;padding:15px;margin:8px 0;font-size:16px;";
      b.onclick = () => {
        ultimaEtapa = etapa; // remember we came from this list
        renderFormularioPredeterminado(op);
      };
      contentDiv.appendChild(b);
    });
    agregarBotonVolver();
  }

  function renderFormularioPredeterminado(razon) {
    etapa = 2;
    const telLabel = (["Prayer for salvation", "Prayer for reconciliation"].includes(razon))
      ? '<span style="color:#d00">(required)</span>'
      : '<span style="color:#007a00">(optional)</span>';
    const telReqAttr = (["Prayer for salvation", "Prayer for reconciliation"].includes(razon)) ? "required" : "";
    const extra = razon === "Other"
      ? `<label>Write your need <span style="color:#d00">(required)</span>:</label><textarea id="peticion" rows="4" style="width:100%;margin-bottom:10px;"></textarea>`
      : `<div style="margin-bottom:10px;font-weight:600;color:#111;">${razon}</div>`;

    contentDiv.innerHTML = `
      <h2>🙏 Prayer Request or Need</h2>
      ${extra}
      <label>Full name <span style="color:#d00">(required)</span>:</label>
      <input type="text" id="nombre" style="width:100%;margin-bottom:10px;" required>

      <label>Phone number ${telLabel}:</label>
      <input type="text" id="telefono" ${telReqAttr} style="width:100%;margin-bottom:10px;">

      <button id="enviarBtn" disabled style="background:#d1d5db;color:white;padding:10px 20px;border:none;border-radius:8px;">Send</button>
    `;
    agregarBotonVolver();

    const nombreInput = document.getElementById("nombre");
    const peticionInput = document.getElementById("peticion");
    const enviarBtn = document.getElementById("enviarBtn");

    function validar() {
      if (peticionInput) {
        if (nombreInput.value.trim() !== "" && peticionInput.value.trim() !== "") {
          enviarBtn.disabled = false;
          enviarBtn.style.backgroundColor = "#0b74de"; // active blue
        } else {
          enviarBtn.disabled = true;
          enviarBtn.style.backgroundColor = "#d1d5db"; // disabled gray
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
      alert("Please complete the required fields.");
      return;
    }

    if (peticion.toLowerCase().includes("suicide") && telefono === "") {
      alert("For safety reasons, please include a phone number.");
      return;
    }

    const btn = document.getElementById("enviarBtn");
    btn.disabled = true;
    btn.textContent = "Sending...";

    emailjs.send('service_wjbpiik', 'template_89ugs9a', {
      nombre,
      telefono,
      razon: razon || "Direct request",
      mensaje: peticion,
      congregacion
    }).then(() => {
      alert("✅ Request sent successfully!");
      mostrarPreguntaInicial();
    }).catch((err) => {
      console.error("Error sending:", err);
      alert("❌ Error sending. Please try again later.");
    }).finally(() => {
      btn.disabled = false;
      btn.textContent = "Send";
      btn.style.backgroundColor = "#0b74de";
    });
  }

  function agregarBotonVolver() {
    eliminarBotonVolver();

    const volver = document.createElement("button");
    volver.textContent = "⬅️ Back";
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
