import React, { useState, useEffect } from 'react';
import Routes from "../routes";
import Sidebar from "./Sidebar";
import { Navbar, Container } from 'react-bootstrap';
import CustomHeader from './CustomHeader';
import LoginForm from './auth/LoginForm';
import { Route, Switch } from 'react-router-dom';
import Settings from '../pages/Settings';
import DocStatusComponent from './DocStatusComponent';
import Glossary from '../pages/Glossary';
import { Client } from '@stomp/stompjs';

const Layout = (props) => {

    const styles = {
        contentDiv: {
            display: "flex",
        },
        contentMargin: {
            marginLeft: "10px",
            width: "85%",
        },
    };

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginWindowTitle,setLoginWindowTitle] = useState("User login");
    const [dataRefreshToken, setDataRefreshToken] = useState(0)

    const setAccessToken = (token) => {
        //TODO store the token in Http-only cookies
        localStorage.setItem('auth_token', token);
    }

    const onAccessDenied = () => {
        setIsAuthenticated(false);
        setLoginWindowTitle("Session expired - a new login required.")
    }

    const doLogout = () => {
        setIsAuthenticated(false);
        setLoginWindowTitle("User login")
    }
    

    useEffect(() => {
        console.log('Component did mount');
        // The compat mode syntax is totally different, converting to v5 syntax
        // Client is imported from '@stomp/stompjs'
        var client = new Client();

        client.configure({
            brokerURL: 'wss://documentation-dashboard.herokuapp.com/ws/stomp',
            onConnect: () => {
                console.log('onConnect');            

                client.subscribe('/ws/topic/update', message => {
                    //alert(message.body);
                    setDataRefreshToken(message.body);
                });
            },
            // Helps during debugging, remove in production
            debug: (str) => {
                console.log(new Date(), str);
            }
        });

        client.activate();

    });



    return (
        <div>
            <LoginForm show={!isAuthenticated} authstateupadte={setIsAuthenticated} loginWindowTitle={loginWindowTitle} onAccessTokenGranted={setAccessToken} ></LoginForm>
            <CustomHeader logoutAction={doLogout}/>
            <div style={{ display: "flex" }}>
                <Sidebar history={props.history} />
                <div style={styles.contentMargin}>

                    <Switch>
                        <Route path="/" exact render={() => <DocStatusComponent onAccessDenied={onAccessDenied} onDataRefresh={dataRefreshToken} loggedIn={isAuthenticated}/>} />
                        <Route path="/glossary" exact render={() => <Glossary />} />                        
                    </Switch>


                </div>
            </div>
        </div>
    );
}

export default Layout;
