import React, {useEffect, useRef, useState} from 'react';
import {Button, Container, Form, Table} from "react-bootstrap";

import CarFacade from "../../facades/CarFacade";
import {Link, useParams} from "react-router-dom";
import RaceFacade from "../../facades/RaceFacade";
import DriverFacade from "../../facades/DriverFacade";



const AdminCar = () => {
    const parms = useParams();
    const [driver, setDriver] = useState()
    const successAlertMsg = useRef(null);


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
        successAlertMsg.current.style.display = 'block';
        setTimeout(function() {successAlertMsg.current.style.display = 'none'},3000)
    }


    return (
        <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">
            <div className={"mb-5"}>
                {driver &&
                    <div>
                        <h3 className={"text-center"}>Driver# {driver.id}</h3>

                        <Form onChange={handleInput} onSubmit={handleSubmit}>
                            <div ref={successAlertMsg} className="alert alert-success" style={{display:"none"}}>
                                <strong>Driver have been updated</strong>
                            </div>
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
                                <Form.Label>Select gender</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={driver.gender} >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Custom">Custom</option>
                                </Form.Control>
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