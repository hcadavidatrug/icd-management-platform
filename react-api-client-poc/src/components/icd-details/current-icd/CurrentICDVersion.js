import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Table } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons'



const CurrentICDVersion = ({ icdname, onAccessDenied }) => {

    const [documentDetails, setDocumentDetails] = useState(null);
    const [isPublishedVersionAvailable, setIsPublishedVersionAvailable] = useState(false);

    console.info(">>>> icdname " + icdname)

    useEffect(() => {        
        const baseUrl = `${process.env.REACT_APP_API_URL_BASE}/v1/icds/${icdname}/current`;


        const config = {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("auth_token"),
                'Content-Type': 'application/json'
            }
        };

        axios.get(baseUrl, config).then(
            resp => {
                setDocumentDetails(resp.data);
                setIsPublishedVersionAvailable(true);
            }
        ).catch(function (error) {

            if (error.response) {
                if (error.response.status == 401) {
                    onAccessDenied();
                }
                else if (error.response.status == 404) {
                    setIsPublishedVersionAvailable(false);
                    setDocumentDetails(null);
                }
            }

            //console.log(error);
        });

    }, [icdname]
    );

    if (isPublishedVersionAvailable) {
        
        return buildCurrentICDDescription(documentDetails);
        
    }
    else {
        return (
            <> <Icon.ExclamationTriangleFill color="red"/> There is no published version of the document. Only reports of failed builds are available. </>
        );
    }


}

const buildCurrentICDDescription = (docdetails) => {
    return (
            /**
     * "COMMIT_AUTHOR": "'John Connor'",
            "DEPLOYMENT_URL": "http://pages.url.com/project_one",
            "SOURCE_URL": "http://project_one.github.com",
            "CREATION_DATE": "2022-02-22T10:51:32Z",
            "PIPELINE_ID": "11111111",
            "COMMIT_TAG": "v1.0",
            "PROJECT_NAME": "document_three"
     */
        <Table responsive>
            
            <tbody>
                <tr>
                    <td>Document source code repository</td>
                    <td key="repo"><a href={docdetails.metadata['SOURCE_URL']} target="_blank" rel="noopener noreferrer">{docdetails.metadata['SOURCE_URL']}</a></td>                    
                </tr>
                <tr>
                    <td>Document official URL</td>
                    <td key="repo"><a href={docdetails.metadata['DEPLOYMENT_URL']} target="_blank" rel="noopener noreferrer">{docdetails.metadata['DEPLOYMENT_URL']}</a></td>                    
                </tr>
                <tr>
                    <td>Current version</td>
                    <td key="repo">{docdetails.metadata['COMMIT_TAG']}</td>                    
                </tr>
                <tr>
                    <td>Last update date</td>
                    <td key="repo">{docdetails.metadata['CREATION_DATE']}</td>                    
                </tr>

            </tbody>
        </Table>
    );
}

export default CurrentICDVersion;