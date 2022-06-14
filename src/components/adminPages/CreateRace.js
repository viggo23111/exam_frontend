import React, {useRef, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import RaceFacade from "../../facades/RaceFacade";


const CreateRace = () => {
    const initialState = {name: "", location: "", startDate: "", duration: ""};
    const [race, setRace] = useState(initialState);
    const successAlertMsg = useRef(null);



    const handleInput = (event) => {
        const target = event.target
        const id = target.id
        const value = target.value
        setRace({...race, [id]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        RaceFacade.createRace(race)
        successAlertMsg.current.style.display = 'block';
        setTimeout(function() {successAlertMsg.current.style.display = 'none'},3000)
        setRace(initialState)
    }
    return (
        <div>
            <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">
                <div className={"mb-5"}>
                    <h1>New race</h1>
                    <Form onChange={handleInput} onSubmit={handleSubmit}>
                        <div ref={successAlertMsg} className="alert alert-success" style={{display:"none"}}>
                            <strong>Race has been created</strong>
                        </div>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required type="text" value={race.name} placeholder="Name"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="location">
                            <Form.Label>Location</Form.Label>
                            <Form.Control required type="text" value={race.location} placeholder="Location"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="startDate">
                            <Form.Label>Start date</Form.Label>
                            <Form.Control required type="date" value={race.startDate} placeholder="Date"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="duration">
                            <Form.Label>Duration in minutes</Form.Label>
                            <Form.Control required type="number" value={race.duration} placeholder="Duration"/>
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

export default CreateRace;