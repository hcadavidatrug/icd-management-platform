import {React, useState} from "react";
import PipelinesList from "./PipelinesList";
import PipelineErrorsList from "./PipelinesErrorList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PipelinesSection = ({ icdname, onAccessDenied }) => {

    const [selectedPipelineID,setSelectedPipelineID] = useState(null);

    return (
        <Container fluid>
            <Row>
                <Col sm={4}><PipelinesList icdname={icdname} onPipelineSelection={setSelectedPipelineID} onAccessDenied={onAccessDenied}/></Col>
                <Col sm={8}><PipelineErrorsList selectedPipeline={selectedPipelineID} icdname={icdname} onAccessDenied={onAccessDenied}/></Col>                
            </Row>
        </Container>
    );

}

export default PipelinesSection