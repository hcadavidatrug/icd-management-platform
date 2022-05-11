import React, { useState, useEffect } from "react";
import DocSelectionComponent from "./status-panel/DocSelectionComponent";
import ICDDetails from "./icd-details/ICDDetails";


const DocStatusComponent = ({ onAccessDenied,onDataRefresh,loggedIn }) => {

    const [selectedICD, setSelectedICD] = useState(null)

    
    return (
        <div>
            <DocSelectionComponent onUpdateSelection={setSelectedICD} onAccessDenied={onAccessDenied} loggedIn={loggedIn} onDataRefresh={onDataRefresh} />
            <ICDDetails icdname={selectedICD} onAccessDenied={onAccessDenied} loggedIn={loggedIn} />
        </div>
    );


}


export default DocStatusComponent