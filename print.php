
<?php 
require 'connect.php';



$sql = "SELECT * FROM `events`";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    
	while ($row=$result->fetch_assoc())
	{
		$ids[]=$row['id'];
		$names[]=$row['name'];
		$dates[]=$row['date'];
	}

	$arr=array('id'=>$ids,'name'=>$names,'date'=>$dates);

	echo json_encode($arr);


} else {

    $conn->close();
}



?>
