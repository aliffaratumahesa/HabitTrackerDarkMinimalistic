
    /* Here is the configuration of the date */
    var date = new Date();
    console.log(date);

    /*fetch the current date info*/
    var currentMonth = date.getMonth();
    var currentDay = date.getDay();
    var currentDate = date.getDate();
    var currentYear = date.getFullYear();

    console.log(currentMonth);
    console.log(currentDay);
    console.log(currentDate);
    console.log(currentYear);

    /*Months*/
    var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    /* Set the correct month */
    var title = document.getElementById("title");
    title.innerHTML = "🖤" + months[currentMonth] + "🖤";

    /* Update the Calendar Info */
    var habitTitle = document.getElementById("habitTitle");
    habitTitle.onclick = function () {
        let habits = prompt("Whats your habit", habitTitle.innerHTML)
        if(!habits || habits.length === 0) {
            habitTitle.innerHTML = "Click to set your habit";
        }else{
            habitTitle.innerHTML = habits;
        }

    }

    /*Set total of days*/
    var daysInThisMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    var daysCompleted = 0;
    var totalDays = document.getElementById("totalDays");

    /* Setup the calendar days */
    var dayCount = 0;
    var rowCount = 0;
    var days = document.getElementsByClassName("days");
    for(var i=0; i < days.length; i++){
        var day = days[rowCount].getElementsByClassName("day");
        for ( var j =0; j < day.length; j++){
            console.log(dayCount);

            //add border to the current date
            if (dayCount == currentDate - 1){
                day[j].setAttribute("style","color: black; border:2px solid #7c4dff;");
            }

            //update the correct data number and id and hide any excess numberss
            if(dayCount < daysInThisMonth) {
                day[j].innerHTML = dayCount + 1;
                day[j].setAttribute("id", "day" + (dayCount + 1));
                dayCount++;
            } else {
                day[j].innerHTML = "";
                day[j].classList.add("empty-day");
            }
        }
        rowCount++;
    }

//initializing completed array
    var completed = new Array(31);
    for (var i = 0; i < dayCount; i++) {
        var tempString =
            "" + (currentMonth + 1) + "-" + (i + 1) + "-" + currentYear;
        console.log("storing date: " + tempString);
        var tempDay = localStorage.getItem(tempString);
        console.log(tempDay);
        if(tempDay == null){
                 localStorage.setItem(tempString, "false");
            } else if (tempDay == "true") {
                daysCompleted++;
            }
            totalDays.innerHTML = daysCompleted + "/" + daysInThisMonth;
    }

    console.log("completed array: " + completed);
    console.log("total days completed: " + daysCompleted);

        /*CHECK STORAGE AND UPDATE COMPLETED ARRAY */

        for (var i = 0; i < currentDate; i++) {
        var tempString =
            ""+ (currentMonth + 1) + "-"+ (i + 1) + "-" + currentYear;
        console.log(tempString);

        var chosenDay = localStorage.getItem(tempString);
        console.log(i +1+": "+ chosenDay);
        var chosenDayDiv = document.getElementById("day"+(i+1));
        if (chosenDay === "true") {
            chosenDayDiv.style.backgroundColor = "#3d1f5c";
        } else if (chosenDay === "false") {
            chosenDayDiv.style.backgroundColor = "white";
        }

    }

    /* UPDATE COMPLETED ON CALENDAR */
        var dayDivs = document.querySelectorAll(".day");

        for (var i = 0; i < dayDivs.length; i++) {

            dayDivs[i].addEventListener("click", function (e) {

                if (this.innerText === "") return; // skip empty days

                var num = this.innerText;

                var storageString =
                    (currentMonth + 1) + "-" +
                    num + "-" +
                    currentYear;

                var currentStatus = localStorage.getItem(storageString);

                if (currentStatus === "true") {

                    this.style.backgroundColor = "white";
                    localStorage.setItem(storageString, "false");
                    daysCompleted--;

                } else {

                    this.style.backgroundColor = "#3d1f5c";
                    localStorage.setItem(storageString, "true");
                    daysCompleted++;

                }

                totalDays.innerHTML = daysCompleted + "/" + daysInThisMonth;

                console.log(daysCompleted);

                if (daysCompleted === daysInThisMonth) {
                    alert("Great progress 🖤 You completed this month!");
                }

            });
        }

        /* RESET BUTTON */
        var resetButton = document.getElementById("resetButton");

        resetButton.onclick = function () {

            for (var i = 0; i < dayCount; i++) {

                var tempStrings =
                    (currentMonth + 1) + "-" +
                    (i + 1) + "-" +
                    currentYear;

                localStorage.setItem(tempStrings, "false");

                var curDay = document.getElementById("day" + (i + 1));

                if (curDay) {
                    curDay.style.backgroundColor = "white";
                }
            }

            // reset counter AFTER loop
            daysCompleted = 0;
            totalDays.innerHTML = daysCompleted + "/" + daysInThisMonth;

        };