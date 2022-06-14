import React, {useEffect, useState} from 'react';
import {Button, Container, Form, Table} from "react-bootstrap";

import CarFacade from "../../facades/CarFacade";
import {Link, useParams} from "react-router-dom";
import RaceFacade from "../../facades/RaceFacade";
import DriverFacade from "../../facades/DriverFacade";


const AdminCar = () => {
    const parms = useParams();
    const [car, setCar] = useState()
    const [currentDrivers, setCurrentDrivers] = useState()
    const [drivers, setDrivers] = useState()
    const [newDriver, setNewDriver] = useState()

    useEffect(() => {
        DriverFacade.getDrivers().then(drivers => setDrivers(drivers));
    }, [])

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
        const driverID = e.target.value;
        CarFacade.removeDriverFromCar(car.id, driverID)
        if (currentDrivers) {
            const newDrivers = currentDrivers.filter((currentDriver) => currentDriver.id != driverID);
            setCurrentDrivers(newDrivers)
        }
    };

    function handleChangeDriver(event) {
        const target = event.target
        const value = target.value
        let selectedDriver = drivers.find(driver => driver.id === Number(value))
        setNewDriver(selectedDriver);
    }

    function handleAddDriverSubmit(e) {
        e.preventDefault()
        CarFacade.addDriverToCar(car.id,newDriver.id)
        setCurrentDrivers([...currentDrivers, newDriver])
    }

    const handleInput = (event) => {
        const target = event.target
        const id = target.id
        const value = target.value
        setCar({...car, [id]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        CarFacade.updateCar(car)
    }



    return (
        <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">
            <div className={"mb-5"}>
                {car &&
                    <div>
                        <h3 className={"text-center"}>Car# {car.id}</h3>

                        <Form onChange={handleInput} onSubmit={handleSubmit}>
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
                                <Form.Control required type="number" value={car.year}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="color">
                                <Form.Label>Color</Form.Label>
                                <Form.Control required type="text" value={car.color}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="sponsor">
                                <Form.Label>Sponsor</Form.Label>
                                <Form.Control required type="text" value={car.sponsor}/>
                            </Form.Group>
                            <Button type="submit" className="btn-primary"> Update</Button>
                        </Form>
                    </div>
                }

                <h4 className="text-center">Drivers</h4>
                {drivers &&
                    <div>
                        <h5>Add Driver</h5>
                        <Form onChange={handleChangeDriver} onSubmit={handleAddDriverSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Select id="carID">
                                    <option value={""} selected disabled hidden>Select driver</option>
                                    {
                                        drivers.map((driver) => {
                                                return <option key={driver.id}
                                                               value={driver.id}>{driver.id} - {driver.name} - {driver.gender} - {driver.birthYear}  </option>
                                            }
                                        )}
                                </Form.Select>
                            </Form.Group>
                            <Button type="submit" className="btn-primary"> Add</Button>
                        </Form>
                    </div>
                }
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
                                        <td><Link
                                            style={{display: "block", margin: "0"}}
                                            to={`/drivers/${currentDriver.id}`}
                                            key={currentDriver.id}
                                        >
                                            info
                                        </Link></td>
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

export default AdminCar;