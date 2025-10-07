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
      <h4 style="margin-bottom: 20px;">Pastor: Nélida Brito Morales Co-pastor: Marcos Rivera</h4>
      <h2 style="margin-bottom: 20px;">📅 General Schedule of Services</h2>
      <p><strong>Monday:</strong> Prayer Service — 7:00 p.m. at the temple</p>
      <p><strong>Tuesday:</strong> Evangelistic Service — 7:00 p.m. on the streets</p>
      <p><strong>Wednesday:</strong> Evangelistic Service — 7:00 p.m. on the streets</p>
      <p><strong>Thursday:</strong> Prayer Service / Bible Study / Children's Society — 7:00 p.m.</p>
      <p><strong>Friday:</strong> Worship Service / Women's Society / Men's Society — 7:00 p.m.</p>
      <p><strong>Saturday:</strong> Family Altar all day / Congregational Fast (1 Saturday per month) — 6:00 a.m.</p>
      <p><strong>Sunday:</strong> Prayer — 6:00 a.m. / Bible School — 8:45 a.m. / Closing — 10:45 a.m. / Worship Service — 11:30 a.m.</p>
    </div>

    <button onclick="volverAlMenu()" style="
      margin: 40px 0;
      padding: 10px 20px;
      font-size: 16px;
      background: #333;
      color: white;
      border: none;
      border-radius: 8px;
    ">⬅️ Back</button>
  </div>
`;

// Prevent horizontal scroll on the whole body
document.body.style.overflowX = "hidden";
