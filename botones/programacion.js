const section = document.getElementById('dynamicSection');

section.innerHTML = `
  <style>
    #dynamicSection {
      background: url('https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/papel-pergamino-enrollado-realista-aislado_23-2151866373.jpg') no-repeat center center / cover;
      position: relative;
      padding: 30px;
      color: white;
      overflow-y: auto;
    }

    #dynamicSection::before {
      content: "";
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: rgba(0,0,0,0.45);
      z-index: 1;
    }

    #dynamicSection > * {
      position: relative;
      z-index: 2;
      color: white;
    }

    #dynamicSection h2 {
      font-size: 32px;
      margin-bottom: 10px;
    }

    #dynamicSection p {
      font-size: 20px;
      font-weight: 600;
      margin: 10px 0;
    }

    .back-btn {
      margin-top: 30px;
      background-color: rgba(255,255,255,0.12);
      color: #fff;
      border: 1px solid rgba(255,255,255,0.2);
      padding: 12px 24px;
      border-radius: 8px;
      cursor: pointer;
    }
  </style>

  <h2>📅 Programación semanal</h2>
  <p><strong>Tenemos culto todos los días de la semana:</strong></p>
  <p><strong>Lunes:</strong> Culto de oración – 7:00 p.m. en el templo</p>
  <p><strong>Martes:</strong> Culto evangelístico en las calles – 7:00 p.m.</p>
  <p><strong>Miércoles:</strong> Culto evangelístico en las calles – 7:00 p.m.</p>
  <p><strong>Jueves:</strong> Culto de oración / Estudio bíblico / Sociedad de niños – 7:00 p.m.</p>
  <p><strong>Viernes:</strong> Culto de adoración / Sociedad de damas / Sociedad de caballeros / Sociedad de Jóvenes – 7:00 p.m.</p>
  <p><strong>Sábado:</strong> Altar familiar todo el día / Ayuno un sábado al mes – 6:00 a.m.</p>
  <p><strong>Domingo:</strong> Oración – 6:00 a.m. / Escuela bíblica – 8:45 a.m. / Cierre de escuela bíblica – 10:45 a.m. / Culto de adoración – 11:30 a.m.</p>
  <button class="back-btn" onclick="goBack()">⬅️ Volver</button>
`;
