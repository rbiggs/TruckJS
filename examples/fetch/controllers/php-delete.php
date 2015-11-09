<?php
  if($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    // Get file name from client:
    $file = file_get_contents("php://input");
    $return_arr = array();
    // If the file exists, delete it:
    if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/fetch/files/" . $file)) {
      unlink($_SERVER['DOCUMENT_ROOT'] . "/fetch/files/" . $file);
      $return_arr["result"] = "The file \"" . $file . "\" was deleted.";
      $return_arr["fileName"] = $file;
    // Otherwise notify client that the file does not exist:
    } else {
      $return_arr["result"] = "The file \"". $file . "\" does not exist!";
      $return_arr["fileName"] = $file;
      $return_arr["file"] = $file;
    }
    // Return data to client:
    echo json_encode($return_arr);
  }
?>