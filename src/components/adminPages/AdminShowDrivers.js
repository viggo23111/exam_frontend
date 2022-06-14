import React, {useEffect, useState} from 'react';
import {Button, Container, Form, Table} from "react-bootstrap";

import CarFacade from "../../facades/CarFacade";
import {Link, useParams} from "react-router-dom";
import RaceFacade from "../../facades/RaceFacade";
import DriverFacade from "../../facades/DriverFacade";


const AdminShowDrivers = () => {
    const parms = useParams();
    const [drivers, setDrivers] = useState()

    useEffect(() => {
        DriverFacade.getDrivers().then(drivers => setDrivers(drivers));
    }, [])

    return (
        <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">
            <div className={"mb-5"}>
                <h4 className="text-center">Drivers</h4>
                {drivers &&
                    <div>
                        <Table bordered hover className="mt-5">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Birth year</th>
                                <th>Gender</th>
                                <th>Experience</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                drivers.map((driver) =>
                                    <tr key={driver.id}>
                                        <td>{driver.id}</td>
                                        <td>{driver.name}</td>
                                        <td>{driver.birthYear}</td>
                                        <td>{driver.gender}</td>
                                        <td>{driver.experience}</td>
                                        <td><Link
                                            style={{display: "block", margin: "0"}}
                                            to={`/drivers/${driver.id}`}
                                            key={driver.id}
                                        >
                                            info
                                        </Link></td>
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

export default AdminShowDrivers;