(() => {
  const contentDiv = document.getElementById("content");
  const mainMenu = document.getElementById("mainMenu");
  if (!contentDiv) return;

  // Ocultar menú principal y configurar el contenido
  if (mainMenu) mainMenu.style.display = "none";
  contentDiv.style.display = "flex";
  contentDiv.style.flexDirection = "column";
  contentDiv.style.alignItems = "center";
  contentDiv.style.padding = "20px";
  contentDiv.style.boxSizing = "border-box";
  contentDiv.style.width = "100%";
  contentDiv.style.height = "100vh";
  contentDiv.style.overflowY = "auto";
  contentDiv.style.background = "#fff8e7";
  contentDiv.innerHTML = "";

  // === Recuadro: Ubicación del templo (con imagen interactiva + pastora/copastor) ===
  const ubicacionBox = document.createElement("div");
  ubicacionBox.style.maxWidth = "800px";
  ubicacionBox.style.width = "100%";
  ubicacionBox.style.marginBottom = "40px";
  ubicacionBox.style.border = "2px solid #ccc";
  ubicacionBox.style.borderRadius = "12px";
  ubicacionBox.style.overflow = "hidden";
  ubicacionBox.style.background = "#fff";
  ubicacionBox.style.boxShadow = "0 10px 30px rgba(0,0,0,.10)";
  ubicacionBox.innerHTML = `
    <h2 style="text-align:center;padding:16px 0;background:#f8f9fa;margin:0;font-size:22px;">
      Ubicación del templo
    </h2>
    <a href="https://maps.app.goo.gl/Tcfgi3CBb7fGjujy7?g_st=ipc" target="_blank" style="text-decoration:none;color:inherit;">
      <img
        src="https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/IMG_7782.jpeg"
        alt="Ubicación del templo"
        style="width:100%;display:block;cursor:pointer;"
      >
      <h6 style="text-align:center; font-size: 20px; margin: 12px 0 16px 0;">
        Pastora: Nélida Brito Morales &nbsp;&nbsp;|&nbsp;&nbsp; Copastor: Marcos Rivera
      </h6>
    </a>
  `;
  contentDiv.appendChild(ubicacionBox);

  // === Historia + fotos (brochure) ===
  const historiaCard = document.createElement("div");
  historiaCard.style.maxWidth = "800px";
  historiaCard.style.width = "100%";
  historiaCard.style.borderRadius = "16px";
  historiaCard.style.background = "#ffffff";
  historiaCard.style.boxShadow = "0 10px 30px rgba(0,0,0,.12)";
  historiaCard.style.overflow = "hidden";
  historiaCard.style.marginBottom = "28px";

  const fotos = [
    "https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/fotospipjm/IMG_7029.jpg",
    "https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/fotospipjm/IMG_7030.jpg",
    "https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/fotospipjm/IMG_7031.jpg",
    "https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/fotospipjm/IMG_7032.jpg",
    "https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/fotospipjm/IMG_7033.jpg",
    "https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/fotospipjm/IMG_7034.jpg",
    "https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/fotospipjm/IMG_7035.jpg",
    "https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/fotospipjm/IMG_9071.JPG",
    "https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/fotospipjm/IMG_9072.JPG",
    "https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/fotospipjm/IMG_9073.JPG",
    "https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/fotospipjm/IMG_9074.JPG",
    "https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/fotospipjm/IMG_9075.JPG",
    "https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/fotospipjm/IMG_9076.JPG",
    "https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/fotospipjm/IMG_9077.JPG",
    "https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/fotospipjm/IMG_9078.JPG",
    "https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/fotospipjm/IMG_9080.JPG",
    "https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/fotospipjm/IMG_7037.jpg",
    "https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/fotospipjm/IMG_7040.jpg",
    "https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/fotospipjm/IMG_7041.jpg",
    // Última, como pediste:
    "https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/fotospipjm/IMG_9079.JPG"
  ];

  const parrafos = [
    "Nuestra historia comienza gracias a la fe y determinación de una mujer maunabeña llamada Luisa Vega, quien, trabajando como empleada doméstica en Santurce, conoció al Señor y se convirtió al evangelio. Con gran diligencia y un profundo deseo en su corazón, procuró llevar el mensaje pentecostal a su pueblo natal, Maunabo.",
    "Fue en ese contexto que Carlos Lebrón, quien escuchaba la Palabra, entregó su vida a Cristo en el año 1936, a la edad de 18 años. Desde entonces comenzó a predicar con fervor esta nueva vida en Cristo, y poco a poco se fueron uniendo otras personas, en su mayoría jóvenes, formando así el inicio de lo que sería una gran obra espiritual.",
    "En el año 1939, en el Sector Florida del Barrio Calzada, comenzó oficialmente la Primera Iglesia Pentecostal de Maunabo bajo un árbol de mangó. Al principio, los hermanos se reunían en Calzada y luego en Palo Seco, siempre con la firme convicción de llevar el mensaje del evangelio a su comunidad.",
    "A lo largo de su trayectoria, la iglesia ha sido pastoreada por hombres fieles que guiaron la obra con dedicación y entrega, entre ellos: Rafael Torres Rivera, Andrés Gautier Lima, Juan Amado Santiago, Carlos Lebrón Monclova (todos ya fallecidos), y Israel Márquez Rodríguez (actualmente retirado).",
    "Bajo el pastorado del hermano Rafael Torres, se levantaron nuevas obras. El primer templo se construyó en la Calle Dr. Janer en el pueblo. Luego, bajo la dirección pastoral de Andrés Gautier, se edificó un nuevo templo en la Calle Juan Cruz León. Más adelante, durante el pastorado del hermano Carlos Lebrón Monclova, se adquirió el terreno donde se encuentra actualmente el templo en la Avenida Calimano, el cual fue diseñado y construido bajo su liderazgo. Posteriormente, con el pastorado del hermano Israel Márquez Rodríguez, se realizaron importantes reconstrucciones y remodelaciones al edificio.",
    "A finales de la década del 1930, la congregación se unió al Concilio de la Iglesia Pentecostal de Jesucristo, sin embargo, a principios de la década del 1960, se desafilia del mismo debido a desacuerdos con el Distrito Hispano del Este de las Asambleas de Dios. Desde entonces, la iglesia ha permanecido como una obra independiente, conservando parte del nombre original del concilio del cual formó parte en sus comienzos.",
    "Los primeros años del pentecostalismo en Maunabo estuvieron marcados por grandes sacrificios. Las condiciones económicas eran difíciles y muchos miembros caminaban largas distancias desde los campos para poder asistir a los cultos. La construcción del templo actual requirió un esfuerzo extraordinario, los hermanos salían de sus trabajos sin pasar por sus hogares, trabajando hasta altas horas de la noche en la casa de Dios. El sacrificio físico, económico y espiritual fue enorme, pero el Señor recompensó abundantemente la fidelidad de cada hermano y permitió que la obra se completara con éxito.",
    "Con el paso del tiempo, la Primera Iglesia Pentecostal de Jesucristo de Maunabo, P.R. Inc. se consolidó como un faro espiritual para su pueblo, llevando a cabo campañas evangelísticas, vigilias, cadenas de oración, actividades misioneras y proyectos que transformaron vidas y dejaron una huella profunda en la comunidad. Su templo se convirtió no solo en un edificio, sino en un símbolo del poder de Dios obrando a través de su pueblo.",
    "En medio de su caminar, la iglesia también ha enfrentado retos históricos y naturales, pero siempre se ha mantenido firme en su misión. Y fue en este contexto que, el 18 de enero de 2018, Dios llamó a nuevos siervos a dirigir la obra. Ese día, el hermano Marcos Rivera Morales y la hermana Nélida Brito asumieron la responsabilidad de guiar a la congregación con dedicación, fe y visión pastoral. Tras un tiempo de servicio fiel, ambos fueron ungidos oficialmente el 1 de noviembre de 2019 como copastor y pastora de la iglesia, marcando un nuevo capítulo en la historia de esta amada congregación.",
    "Desde entonces, su labor ha estado caracterizada por un compromiso incansable con la enseñanza de la Palabra, el cuidado espiritual del pueblo, el trabajo evangelístico y el deseo ferviente de ver vidas transformadas por el poder de Dios. Su entrega y amor por la obra han impulsado a la iglesia a seguir creciendo y cumpliendo el propósito divino, manteniéndose firme en medio de los tiempos difíciles y guiando con sabiduría al pueblo de Dios.",
    "Hoy, la Primera Iglesia Pentecostal de Jesucristo de Maunabo, P.R. Inc. continúa escribiendo su historia con fe, esperanza y gratitud. Celebra con gozo el legado de los que comenzaron esta obra, honra a quienes la han dirigido a lo largo de las décadas y mira al futuro confiando en que el Dios que comenzó la buena obra será fiel en perfeccionarla hasta el día de Jesucristo."
  ];

  // Construcción del HTML de la historia con inserción de fotos
  let fotoIdx = 0;
  let historiaHTML = `
    <div style="background:#f8f9fa; padding:16px 18px;">
      <h2 style="margin:0; text-align:center; font-size:22px;">Historia del Templo y Congregación</h2>
      <div style="text-align:center;color:#6b7280;margin-top:4px;">Primera Iglesia Pentecostal de Jesucristo de Maunabo, P.R. Inc.</div>
    </div>
    <div style="padding:18px;">
  `;

  function bloqueFotos(n) {
    if (fotoIdx >= fotos.length) return "";
    const end = Math.min(fotoIdx + n, fotos.length);
    const slice = fotos.slice(fotoIdx, end);
    fotoIdx = end;
    return `
      <div style="
        display:grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap:12px;
        margin:14px 0 20px;
      ">
        ${slice.map(src => `
          <figure style="margin:0; background:#fff; border-radius:12px; padding:8px; box-shadow:0 6px 18px rgba(0,0,0,.08);">
            <img src="${src}" alt="Foto histórica" style="width:100%; height:auto; display:block; border-radius:8px;">
          </figure>
        `).join("")}
      </div>
    `;
  }

  // Inserta 2 fotos después de párrafos pares y 1 foto después de impares (alternado)
  parrafos.forEach((p, i) => {
    historiaHTML += `<p style="color:#374151; line-height:1.65; margin:10px 0;">${p}</p>`;
    const n = (i % 2 === 0) ? 2 : 1; // 2,1,2,1,...
    historiaHTML += bloqueFotos(n);
  });

  // Si quedaron fotos, colócalas al final como cierre
  if (fotoIdx < fotos.length) {
    historiaHTML += `
      <div style="margin-top:10px;color:#6b7280;">Galería final</div>
      ${bloqueFotos(fotos.length - fotoIdx)}
    `;
  }

  historiaHTML += `</div>`;

  historiaCard.innerHTML = historiaHTML;
  contentDiv.appendChild(historiaCard);

  // === Botón volver (fijo abajo izquierda, sin afectar scroll) ===
  const volverBtn = document.createElement("button");
  volverBtn.textContent = "⬅️ Volver";
  volverBtn.style.position = "fixed";
  volverBtn.style.bottom = "20px";
  volverBtn.style.left = "20px";
  volverBtn.style.zIndex = "999";
  volverBtn.style.padding = "10px 20px";
  volverBtn.style.fontSize = "16px";
  volverBtn.style.background = "#333";
  volverBtn.style.color = "white";
  volverBtn.style.border = "none";
  volverBtn.style.borderRadius = "8px";
  volverBtn.style.boxShadow = "2px 2px 6px rgba(0,0,0,0.3)";
  volverBtn.onclick = () => {
    contentDiv.innerHTML = "";
    contentDiv.style.display = "none";
    if (mainMenu) mainMenu.style.display = "flex";
    document.body.style.overflow = "hidden";
    document.body.removeChild(volverBtn);
  };
  document.body.appendChild(volverBtn);
})();
