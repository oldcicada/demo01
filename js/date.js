(function(){//为了模块编写不污染外部环境，将代码包含在匿名类中
	var datepicker = {};

	datepicker.getMonthDate = function(year,month){//获取一个月数据
		var res = [];
		if(!year || !month){
			var  today =new Date();
			year = today.getFullYear();
			month = today.getMonth()+1;
		}

		var  firstDay = new Date(year,month-1,1);
		var firstDayWeekDay = firstDay.getDay();
		if(firstDayWeekDay === 0) firstDayWeekDay = 7;

		year =firstDay.getFullYear();
		month=firstDay.getMonth()+1;

		var lastDayOfLastMonth = new Date(year,month-1,0);
		var lastDayOfLastMonth = lastDayOfLastMonth.getDate();

		var preMonthDayCount = firstDayWeekDay - 1;

		var lastDay = new Date(year,month,0);
		var lastDate = lastDay.getDate();

		for (var i = 0; i < 7*6; i++) {
			var date = i - preMonthDayCount + 1;
			var showDate = date;
			var thisMonth = month;

			if (date<=0) {
				thisMonth = month - 1;
				showDate = lastDayOfLastMonth + date;
			}else if(date >lastDate){
				thisMonth = month + 1;
				showDate = showDate - lastDate;
			}

			if(thisMonth ===0 ) thisMonth = 12;
			if(thisMonth === 13) thisMonth = 1;
			res.push({
				month: thisMonth,
				date:date,
				showDate:showDate 
			});
		}
		return {
			year:year,
			month:month,
			days:res
		};
	};

	window.datepicker = datepicker;
})();