import React, {useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import RaceFacade from "../../facades/RaceFacade";
import CarFacade from "../../facades/CarFacade";
import DriverFacade from "../../facades/DriverFacade";

const CreateDriver = () => {
    const initialState = {name: "", birthYear: "", experience: "", gender: "", userName:"", password:""};
    const [driver, setDriver] = useState(initialState);



    const handleInput = (event) => {
        const target = event.target
        const id = target.id
        const value = target.value
        setDriver({...driver, [id]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        DriverFacade.createDriver(driver)
        setDriver(initialState)
    }
    return (
        <div>
            <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">
                <div className={"mb-5"}>
                    <h1>New driver</h1>
                    <Form onChange={handleInput} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required type="text" value={driver.name} placeholder="Name"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="birthYear">
                            <Form.Label>Birth year</Form.Label>
                            <Form.Control required type="number" value={driver.birthYear} placeholder="Birth year"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="experience">
                            <Form.Label>Experience</Form.Label>
                            <Form.Control required type="text" value={driver.experience} placeholder="Experience"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="gender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control required type="text" value={driver.gender} placeholder="Gender"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="userName">
                            <Form.Label>Username</Form.Label>
                            <Form.Control required type="text" value={driver.userName} placeholder="Username"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" value={driver.password} placeholder="Password"/>
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

export default CreateDriver;