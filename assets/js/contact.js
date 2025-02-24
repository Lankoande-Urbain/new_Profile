document.addEventListener("DOMContentLoaded", function () {
   emailjs.init("Sl5GrTmIAr87FhBgh"); // Remplace par ta clé publique EmailJS

   document.getElementById("contactForm").addEventListener("submit", function (event) {
      event.preventDefault(); // Empêche le rechargement de la page

      const fromName = document.getElementById("name").value.trim();
      const replyTo = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      const msgSubmit = document.getElementById("msgSubmit");

      // Vérifications des champs
      if (!fromName || !replyTo || !message) {
         showMessage(msgSubmit, "Tous les champs sont obligatoires.", "error");
         return;
      }

      if (!validateEmail(replyTo)) {
         showMessage(msgSubmit, "Veuillez entrer un email valide.", "error");
         return;
      }

      // Validation du nom
      if (!validateName(fromName)) {
         showMessage(msgSubmit, "Le nom ne peut contenir que des lettres et des espaces.", "error");
         return;
      }

      // Sanitisation du message pour éviter les XSS
      const sanitizedMessage = sanitizeMessage(message);

      // Vérification du reCAPTCHA
      const recaptchaResponse = grecaptcha.getResponse();
      if (!recaptchaResponse) {
         showMessage(msgSubmit, "Veuillez vérifier que vous n'êtes pas un robot.", "error");
         return;
      }

      // Envoi du mail avec EmailJS
      emailjs.send("service_7gkvs4e", "template_8zu9ij7", {
         from_name: fromName,
         reply_to: replyTo,
         message: sanitizedMessage,
         recaptcha_response: recaptchaResponse
      })
         .then(function () {
            showMessage(msgSubmit, "Message envoyé avec succès !", "success");
            document.getElementById("contactForm").reset(); // Réinitialiser le formulaire
         })
         .catch(function (error) {
            showMessage(msgSubmit, "Erreur lors de l'envoi : " + error.text, "error");
         });
   });

   // Fonction de validation de l'email
   function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
   }

   // Fonction de validation du nom
   function validateName(name) {
      const re = /^[a-zA-Z\s]+$/; // Autorise uniquement les lettres et espaces
      return re.test(name);
   }

   // Fonction de sanitisation du message pour éviter les XSS
   function sanitizeMessage(message) {
      const re = /<script.*?>.*?<\/script>/gi; // Recherche et supprime les balises <script>
      return message.replace(re, '');
   }

   // Fonction pour afficher des messages de confirmation ou d'erreur
   function showMessage(element, message, type) {
      element.textContent = message;
      element.style.color = type === "success" ? "green" : "red";
      element.style.display = "block";
   }
});
