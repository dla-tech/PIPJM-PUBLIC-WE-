// info_en.js — same behavior as Spanish version, only text translated

(() => {
  const contentDiv = document.getElementById("content");
  const mainMenu = document.getElementById("mainMenu");
  const originalBodyBg = getComputedStyle(document.body).backgroundImage || "";

  if (!contentDiv || !mainMenu) return;

  // Prepare content area
  contentDiv.innerHTML = "";
  contentDiv.removeAttribute("style");
  contentDiv.style.display = "flex";
  contentDiv.style.flexDirection = "column";
  contentDiv.style.alignItems = "center";
  contentDiv.style.width = "100%";
  contentDiv.style.height = "100vh";
  contentDiv.style.overflowY = "auto";
  contentDiv.style.overflowX = "hidden";
  contentDiv.style.padding = "30px 20px";
  contentDiv.style.boxSizing = "border-box";
  contentDiv.style.background = "#fff8e7";
  contentDiv.style.position = "relative";

  // Hide main menu
  mainMenu.style.display = "none";
  document.body.style.overflow = "hidden";

  // --- Content ---
  const MAP_URL = "https://maps.app.goo.gl/Tcfgi3CBb7fGjujy7?g_st=ipc";
  const IMG_URL = "https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/IMG_7782.jpeg";

  contentDiv.innerHTML = `
    <!-- Location card -->
    <div style="width:100%;max-width:820px;background:#ffffff;border-radius:14px;box-shadow:0 6px 20px rgba(0,0,0,0.12);padding:18px;margin-top:10px;">
      <h2 style="margin:0 0 8px 0;text-align:center;">📍 Temple Location</h2>
      <p style="margin:6px 0 14px 0;text-align:center;color:#444;">Tap the image to open the location in Google Maps.</p>
      <a href="${MAP_URL}" target="_blank" rel="noopener" style="display:block">
        <img src="${IMG_URL}" alt="Temple Location" style="width:100%;height:auto;border-radius:10px;display:block;">
      </a>
    </div>

    <!-- History card -->
    <div style="width:100%;max-width:820px;background:#ffffff;border-radius:14px;box-shadow:0 6px 20px rgba(0,0,0,0.12);padding:18px;margin-top:28px;margin-bottom:80px;">
      <h2 style="margin:0 0 12px 0;text-align:center;">🏛️ History of the Temple & Congregation</h2>
      <div style="min-height:220px;border:1px dashed #d9d9d9;border-radius:10px;padding:14px;color:#666;line-height:1.5;">
        <!-- Placeholder text; replace later with real content -->
        Paste your history and information here. This area is ready so you can add your text later and it will appear automatically.
      </div>
    </div>
  `;

  // Floating Back button (bottom-left), unaffected by scroll
  const backBtn = document.createElement("button");
  backBtn.textContent = "⬅️ Back";
  backBtn.id = "btnFlotanteVolverInfo";
  backBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 20px;
    padding: 12px 20px;
    font-size: 16px;
    background: #333;
    color: #fff;
    border: none;
    border-radius: 8px;
    z-index: 9999;
    cursor: pointer;
  `;
  backBtn.addEventListener("click", () => {
    // Clean and return to main menu
    contentDiv.innerHTML = "";
    contentDiv.style.display = "none";
    contentDiv.removeAttribute("style");

    // Show main menu again
    mainMenu.style.display = "flex";

    // Restore background and scroll
    if (originalBodyBg && originalBodyBg !== "none") {
      document.body.style.background = originalBodyBg;
    } else {
      document.body.style.background = "url('https://raw.githubusercontent.com/dla-tech/Media-privada/refs/heads/main/IMG_8023.jpeg') no-repeat center center fixed";
      document.body.style.backgroundSize = "cover";
    }
    document.body.style.overflow = "hidden";

    // Remove floating button
    backBtn.remove();
  });
  document.body.appendChild(backBtn);
})();
