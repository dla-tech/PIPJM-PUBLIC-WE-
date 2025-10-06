// 📦 Archivo: botones/peticiones.js

const mainMenu = document.getElementById("mainMenu");
mainMenu.style.display = "none";

const section = document.createElement("div");
section.className = "section";
section.style.cssText = `
  position: absolute;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255,255,255,0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  box-sizing: border-box;
  overflow-y: auto;
  font-family: Arial, sans-serif;
`;

const container = document.createElement("div");
container.style.maxWidth = "600px";
container.style.width = "100%";
container.style.background = "#fff8e7";
container.style.border = "2px solid #d2b48c";
container.style.borderRadius = "12px";
container.style.padding = "20px";
container.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";

const title = document.createElement("h2");
title.innerText = "🙏 Petición o Necesidad";
title.style.textAlign = "center";
title.style.marginBottom = "20px";
container.appendChild(title);

const pregunta1 = document.createElement("p");
pregunta1.innerText = "¿Asistes a una congregación?";
container.appendChild(pregunta1);

const btnGroup = document.createElement("div");
btnGroup.style.display = "flex";
btnGroup.style.justifyContent = "center";
btnGroup.style.gap = "20px";

const btnSi = document.createElement("button");
btnSi.innerText = "Sí";
const btnNo = document.createElement("button");
btnNo.innerText = "No";
btnGroup.appendChild(btnSi);
btnGroup.appendChild(btnNo);
container.appendChild(btnGroup);

const form = document.createElement("div");
form.style.display = "none";
form.style.marginTop = "20px";

let selectedReasons = [];

function createInput(labelText, required = false, id = "") {
  const label = document.createElement("label");
  label.innerText = labelText;
  const input = document.createElement("input");
  input.type = "text";
  input.required = required;
  input.style.width = "100%";
  input.style.marginBottom = "10px";
  if (id) input.id = id;
  form.appendChild(label);
  form.appendChild(input);
  return input;
}

function createTextArea(labelText, required = false, id = "") {
  const label = document.createElement("label");
  label.innerText = labelText;
  const textarea = document.createElement("textarea");
  textarea.required = required;
  textarea.style.width = "100%";
  textarea.rows = 4;
  textarea.style.marginBottom = "10px";
  if (id) textarea.id = id;
  form.appendChild(label);
  form.appendChild(textarea);
  return textarea;
}

function showFormSi() {
  form.innerHTML = "";
  createInput("Nombre completo (requerido):", true, "nombre");
  createInput("Nombre de tu congregación:", false);
  createTextArea("Escribe tu petición o necesidad:", true, "peticion");
  createInput("Número telefónico (opcional):", false, "telefono");
  appendSendButton();
  form.style.display = "block";
}

function showFormNo() {
  form.innerHTML = "";
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
  selectedReasons = [];

  const reasonContainer = document.createElement("div");
  reasonContainer.style.display = "flex";
  reasonContainer.style.flexWrap = "wrap";
  reasonContainer.style.gap = "10px";
  opciones.forEach(opcion => {
    const btn = document.createElement("button");
    btn.innerText = opcion;
    btn.onclick = () => {
      if (opcion === "Otros") {
        showFormCustom(opcion);
      } else {
        selectedReasons = [opcion];
        showFormCustom(opcion);
      }
    };
    reasonContainer.appendChild(btn);
  });
  form.appendChild(reasonContainer);
  form.style.display = "block";
}

function showFormCustom(razon) {
  form.innerHTML = `<h3>${razon}</h3>`;
  createInput("Nombre completo (requerido):", true, "nombre");
  if (["Oración por salvación", "Oración por reconciliación"].includes(razon)) {
    createInput("Número telefónico (requerido):", true, "telefono");
  } else {
    createInput("Número telefónico (opcional):", false, "telefono");
  }
  if (razon === "Otros") {
    createTextArea("Escribe tu necesidad:", true, "peticion");
  }
  appendSendButton();
}

function appendSendButton() {
  const enviarBtn = document.createElement("button");
  enviarBtn.innerText = "Enviar";
  enviarBtn.onclick = () => {
    const nombre = document.getElementById("nombre").value.trim();
    const peticion = document.getElementById("peticion")?.value.trim() || selectedReasons.join(", ");
    const telefono = document.getElementById("telefono")?.value.trim();

    if (!nombre || !peticion) {
      alert("Por favor completa los campos requeridos.");
      return;
    }

    if (peticion.toLowerCase().includes("suicidio") && !telefono) {
      alert("Por razones de seguridad, por favor incluye un número telefónico.");
      return;
    }

    const mensaje = `Petición desde el formulario\nNombre: ${nombre}\nPetición: ${peticion}\nTeléfono: ${telefono || "No provisto"}`;
    const mailtoLink = `mailto:pipjm1@gmail.com?subject=Petición desde formulario&body=${encodeURIComponent(mensaje)}`;
    window.location.href = mailtoLink;
  };
  form.appendChild(enviarBtn);
}

btnSi.onclick = showFormSi;
btnNo.onclick = showFormNo;

container.appendChild(form);

// Botón para volver
const backBtn = document.createElement("button");
backBtn.innerText = "⬅️ Volver";
backBtn.style.marginTop = "20px";
backBtn.onclick = () => {
  section.remove();
  mainMenu.style.display = "flex";
};
container.appendChild(backBtn);

section.appendChild(container);
document.body.appendChild(section);
