import React, { useState } from "react";
import SimpleBarChart from "../ReusableComponents/Chart";
import MemberShipData from '../MEMBERSHIP.json'

const DashboardScreen = () => {
    const [selectedOption, setSelectedOption] = useState('STATIONCount');
    const [DESIGNATIONselectedOption, setDESIGNATIONselectedOption] = useState('DESIGNATIONCount');
    const [BILLUNITselectedOption, setBILLUNITselectedOption] = useState('BILLUNITCount');


    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleDESIGNATIONOptionChange = (event) => {
        setDESIGNATIONselectedOption(event.target.value);
    };

    const handleBILLUNITOptionChange = (event) => {
        setBILLUNITselectedOption(event.target.value);
    };

    const totalAmount = MemberShipData.reduce((acc, curr) => acc + curr.AMT, 0);

    const stationCounts = {};

    MemberShipData.forEach(entry => {
        const station = entry.STATION.trim();
        stationCounts[station] = (stationCounts[station] || 0) + 1;
    });

    const formattedResultSTATIONVsCount = Object.entries(stationCounts).map(([name, count]) => ({ name, count }));

    const stationAMTSums = {};
    MemberShipData.forEach(entry => {
        const station = entry.STATION.trim();
        stationAMTSums[station] = (stationAMTSums[station] || 0) + entry.AMT;
    });

    const formattedResultSTATIONAMT = Object.entries(stationAMTSums).map(([name, amount]) => ({ name, amount }));

    // ------------------------------------------
    const DESIGNATIONCounts = {};
    const DESIGNATIONAMTSums = {};
    MemberShipData.forEach(entry => {
        const DESIGNATION = entry.DESIGNATION.trim();
        DESIGNATIONCounts[DESIGNATION] = (DESIGNATIONCounts[DESIGNATION] || 0) + 1;
        DESIGNATIONAMTSums[DESIGNATION] = (DESIGNATIONAMTSums[DESIGNATION] || 0) + entry.AMT;
    });

    const formattedResultDESIGNATIONVsCount = Object.entries(DESIGNATIONCounts).map(([name, count]) => ({ name, count }));

    const formattedResultDESIGNATIONAMT = Object.entries(DESIGNATIONAMTSums).map(([name, amount]) => ({ name, amount }));

    console.log(formattedResultDESIGNATIONAMT, "formattedResultDESIGNATIONAMT");
    // ------------------------------------------

    const BILLUNITCounts = {};
    const BILLUNITAMTSums = {};
    MemberShipData.forEach(entry => {
        const BILLUNIT = entry.BILLUNIT.trim();
        BILLUNITCounts[BILLUNIT] = (BILLUNITCounts[BILLUNIT] || 0) + 1;
        BILLUNITAMTSums[BILLUNIT] = (BILLUNITAMTSums[BILLUNIT] || 0) + entry.AMT;

    });

    const formattedResultBILLUNITVsCount = Object.entries(BILLUNITCounts).map(([name, count]) => ({ name, count }));
    const formattedResultBILLUNITAMT = Object.entries(BILLUNITAMTSums).map(([name, amount]) => ({ name, amount }));

    return (
        <>
            <div style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px", display: "flex", margin: "10px", padding: '10px' }}>
                <p >Total Amount: &#8377;{totalAmount}/-</p>
            </div>
            <div style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px", display: "flex", margin: "10px", padding: '10px' }}>
                <p >Total Members: {MemberShipData.length}</p>
            </div>
            <div style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px", margin: '10px', padding: "5px", paddingTop: "15px" }}>
                <div style={{ display: "flex", justifyContent: 'space-around',alignItems:"center",fontSize: "12px" }}>

                    <input
                        type="radio"
                        value="STATIONCount"
                        checked={selectedOption === 'STATIONCount'}
                        onChange={handleOptionChange}
                    />
                    <p>STATION Vs Count</p>

                    <input
                        type="radio"
                        value="STATIONAmount"
                        checked={selectedOption === 'STATIONAmount'}
                        onChange={handleOptionChange}
                    />
                    <p >STATION Vs Amount</p>

                </div>
                <hr />
                <p style={{ display: "flex", justifyContent: 'center' }}>STATION Vs {(selectedOption === 'STATIONCount' ? 'Count' : 'Amount')}</p>

                <SimpleBarChart formattedResult={(selectedOption === 'STATIONCount' ? formattedResultSTATIONVsCount : formattedResultSTATIONAMT)} color={"#FC6736"} XaxisKey={(selectedOption === 'STATIONCount' ? 'count' : 'amount')} />
            </div>
            <div style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px", margin: '10px', padding: "5px", paddingTop: "15px" }}>
                <div style={{ display: "flex", justifyContent: 'space-around',alignItems:"center", fontSize: "12px" }}>

                    <input
                        type="radio"
                        value="DESIGNATIONCount"
                        checked={DESIGNATIONselectedOption === 'DESIGNATIONCount'}
                        onChange={handleDESIGNATIONOptionChange}
                    />
                    <p>DESIGNATION Vs Count</p>

                    <input
                        type="radio"
                        value="DESIGNATIONAmount"
                        checked={DESIGNATIONselectedOption === 'DESIGNATIONAmount'}
                        onChange={handleDESIGNATIONOptionChange}
                    />
                    <p >DESIGNATION Vs Amount</p>

                </div>
                <hr />
                <p style={{ display: "flex", justifyContent: 'center' }}>DESIGNATION Vs {(DESIGNATIONselectedOption === 'DESIGNATIONCount' ? 'Count' : 'Amount')}</p>

                <SimpleBarChart formattedResult={(DESIGNATIONselectedOption === 'DESIGNATIONCount' ? formattedResultDESIGNATIONVsCount : formattedResultDESIGNATIONAMT)} XaxisKey={(DESIGNATIONselectedOption === 'DESIGNATIONCount' ? 'count' : 'amount')} color={'#000000'} />
            </div>
            <div style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px", margin: '10px', padding: "5px", paddingTop: "15px" }}>
                <div style={{ display: "flex", justifyContent: 'space-around',alignItems:"center", fontSize: "12px" }}>

                    <input
                        type="radio"
                        value="BILLUNITCount"
                        checked={BILLUNITselectedOption === 'BILLUNITCount'}
                        onChange={handleBILLUNITOptionChange}
                    />
                    <p>BILLUNIT Vs Count</p>

                    <input
                        type="radio"
                        value="BILLUNITAmount"
                        checked={BILLUNITselectedOption === 'BILLUNITAmount'}
                        onChange={handleBILLUNITOptionChange}
                    />
                    <p >BILLUNIT Vs Amount</p>

                </div>
                <hr />
                <p style={{ display: "flex", justifyContent: 'center' }}>BILLUNIT Vs {BILLUNITselectedOption === ''? 'Count':'Amount'
                }</p>
                <SimpleBarChart formattedResult={(BILLUNITselectedOption === 'BILLUNITCount' ? formattedResultBILLUNITVsCount : formattedResultBILLUNITAMT)} color={'#820300'} XaxisKey={(BILLUNITselectedOption === 'BILLUNITCount' ? 'count' : 'amount')}/>
            </div>
        </>
    )
}
export default DashboardScreen;