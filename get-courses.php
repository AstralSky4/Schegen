<?PHP

$servername = 'sql302.epizy.com';
$serverUsername = 'epiz_20876205';
$serverPassword = 'e85w8oLkPlAy';
$dbname = 'epiz_20876205_TS_Winter2017';

$conn = new mysqli($servername, $serverUsername, $serverPassword, $dbname);

if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

$func = $_POST['func'];
$searched = $_POST['query'];


switch ($func) {
    
  case 'getSections':
    
    // SQL query
    $sql = 'SELECT DISTINCT Course_Section FROM Courses WHERE Course_Id = "' . $searched . '" AND NOT Course_Section = "";';

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
      
      $sections = [];

      // output data of each row
      while ($row = $result->fetch_assoc()) {
        array_push($sections, $row['Course_Section']);
      }
      
      echo json_encode($sections);
      
    } else {
      // No results
      $noResultsArr = ['No results']; // Using array to comply with JSON.parse data type
      echo json_encode($noResultsArr);
    }
    
    break;
    
}


?>