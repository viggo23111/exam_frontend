import React from 'react';

const URL = "http://localhost:8080/exam_war_exploded";

function RaceFacade() {
    const getCars = () => {
        const options = makeOptions("GET"); //True add's the token
        return fetch(URL + "/api/car/all", options).then(r =>r.json());
    }

    const getDriversByCarID = (carID) => {
        const options = makeOptions("GET"); //True add's the token
        return fetch(URL + "/api/car/"+carID+"/drivers", options).then(r =>r.json());
    }

    const getCarByID = (carID) => {
        const options = makeOptions("GET"); //True add's the token
        return fetch(URL + "/api/car/"+carID, options).then(r =>r.json());
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
        getCars,
        getDriversByCarID,
        getCarByID
    }
}

const facade = RaceFacade();
export default facade;