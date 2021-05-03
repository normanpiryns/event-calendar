<?php

require "connect.php";

if(isset($_POST['m']) && isset($_POST['d']) && isset($_POST['y']) && isset($_POST['e'])){

$m = $_POST['m'];
$d = $_POST['d'];
$y = $_POST['y'];
$e = htmlspecialchars($_POST['e'], ENT_QUOTES);

if($y > 9999) $conn->close();

$sql = "INSERT INTO `events` (`id`, `name`, `date`) VALUES (NULL, '$e', '$y"."-"."$m"."-"."$d')";
$conn->query($sql);

} else {
	$conn->close();
}



?>

