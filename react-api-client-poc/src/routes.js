import React, { useState } from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Layout from "./components/Layout";
import DocStatusComponent from "./components/DocStatusComponent";

const Routes = () => {


    return (
        <BrowserRouter>
            <Route render={(props)=>(
                <Layout {...props}>
                    
                </Layout>
            )}/>
        </BrowserRouter>
    )
}

export default Routes;
