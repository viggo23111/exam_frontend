import React, {useEffect, useState} from 'react';
import {Card, Container} from "react-bootstrap";

import CarFacade from "../facades/CarFacade";
import {Link} from "react-router-dom";


const AdminCars = () => {
    const [cars, setCars] = useState()

    useEffect(() => {
        CarFacade.getCars()
            .then(cars => setCars(cars))
            .catch((error) => {
                alert(error.status)
                console.log("error")
            })

    }, [setCars]);
    return (
        <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">
            <div className={"mb-5"}>
                <h2 className={"text-center"}>Cars</h2>
                <div className={"cardList"}>
                    {

                        cars &&
                        cars.map((car) =>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{car.name}</Card.Title>
                                    <Card.Text>
                                        brand: {car.brand}
                                    </Card.Text>
                                    <Card.Text>
                                        Model: {car.make}
                                    </Card.Text>
                                    <Card.Text>
                                        Year: {car.year}
                                    </Card.Text>
                                    <Card.Text>
                                        Color: {car.color}
                                    </Card.Text>
                                    <Card.Text>
                                        Sponsor: {car.sponsor}
                                    </Card.Text>

                                    <Link
                                        style={{display: "block", margin: "0"}}
                                        to={`/cars/${car.id}`}
                                        key={car.id}
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

export default AdminCars;