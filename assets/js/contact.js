document.addEventListener("DOMContentLoaded", function () {
   emailjs.init("Sl5GrTmIAr87FhBgh"); // Remplace par ta clé publique EmailJS

   document.getElementById("contactForm").addEventListener("submit", function (event) {
      event.preventDefault(); // Empêche le rechargement de la page

      const fromName = document.getElementById("name").value.trim();
      const replyTo = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      const msgSubmit = document.getElementById("msgSubmit");

      // Vérifications des champs
      if (!fromName) {
         showMessage(msgSubmit, "Le champ Nom est obligatoire.", "error");
         return;
      }

      if (!replyTo) {
         showMessage(msgSubmit, "Le champ Email est obligatoire.", "error");
         return;
      }

      if (!validateEmail(replyTo)) {
         showMessage(msgSubmit, "Veuillez entrer un email valide.", "error");
         return;
      }

      if (!message) {
         showMessage(msgSubmit, "Le champ Message est obligatoire.", "error");
         return;
      }

      // Envoi du message avec EmailJS
      emailjs.send("service_7gkvs4e", "template_8zu9ij7", {
         from_name: fromName,
         reply_to: replyTo,
         message: message
      })
         .then(function () {
            showMessage(msgSubmit, "Message envoyé avec succès !", "success");
            document.getElementById("contactForm").reset(); // Réinitialiser le formulaire
         })
         .catch(function (error) {
            showMessage(msgSubmit, "Erreur lors de l'envoi : " + error.text, "error");
         });
   });

   function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
   }

   function showMessage(element, message, type) {
      element.textContent = message;
      element.style.color = type === "success" ? "green" : "red";
      element.style.display = "block";
   }
});
