import React from "react";
import axios from "axios";
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from 'react-bootstrap-table2-paginator';

const PipelinesList = ({ icdname, onPipelineSelection, onAccessDenied }) => {

    const [pipelinesList, setPipelinesList] = React.useState(null);



    React.useEffect(() => {
        const baseUrl = `${process.env.REACT_APP_API_URL_BASE}/v1/icds/${icdname}/failedpipelines`;

        const config = {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("auth_token"),
                'Content-Type': 'application/json'
            }
        };

        axios.get(baseUrl, config).then(
            resp => {
                setPipelinesList(resp.data);
                console.info("1. Got pipelines list:" + JSON.stringify(resp.data));
                console.info("2. Got pipelines list:" + JSON.stringify(pipelinesList));
            }
        ).catch(function (error) {

            if (error.response) {
                if (error.response.status == 401) {
                    onAccessDenied();
                }
            }

            console.log(error);
        });



    }, [icdname]
    );

    if (pipelinesList != null) {

        const columns = [
            {
                dataField: "versionTag",
                text: "Version",
                sort: true
            },
            {
                dataField: "pipelineid",
                text: "Pipeline",
                sort: true
            },
            {
                dataField: "buildDate",
                text: "Build date",
                sort: true
            },
            

        ];


        const selectRow = {
            mode: 'radio',
            clickToSelect: true,
            bgColor: '#00BFFF',
            onSelect: (row, isSelect, rowIndex, e) => {
                onPipelineSelection(row["pipelineid"]);
            }
        };

        const data = pipelinesList;
        
        console.info("Updating pipelines list:" + JSON.stringify(pipelinesList) + " from " + `${process.env.REACT_APP_API_URL_BASE}/v1/icds/${icdname}/failedpipelines`);
        //return (<div>Failed pipelines for {icdname}: {JSON.stringify(pipelinesList)}</div>);
        return (
            <div className="PipelinesList">
                <BootstrapTable
                    bootstrap4
                    keyField="pipelineid"
                    data={data}
                    columns={columns}
                    pagination={paginationFactory({ sizePerPage: 5 })}
                    selectRow={selectRow}
                />
            </div>
        );
    }
    else {
        return null;
    }
}

export default PipelinesList;