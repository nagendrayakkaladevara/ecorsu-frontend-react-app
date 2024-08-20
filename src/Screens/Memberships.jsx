import React, { useState } from "react";
import data from '../MEMBERSHIP.json'
import Table from "../ReusableComponents/Table";
import DashboardScreen from "./DashboardScreen";


const MemberShip = () => {
    const [dashboard, setDashboard] = useState(false);
    const [loader, setLoader] = useState(false);
    const handleDashboard = () => {
        setDashboard((dashboard) => (!dashboard));
        setLoader(true);
        setTimeout(() => {
            setLoader(false)
        }, 2000);
    }
    return (
        <>
            {loader &&
                <div className="overlay">
                    <div className="loader"></div>
                </div>
            }

            <div>
                <p style={{ display: "flex", justifyContent: 'center' }}>MemberShip 2023</p>
                <button type="button" className="btn btn-outline-danger" onClick={handleDashboard} style={{ margin: "5px" }}>{dashboard ? 'Back' : 'Dashboard'}</button>
                {dashboard ? (<>
                    <DashboardScreen />
                </>) : (<>
                    <Table data={data} />
                </>)}

            </div>
        </>
    )
}
export default MemberShip;