"use strict"

/*
    Author: Nick N.
    Date:   Dec. 1, 2018
    Desc:   Countries of the World - Final Project
*/

// Reset the radio buttons at the start
document.getElementById("areaSQM").checked = true;
document.getElementById("densitySQM").checked = true;

// JSON Parse Script from w3school, modified to populate the country select menu
var myObjArray;

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        myObjArray = JSON.parse(this.responseText);
        for (var i = 0; i < myObjArray.length; i++){
            document.getElementById("countrySelect").innerHTML += "<option>" + myObjArray[i].Name; + "</option>";
        }
    }
};
xmlhttp.open("GET", "countries.json", true);
xmlhttp.send();

// Function to populate all the name, form, and flag feilds based off of the selected Country.
function updateCountryDetails(inMyObjArray){
    var selectCountry = document.getElementById("countrySelect");
    var countryName = selectCountry.options[selectCountry.selectedIndex].innerText;
    var countryPath = countryName.split(' ').join('_');

    // Update Country Names
    document.getElementById("countryName").innerText = countryName;
    document.getElementById("countryFlag").innerText = countryName + "'s Flag";
    document.getElementById("countryDetails").innerText = countryName + "'s Detials";

    // Check which Country has been selected, and updated all form fields and the flag based on that selection
    for ( var i = 0; i < inMyObjArray.length; i++){
        if (inMyObjArray[i].Name == countryName){
            // Display the selected Country's flag
            document.getElementById("countryFlagIMG").innerHTML = "<img src='flags/" + countryPath + ".png' alt='Country Flag' />";

            // Set the selected Country's population with commas added.
            var population = inMyObjArray[i].Population;
            var populationCommas = population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            document.getElementById("population").value = populationCommas;

            // Set the area for the selected Country
            var areaMiles = inMyObjArray[i].Area;

            if (document.getElementById("areaSQM").checked){
                document.getElementById("areaInDisplay").value = areaMiles.toFixed(1);
            } else if (document.getElementById("areaSQKM").checked){
                areaMiles = areaMiles * 2.59;
                document.getElementById("areaInDisplay").value = areaMiles.toFixed(1);
            }

            // Set the population density for the selected Country
            var popDensity = 0;

            if (document.getElementById("densitySQM").checked){
                popDensity = population / inMyObjArray[i].Area;

                document.getElementById("popDensityDisplay").value = popDensity.toFixed(2);
            } else if (document.getElementById("densitySQKM").checked){
                popDensity = population / (inMyObjArray[i].Area * 2.59);

                document.getElementById("popDensityDisplay").value = popDensity.toFixed(2);
            }

            // Set the population percentage for the selected Country
            var WorldPopulation = 0;
            var populationPercentage = 0;

            for ( var i = 0; i < inMyObjArray.length; i++){
                WorldPopulation += inMyObjArray[i].Population;
            }

            populationPercentage = population / WorldPopulation * 100;
            document.getElementById("popPercent").value = populationPercentage.toFixed(3) + "%";

            // // Event Listener for the Wikipedia button
            // var countryURL = "https://en.wikipedia.org/wiki/" + countryPath;

            // document.getElementById("openWiki").addEventListener('click',function(){window.open(countryURL);});
        }
    }

}

// Function to open the appropriate Country's wiki page, or just open wiki if none have been selected
function openWikiWindow(){
    var selectCountry = document.getElementById("countrySelect");
    var countryName = selectCountry.options[selectCountry.selectedIndex].innerText;
    var countryPath = countryName.split(' ').join('_');
    var countryURL = "";

    if (countryPath == "Select_a_Country"){
        countryURL = "https://en.wikipedia.org/wiki/";
    } else {
        countryURL = "https://en.wikipedia.org/wiki/" + countryPath;
    }

    window.open(countryURL);
}

// Function to set the selected Country's area if the "Sq. Miles" radio button is selected
function setAreaSQM(inMyObjArray){
    var selectCountry = document.getElementById("countrySelect");
    var countryName = selectCountry.options[selectCountry.selectedIndex].innerText;

    for ( var i = 0; i < inMyObjArray.length; i++){
        if (inMyObjArray[i].Name == countryName){
            var areaMiles = inMyObjArray[i].Area;
            document.getElementById("areaInDisplay").value = areaMiles.toFixed(1);
        }
    }
}

// Function to set the selected Country's area if the "Sq. KMs" radio button is selected
function setAreaSQKM(inMyObjArray){
    var selectCountry = document.getElementById("countrySelect");
    var countryName = selectCountry.options[selectCountry.selectedIndex].innerText;

    for ( var i = 0; i < inMyObjArray.length; i++){
        if (inMyObjArray[i].Name == countryName){
            var areaMiles = inMyObjArray[i].Area * 2.59;
            document.getElementById("areaInDisplay").value = areaMiles.toFixed(1);
        }
    }
}

// Function to set the selected Country's population density if the "Sq. Mile" radio button is selected
function setDensitySQM(inMyObjArray){
    var selectCountry = document.getElementById("countrySelect");
    var countryName = selectCountry.options[selectCountry.selectedIndex].innerText;

    for ( var i = 0; i < inMyObjArray.length; i++){
        if (inMyObjArray[i].Name == countryName){
            var population = inMyObjArray[i].Population;
            var popDensity = population / inMyObjArray[i].Area;;
            document.getElementById("popDensityDisplay").value = popDensity.toFixed(2);
        }
    }
}

// Function to set the selected Country's population density if the "Sq. KM" radio button is selected
function setDensitySQKM(inMyObjArray){
    var selectCountry = document.getElementById("countrySelect");
    var countryName = selectCountry.options[selectCountry.selectedIndex].innerText;

    for ( var i = 0; i < inMyObjArray.length; i++){
        if (inMyObjArray[i].Name == countryName){
            var population = inMyObjArray[i].Population;
            var popDensity = population / (inMyObjArray[i].Area * 2.59);
            document.getElementById("popDensityDisplay").value = popDensity.toFixed(2);
        }
    }
}

// Event Listeners
// The Country Selection which controls the majority of the functionality of the website
document.getElementById("countrySelect").addEventListener('change',function(){updateCountryDetails(myObjArray);});
// Handles what wiki page is opened
document.getElementById("openWiki").addEventListener('click',openWikiWindow);
// Makes updates to the form based on the radio button selections
document.getElementById("areaSQM").addEventListener('click',function(){setAreaSQM(myObjArray);});
document.getElementById("areaSQKM").addEventListener('click',function(){setAreaSQKM(myObjArray);});
document.getElementById("densitySQM").addEventListener('click',function(){setDensitySQM(myObjArray);});
document.getElementById("densitySQKM").addEventListener('click',function(){setDensitySQKM(myObjArray);});