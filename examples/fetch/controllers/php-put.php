<?php
  if($_SERVER['REQUEST_METHOD'] == 'PUT') {
    // Get file name:
    $file = file_get_contents("php://input");

    $nameSeed = mt_rand(0, 6553512345);
    // Encode file name:
    $ouput = urldecode($file);
    $fileName = "dingo-" . $nameSeed . ".txt";
    // Write file to disk:
    file_put_contents($_SERVER['DOCUMENT_ROOT']. "/fetch/files/" . $fileName, $ouput);
    
    // Data to send back to client:
    $return_arr = array();
    $return_arr["result"] = "The PUT was successful!";
    $return_arr["fileName"] = $fileName;
    // Return data to client:
    echo json_encode($return_arr);
  }
?>