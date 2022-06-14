import React, {useEffect, useState} from 'react';
import {Button, Container, Form, Table} from "react-bootstrap";

import CarFacade from "../facades/CarFacade";
import {useParams} from "react-router-dom";


const AdminCars = () => {
    const parms = useParams();
    const [car, setCar] = useState()
    const [currentDrivers, setCurrentDrivers] = useState()

    useEffect(() => {
        CarFacade.getCarByID(parms.carID)
            .then(car => setCar(car))
            .catch((error) => {
                alert(error.status)
                console.log("error")
            })

    }, [setCar]);

    useEffect(() => {
        console.log(parms.carID)
        CarFacade.getDriversByCarID(parms.carID)
            .then(currentDrivers => setCurrentDrivers(currentDrivers))
            .catch((error) => {
                alert(error.status)
                console.log("error")
            })

    }, [setCurrentDrivers]);


    const handleRemove = (e) => {
        const ownerID = e.target.value;
        //HarbourFacade.removeOwnerFromBoat(boat.id, ownerID)
        if (currentDrivers) {
            const newDrivers = currentDrivers.filter((currentDriver) => currentDriver.id != ownerID);
            setCurrentDrivers(newDrivers)
        }
    };


    return (
        <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">
            <div className={"mb-5"}>
                {car &&
                    <div>
                        <h3 className={"text-center"}>Car# {car.id}</h3>

                        <Form>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control required type="text" value={car.name}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="brand">
                                <Form.Label>Brand</Form.Label>
                                <Form.Control required type="text" value={car.brand}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="make">
                                <Form.Label>Model</Form.Label>
                                <Form.Control required type="text" value={car.make}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="year">
                                <Form.Label>Year</Form.Label>
                                <Form.Control required type="text" value={car.year}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="color">
                                <Form.Label>Color</Form.Label>
                                <Form.Control required type="text" value={car.color}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="year">
                                <Form.Label>Sponsor</Form.Label>
                                <Form.Control required type="text" value={car.sponsor}/>
                            </Form.Group>
                            <Button type="submit" className="btn-primary"> Update</Button>
                        </Form>
                    </div>
                }

                <h4 className="text-center">Drivers</h4>
                {
                    currentDrivers &&
                    <div>
                        <Table bordered hover className="mt-5">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Experience</th>
                                <th>Birth year</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                currentDrivers.map((currentDriver) =>
                                    <tr key={currentDriver.id}>
                                        <td>{currentDriver.id}</td>
                                        <td>{currentDriver.name}</td>
                                        <td>{currentDriver.gender}</td>
                                        <td>{currentDriver.experience}</td>
                                        <td>{currentDriver.birthYear}</td>
                                        <td><Button value={currentDriver.id} type="button" className="btn-danger float-end"
                                                    onClick={handleRemove}> Remove</Button></td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    </div>
                }



            </div>
        </Container>
    );
};

export default AdminCars;