<?php

include '../res/session-admin.php';

$person = $_POST["person"];

// Declare variables
$weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
$output = [];

include '../planner/res/connection.php';

// Loop through days
foreach($weekDays as $day) {

  // SQL query
  $sql = 'SELECT course_times, course_days, course_colour, course_name_short FROM courses WHERE course_email = "' . $person . '";';
  $result = $conn->query($sql);
  if ($result->num_rows > 0) {

    // output data of each row
    while ($row = $result->fetch_assoc()) {
      $date = $row["course_days"];
      $dateIndex = array_search($day, explode(", ", $date));

      // Check if there is that class on that day
      if ($dateIndex !== FALSE) {
        $colorVal = str_replace("#", "", $row["course_colour"]);
        $time = $row["course_times"];
        $startTime = explode("-", explode(", ", $time) [$dateIndex]) [0];
        $endTime = explode("-", explode(", ", $time) [$dateIndex]) [1];
        $startVal = (float)(explode(":", $startTime) [0] . "." . (explode(":", $startTime) [1] / 6));
        $endVal = (float)(explode(":", $endTime) [0] . "." . (explode(":", $endTime) [1] / 6));
        array_push($output, $colorVal . ":" . strtoupper(substr($day, 0, 3)) . "-" . str_replace(".", "_", $startVal) . ":" . (($endVal - $startVal) * 2) . ":" . $row["course_name_short"]);
      }
    }
  }
  else echo "0 results";
}

echo implode(". ", $output);
?>