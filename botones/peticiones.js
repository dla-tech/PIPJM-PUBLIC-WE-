(function () {
  const content = document.getElementById("content");
  content.innerHTML = `
    <div style="padding: 20px; color: white;">
      <h2>¿Asistes a una congregación?</h2>
      <div style="margin-top: 20px;">
        <button id="btnSi" style="margin-right: 10px;">Sí</button>
        <button id="btnNo">No</button>
      </div>
    </div>
  `;

  document.getElementById("btnSi").addEventListener("click", mostrarFormularioSi);
  document.getElementById("btnNo").addEventListener("click", mostrarOpcionesNo);

  function mostrarFormularioSi() {
    content.innerHTML = `
      <div style="padding: 20px; color: white;">
        <h2>Petición</h2>
        <form id="formPeticion">
          <label>Nombre completo:</label><br>
          <input type="text" name="nombre" required><br><br>

          <label>Nombre de tu congregación:</label><br>
          <input type="text" name="congregacion" required><br><br>

          <label>Escribe tu petición:</label><br>
          <textarea name="peticion" rows="4" required></textarea><br><br>

          <label>Teléfono:</label><br>
          <input type="tel" name="telefono"><br><br>

          <button type="submit">Enviar</button>
        </form>
        <br>
        <button onclick="volverAlMenu()">Volver</button>
      </div>
    `;

    document.getElementById("formPeticion").addEventListener("submit", function (e) {
      e.preventDefault();
      enviarFormulario(new FormData(this));
    });
  }

  function mostrarOpcionesNo() {
    content.innerHTML = `
      <div style="padding: 20px; color: white; max-height: 90vh; overflow-y: auto;">
        <h2>Selecciona la razón por la que deseas hacer la petición:</h2>
        <ul style="list-style: none; padding: 0;">
          <li><button onclick="mostrarFormularioPorRazon('Reconciliación')">Reconciliación</button></li>
          <li><button onclick="mostrarFormularioPorRazon('Salvación')">Salvación</button></li>
          <li><button onclick="mostrarFormularioPorRazon('Liberación')">Liberación</button></li>
          <li><button onclick="mostrarFormularioPorRazon('Restauración')">Restauración</button></li>
          <li><button onclick="mostrarFormularioPorRazon('Otra')">Otra</button></li>
        </ul>
        <br>
        <button onclick="iniciarPreguntas()">Volver</button>
      </div>
    `;
  }

  function mostrarFormularioPorRazon(razon) {
    content.innerHTML = `
      <div style="padding: 20px; color: white;">
        <h2>${razon}</h2>
        <form id="formPeticion">
          <input type="hidden" name="razon" value="${razon}">

          <label>Nombre completo:</label><br>
          <input type="text" name="nombre" required><br><br>

          <label>Escribe tu petición:</label><br>
          <textarea name="mensaje" rows="4" required></textarea><br><br>

          <label>Teléfono:</label><br>
          <input type="tel" name="telefono"><br><br>

          <button type="submit">Enviar</button>
        </form>
        <br>
        <button onclick="mostrarOpcionesNo()">Volver</button>
      </div>
    `;

    document.getElementById("formPeticion").addEventListener("submit", function (e) {
      e.preventDefault();
      enviarFormulario(new FormData(this));
    });
  }

  function iniciarPreguntas() {
    content.innerHTML = `
      <div style="padding: 20px; color: white;">
        <h2>¿Asistes a una congregación?</h2>
        <div style="margin-top: 20px;">
          <button id="btnSi" style="margin-right: 10px;">Sí</button>
          <button id="btnNo">No</button>
        </div>
      </div>
    `;

    document.getElementById("btnSi").addEventListener("click", mostrarFormularioSi);
    document.getElementById("btnNo").addEventListener("click", mostrarOpcionesNo);
  }

  function enviarFormulario(formData) {
    emailjs.sendForm('service_wjbpiik', 'template_89ugs9a', formData, 'AzWZTx6GexhwPU2UJ')
      .then(function () {
        content.innerHTML = `
          <div style="padding: 20px; color: white;">
            <h2>¡Petición enviada con éxito! 🙏</h2>
            <p>Gracias por escribirnos. Estaremos orando por ti.</p>
            <br>
            <button onclick="volverAlMenu()">Volver al menú principal</button>
          </div>
        `;
      }, function (error) {
        content.innerHTML = `
          <div style="padding: 20px; color: white;">
            <h2>Error al enviar 😔</h2>
            <p>Por favor intenta nuevamente más tarde.</p>
            <br>
            <button onclick="volverAlMenu()">Volver al menú principal</button>
          </div>
        `;
        console.error('Error:', error);
      });
  }
})();