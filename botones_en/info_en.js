// info_en.js — same behavior as Spanish version, only text translated
(() => {
  const contentDiv = document.getElementById("content");
  const mainMenu = document.getElementById("mainMenu");
  const originalBodyBg = getComputedStyle(document.body).backgroundImage || "";
  if (!contentDiv || !mainMenu) return;

  // Prepare the scrollable content area (keep BODY locked)
  contentDiv.innerHTML = "";
  contentDiv.style.display = "flex";
  contentDiv.style.flexDirection = "column";
  contentDiv.style.alignItems = "center";
  contentDiv.style.padding = "0";
  contentDiv.style.boxSizing = "border-box";
  contentDiv.style.width = "100%";
  contentDiv.style.height = "100dvh";
  contentDiv.style.maxHeight = "100dvh";
  contentDiv.style.background = "#fff8e7";

  // Internal area that DOES scroll
  const scrollArea = document.createElement("div");
  scrollArea.style.width = "100%";
  scrollArea.style.maxWidth = "900px";
  scrollArea.style.boxSizing = "border-box";
  scrollArea.style.padding = "20px";
  scrollArea.style.flex = "1 1 auto";
  scrollArea.style.overflowY = "auto";
  scrollArea.style.overflowX = "hidden";
  scrollArea.style.WebkitOverflowScrolling = "touch";
  scrollArea.style.overscrollBehavior = "contain";
  scrollArea.style.paddingBottom = "84px"; // space for floating back button
  contentDiv.appendChild(scrollArea);

  // Hide menu; lock BODY scroll
  mainMenu.style.display = "none";
  document.body.style.overflow = "hidden";

  // ===== Location card =====
  const MAP_URL = "https://maps.app.goo.gl/Tcfgi3CBb7fGjujy7?g_st=ipc";
  const IMG_URL = "https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/IMG_7782.jpeg";

  const locationCard = document.createElement("div");
  locationCard.style.maxWidth = "800px";
  locationCard.style.width = "100%";
  locationCard.style.margin = "0 auto 40px";
  locationCard.style.border = "2px solid #ccc";
  locationCard.style.borderRadius = "12px";
  locationCard.style.overflow = "hidden";
  locationCard.style.background = "#fff";
  locationCard.style.boxShadow = "0 10px 30px rgba(0,0,0,.10)";
  locationCard.innerHTML = `
    <h2 style="text-align:center;padding:16px 0;background:#f8f9fa;margin:0;font-size:22px;">
      Temple Location
    </h2>
    <a href="${MAP_URL}" target="_blank" rel="noopener" style="text-decoration:none;color:inherit;">
      <img
        src="${IMG_URL}"
        alt="Temple Location"
        style="width:100%;display:block;cursor:pointer;"
      >
      <h6 style="text-align:center; font-size: 20px; margin: 12px 0 16px 0;">
        Pastor: Nélida Brito Morales &nbsp;&nbsp;|&nbsp;&nbsp; Co-Pastor: Marcos Rivera
      </h6>
    </a>
  `;
  scrollArea.appendChild(locationCard);

  // ===== History + brochure-style photos =====
  const historyCard = document.createElement("div");
  historyCard.style.maxWidth = "800px";
  historyCard.style.width = "100%";
  historyCard.style.borderRadius = "16px";
  historyCard.style.background = "#ffffff";
  historyCard.style.boxShadow = "0 10px 30px rgba(0,0,0,.12)";
  historyCard.style.overflow = "hidden";
  historyCard.style.margin = "0 auto 28px";

  // Photos: keep order; make 9072 smaller, 9079 bigger at the end
  const photos = [
    "https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/fotospipjm/IMG_7029.jpg",
    "https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/fotospipjm/IMG_7030.jpg",
    "https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/fotospipjm/IMG_7031.jpg",
    "https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/fotospipjm/IMG_7032.jpg",
    "https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/fotospipjm/IMG_7033.jpg",
    "https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/fotospipjm/IMG_7034.jpg",
    "https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/fotospipjm/IMG_7035.jpg",
    "https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/fotospipjm/IMG_9071.JPG",
    // Replaced 9072 with .jpg (smaller render below)
    "https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/fotospipjm/IMG_9072.jpg",
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
    // 9079 last (rendered larger)
    "https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/fotospipjm/IMG_9079.JPG"
  ];

  const paragraphs = [
    "Our story begins thanks to the faith and determination of a woman from Maunabo named Luisa Vega. While working as a housekeeper in Santurce, she met the Lord and converted to the gospel. With great diligence and a deep desire in her heart, she sought to bring the Pentecostal message to her hometown of Maunabo.",
    "In that context, Carlos Lebrón, who was listening to the Word, surrendered his life to Christ in 1936 at the age of 18. From then on, he began to preach this new life in Christ with fervor, and little by little others joined—mostly young people—thus forming the beginnings of what would become a great spiritual work.",
    "In 1939, in the Florida Sector of the Calzada neighborhood, the First Pentecostal Church of Maunabo officially began under a mango tree. At first, the brothers gathered in Calzada and later in Palo Seco, always with the firm conviction of bringing the gospel message to their community.",
    "Over the years, the church has been pastored by faithful men who guided the work with dedication and devotion, including: Rafael Torres Rivera, Andrés Gautier Lima, Juan Amado Santiago, Carlos Lebrón Monclova (all now deceased), and Israel Márquez Rodríguez (now retired).",
    "Under Pastor Rafael Torres, new works were raised. The first temple was built on Dr. Janer Street in town. Later, under the pastoral leadership of Andrés Gautier, a new temple was built on Juan Cruz León Street. Further on, under Pastor Carlos Lebrón Monclova, the land where the current temple stands on Calimano Avenue was acquired; it was designed and built under his leadership. Subsequently, during the pastorate of Brother Israel Márquez Rodríguez, significant reconstruction and remodeling of the building were carried out.",
    "At the end of the 1930s, the congregation joined the Council of the Pentecostal Church of Jesus Christ. However, in the early 1960s, it disaffiliated due to disagreements with the Eastern Hispanic District of the Assemblies of God. Since then, the church has remained an independent work, retaining part of the original name of the council it was once part of.",
    "The early years of Pentecostalism in Maunabo were marked by great sacrifice. Economic conditions were difficult, and many members walked long distances from the countryside to attend services. Building the current temple required extraordinary effort—the brothers would leave work and, without going home, would labor late into the night on the house of God. The physical, financial, and spiritual sacrifice was immense, but the Lord abundantly rewarded the faithfulness of each brother and allowed the work to be completed successfully.",
    "Over time, the First Pentecostal Church of Jesus Christ of Maunabo, P.R. Inc. has become a spiritual lighthouse for its people—holding evangelistic campaigns, vigils, prayer chains, missionary activities, and projects that transformed lives and left a deep mark on the community. Its temple became not only a building, but a symbol of the power of God working through His people.",
    "Along the way, the church has also faced historical and natural challenges, yet it has always remained firm in its mission. In this context, on January 18, 2018, God called new servants to lead the work. That day, Brother Marcos Rivera Morales and Sister Nélida Brito assumed the responsibility of guiding the congregation with dedication, faith, and pastoral vision. After a time of faithful service, both were officially anointed on November 1, 2019 as Co-Pastor and Pastor of the church, marking a new chapter in the history of this beloved congregation.",
    "Since then, their ministry has been characterized by an unwavering commitment to teaching the Word, caring for God’s people, evangelistic work, and a fervent desire to see lives transformed by the power of God. Their devotion and love for the work have helped the church continue to grow and fulfill the divine purpose—standing firm through difficult times and leading God’s people with wisdom.",
    "Today, the First Pentecostal Church of Jesus Christ of Maunabo, P.R. Inc. continues to write its story with faith, hope, and gratitude. It joyfully celebrates the legacy of those who began this work, honors those who have led it through the decades, and looks to the future trusting that the God who began the good work will be faithful to complete it until the day of Jesus Christ."
  ];

  let photoIdx = 0;
  let html = `
    <div style="background:#f8f9fa; padding:16px 18px;">
      <h2 style="margin:0; text-align:center; font-size:22px;">History of the Temple & Congregation</h2>
      <div style="text-align:center;color:#6b7280;margin-top:4px;">First Pentecostal Church of Jesus Christ of Maunabo, P.R. Inc.</div>
    </div>
    <div style="padding:18px;">
  `;

  function photoBlock(n) {
    if (photoIdx >= photos.length) return "";
    const end = Math.min(photoIdx + n, photos.length);
    const slice = photos.slice(photoIdx, end);
    photoIdx = end;

    return `
      <div style="
        display:grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap:12px;
        margin:14px 0 20px;
      ">
        ${slice.map(src => {
          let figureStyle = "margin:0; background:#fff; border-radius:12px; padding:8px; box-shadow:0 6px 18px rgba(0,0,0,.08);";
          let imgStyle = "width:100%; height:auto; display:block; border-radius:8px;";

          // Make 9072 much smaller
          if (src.includes("IMG_9072")) {
            imgStyle = "width:55%; height:auto; display:block; margin:0 auto; border-radius:8px;";
          }
          // Make 9079 larger (span full grid width)
          if (src.includes("IMG_9079")) {
            figureStyle += " grid-column: 1 / -1;";
          }

          return `
            <figure style="${figureStyle}">
              <img src="${src}" alt="Historic photo" style="${imgStyle}">
            </figure>
          `;
        }).join("")}
      </div>
    `;
  }

  paragraphs.forEach((p, i) => {
    html += `<p style="color:#374151; line-height:1.65; margin:10px 0;">${p}</p>`;
    const n = (i % 2 === 0) ? 2 : 1; // pattern 2,1,2,1...
    html += photoBlock(n);
  });

  if (photoIdx < photos.length) {
    html += `
      <div style="margin-top:10px;color:#6b7280;">Final gallery</div>
      ${photoBlock(photos.length - photoIdx)}
    `;
  }
  html += `</div>`;

  historyCard.innerHTML = html;
  scrollArea.appendChild(historyCard);

  // ===== Floating Back button (bottom-left; unaffected by scroll) =====
  document.getElementById("btn-volver-info-en")?.remove();
  const backBtn = document.createElement("button");
  backBtn.id = "btn-volver-info-en";
  backBtn.textContent = "⬅️ Back";
  backBtn.style.position = "fixed";
  backBtn.style.bottom = "20px";
  backBtn.style.left = "20px";
  backBtn.style.zIndex = "9999";
  backBtn.style.padding = "10px 20px";
  backBtn.style.fontSize = "16px";
  backBtn.style.background = "#333";
  backBtn.style.color = "white";
  backBtn.style.border = "none";
  backBtn.style.borderRadius = "8px";
  backBtn.style.boxShadow = "2px 2px 6px rgba(0,0,0,0.3)";
  backBtn.style.touchAction = "manipulation";
  backBtn.onclick = () => {
    // Clean and return to main menu
    contentDiv.innerHTML = "";
    contentDiv.style.display = "none";
    if (mainMenu) mainMenu.style.display = "flex";

    // Restore background & body scroll state
    if (originalBodyBg && originalBodyBg !== "none") {
      document.body.style.background = originalBodyBg;
    } else {
      document.body.style.background =
        "url('https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/IMG_8023.jpeg') no-repeat center center fixed";
      document.body.style.backgroundSize = "cover";
    }
    document.body.style.overflow = "hidden";

    // Remove the floating button
    backBtn.remove();
  };
  document.body.appendChild(backBtn);
})();
