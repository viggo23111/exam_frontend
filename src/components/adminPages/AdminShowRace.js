import React, {useEffect, useState} from 'react';
import {Button, Container, Form, Modal, Table} from "react-bootstrap";

import CarFacade from "../../facades/CarFacade";
import {Link, useParams} from "react-router-dom";
import RaceFacade from "../../facades/RaceFacade";
import DriverFacade from "../../facades/DriverFacade";
import {Routes, Route, useNavigate} from 'react-router-dom';

const AdminCars = () => {
    const navigate = useNavigate();
    const parms = useParams();
    const [race, setRace] = useState()
    const [currentCars, setCurrentCars] = useState()
    const [cars, setCars] = useState()
    const [newCar, setNewCar] = useState()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        RaceFacade.getRaceByID(parms.raceID)
            .then(race => setRace(race))
            .catch((error) => {
                alert(error.status)
                console.log("error")
            })

    }, [setRace]);

    useEffect(() => {
        RaceFacade.getCarsByRaceID(parms.raceID)
            .then(currentCars=> setCurrentCars(currentCars))
            .catch((error) => {
                alert(error.status)
                console.log("error")
            })

    }, [setCurrentCars]);

    useEffect(() => {
        CarFacade.getCars().then(cars => setCars(cars));
    }, [])



    const handleRemove = (e) => {
        const carID = e.target.value;
        RaceFacade.removeCarFromRace(race.id, carID)
        if (currentCars) {
            const newCars = currentCars.filter((currentCar) => currentCar.id != carID);
            setCurrentCars(newCars)
        }
    };

    const handleInput = (event) => {
        const target = event.target
        const id = target.id
        const value = target.value
        setRace({...race, [id]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        RaceFacade.updateRace(race)
    }

    function handleChangeCars(event) {
        const target = event.target
        const value = target.value
        let selectedCar = cars.find(car => car.id === Number(value))
        setNewCar(selectedCar);
    }

    function handleAddCarSubmit(e) {
        e.preventDefault()
        RaceFacade.addCarToRace(race.id,newCar.id)
        setCurrentCars([...currentCars, newCar])
    }
    function deleteRace(e){
        e.preventDefault()
        RaceFacade.deleteRace(race.id)
        navigate('/');

    }


    return (
        <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">
            <div className={"mb-5"}>
                {race &&
                    <div>
                        <h3 className={"text-center"}>Race# {race.id}</h3>

                        <Form onChange={handleInput} onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control required type="text" value={race.name}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="location">
                                <Form.Label>Location</Form.Label>
                                <Form.Control required type="text" value={race.location}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="duration">
                                <Form.Label>Duration in minutes</Form.Label>
                                <Form.Control required type="text" value={race.duration}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="startDate">
                                <Form.Label>Start date</Form.Label>
                                <Form.Control required type="text" value={race.startDate}/>
                            </Form.Group>

                            <Button type="submit" className="btn-primary me-3">Update</Button>
                            <Button type="button" className="btn-danger" onClick={handleShow}> Delete</Button>

                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Delete race: {race.name}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Are your sure that you want to delete?</Modal.Body>
                                <Modal.Footer>
                                    <Button type="button" className="btn-secondary" onClick={handleClose}>
                                        Cancel
                                    </Button>
                                    <Button type="button" className="btn-danger" onClick={deleteRace}>
                                        Delete
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </Form>
                    </div>
                }

                <h4 className="text-center">Cars</h4>

                {cars &&
                    <div>
                        <h5>Add Car</h5>
                        <Form onChange={handleChangeCars} onSubmit={handleAddCarSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Select id="carID">
                                    <option value={""} selected disabled hidden>Select car</option>
                                    {
                                        cars.map((car) => {
                                                return <option key={car.id}
                                                               value={car.id}>{car.id} - {car.name} - {car.brand} - {car.make} - {car.year}  </option>
                                            }
                                        )}
                                </Form.Select>
                            </Form.Group>
                            <Button type="submit" className="btn-primary"> Add</Button>
                        </Form>
                    </div>
                }
                {
                    currentCars &&
                    <div>
                        <Table bordered hover className="mt-5">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Brand</th>
                                <th>Model</th>
                                <th>Year</th>
                                <th>Color</th>
                                <th>Sponsor</th>

                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                currentCars.map((currentCar) =>
                                    <tr key={currentCar.id}>
                                        <td>{currentCar.id}</td>
                                        <td>{currentCar.name}</td>
                                        <td>{currentCar.brand}</td>
                                        <td>{currentCar.make}</td>
                                        <td>{currentCar.year}</td>
                                        <td>{currentCar.color}</td>
                                        <td>{currentCar.sponsor}</td>
                                        <td><Link
                                            style={{display: "block", margin: "0"}}
                                            to={`/cars/${currentCar.id}`}
                                            key={currentCar.id}
                                        >
                                            info
                                        </Link></td>

                                        <td><Button value={currentCar.id} type="button" className="btn-danger float-end"
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