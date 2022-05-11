import { Image, ScrollView, Text } from 'react-native';
import { React, useEffect, useState } from "react";
import axios from "axios";
import { Container,Row } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';


const PipelineErrorsList = ({ selectedPipeline, icdname, onAccessDenied }) => {

    const [pipelineDocErrors, setPipelineDocErrors] = useState([]);
    console.info(">>>> pipeline "+selectedPipeline)
    console.info(">>>> icdname "+icdname)


    useEffect(() => {
        if (selectedPipeline!=null && icdname!=null){
            const baseUrl = `${process.env.REACT_APP_API_URL_BASE}/v1/icds/${icdname}/${selectedPipeline}/errors`;

            const config = {
                headers:{
                  'Authorization': "Bearer "+localStorage.getItem("auth_token"),
                  'Content-Type': 'application/json'
                }
              };
    
            axios.get(baseUrl,config).then(
                resp => {
                    setPipelineDocErrors(resp.data);
                    console.info("1. Got pipeline errors:" + JSON.stringify(resp.data));
                }
            ).catch(function (error) {
    
                if (error.response) {
                    if (error.response.status == 401) {
                        onAccessDenied();
                    }
                    else if (error.response.status == 404){
                        //Document with no errors reported
                        setPipelineDocErrors([]);
                    }
                }
    
                console.log(error);
            });
        }
        

    }, [selectedPipeline, icdname]
    );

    if (pipelineDocErrors.length > 0) {

        //the API returns an array with an element for each document with errors
        
        var errorDescRows = [];

        for (var i=0;i<pipelineDocErrors.length;i++){
            for (var j=0;j<pipelineDocErrors[i].errors.length;j++){
                errorDescRows.push(<Alert key={j+'e'+i} variant='danger' >{pipelineDocErrors[i].errors[j]}</Alert>);
            }            
            for (var j=0;j<pipelineDocErrors[i].failedQualityGates.length;j++){
                errorDescRows.push(<Alert key={j+'q'+i} variant='warning' >{pipelineDocErrors[i].failedQualityGates[j]}</Alert>);
            }                        
        }


        const output = (
            <>{errorDescRows}
            </>
        )

        return (
            <div>{output}</div>

                    //<li><Text style={{ fontSize: 14 }}>Selected pipeline:{selectedPipeline} of ICD {icdname}</Text></li>
                    //<b> errors:{pipelineDocErrors[0].errors}</b>
                
            //</div>
        );
    }
    else {
        return null;
    }



}

export default PipelineErrorsList;