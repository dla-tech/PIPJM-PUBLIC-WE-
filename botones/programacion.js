document.getElementById("content").innerHTML = `
  <div style="
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    background: url('https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/papel-pergamino-enrollado-realista-aislado_23-2151866373.jpg') no-repeat center center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 2cm 20px 40px;
    box-sizing: border-box;
  ">
    <div style="
      max-width: 800px;
      width: 100%;
      text-align: center;
      font-family: 'Georgia', serif;
      color: black;
      font-size: 18px;
      line-height: 1.6;
      background-color: rgba(255,255,255,0.7);
      padding: 20px;
      border-radius: 10px;
    ">
      <h2 style="margin-bottom: 20px;">📅 Programación General de Cultos</h2>
      <p><strong>Lunes:</strong> Culto de Oración - 7:00 p.m. (Templo)</p>
      <p><strong>Martes:</strong> Culto Evangelístico - 7:00 p.m. (Calles)</p>
      <p><strong>Miércoles:</strong> Culto Evangelístico - 7:00 p.m. (Calles)</p>
      <p><strong>Jueves:</strong> Culto de Oración / Estudio Bíblico / Sociedad de Niños - 7:00 p.m.</p>
      <p><strong>Viernes:</strong> Culto de Adoración / Sociedad de Damas / Sociedad de Caballeros / Sociedad de Jovenes - 7:00 p.m.</p>
      <p><strong>Sábado:</strong> Altar Familiar (todo el día) / Ayuno (1 vez al mes) - 6:00 a.m.</p>
      <p><strong>Domingo:</strong> Oración - 6:00 a.m. / Escuela Bíblica - 8:45 a.m. / Cierre Escuela - 10:45 a.m. / Culto de Adoración - 11:30 a.m.</p>
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