import React from 'react';

const URL = "http://localhost:8080/exam_war_exploded";

function RaceFacade() {
    const getRaces = () => {
        const options = makeOptions("GET"); //True add's the token
        return fetch(URL + "/api/race/all", options).then(r =>r.json());
    }

    const createRace = (race) => {
        const options = makeOptions("POST", race, true); //True add's the token
        fetch(URL + "/api/race/", options).then(r => r.json());
    }
    const getRaceByID = (raceID) => {
        const options = makeOptions("GET"); //True add's the token
        return fetch(URL + "/api/race/"+raceID, options).then(r =>r.json());
    }

    const updateRace = (race) => {
        const options = makeOptions("PUT", race,true); //True add's the token
        return fetch(URL + "/api/race/edit/", options).then(r => r.json());
    }

    const removeCarFromRace = (raceID,carID) => {
        const options = makeOptions("PUT",false,true); //True add's the token
        return fetch(URL + "/api/race/remove/"+raceID+"/"+carID, options).then(r => r.json());
    }
    const addCarToRace = (raceID,carID) => {
        const options = makeOptions("PUT",false,true); //True add's the token
        return fetch(URL + "/api/race/add/"+raceID+"/"+carID, options).then(r => r.json());
    }

    const getCarsByRaceID = (raceID) => {
        const options = makeOptions("GET",false,true); //True add's the token
        return fetch(URL + "/api/race/"+raceID+"/cars", options).then(r =>r.json());
    }



    const makeOptions = (method, body,addToken) => {
        var opts = {
            method: method,
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json',
            }
        }
        if (addToken) {
            opts.headers["x-access-token"] = localStorage.getItem("jwtToken");
        }
        if (body) {
            opts.body = JSON.stringify(body);
        }
        return opts;
    }
    return {
        getRaces,
        createRace,
        getRaceByID,
        updateRace,
        removeCarFromRace,
        getCarsByRaceID,
        addCarToRace
    }
}

const facade = RaceFacade();
export default facade;