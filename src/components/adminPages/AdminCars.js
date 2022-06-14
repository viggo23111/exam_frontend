import React, {useEffect, useState} from 'react';
import {Card, Container} from "react-bootstrap";

import CarFacade from "../../facades/CarFacade";
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
                <h3 className={"text-center"}>Cars</h3>
                <div className={"cardList"}>
                    {

                        cars &&
                        cars.map((car) =>
                            <Link
                                style={{display: "block", margin: "0",color:"black", textDecoration:"none"}}
                                to={`/cars/${car.id}`}
                                key={car.id}
                            >
                            <Card style={{color:"white", backgroundColor:"#333333"}} className={"cars"}>
                                <Card.Body style={{ padding:"0"}}>
                                    <Card.Img variant="top" src={car.image} style={{height:"150px"}}/>
                                    <div className={"p-2"}>
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
                                    </div>
                                </Card.Body>
                            </Card>
                            </Link>
                        )
                    }
                </div>
            </div>
        </Container>
    );
};

export default AdminCars;