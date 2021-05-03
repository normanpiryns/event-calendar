
<?php 

require "connect.php";

if(isset($_POST['del'])){
	$name = $_POST['del'];
	$sql = "DELETE FROM `events` WHERE name='" . htmlspecialchars($name,ENT_QUOTES) . "' ";
	$conn->query($sql); 

} else {
    $conn->close();
}

?>
