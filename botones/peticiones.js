document.getElementById("content").innerHTML = `
  <div style="
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    background: white url('https://raw.githubusercontent.com/dla-tech/Media-privada/main/pergamino.png') no-repeat center top;
    background-size: contain;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px 20px 40px;
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
      margin-top: 180px;
    ">
      <h2 style="margin-bottom: 20px;">📅 Programación General de Cultos</h2>
      <p><strong>Domingos:</strong> Culto de Adoración y Palabra - 10:00 a.m.</p>
      <p><strong>Martes:</strong> Culto de Oración General - 7:00 p.m.</p>
      <p><strong>Miércoles:</strong> Estudios Bíblicos por Departamento - 7:00 p.m.</p>
      <p><strong>Viernes:</strong> Culto Evangelístico - 7:00 p.m.</p>
      <p><strong>Sábados:</strong> Ayunos congregacionales y actividades especiales</p>
    </div>

    <button onclick="volverAlMenu()" style="
      margin-top: 40px;
      padding: 10px 20px;
      font-size: 16px;
      background: #333;
      color: white;
      border: none;
      border-radius: 8px;
    ">⬅️ Volver</button>
  </div>
`;