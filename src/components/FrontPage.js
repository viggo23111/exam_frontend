import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import RaceFacade from "../facades/RaceFacade";
import "../card.css"
import {Link} from "react-router-dom";


const FrontPage = () => {
    const [races, setRaces] = useState()

    useEffect(() => {
        RaceFacade.getRaces()
            .then(races => setRaces(races))
            .catch((error) => {
                alert(error.status)
                console.log("error")
            })

    }, [setRaces]);


    return (
        <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">
            <div className={"mb-5"}>
                <h2 className={"text-center"}>Welcome to Viktor's Race site!</h2>
                <p className={"text-center"}>Login to use any of the functions</p>
            </div>
        </Container>
    );
};

export default FrontPage;
