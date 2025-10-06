document.getElementById("content").innerHTML = `
  <div style="
    width: 100vw;
    height: 100vh;
    background: url('https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/papel-pergamino-enrollado-realista-aislado_23-2151866373.jpg') no-repeat center center;
    background-size: cover;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2cm 20px 40px;
    box-sizing: border-box;
  ">
    <div style="
      max-width: 700px;
      width: 100%;
      text-align: center;
      font-family: 'Georgia', serif;
      color: black;
      font-size: 18px;
      line-height: 1.6;
    ">
      <h2 style="margin-bottom: 20px;">📅 Programación General de Cultos</h2>
      <p><strong>Tenemos culto todos los días de la semana:</strong></p>
      <p><strong>Lunes:</strong> Culto de oración – 7:00 p.m. en el templo</p>
      <p><strong>Martes:</strong> Culto evangelístico en las calles – 7:00 p.m.</p>
      <p><strong>Miércoles:</strong> Culto evangelístico en las calles – 7:00 p.m.</p>
      <p><strong>Jueves:</strong> Culto de oración / Estudio bíblico / Sociedad de niños – 7:00 p.m.</p>
      <p><strong>Viernes:</strong> Culto de adoración / Sociedad de damas / Sociedad de caballeros – 7:00 p.m.</p>
      <p><strong>Sábado:</strong> Altar familiar todo el día / Ayuno un sábado al mes – 6:00 a.m.</p>
      <p><strong>Domingo:</strong> Oración – 6:00 a.m. / Escuela bíblica – 8:45 a.m. / Cierre escuela bíblica – 10:45 a.m. / Culto de adoración – 11:30 a.m.</p>
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
