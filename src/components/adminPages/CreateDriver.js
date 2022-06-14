import React, {useRef, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import RaceFacade from "../../facades/RaceFacade";
import CarFacade from "../../facades/CarFacade";
import DriverFacade from "../../facades/DriverFacade";

const CreateDriver = () => {
    const initialState = {name: "", birthYear: "", experience: "", gender: "Male", userName:"", password:""};
    const [driver, setDriver] = useState(initialState);
    let isError = false;
    const errorAlertMsg = useRef(null);
    const successAlertMsg = useRef(null);
    const [errorMsg, setErrorMsg] = useState();



    const handleInput = (event) => {
        const target = event.target
        const id = target.id
        const value = target.value
        setDriver({...driver, [id]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createUser()

    }

    const createUser = () =>{
        DriverFacade.createDriver(driver).then(response => {
            if(response.code){
                isError = true;
                setErrorMsg(response.message)
                console.log(errorMsg)
                handleErrorAndSuccess()
            }else{
                handleErrorAndSuccess()
            }
        })
    }

    const handleErrorAndSuccess = () =>{
        if (isError){
            errorAlertMsg.current.style.display = 'block';
            setTimeout(function() {errorAlertMsg.current.style.display = 'none'},3000)
            isError = false;
        }else {
            setDriver(initialState);
            successAlertMsg.current.style.display = 'block';
            setTimeout(function() {successAlertMsg.current.style.display = 'none'},3000)
        }
    }

    return (
        <div>
            <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">
                <div className={"mb-5"}>
                    <h1>New driver</h1>
                    <Form onChange={handleInput} onSubmit={handleSubmit}>
                        <div ref={errorAlertMsg} className="alert alert-danger" style={{display:"none"}}>
                            <strong>{errorMsg}</strong>
                        </div>
                        <div ref={successAlertMsg} className="alert alert-success" style={{display:"none"}}>
                            <strong>Driver has been created</strong>
                        </div>
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
                            <Form.Label>Select gender</Form.Label>
                            <Form.Control
                                as="select"
                                value={driver.gender} >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Custom">Custom</option>
                            </Form.Control>
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