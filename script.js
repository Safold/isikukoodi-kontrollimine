const button = document.getElementById("check").addEventListener("click", setToNumericArray);
const result = document.getElementById("result");
let idArray = [];

//Make an array of the input and transform it into numbers
function setToNumericArray(){
		idArray = document.forms["controlForm"]["personalID"].value.split('').map(num => +num);
		meetsConditions();
}


//Checks if ID is 11 characters long and consist only of digits
function meetsConditions(){
	result.innerHTML = "";
	if(idArray.length !== 11){
		result.innerHTML = "Personal ID length must be 11 numbers exactly and without special symbols";
	}
	else if(idArray.every(el => isNaN(el) == false)){
		checkID();
	}
	else{
		result.innerHTML = "Don't use any special symbols";
	}
}
function checkID(){
	if(checkDate()){
		let sum = 0;
		let i = 0;
		while(i < 9){
			sum += (idArray[i] * (1+i));
			i++;
		}
		sum += idArray[i];
		if(sum % 11 == idArray[10]){
			result.innerHTML = "ID is real"
		}
		else{
			i = 0;
			sum = 0;
			while(i < 10){
				if(i < 7){
					sum += (idArray[i] * (3+i));
					i++;

				}
				else{
					sum += (idArray[i] * (-6 + i));
					i++ 
				}
			}
			if(sum % 11 == idArray[10]){
				result.innerHTML = "ID is real"
			}
			else{
				result.innerHTML = "Wrong ID";
			}
		}
	}
}



//check that date is valid
function checkDate(){
	let month = `${idArray[3]}${idArray[4]}`;
	let day = `${idArray[5]}${idArray[6]}`;
	if(month < 1 || month > 12 || day < 1){
		result.innerHTML = "Wrong month input";
	}
	else if(isLeap() == false && month == 2 && day > 28){
		result.innerHTML = "Wrong day or month input";
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
		days = 29;
		break;
	}
	return(days);
}
//check if year is leap
function isLeap(){
	let year = getYear();
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
function getYear(){
	let century;
	let year;
	switch(idArray[0]){
		case 1:
		case 2:
			century = 1800;
			break;
		case 3:
		case 4:
			century = 1900;
			break;
		case 5:
		case 6:
			century = 2000;
			break;
		default:
			result.innerHTML = "Wrong input. The first digit must be between 1-6."
	}
	year = century + parseInt(`${idArray[1]}${idArray[2]}`);
	return(year);
}