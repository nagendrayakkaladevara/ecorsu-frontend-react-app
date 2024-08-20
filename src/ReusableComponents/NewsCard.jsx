import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const NewsCard = ({ item }) => {
    const { title, updatedAt, discription, link, uploaded_by } = item;

    function formatISODateToDateTime(isoDateString) {
        const date = new Date(isoDateString);

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }


    return (
        <div className="card" style={{ width: "18rem", margin: '10px' }}>
            <div className="card-body FontFamliy">
                <h5 className="card-title FontFamliy">{title}</h5>
                <h6 className="card-subtitle mb-2 text-muted FontFamliy">Upload Date: {formatISODateToDateTime(updatedAt)}</h6>
                <p className="card-text FontFamliy">{discription}</p>
                {link !== '' && <a href={link} className="card-link FontFamliy" >Document link</a>}
                <p className="card-link FontFamliy" style={{ margin: "0px" }}>Uploaded By : {uploaded_by}</p>
            </div>
        </div>
    )
}

export default NewsCard;
