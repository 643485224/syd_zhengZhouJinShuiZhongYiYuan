var date_arr = [];
//days 获取多少天的数据的数据
var days = 7;
afterDate(days);
function afterDate(days) {
	for (let i = 0; i < days; i++) {
		let Stamp = new Date();
		let num = i;
		Stamp.setDate(Stamp.getDate() + num);
		let year = Stamp.getFullYear();
		let month = Stamp.getMonth() + 1;
		let date = Stamp.getDate();
		var obj = {};
		if (month < 10) {
			month = `0${month}`; //这里使用的反引号
		}
		if (date < 10) {
			obj.time_str = `${year}-${month}-0${date}`;
		} else {
			obj.time_str = `${year}-${month}-${date}`;
		}

		obj.time_date = `周${"日一二三四五六".charAt(new Date(obj.time_str).getDay())}`;
		obj.time_week = `${date}号`;
		date_arr.push(obj);
	}
	// console.log(date_arr);
	return date_arr;
}
export default date_arr;
