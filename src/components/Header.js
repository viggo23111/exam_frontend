import React from 'react';
import {Link, Outlet} from "react-router-dom";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';

const Header = ({logout}) => {
    const userType = localStorage.getItem("userType");
    let isAdmin = false;
    let isUser = false;
    let isDriver = false;

    if(userType === "admin"){
        isAdmin = true;
    }
    if(userType === "user"){
        isUser = true;
    }
    if(userType === "driver"){
        isDriver = true;
    }


    return (
        <div>
            <Navbar expand="lg" style={{backgroundColor:"white !important" }} className={"m-auto w-50"}>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto m-auto">
                        {
                            isAdmin &&
                            <LinkContainer to="/">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                        }
                        {
                            isAdmin &&

                            <LinkContainer to="/races">
                                <Nav.Link>Races</Nav.Link>
                            </LinkContainer>

                        }
                        {
                            isAdmin &&

                            <LinkContainer to="/cars">
                                <Nav.Link>Cars</Nav.Link>
                            </LinkContainer>

                        }
                        {
                            isAdmin &&
                            <LinkContainer to="/createrace">
                                <Nav.Link>Create race</Nav.Link>
                            </LinkContainer>
                        }
                        {
                            isAdmin &&
                            <LinkContainer to="/createcar">
                                <Nav.Link>Create car</Nav.Link>
                            </LinkContainer>
                        }
                        {
                            isAdmin &&
                            <LinkContainer to="/createdriver">
                                <Nav.Link>Create driver</Nav.Link>
                            </LinkContainer>
                        }


                        {
                            isUser &&

                            <LinkContainer to="/">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>

                        }
                        {
                            isUser &&

                            <LinkContainer to="/user1">
                                <Nav.Link>user1</Nav.Link>
                            </LinkContainer>

                        }
                        {
                            isUser &&

                            <LinkContainer to="/user2">
                                <Nav.Link>user2</Nav.Link>
                            </LinkContainer>

                        }
                        {
                            isUser &&

                            <LinkContainer to="/user3">
                                <Nav.Link>user3</Nav.Link>
                            </LinkContainer>

                        }

                        {
                            isDriver &&

                            <LinkContainer to="/">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>

                        }
                        {
                            isDriver &&

                            <LinkContainer to="/myraces">
                                <Nav.Link>My races</Nav.Link>
                            </LinkContainer>

                        }
                        <Button className="float-end" onClick={logout}>Log out</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Outlet/>
        </div>
    );
};

export default Header;