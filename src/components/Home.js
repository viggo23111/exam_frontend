import React, {useEffect, useState} from 'react';

import {Container} from "react-bootstrap";
import HomeAdmin from "./adminPages/HomeAdmin";
import HomeUser from "./HomeUser";
import HomeDriver from "./driverPages/HomeDriver";

const Home = () => {

    return (
        <Container>
            { localStorage.getItem("userType")=== "admin" &&
                <HomeAdmin/>
            }
            { localStorage.getItem("userType")=== "user" &&
                <HomeUser/>
            }
            { localStorage.getItem("userType")=== "driver" &&
                <HomeDriver/>
            }

        </Container>
    );
};

export default Home;
