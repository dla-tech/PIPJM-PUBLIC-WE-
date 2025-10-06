// Cargar contenido de Programación
document.getElementById("content").innerHTML = `
  <div style="
    width: 100vw;
    height: 100vh;
    background: url('https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/papel-pergamino-enrollado-realista-aislado_23-2151866373.jpg') no-repeat center center;
    background-size: cover;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding: 2.5cm 20px 40px;
    position: relative;
  ">
    <div style="
      width: 100%;
      max-width: 700px;
      text-align: center;
      font-family: 'Georgia', serif;
      color: black;
      font-size: 18px;
      line-height: 1.6;
      padding: 0 10px;
      box-sizing: border-box;
    ">
      <h2 style="margin-bottom: 20px;">📅 Programación General de Cultos</h2>
      <p><strong>Lunes:</strong> Culto de Oración — 7:00 p.m. en el templo</p>
      <p><strong>Martes:</strong> Culto Evangelístico — 7:00 p.m. en las calles</p>
      <p><strong>Miércoles:</strong> Culto Evangelístico — 7:00 p.m. en las calles</p>
      <p><strong>Jueves:</strong> Culto de Oración / Estudio Bíblico / Sociedad de Niños — 7:00 p.m.</p>
      <p><strong>Viernes:</strong> Culto de Adoración / Sociedad de Damas / Sociedad de Caballeros — 7:00 p.m.</p>
      <p><strong>Sábado:</strong> Altar Familiar todo el día / Ayuno congregacional (1 sábado al mes) — 6:00 a.m.</p>
      <p><strong>Domingo:</strong> Oración — 6:00 a.m. / Escuela Bíblica — 8:45 a.m. / Cierre — 10:45 a.m. / Culto de Adoración — 11:30 a.m.</p>
    </div>
  </div>
`;

// Crear botón volver fijo (no afectado por scroll)
const volverBtn = document.createElement("button");
volverBtn.textContent = "⬅️ Volver";
volverBtn.style.position = "fixed";
volverBtn.style.bottom = "20px";
volverBtn.style.left = "20px";
volverBtn.style.padding = "10px 20px";
volverBtn.style.fontSize = "16px";
volverBtn.style.background = "#333";
volverBtn.style.color = "white";
volverBtn.style.border = "none";
volverBtn.style.borderRadius = "8px";
volverBtn.style.zIndex = "9999";
volverBtn.addEventListener("click", () => {
  volverAlMenu();
  volverBtn.remove(); // se elimina para que no quede “pegado” en el menú
});
document.body.appendChild(volverBtn);

// Evitar scroll horizontal en todo el body
document.body.style.overflowX = "hidden";