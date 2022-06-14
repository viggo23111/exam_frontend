import React, {useRef, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import RaceFacade from "../../facades/RaceFacade";
import CarFacade from "../../facades/CarFacade";


const CreateCar = () => {
    const initialState = {name: "", brand: "", make: "", year: "", color:"", sponsor:"" ,image:""};
    const [car, setCar] = useState(initialState);
    const successAlertMsg = useRef(null);


    const handleInput = (event) => {
        const target = event.target
        const id = target.id
        const value = target.value
        setCar({...car, [id]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(CarFacade.createCar(car));
        setCar(initialState)
        successAlertMsg.current.style.display = 'block';
        setTimeout(function() {successAlertMsg.current.style.display = 'none'},3000)
    }
    return (
        <div>
            <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">
                <div className={"mb-5"}>
                    <h1>New car</h1>

                    <Form onChange={handleInput} onSubmit={handleSubmit}>
                        <div ref={successAlertMsg} className="alert alert-success" style={{display:"none"}}>
                            <strong>Car has been created</strong>
                        </div>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required type="text" value={car.name} placeholder="Name"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="brand">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control required type="text" value={car.brand} placeholder="Brand"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="make">
                            <Form.Label>Model</Form.Label>
                            <Form.Control required type="text" value={car.make} placeholder="Model"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="year">
                            <Form.Label>Year</Form.Label>
                            <Form.Control required type="number" value={car.year} placeholder="year"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="color">
                            <Form.Label>Color</Form.Label>
                            <Form.Control required type="text" value={car.color} placeholder="Color"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="sponsor">
                            <Form.Label>Sponsor</Form.Label>
                            <Form.Control required type="text" value={car.sponsor} placeholder="Sponsor"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="image">
                            <Form.Label>Image url</Form.Label>
                            <Form.Control required type="text" value={car.image} placeholder="Image"/>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Create
                        </Button>
                    </Form>
                </div>
            </Container>
        </div>
    );
};

export default CreateCar;