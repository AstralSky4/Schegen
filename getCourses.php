<?PHP

$person = $_POST["person"];
$output = [];
include '../planner/res/connection.php';

  // SQL query
  $sql = 'SELECT course_colour, course_name_short FROM courses WHERE course_email = ' . '"' . $person . '";';
  $result = $conn->query($sql);
  if ($result->num_rows > 0) {

    // output data of each row
    while ($row = $result->fetch_assoc()) {
      array_push($output, '<li><span style="background-color:' . $row["course_colour"] .'"> </span>' . $row["course_name_short"] . '</li>');
    }
  }

// Removes duplicates

array_unique($output);

// Echos result

echo implode("", $output);
?>