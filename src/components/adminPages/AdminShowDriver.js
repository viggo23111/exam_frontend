import React, {useEffect, useState} from 'react';
import {Button, Container, Form, Table} from "react-bootstrap";

import CarFacade from "../../facades/CarFacade";
import {Link, useParams} from "react-router-dom";
import RaceFacade from "../../facades/RaceFacade";
import DriverFacade from "../../facades/DriverFacade";


const AdminCar = () => {
    const parms = useParams();
    const [driver, setDriver] = useState()

    useEffect(() => {
        DriverFacade.getDriverByID(parms.driverID)
            .then(driver => setDriver(driver))
            .catch((error) => {
                alert(error.status)
                console.log("error")
            })

    }, [setDriver]);

    const handleInput = (event) => {
        const target = event.target
        const id = target.id
        const value = target.value
        setDriver({...driver, [id]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        DriverFacade.updateDriver(driver)
    }


    return (
        <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">
            <div className={"mb-5"}>
                {driver &&
                    <div>
                        <h3 className={"text-center"}>Driver# {driver.id}</h3>

                        <Form onChange={handleInput} onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control required type="text" value={driver.name}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="birthYear">
                                <Form.Label>Birth year</Form.Label>
                                <Form.Control required type="number" value={driver.birthYear}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="gender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Control required type="text" value={driver.gender}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="experience">
                                <Form.Label>Experience</Form.Label>
                                <Form.Control required type="text" value={driver.experience}/>
                            </Form.Group>
                            <Button type="submit" className="btn-primary"> Update</Button>
                        </Form>
                    </div>
                }
            </div>
        </Container>
    );
};

export default AdminCar;