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
      <h2 style="margin-bottom: 5px;">Pastora: Nelida Brito Morales Copastor: Marcos River</h2>
      <h2 style="margin-bottom: 20px;">📅 Programación General de Cultos</h2>
      <p><strong>Lunes:</strong> Culto de Oración — 7:00 p.m. en el templo</p>
      <p><strong>Martes:</strong> Culto Evangelístico — 7:00 p.m. en las calles</p>
      <p><strong>Miércoles:</strong> Culto Evangelístico — 7:00 p.m. en las calles</p>
      <p><strong>Jueves:</strong> Culto de Oración / Estudio Bíblico / Sociedad de Niños — 7:00 p.m.</p>
      <p><strong>Viernes:</strong> Culto de Adoración / Sociedad de Damas / Sociedad de Caballeros — 7:00 p.m.</p>
      <p><strong>Sábado:</strong> Altar Familiar todo el día / Ayuno congregacional (1 sábado al mes) — 6:00 a.m.</p>
      <p><strong>Domingo:</strong> Oración — 6:00 a.m. / Escuela Bíblica — 8:45 a.m. / Cierre — 10:45 a.m. / Culto de Adoración — 11:30 a.m.</p>
    </div>

    <button onclick="volverAlMenu()" style="
      margin: 40px 0;
      padding: 10px 20px;
      font-size: 16px;
      background: #333;
      color: white;
      border: none;
      border-radius: 8px;
    ">⬅️ Volver</button>
  </div>
`;

// Aplicar estilos para evitar scroll horizontal en todo el body
document.body.style.overflowX = "hidden";