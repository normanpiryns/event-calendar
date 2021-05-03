<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Calendar</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script type="text/javascript" src='script.js'></script>
	<link rel="stylesheet" type="text/css" href="main.css">
	   
</head>
<body>

<!-- The Modal  for adding an event-->
<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    <h4> Pick a date for a new event </h4>
    <form id="new-event" action="" method="POST">
    	<p class="error"></p>
    	<input type="text" name="event-name">
    	<input type="date" name="new-event-date">
    	<input class="pointer" type="submit" name="submit-new-event" value="Add">
    </form>

  </div>

</div>

<!-- The Modal for jumping to a specific month-->
<div id="myModal-2" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    <h4> Pick a date to jump to </h4>
    <form id="jumpTo" action="" method="POST">
    	<input type="date" name="date-to-jump">
    	<input class="pointer" type="submit" name="submit-new-event" value="Go">
    </form>
  </div>

</div>


<div id='wrap-left'>
	<div id='header'>
		<!-- Month -->
		<button type='button' id='previous'>&#8249;</button>
		<h3></h3>
		<button type='button' id='next'>&#8250;</button>
	</div>
	<table></table>
</div>

<div id="wrap-right">

	<button type='button' id='addEvent' data-toggle="modal" data-target="#exampleModal">Add an event</button>
	<p id='jump'> Jump to today's date </p>
	
	<div id="events">
		<ul><!-- Events are here --></ul>
	</div>
</div>
<div style="clear:both;"></div>


</body>
</html>