(function () {
	
	var datepicker = window.datepicker;
	var monthDate;
	var $wrapper;
	datepicker.buildUi = function(year,month){

		monthDate = datepicker.getMonthDate(year,month);
		 
		 var html = '<div class="ui-datepicker-header">' +
		'<a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>' +
		'<a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>' +
		'<span class="ui-datepicker-now-month">'+monthDate.year+'-'+monthDate.month+'</span>' +
	'</div>' +
	'<div class="ui-datepicker-body">' +
		'<table>' +
			'<thead>' +
				'<tr>' +
					'<th>一</th>' +
					'<th>二</th>' +
					'<th>三</th>' +
					'<th>四</th>' +
					'<th>五</th>' +
					'<th>六</th>' +
					'<th>日</th>' +
				'</tr>' +
			'</thead>' +
			'<tbody>' ;

			for (var i = 0; i < monthDate.days.length; i++) {
				var date  = monthDate.days[i];
				if(i%7===0){ html+='<tr>'}
				html += '<td data-date="'+date.date+'">' + date.showDate + '</td>';	
				if(i%7===6){ html+='</tr>'}	
				}
		
			html +='</tbody>' +
		'</table>' +
	'</div>';

	return html;
	};		

	datepicker.view = function(direction){
		var month,year;
		if(monthDate){
		month= monthDate.month;
		year = monthDate.year;}
		if(direction === 'prev')month--;
		if(direction === 'next')month++;
		
		var html = datepicker.buildUi(year,month);

		$wrapper = document.querySelector('.ui-datepicker-wrapper');
		if(!$wrapper){
			$wrapper = document.createElement('div');
			document.body.appendChild($wrapper);
			$wrapper.className ='ui-datepicker-wrapper';
		}
		$wrapper.innerHTML = html;
	};
		function format(date){
				ret='';
				function padding(num){
					if(num<=9){
						return '0'+num;
					}else return num;
				}
				ret+=date.getFullYear()+"-";
				ret+=padding(date.getMonth()+1)+'-';
				ret+=padding(date.getDate());
				return ret;
			}
	datepicker.init = function(input){
		datepicker.view();
		var $input = document.querySelector(input);
		var state = false;
		$input.addEventListener("click", 
			function(){
			if (state) {//判断是否开启状态
				 $wrapper.classList.remove('ui-datepicker-wrapper-show');
				 state = false;
			}else{
				$wrapper.classList.add('ui-datepicker-wrapper-show');
				var left = $input.offsetLeft;
				var right = $input.offsetTop;
				var height = $input.offsetHeight;
				$wrapper.style.top = top + height +2 +'px';
				$wrapper.style.left = left + 'px';
				state = true;
			}
},false);

		$wrapper.addEventListener('click',function(e){
		var $target=e.target;
		if(!$target.classList.contains('ui-datepicker-btn'))
			return;
		if($target.classList.contains('ui-datepicker-prev-btn')){
			datepicker.view('prev');
		}else if($target.classList.contains('ui-datepicker-next-btn')){
			datepicker.view('next');
		}
	},false);

	$wrapper.addEventListener('click',function(e){
		var $target=e.target;
		if($target.tagName.toLowerCase()!=='td'){return;}
		var date= new Date(monthDate.year,monthDate.month-1,$target.dataset.date);
		$input.value=format(date);
	},false);

	};		
})();
