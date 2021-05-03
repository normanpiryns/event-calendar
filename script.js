// 25th April/1May -271821 - 13 September 275760 

$(document).ready(function(){
		

	var days = ['S','M','T','W','T','F','S'],
		months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	var thisDate = new Date(),
		today = thisDate.getDate(),
		thisMonth = thisDate.getMonth(),
		thisYear = thisDate.getFullYear();



	var currentMonth = thisMonth;
	var currentYear = thisYear;




	function printCalendar(month, year){

		if (year < 0) {
			$('h3').html(months[month]+", "+year*(-1) + ' BC');
		}

		else {
			$('h3').html(months[month]+", "+year);
		}

		

		var start = new Date(year,month,1).getDay(); 
		var flag = false;
		var counter = 0;


		$('table').html(''); 


		$('table').append('<tr>');
		for(var i=0; i<days.length; i++){
			$('tr').append('<th>'+days[i]+'</th>');
		}
		$('table').append('</tr>');

		$('table').append('<tr>');

		for(var i=1 ; i <= 42; i++){


			$('tr:last').append('<td>' + new Date(year, month, i - start ).getDate() + '</td>'); 
			
			if($('td:last').text() == 1 && flag == false){
				flag = true;
			} else if ($('td:last').text() == 1 && flag == true) {
				flag = false;
			}

			if(!flag) {
				$('td:last').addClass('gray');
			}

			if ($('td:last').text() == today && flag && currentMonth == thisMonth && currentYear == thisYear ) {
				$('td:last').addClass('highlight');
			}

			counter++;
			
			if(counter>6){
				$('table').append('</tr>'); 
				$('table').append('<tr>'); 
				counter = 0; 
			}

		}

		
	}



	function previousMonth(){
		

		currentMonth--;
		
		if (currentMonth < 0){
				currentMonth = 11;
				currentYear -= 1;
	}
		
		printCalendar(currentMonth, currentYear);
		
	}


	function nextMonth(){
		
		currentMonth++;
		
		if(currentMonth == 12){
			currentMonth = 0;
			currentYear += 1;
		}					
		
		printCalendar(currentMonth, currentYear);
		
	}

	function TimeToEvent(day,month,year,eventName){


		let flag = 0;
			amountDays=0,
			amountMonths=0,
			amountYears=0;
			i=thisMonth,
			k=today,
			j=thisYear,
			eventDate = new Date(year,month,day);

			
		while(new Date(j,i,k).getTime() !== new Date(year,i,k).getTime()){
			j++;
			if(new Date(j,i,k) > eventDate) {
				j=thisYear+amountYears;
				break;
			}
			amountYears++;
		}

		while(new Date(j,i,k).getTime() !== new Date(year,month,k).getTime()){

			i++;
			if(new Date(j,i,k) > eventDate){
				i=thisMonth+amountMonths;
				break;
			}
			amountMonths++;
		}

		while(new Date(j,i,k).getDate() !== new Date(year,month,day).getDate()){
														
			k++;
			amountDays++;
			
		}


		var message ='';
			

		message += YearMonthDay(amountYears,'year');
		message += YearMonthDay(amountMonths,'month');
		message += YearMonthDay(amountDays,'day');	

		message = message.slice(0,message.length-2);


		// If date of event has passed, don't show it
		if (eventDate < thisDate) {
			return;
		}

		
		$('#events ul').append(`<div class="delete">x</div> <li><div class='li-name'>Event: ${eventName}</div><div>Date: ${day} ${months[month]} ${year}</div><div>Up in: ${message}</div></li>`);
	
		// Delete event
		$('div.delete:last').on('click', function(e){

			e.preventDefault();

			let name = $(this).next().children('.li-name').html().substring(7);
			$.post('delete.php',{del: name}, function(){
			}).then(function(){
				$("#events ul").html("");
				printEvents();
			});
			

		});

		$('li:last').on('click', function(){

			currentMonth = month; 
			currentYear = year;
			printCalendar(month,year);

			$('td').each(function(){

			if($(this).text() == 1 && flag == false){
				flag = true;
			} else if ($(this).text() == 1 && flag == true) {
				flag = false;
			}

			if(flag && $(this).text() == day) {
				$(this).addClass('highlightEvent');
			}

			});
		});


		



	}


	function YearMonthDay(amount,type){

		var text = '';

		switch(amount){
			case 0: 
				text = '';
				break;
			case 1: 
				text = `1 ${type}, `;
				break;
			default: 
				text = `${amount} ${type}s, `;
			
		}
		return text;
	}


		$('#previous').on('click', function(){
			previousMonth();
		});
		$('#next').on('click',function(){

			nextMonth();
		});

		// print
		printCalendar(thisMonth,thisYear);
		printEvents();


		
	// Get events from DB & show data
	function printEvents(){

		let _,
			t_day,
			t_month,
			t_year,
			t_name;


		$.get('print.php', function(data, success){ 

			_ = JSON.parse(data);
			 
			for(let i=0;i<_['id'].length;i++){
				t_name = _['name'][i];
				t_day = Number(_['date'][i].substring(8));
				t_month = Number(_['date'][i].substring(5,7)-1);
				t_year = Number(_['date'][i].substring(0,4));
				TimeToEvent(t_day,t_month,t_year, t_name);
			}

			
		});


		
	}


	

		function monthToNum(x){


			switch(x){

				case 'January':
					x = 0;
					break;

				case 'February':
					x = 1;
					break;

				case 'March':
					x = 2;
					break;

				case 'April':
					x = 3;
					break;

				case 'May':
					x = 4;
					break;

				case 'June':
					x = 5;
					break;

				case 'July':
					x = 6;
					break;

				case 'August':
					x = 7;
					break;

				case 'September':
					x = 8;
					break;

				case 'October':
					x = 9;
					break;

				case 'November':
					x = 10;
					break;

				case 'December':
					x = 11;
					break;
				default: break;
					

			}
			return x;

		}

		// Jump to current date

		$('#jump').on('click', function(){

			currentMonth = thisMonth;
			currentYear = thisYear;
			printCalendar(currentMonth, currentYear);

		});

		// -- Handle modals ---

		// Add event
		$('#addEvent').on('click', function(){
			$('#myModal').css('display','block');
		})
		// Jump specific month
		$('h3').on('click', function(){
			$('#myModal-2').css('display','block');
		})

		$('.close').on('click', function(){
			$('.modal').css('display','none');
		})

		// Jump to month submit

		$('#jumpTo').on('submit', function(e){
			e.preventDefault();

			let date = new Date($('input[name="date-to-jump"]').val())

			let day = date.getDate();
			let month = date.getMonth();
			let year = date.getFullYear();

			$('.modal').css('display','none');

			if (date != 'Invalid Date') {
				currentMonth = month;
				currentYear = year;
				printCalendar(currentMonth, currentYear);
			}
			
		})

		// Add a new event

		$('#new-event').on('submit', function(e){
			e.preventDefault()

			let date = new Date($('input[name="new-event-date"]').val());
			let eventName = $('input[name="event-name"]').val();

			let day = date.getDate();
			let month = date.getMonth()+1;
			let year = date.getFullYear();


			let data = {

				m : month,
				d : day,
				y : year,
				e : eventName
			};

			// Validate date & name
			if (date < thisDate || date.getTime() == NaN || !eventName || year > 9999){
				$('#new-event .error').show();
				$('#new-event .error').html("Please select a valid date and name of event.");
			}

			else {
				$.post('add.php', data, function(){

				}).done(function(){
					$('#events ul').html("");
					console.log("Success to add");
					$(".modal").css('display','none');
					printEvents();
					$('#new-event .error').hide();
				}).fail(function(){
					console.log("Failed to add");
				})
			}
			


		})




});