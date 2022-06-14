import React from 'react';
import settings from "../Settings";


const URL = settings.getUrl();

function CarFacade() {
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
    const createCar = (car) => {
        const options = makeOptions("POST", car, true); //True add's the token
        fetch(URL + "/api/car/", options).then(r => r.json());
    }

    const removeDriverFromCar = (carID,driverID) => {
        const options = makeOptions("PUT",false,true); //True add's the token
        return fetch(URL + "/api/car/remove/"+carID+"/"+driverID, options).then(r => r.json());
    }

    const addDriverToCar = (carID,driverID) => {
        const options = makeOptions("PUT",false,true); //True add's the token
        return fetch(URL + "/api/car/add/"+carID+"/"+driverID, options).then(r => r.json());
    }
    const updateCar= (car) => {
        const options = makeOptions("PUT", car,true); //True add's the token
        return fetch(URL + "/api/car/edit/", options).then(r => r.json());
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
        getCarByID,
        createCar,
        removeDriverFromCar,
        addDriverToCar,
        updateCar
    }
}

const facade = CarFacade();
export default facade;