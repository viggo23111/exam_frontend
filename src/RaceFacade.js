import React from 'react';

const URL = "http://localhost:8080/exam_war_exploded";

function RaceFacade() {
    const getRaces = () => {
        const options = makeOptions("GET"); //True add's the token
        return fetch(URL + "/api/race/all", options).then(r =>r.json());
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
    }
}

const facade = RaceFacade();
export default facade;