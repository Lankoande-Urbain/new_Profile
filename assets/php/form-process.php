<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
   $name = htmlspecialchars(trim($_POST['name']));
   $email = htmlspecialchars(trim($_POST['email']));
   $message = htmlspecialchars(trim($_POST['message']));

   // Validate inputs
   if (!empty($name) && !empty($email) && !empty($message)) {
      if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
         // Process form data (e.g., save to database, send email, etc.)
         // For demonstration, we'll just echo the data
         echo "Name: " . $name . "<br>";
         echo "Email: " . $email . "<br>";
         echo "Message: " . $message . "<br>";
      } else {
         echo "Invalid email format.";
      }
   } else {
      echo "All fields are required.";
   }
} else {
   echo "Invalid request method.";
}
?>