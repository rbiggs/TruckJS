<?php
  $email_check = '';
  $return_arr = array();
  // Check that the email is valid:
  if(filter_var($_POST['email_ajax'], FILTER_VALIDATE_EMAIL)) {
    $email_check = 'valid';
  } else {
    $email_check = 'invalid';
  }
  
  // Data to send back to client:
  $return_arr["email_check"] = $email_check;
  $return_arr["name"] = $_POST['name_ajax'];
  $return_arr["email"] = $_POST['email_ajax'];
  $return_arr["msg"] = "This is a message sent from the server!";
  // Return data to client:
  echo json_encode($return_arr);
?>