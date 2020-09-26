import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Radar from './chart/chart';


function Results() {
    return (
        <div>
            <Container>
                <Row className="justify-content-center">
                    <h3 >Coverage Of Issues</h3>
                </Row>
                <Row>
                    <Col>
                        <Button variant="light">Back</Button>
                    </Col>
                    <Col>
                        <div className="text-right"><Button variant="primary">Next</Button></div>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Radar />
                </Row>
                <div id="coverage-content">
                    <p>
                        really informative and educational information is what this is.<br />
                        really informative and educational information is what this is.<br />
                        really informative and educational information is what this is.<br />
                        really informative and educational information is what this is.<br />
                        really informative and educational information is what this is.<br />
                        really informative and educational information is what this is.<br />
                        really informative and educational information is what this is.<br />
                        really informative and educational information is what this is.<br />
                        really informative and educational information is what this is.<br />
                        really informative and educational information is what this is.<br />
                        really informative and educational information is what this is.<br />
                        really informative and educational information is what this is.<br />
                    </p>
                </div>
            </Container>
        </div>
    );
}


export default Results;
