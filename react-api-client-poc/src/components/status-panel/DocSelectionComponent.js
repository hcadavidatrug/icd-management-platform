import React, { useState } from 'react';
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as Icon from 'react-bootstrap-icons'

//"temporary" work around to address <ToolKitProvider> component issues as discussed in https://github.com/react-bootstrap-table/react-bootstrap-table2/pull/1506
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min';
//import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const DocSelectionComponent = ({ onUpdateSelection, onAccessDenied, loggedIn, onDataRefresh }) => {

    const baseURL = `${process.env.REACT_APP_API_URL_BASE}/v1/icds`;

    const [icds, setICDs] = useState(null);

    const onICDSel = (icdname) => {
        onUpdateSelection(icdname);
    }

    const requestConfig = {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("auth_token"),
            'Content-Type': 'application/json'
        }
    };

    React.useEffect(() => {

        axios.get(baseURL, requestConfig).then(
            resp => {
                
                var formattedICDsStatuses=resp.data.map(
                    function(o){
                        return {
                            icdname:o.icdname,
                            status:o.status,
                            url:o.publishedDocDetails!=null?o.publishedDocDetails.metadata['DEPLOYMENT_URL']:"",
                            lastPublishedVersion:o.publishedDocDetails!=null?o.publishedDocDetails.metadata['COMMIT_TAG']:"",
                            lastFailedToPublishVersion:o.lastFailedToPublishVersion!=null?o.lastFailedToPublishVersion:""                    
                        }

                    }
                );
                
                setICDs(formattedICDsStatuses);
                //console.info("Got response:" + JSON.stringify(icds));
            }
        ).catch(function (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    onAccessDenied();
                }
            }

            console.log(error);


        });

        console.log(JSON.stringify(icds));
    }, [loggedIn, onDataRefresh]
    );

    function statusFormatter(cell, row){
        if (row.status==="UNPUBLISHED"){
            return (
                <span><Icon.ExclamationTriangleFill color="red"/> {cell}</span>
            )
        }
        else if (row.status==="DEPENDENCY_UPDATED"){
            return (
                <span><Icon.ExclamationTriangleFill color="orange"/> Published - (references updated)</span>
            )
        }
        else if (row.status==="PUBLISHED_FAILED_UPDATE"){
            return (
                <span><Icon.ExclamationTriangleFill color="orange"/> Published - (new version sumbission failed)</span>
            )
        }
        else{
            return <span><Icon.CheckSquareFill color="green"/>{cell}</span>
        }        
    }

    function urlFormatter(cell, row){        
        return <span><a href={cell} target="_blank" rel="noopener noreferrer">{cell}</a></span>
    }
    
    function icdnameFormatter(cell,row){
        if (row.status!="UNPUBLISHED"){
            var adocMacro = `docref:${cell}[version=${row.lastPublishedVersion}]`
            return <span><button title="Copy asciidoc reference macro." onClick={()=>navigator.clipboard.writeText(adocMacro)}><Icon.Clipboard color="black"/></button>  {cell}</span>
            //return <span>{cell} <button onClick={navigator.clipboard.writeText(adocMacro)}>Copy</button></span>
        }
        else{
            return <span>{cell}</span>
        }
        
    }

    if (icds != null) {

        const { SearchBar } = Search;

        const columns = [
            {
                dataField: "icdname",
                text: "Document name",
                sort: true,
                formatter: icdnameFormatter

            },
            {
                dataField: "status",
                text: "Status",
                sort: true,
                formatter: statusFormatter
            },
            {
                dataField: "lastPublishedVersion",
                text: "Last published version",
                sort: false
            },
            {
                dataField: "lastFailedToPublishVersion",
                text: "Last failed submission",
                sort: false
            },
            {
                dataField: "url",
                text: "URL",
                sort: false,
                formatter: urlFormatter
            }

        ];


        const selectRow = {
            mode: 'radio',
            clickToSelect: true,
            bgColor: '#00BFFF',
            onSelect: (row, isSelect, rowIndex, e) => {
                onICDSel(row["icdname"]);
            }
        };

        const data = icds;

        console.info("Returning component output with state:" + JSON.stringify(icds));

        return (
            <ToolkitProvider
                keyField="icdname"
                data={data}
                columns={columns}
                search={{ defaultSearch: '' }}
            >
                {
                    props => (
                        <div>
                            <div><hr /></div>
                            <h5>Select the document</h5>
                            <SearchBar {...props.searchProps} />
                            <hr />
                            <BootstrapTable
                                {...props.baseProps}
                                bootstrap4
                                selectRow={selectRow}
                                pagination={paginationFactory({ sizePerPage: 5 })}
                            />
                        </div>
                    )
                }
            </ToolkitProvider>
        );
        /*return(
            <div className="StatusPanel">
                <BootstrapTable
                    bootstrap4
                    keyField="icdname"
                    data={data}
                    columns={columns}
                    pagination={paginationFactory({ sizePerPage: 5 })}
                    selectRow={ selectRow }
                />
            </div>            
        );*/

    }
    else {
        return null;
    }



}


export default DocSelectionComponent