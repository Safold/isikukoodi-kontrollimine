const submit = document.getElementById("check").addEventListener("click", meetsConditions);
const result = document.getElementById("result");




function checkID(id){
	if(checkDate(id)){
		let idArr = [];
		let sum = 0;
		let i = 0;
		for(let i in id){
			idArr.push(id.substr(i, 1))
			console.log(idArr);
		}
		while(i < 9){
			sum += parseInt(idArr[i]) * (1+i)
			i++;
		}
		sum += parseInt(idArr[i]);
		if(sum % 11 == idArr[10]){
			result.innerHTML = "ID is real"
			console.log('pervii')
		}
		else{
			i = 0;
			sum = 0;
			while(i < 10){
				if(i < 7){
					console.log(sum)
					console.log(i);
					sum += parseInt(idArr[i]) * (3+i);
					console.log(sum)
					i++;

				}
				else{
					sum += parseInt(idArr[i]) * (-6 + i);
					i++ 
				}
			}
			console.log(sum)
			if(sum % 11 == idArr[10]){
				result.innerHTML = "ID is real"
				console.log('vtoroii')
			}
			else{
				result.innerHTML = "Wrong ID";
			}
	}
}
}




function checkDate(id){
	let month = id.substr(3, 2);
	let day = id.substr(5, 2);

console.log(day > howManyDays(month))
	if(month < 1 || month > 12 || day < 1){
		result.innerHTML = "Wrong month input";
	}
	else if(isLeap(id) == true && month == 2 && day > 29){
		result.innerHTML = "In february " + getYear(id) + " was only 29 day";
	}
	else if(day > howManyDays(month)){
		result.innerHTML = "Wrong day or month input";
	}else{
		return(true);
	}
	return(false);
}


function howManyDays(month){
	switch(month){
	case "01":
	case "03":
	case "05":
	case "07":
	case "08":
	case "10":
	case "12":
		days = 31;
		break;
	case "04":
	case "06":
	case "09":
	case "11":
		days = 30;
		break;
	default:
		days = 28;
		break;
	}
	return(days);
}
//check if year is leap
function isLeap(year){
	year = getYear(year);
	if(year % 4 != 0){
		return(false);
	}else if(year % 100 != 0){
		return(true);
	}else if(year % 400 != 0){
		return(false);
	}else{
		return(true);
	}
}
//Get the year out of ID
function getYear(id){
	let century;
	let year;
	switch(id.substr(0, 1)){
		case "1":
		case "2":
			century = 1800;
			break;
		case "3":
		case "4":
			century = 1900;
			break;
		case "5":
		case "6":
			century = 2000;
			break;
		default:
			result.innerHTML = "Wrong input. The first digit must be between 1-6."
	}
	year = century + parseInt(id.substr(1, 2));
	return(year);
}


//Checks if ID is 11 characters long and consist only of digits
function meetsConditions(){
	result.innerHTML = "";
	let personalID = document.forms["controlForm"]["personalID"].value;
	if(personalID.length !== 11){
		result.innerHTML = "Personal ID length must be 11 numbers exactly (without special symbols e.g. +-/* etc)";
	}
	else if(/^\d+$/.test(personalID)){
		checkID(personalID);
	}
	else{
		result.innerHTML = "unidentified error";
	}
}
/*104 = 1804
204 = 1804
304 = 1904
404 = 1904
504 = 2004
604 = 2004*/