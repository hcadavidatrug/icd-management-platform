import { React, useState } from "react"
import CurrentICDVersion from "./current-icd/CurrentICDVersion";
import PipelinesSection from "./failed-pipelines/PipelinesSection";
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card"
import Navbar from "react-bootstrap/Navbar"
import ReferencedDocuments from "./current-icd/ReferencedDocuments";

const ICDDetails = ({ icdname , onAccessDenied}) => {

    const [key, setKey] = useState('current');

    if (icdname != null) {
       
                    /*
                    <Tab eventKey="references" title="Referenced documents">
                        <ReferencedDocuments icdname={icdname} onAccessDenied={onAccessDenied} />
                    </Tab>*/

        return (
            <>

                <Navbar bg="light" variant="light">
                        <Navbar.Brand>Selected document: {icdname}</Navbar.Brand>
                </Navbar>

                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                >
                    <Tab eventKey="current" title="Currently published">
                        <CurrentICDVersion icdname={icdname} onAccessDenied={onAccessDenied} />
                    </Tab>                    

                    <Tab eventKey="failed" title="Failed ICD builds">
                        <PipelinesSection icdname={icdname} onAccessDenied={onAccessDenied}/>
                    </Tab>

                </Tabs>
            </>

        );

    }
    else {
        return null;
    }


}

export default ICDDetails