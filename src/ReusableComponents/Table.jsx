import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const Table = ({ data }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        STATION: '',
        DESIGNATION: '',
        AMT: '',
        BILLUNIT: ''
    });
    const [darkMode, SetDarkMode] = useState(false);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setFilters(prevFilters => ({
            ...prevFilters,
            EMPNAME: e.target.value
        }));
    };

    const handleFilterChange = (e, header) => {
        const { value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [header]: value
        }));
    };

    const filteredData = data.filter(item => {
        return Object.entries(filters).every(([key, value]) => {
            if (value === '') return true;
            return String(item[key]).toLowerCase().includes(value.toLowerCase());
        });
    });

    const sortedData = filteredData.sort((a, b) => {
        const nameA = a.EMPNAME.toLowerCase();
        const nameB = b.EMPNAME.toLowerCase();
        return nameA.localeCompare(nameB);
    });

    const handleClearFilters = () => {
        setFilters({
            STATION: '',
            DESIGNATION: '',
            AMT: '',
            BILLUNIT: '',
            EMPNAME: ''
        });
        setSearchTerm('');
    }

    const Mempershipdata = data;

    console.log([Mempershipdata],"Mempershipdata")
    const downloadExcel = () => {

        const workbook = XLSX.utils.book_new();


        const worksheet = XLSX.utils.json_to_sheet(data);

        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        XLSX.writeFile(workbook, "Memberships.xlsx");
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: "space-around", margin: "10px" }}>
                <button type="button" class="btn btn-outline-secondary" style={{ fontSize: "12px", marginRight: "10px" }} onClick={handleClearFilters}>Clear All Filters</button>
                <button type="button" class="btn btn-outline-secondary" style={{ fontSize: "12px", marginRight: "10px" }} onClick={downloadExcel}>Download</button>
                <button type="button" style={{ fontSize: "12px" }} className={`btn ${darkMode ? ('btn-light') : ('btn-dark')}`} onClick={() => SetDarkMode((darkMode) => (!darkMode))}>{darkMode ? ('Light Mode') : ('Dark Mode')}</button>
            </div>
            <div style={{ width: "100%", overflowX: "auto" }}>
                <table className={`table table-striped ${darkMode ? 'table-dark' : ''} tableFontSize`} >
                    <thead>
                        <tr>
                            {['EMPNAME', 'DESIGNATION', 'STATION', 'AMT', 'BILLUNIT', 'EMPNO', 'SRNO'].map(key => (
                                <th key={key} style={{ display: (key === 'id') ? 'none' : "", position: key === 'EMPNAME' ? 'sticky' : '', left: key === 'EMPNAME' ? 0 : '' }} scope="col">
                                    <p>{key}</p>
                                    {key === 'EMPNAME' && <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        placeholder="Search"
                                        className="form-control form-control-sm inputWidhtclass"
                                        style={{ fontSize: "10px", width: '200px' }}
                                    />}
                                    {key === "STATION" || key === "DESIGNATION" || key === "AMT" || key === "BILLUNIT" ? (
                                        <select
                                            value={filters[key]}
                                            onChange={(e) => handleFilterChange(e, key)}
                                            className='form-select form-select-sm selectMobileView'
                                        >
                                            <option value="">All</option>
                                            {[...new Set(data.map(item => item[key]))].map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    ) : null}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((item, index) => (
                            <tr key={index} scope="row">
                                {['EMPNAME', 'DESIGNATION', 'STATION', 'AMT', 'BILLUNIT', 'EMPNO', 'SRNO'].map((key, index) => (
                                    key !== 'id' && // Exclude the 'id' field from rendering
                                    <td key={index} style={{ position: key === 'EMPNAME' ? 'sticky' : '', left: key === 'EMPNAME' ? 0 : '' }}>
                                        <p>{item[key]}</p>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default Table;
