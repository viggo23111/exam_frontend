import {render} from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import apiFacade from "./facades/apiFacade";
import Admin2 from "./components/adminPages/CreateRace";
import Admin3 from "./components/adminPages/Admin3";
import User1 from "./components/User1";
import User2 from "./components/User2";
import User3 from "./components/User3";
import AdminCars from "./components/adminPages/AdminCars";
import './waves.css'
import AdminShowCar from "./components/adminPages/AdminShowCar";
import MyRaces from "./components/driverPages/myRaces";
import CreateRace from "./components/adminPages/CreateRace";
import CreateCar from "./components/adminPages/CreateCar";
import CreateDriver from "./components/adminPages/CreateDriver";
import AdminRaces from "./components/adminPages/AdminRaces";
import AdminShowRace from "./components/adminPages/AdminShowRace";

const rootElement = document.getElementById("root");
const loggedIn = apiFacade.loggedIn()

render(
    <BrowserRouter>
        <Routes>
            <Route exact="true" path="/" element={<App/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/races" element={<AdminRaces/>}/>
                <Route path="races/:raceID" element={<AdminShowRace/>}/>
                <Route path="/cars" element={<AdminCars/>}/>
                <Route path="cars/:carID" element={<AdminShowCar/>}/>
                <Route path="/createrace" element={<CreateRace/>}/>
                <Route path="/createcar" element={<CreateCar/>}/>
                <Route path="/createdriver" element={<CreateDriver/>}/>
                <Route path="/admin3" element={<Admin3/>}/>
                <Route path="/user1" element={<User1/>}/>
                <Route path="/user2" element={<User2/>}/>
                <Route path="/user3" element={<User3/>}/>
                <Route path="/myraces" element={<MyRaces/>}/>

            </Route>
            <Route
                path="*"
                element={
                    <main style={{padding: "1rem"}}>
                        <p>There's nothing here!</p>
                    </main>
                }
            />
        </Routes>
    </BrowserRouter>,
    rootElement
);