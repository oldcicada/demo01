(function () {
	
	var datepicker = window.datepicker;

	datepicker.buildUi = function(year,month){

		 var monthDate = datepicker.getMonthDate(year,month);
		 
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
				html += '<td>' + date.showDate + '</td>';	
				if(i%7===6){ html+='</tr>'}	
				}
		
			html +='</tbody>' +
		'</table>' +
	'</div>';

	return html;
	};		
	datepicker.init = function(input){
		var html = datepicker.buildUi();
		var $wrapper = document.createElement('div');
			$wrapper.className ='ui-datepicker-wrapper';
			$wrapper.innerHTML = html;
			document.body.appendChild($wrapper);
		var $input = document.querySelector('.ui-datepicker-text');
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
	};		
})();