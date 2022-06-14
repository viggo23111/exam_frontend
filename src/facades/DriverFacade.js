import React from 'react';

const URL = "http://localhost:8080/exam_war_exploded";

function RaceFacade() {
    const getDrivers = () => {
        const options = makeOptions("GET"); //True add's the token
        return fetch(URL + "/api/driver/all", options).then(r =>r.json());
    }

    const getRacesByDriverID = (driverID) => {
        const options = makeOptions("GET"); //True add's the token
        return fetch(URL + "/api/driver/" + driverID + "/races", options).then(r => r.json());
    }

    const createDriver = (driver) => {
        const options = makeOptions("POST", driver, true); //True add's the token
        fetch(URL + "/api/driver/", options).then(r => r.json());
    }
    const makeOptions = (method, body, addToken) => {
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
        getDrivers,
        getRacesByDriverID,
        createDriver
    }
}

const facade = RaceFacade();
export default facade;