import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function EditDocScreen() {
    const [data, setData] = useState([]);
    const [reload, setReload] = useState(false);
    const [editState, setEditState] = useState({});
    const [successAlert, setsuccessAlert] = useState(false);
    const [failedAlert, setfailedAlert] = useState(false);
    const [deleteSuccessAlert, setdeleteSuccessAlert] = useState(false);
    const [deleteFailAlert, setdeleteFailAlert] = useState(false);

    useEffect(() => {
        fetch('https://ecorsuexpressapp.vercel.app/docUpload')
            .then(response => response.json())
            .then(data => {
                setData(data);
                setEditState(data.reduce((acc, item) => ({ ...acc, [item._id]: false }), {}));
            })
            .catch(error => console.error('Error fetching data:', error));

        return
    }, [reload]);

    const handleChange = (id, e) => {
        const newData = data.map(item => item._id === id ? { ...item, [e.target.name]: e.target.value } : item);
        setData(newData);
        setEditState({ ...editState, [id]: true });
    };

    const handleSave = async (id) => {
        const item = data.find(item => item._id === id);

        if (item.title !== '' && item.uploaded_by !== '') {
            try {
                const response = await fetch(`https://ecorsuexpressapp.vercel.app/docUpload/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(item),
                });

                if (response.ok) {
                    setsuccessAlert(true);
                    setTimeout(() => {
                        setsuccessAlert(false);
                    }, 3000);
                } else {
                    setfailedAlert(true);
                    setTimeout(() => {
                        setfailedAlert(false);
                    }, 4000);
                    console.error('Failed to update the document:', response.statusText);
                }
            } catch (error) {
                console.error('Error during fetch:', error);
                setfailedAlert(true);
                setTimeout(() => {
                    setfailedAlert(false);
                }, 4000);
            }
        } else {
            alert('Card Title & Uploaded By should not be empty');
        }

        setReload(!reload);
        setEditState({ ...editState, [id]: false });
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://ecorsuexpressapp.vercel.app/docUpload/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setData(data.filter(item => item._id !== id));
                setdeleteSuccessAlert(true);
                setTimeout(() => {
                    setdeleteSuccessAlert(false);
                }, 3000);
            } else {
                setdeleteFailAlert(true);
                setTimeout(() => {
                    setdeleteFailAlert(false);
                }, 3000);
                console.error('Failed to delete the document:', response.statusText);
            }
        } catch (error) {
            console.error('Error during fetch:', error);
            setdeleteFailAlert(true);
            setTimeout(() => {
                setdeleteFailAlert(false);
            }, 3000);
        }

        setReload(!reload);
    };

    return (
        <>
            <div style={{ width: "80%", height: '600px', overflowY: 'scroll' }}>
                {successAlert &&
                    <div class="alert alert-primary FontFamliy" role="alert" style={{ position: 'absolute', width: '250px' }}>
                        Updated Successfully
                    </div>
                }
                {failedAlert &&
                    <div class="alert alert-danger FontFamliy" role="alert" style={{ position: 'absolute', width: '250px' }}>
                        Failed to Update
                    </div>
                }
                {deleteSuccessAlert &&
                    <div class="alert alert-success" role="alert" style={{ position: 'absolute', width: '250px' }}>
                        Successfully Deleted
                    </div>
                }
                {deleteFailAlert &&
                    <div class="alert alert-danger FontFamliy" role="alert" style={{ position: 'absolute', width: '250px' }}>
                        Failed to Delete the post
                    </div>
                }


                {[...data].reverse().map(item => (
                    <div key={item._id} className="mb-3 FontFamliy" style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", margin: "5px", padding: "10px", borderRadius: "4px" }}>
                        <label htmlFor="link" className="form-label">Edit Document Title</label>
                        <input className="form-control mb-2" value={item.doc_title} name="doc_title" onChange={e => handleChange(item._id, e)} placeholder="Edit doc_title" />
                        <label htmlFor="link" className="form-label">Edit Document Description</label>
                        <textarea className="form-control mb-2" value={item.doc_discription} name="doc_discription" onChange={e => handleChange(item._id, e)} rows="3"></textarea>
                        <label htmlFor="link" className="form-label">Edit Link for Document/Photo</label>
                        <input className="form-control mb-2" value={item.doc_link} name="doc_link" onChange={e => handleChange(item._id, e)} placeholder="Edit doc_link" />
                        <label htmlFor="link" className="form-label">Uploaded By</label>
                        <input className="form-control mb-2" value={item.doc_uploaded_by} name="doc_uploaded_by" onChange={e => handleChange(item._id, e)} placeholder="Edit Uploader" readOnly={true} />
                        {editState[item._id] && <button type="button" className="btn btn-success m-1" onClick={() => handleSave(item._id)}>Save</button>}
                        <button type="button" className="btn btn-danger m-1" onClick={() => handleDelete(item._id)}>Delete</button>
                    </div>
                ))}
            </div>

        </>
    );
}

export default EditDocScreen;
