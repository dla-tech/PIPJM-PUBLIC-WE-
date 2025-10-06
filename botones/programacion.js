document.getElementById("content").innerHTML = `
  <div style="
    width:100%;
    min-height:100vh;
    background:url('https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/papel-pergamino-enrollado-realista-aislado_23-2151866373.jpg') no-repeat center center/cover;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:flex-start;
    padding:30px;
    box-sizing:border-box;
  ">
    <h2 style="color:black;text-align:center;">📅 Programación semanal</h2>
    <p style="font-size:20px;font-weight:600;color:black;">Tenemos culto todos los días de la semana:</p>
    <p style="font-size:20px;font-weight:600;color:black;"><strong>Lunes:</strong> Culto de oración – 7:00 p.m. en el templo</p>
    <p style="font-size:20px;font-weight:600;color:black;"><strong>Martes:</strong> Culto evangelístico en las calles – 7:00 p.m.</p>
    <p style="font-size:20px;font-weight:600;color:black;"><strong>Miércoles:</strong> Culto evangelístico en las calles – 7:00 p.m.</p>
    <p style="font-size:20px;font-weight:600;color:black;"><strong>Jueves:</strong> Culto de oración / Estudio bíblico / Sociedad de niños – 7:00 p.m.</p>
    <p style="font-size:20px;font-weight:600;color:black;"><strong>Viernes:</strong> Culto de adoración / Sociedad de damas / Sociedad de caballeros – 7:00 p.m.</p>
    <p style="font-size:20px;font-weight:600;color:black;"><strong>Sábado:</strong> Altar familiar todo el día / Ayuno un sábado al mes – 6:00 a.m.</p>
    <p style="font-size:20px;font-weight:600;color:black;"><strong>Domingo:</strong> Oración – 6:00 a.m. / Escuela bíblica – 8:45 a.m. / Cierre de escuela bíblica – 10:45 a.m. / Culto de adoración – 11:30 a.m.</p>
    <button onclick="volverAlMenu()" style="
      margin-top:30px;
      padding:10px 20px;
      font-size:16px;
      background:#333;
      color:white;
      border:none;
      border-radius:8px;
    ">⬅️ Volver</button>
  </div>
`;
