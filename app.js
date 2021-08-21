var birthDate = document.querySelector("#userBirthDate");
var btnCheck = document.querySelector("#btn-Check");
var output = document.querySelector("#outputMessage");

function dateReverse(strng) {
    const dateRev = strng.split('').reverse().join('');
    return dateRev
}

function checkPalindrome(strng) {
    const dateRevers = dateReverse(strng);
    return strng === dateRevers;
}

function dateToString(date) {
    var dateStr = { day: '', month: '', year: '' };

    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    } else {
        dateStr.day = date.day.toString();
    }
    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    } else {
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;
}

function allDateFormatsOf(date) {
    var dateStr = dateToString(date)

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
}


function isPalindromeForAllDates(date) {
    var listOfDates = allDateFormatsOf(date);
    var ifSame = false;

    for (let index = 0; index < listOfDates.length; index++) {
        if (checkPalindrome(listOfDates[index])) {
            ifSame = true;
            break;
        }

    }
    return ifSame;
}

function checkIfLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}



function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (checkIfLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        }
    } else {
        if (day > monthDays[month - 1]) {
            day = 1;
            month++;
        }
    }


    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    }
}

function nextPalindromeDate(userBirthDate) {
    var dayCounter = 0;
    var nextDateOcc = getNextDate(userBirthDate);

    while (1) {
        dayCounter++;
        var ifPalindrome = isPalindromeForAllDates(nextDateOcc);
        if (ifPalindrome) {
            break;
        }
        nextDateOcc = getNextDate(nextDateOcc);

    }
    return [dayCounter, nextDateOcc];
}




btnCheck.addEventListener("click", function check() {
    var userDate = birthDate.value;

    if (userDate !== '') {
        var listDate = userDate.split('-');
        var userBirthDate = {
            day: Number(listDate[2]),
            month: Number(listDate[1]),
            year: Number(listDate[0])
        };
        console.log(nextPalindromeDate(userBirthDate));

        var isPalindrome = isPalindromeForAllDates(userBirthDate);

        if (isPalindrome) {
            output.style.color = "green";
            output.innerText = "Hurray, Your BirthDate is a Palindrome🥳";
        } else {
            var [ctr, nextDate] = nextPalindromeDate(userBirthDate);
            output.style.color = "red";
            output.innerText = "Oh, you missed the palindrome date by " + ctr + " days. The next Palindrome date is " + nextDate.day + ":" + nextDate.month + ":" + nextDate.year + ".";
        }

    }
})