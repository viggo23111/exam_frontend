import React, {useEffect, useState} from 'react';
import {Card, Container} from "react-bootstrap";

import RaceFacade from "../../facades/RaceFacade";
import DriverFacade from "../../facades/DriverFacade";

const MyRaces = () => {
    const [myRaces, setMyRaces] = useState()

    useEffect(() => {
        DriverFacade.getRacesByDriverID(localStorage.getItem("userID"))
            .then(races => setMyRaces(races))
            .catch((error) => {
                alert(error.status)
                console.log("error")
            })

    }, [setMyRaces]);


    return (
        <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">
            <div className={"mb-5"}>
                <h2 className={"text-center"}>Races</h2>
                <div className={"cardList"}>
                    {

                        myRaces &&
                        myRaces.map((race) =>
                            <Card className={"raceCard"}>
                                <Card.Body>
                                    <Card.Title>{race.name}</Card.Title>
                                    <Card.Text>
                                        Location: {race.location}
                                    </Card.Text>
                                    <Card.Text>
                                        Date: {race.startDate}
                                    </Card.Text>
                                    <Card.Text>
                                        Duration: {race.duration} Minutes
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        )
                    }
                </div>
            </div>
        </Container>
    );
};

export default MyRaces;