import React, {useState, useEffect} from "react"
import facade from "./apiFacade";
import {Button, Container, Form, Nav, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import {LinkContainer} from "react-router-bootstrap";
import FrontPage from "./components/FrontPage";
import {useNavigate} from 'react-router-dom';


function LogIn({login}) {
    const init = {username: "", password: ""};
    const [loginCredentials, setLoginCredentials] = useState(init);
    const performLogin = (evt) => {
        evt.preventDefault();
        login(loginCredentials.username, loginCredentials.password);
    }
    const onChange = (evt) => {
        setLoginCredentials({...loginCredentials, [evt.target.id]: evt.target.value})
    }

    return (
        // <Container style={{height: "calc(75vh - 60px)"}}>
        //     <div className={"d-flex align-items-center justify-content-center h-100 "}>
        //         <Form onChange={onChange} onSubmit={performLogin} style={{width:"30%"}} className={"mt-5 shadow-lg p-5 mb-5 bg-white rounded"} >
        //             <div className="text-center">
        //                 <h2>Login</h2>
        //             </div>
        //             <Form.Group className="mb-3" controlId="username">
        //                 <Form.Label >Email</Form.Label>
        //                 <Form.Control required type="text" placeholder="Username"/>
        //             </Form.Group>
        //
        //             <Form.Group className="mb-3" controlId="password">
        //                 <Form.Label>Password</Form.Label>
        //                 <Form.Control required type="password" placeholder="Password"/>
        //             </Form.Group>
        //             <Button variant="primary" type="submit" >
        //                 Login
        //             </Button>
        //         </Form>
        //     </div>
        // </Container>
        <div className="header">

            <div className="inner-header flex">
                <svg version="1.1" className="logo" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                     xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 500 500"
                     xmlSpace="preserve">
<path fill="#FFFFFF" stroke="#000000" stroke-width="10" stroke-miterlimit="10" d="M57,283"/>

</svg>
                <Container style={{height: "calc(75vh - 60px)"}}>
                    <div className={"d-flex align-items-center justify-content-center h-100 "}>
                        <Form onChange={onChange} onSubmit={performLogin} style={{width:"30%"}} className={"mt-5 shadow-lg p-5 mb-5 bg-white rounded"} >
                            <div className="text-center">
                                <h2>Login</h2>
                            </div>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label >Email</Form.Label>
                                <Form.Control required type="text" placeholder="Username"/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control required type="password" placeholder="Password"/>
                            </Form.Group>
                            <Button variant="primary" type="submit" >
                                Login
                            </Button>
                        </Form>
                    </div>
                </Container>
            </div>

            <div>
                <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                     viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                    <defs>
                        <path id="gentle-wave"
                              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
                    </defs>
                    <g className="parallax">
                        <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7"/>
                        <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)"/>
                        <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)"/>
                        <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff"/>
                    </g>
                </svg>
            </div>

        </div>


    )

}



function App() {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false)
    const [showLogin,setShowLogin] = useState(false)

    const logout = () => {
        facade.logout()
        setLoggedIn(false)
        navigate('/')
        setShowLogin(false);

    }
    const login = (user, pass) => {
        facade.login(user, pass)
            .then(res => setLoggedIn(true));
    }

    return (
        <div>
            {!showLogin &&
                <div>
                    <Navbar expand="lg" style={{backgroundColor:"white !important" }} className={"m-auto w-50"}>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto m-auto">
                                <LinkContainer to="/">
                                    <Nav.Link>Home</Nav.Link>
                                </LinkContainer>
                                <Button className="float-end" onClick={()=>setShowLogin(true)} >Login</Button>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <FrontPage/>
                </div>
            }
            {!loggedIn ? (showLogin && <LogIn login={login}/>) :
                (<div>
                    <Header logout={logout}/>
                </div>)}
        </div>
    )

}

export default App;