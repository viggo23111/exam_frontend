import React, {useEffect, useState} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import RaceFacade from "../../facades/RaceFacade";
import {Link} from "react-router-dom";


const AdminRaces = () => {

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
                <h2 className={"text-center"}>Races</h2>
                <div className={"cardList"}>
                    {

                        races &&
                        races.map((race) =>
                            <Card>
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
                                    <Link
                                        style={{display: "block", margin: "0"}}
                                        to={`/races/${race.id}`}
                                        key={race.id}
                                    >
                                        info
                                    </Link>
                                </Card.Body>
                            </Card>
                        )
                    }
                </div>
            </div>
        </Container>
    );
};

export default AdminRaces;