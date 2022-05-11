import React, { useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as Icon from 'react-bootstrap-icons'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min';

const Glossary = () => {

    const { SearchBar } = Search;

    var acronyms = [{name:"AIPS", context:"LOFAR", desc:"Astronomical Information Processing System or classical AIPS"},
    {name:"AIPS++", context:"LOFAR", desc:"The AIPS++ project was a project from the nineties supposed to replace the original Astronomical Information Processing System or classical AIPS. The ++ comes from it being mainly developed in C++. It’s also known as AIPS 2. It evolved into CASA, Casacore and Casarest (see those entries)."},
    {name:"APERTIF", context:"LOFAR", desc:"APERture Tile In Focus, Aperture Array receiver in the focal plane of the WSRT"},
    {name:"ARTEMIS", context:"LOFAR", desc:"Advanced Radio Transient Event Monitor and Identification System, GPU system applied at Nancay and Chilbolton International stations"},
    {name:"ARTS", context:"LOFAR", desc:"APERTIF Radio Transient System, Transient system attached to APERTIF"},
    {name:"ASTRON", context:"LOFAR", desc:"Netherlands Institute for Radio Astronomy"},
    {name:"CASA", context:"LOFAR", desc:"The Common Astronomy Software Applications package. User software for radioastronomy devel- oped out of the old AIPS++ project. The project is led by NRAO with contributions from ESO, CSIRO/ATNF, NAOJ and ASTRON."},
    {name:"Casarest", context:"LOFAR", desc:"The libraries and tools from the old AIPS++ project that are not part of Casacore or CASA but still in use."},
    {name:"CIT", context:"LOFAR", desc:"Centrum voor Informatie Techonolgy van de Rijksuniversiteit Groningen"},
    {name:"COBALT", context:"LOFAR", desc:"COrrelator and Beamforming Application platform for the Lofar Telescope"},
    {name:"COBALT2.0", context:"LOFAR", desc:"Successor to COBALT"},
    {name:"DAWN", context:"LOFAR", desc:"EoR KSP Computing cluster"},
    {name:"DDT", context:"LOFAR", desc:"Director Discretionary Time"},
    {name:"DUPLLO", context:"LOFAR", desc:"Digital Upgrade for Premier LOFAR Low-band Observing. Project to upgrade the Dutch LOFAR stations, including the central clock."},
    {name:"EoR", context:"LOFAR", desc:"Epoch of Reionization"},
    {name:"ILT", context:"LOFAR", desc:"International Lofar Telescope consortium"},
    {name:"INAF", context:"LOFAR", desc:"Instituto Nazionale di Astrofisica"},
    {name:"KSP", context:"LOFAR", desc:"Key Science Program"},
    {name:"LOFAR", context:"LOFAR", desc:"The LOw Frequency ARray. LOFAR is a multipurpose sensor array; its main application is astronomy at low radio frequencies, but it also has geophysical and agricultural applications."},
    {name:"LOFAR1", context:"LOFAR", desc:"LOFAR as it was built between 2009 and 2019"},
    {name:"LOFAR4SW", context:"LOFAR", desc:"LOFAR for Space Weather project"}]


    function acronymFormatter(cell,row){

            var adocMacro = `acr:${cell}[context=${row.context}]`
            var hint = `Copy asciidoc macro to clipboard: ${adocMacro}`
            return <span><button title={hint} onClick={()=>navigator.clipboard.writeText(adocMacro)}><Icon.Clipboard color="black"/></button>{cell}</span>
            
    }

    const columns = [
        {
            dataField: "name",
            text: "Acronym",
            sort: true,
            formatter: acronymFormatter
        },
        {
            dataField: "context",
            text: "Context",
            sort: false,
        },       
        {
            dataField: "desc",
            text: "Description",
            sort: false,
        }        

    ];


    return (

        <ToolkitProvider
                keyField="icdname"
                data={acronyms}
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
                                pagination={paginationFactory({ sizePerPage: 5 })}
                            />
                        </div>
                    )
                }
        </ToolkitProvider>

    );

};

export default Glossary;
