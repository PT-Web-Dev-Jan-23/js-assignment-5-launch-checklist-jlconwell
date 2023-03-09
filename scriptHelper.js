// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   /*
    <h2>Mission Destination</h2>
        <ol>
            <li>Name: </li>
            <li>Diameter: </li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: </li>
            <li>Number of Moons: </li>
        </ol>
        <img src="">
   */
    const divTarget = document.getElementById("missionTarget");

    divTarget.innerHTML =`
        <h2>Mission Destination</h2>
            <ol>
                <li>Name: ${name}</li>
                <li>Diameter: ${diameter}</li>
                <li>Star: ${star}</li>
                <li>Distance from Earth: ${distance}</li>
                <li>Number of Moons: ${moons}</li>
            </ol>
            <img src="${imageUrl}"/>
        `;
}


function validateInput(testInput) {
    if (testInput === "") {
        return "Empty";
    }

    if (isNaN(testInput)) {
        return "Not a Number";
    }

    if (!isNaN(testInput)) {
        return "Is a Number";
    }
   
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let header2 = document.getElementById("launchStatus");
    
    

    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoMass) === "Empty") {
        // list.style.visibility = "hidden";
        alert("All fields required.")
    } else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number") {
        // list.style.visibility = "hidden";
        alert ("Only enter letters for Pilot and/or Co-pilot");
    } else if (validateInput(fuelLevel) === "Not a Number" || validateInput(cargoMass) === "Not a Number") {
        // list.style.visibility = "hidden";
        alert ("Only enter numbers for Fuel Level and/or Cargo Mass");
    } else {
        list.style.visibility = "visible";
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`
    }

    // list.style.visibility = "visible";

    if (fuelLevel < 10000 && cargoMass <= 10000) {
        // list.style.visibility = "visible";
        // pilotStatus.innerHTML = `${pilot} is Ready.`;
        // copilotStatus.innerHTML = `${copilot} is Ready.`;
        header2.innerHTML = 'Shuttle Not Ready for Launch';
        header2.style.color = 'rgb(199, 37, 78)';
        fuelStatus.innerHTML = 'Fuel level too low for launch';
        cargoStatus.innerHTML = 'Cargo mass low enough for launch';
    };
    
    if (fuelLevel < 10000 && cargoMass > 10000) {
        // list.style.visibility = "visible";
        header2.innerHTML = 'Shuttle Not Ready for Launch';
        header2.style.color = 'rgb(199, 37, 78)';
        cargoStatus.innerHTML = 'Cargo mass too heavy for launch';
        fuelStatus.innerHTML = 'Fuel level too low for launch';
    }

    if (cargoMass > 10000 && fuelLevel >= 10000) {
        // pilotStatus.innerHTML = `${pilot} is Ready.`;
        // copilotStatus.innerHTML = `${copilot} is Ready.`;
        // list.style.visibility = "visible";
        header2.innerHTML = 'Shuttle Not Ready for Launch';
        header2.style.color = 'rgb(199, 37, 78)';
        cargoStatus.innerHTML = 'Cargo mass too heavy for launch';
        fuelStatus.innerHTML = 'Fuel level high enough for launch';
    };

    if (fuelLevel >= 10000 && cargoMass <= 10000) {
        // pilotStatus.innerHTML = `${pilot} is Ready.`;
        // copilotStatus.innerHTML = `${copilot} is Ready.`;
        // list.style.visibility = "hidden";
        header2.style.color = 'rgb(65, 159, 106)';
        header2.innerHTML = 'Shuttle is Ready for Launch';
        cargoStatus.innerHTML = 'Cargo mass low enough for launch';
        fuelStatus.innerHTML = 'Fuel level high enough for launch';
    }

    

}

async function myFetch() {
    let planetsReturned =  await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
        console.log(response.json)
        return response.json();
    });
    return planetsReturned;
}

function pickPlanet(planets) {
    let randomSelect = Math.floor(Math.random() * planets.length);
    let selected = planets[randomSelect];
    return selected;
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;