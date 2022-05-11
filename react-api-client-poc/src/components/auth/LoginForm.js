import { Modal, Button, Form, Alert } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios';
const LoginForm = ({ show, authstateupadte, onAccessTokenGranted, loginWindowTitle }) => {


    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [errormsg, setErrorMsg] = useState("");
    const [showError,setShowError] = useState(false);

    const updateUser = (event) => {
        setUser(event.target.value);
    }

    const updatePassword = (event) => {
        setPassword(event.target.value);

    }

    const onCredentialsPassed = (u, p) => {

        const baseUrl = `${process.env.REACT_APP_API_URL_BASE}/auth/login`;

        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        axios.post(baseUrl, { 'username': u, 'password': p }, config).then(resp => {
            if (resp.data.hasOwnProperty('access_token')) {                
                onAccessTokenGranted(resp.data.access_token);
                authstateupadte(true);
            }
            else {
                setErrorMsg("Failed authentication.")
                setShowError(true)
            }
        }
        ).catch(function (error) {
            setErrorMsg("Authentication error:" + error);
            setShowError(true);            
            console.log(error);
        });


    }

    return (
        <>
            <Modal show={show} backdrop="static" keyboard={false}>

                <Modal.Header>
                    <Modal.Title>{loginWindowTitle}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>User name</Form.Label>
                            <Form.Control type="user" placeholder="Enter user name" value={user} onChange={updateUser} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={updatePassword} />
                        </Form.Group>

                        <Button variant="primary" onClick={() => onCredentialsPassed(user, password)} >
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Alert variant="danger" show={showError}  onClose={() => setShowError(false)} dismissible>                        
                        <p>
                            {errormsg}
                        </p>
                    </Alert>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default LoginForm