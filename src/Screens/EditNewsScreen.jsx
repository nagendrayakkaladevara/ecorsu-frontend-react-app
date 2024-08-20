import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function EditNewsUpdatesScreen() {
    const [data, setData] = useState([]);
    const [reload, setReload] = useState(false);
    const [editState, setEditState] = useState({});
    const [successAlert, setsuccessAlert] = useState(false);
    const [failedAlert, setfailedAlert] = useState(false);
    const [deleteSuccessAlert, setdeleteSuccessAlert] = useState(false);
    const [deleteFailAlert, setdeleteFailAlert] = useState(false);

    useEffect(() => {
        fetch('https://ecorsuexpressapp.vercel.app/newUpload')
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
        console.log(item.title);

        if (item.title !== '' && item.uploaded_by !== '') {
            try {
                const response = await fetch(`https://ecorsuexpressapp.vercel.app/newUpload/${id}`, {
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
                    // Handle non-OK responses here
                    setfailedAlert(true);
                    setTimeout(() => {
                        setfailedAlert(false);
                    }, 4000);
                    console.error('Failed to update the item:', response.statusText);
                }
            } catch (error) {
                console.error('Error during fetch:', error);
                // Handle fetch errors here
            }
        } else {
            alert('Card Title & Uploaded By should not be empty');
        }

        setReload(!reload);
        setEditState({ ...editState, [id]: false });
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://ecorsuexpressapp.vercel.app/newUpload/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setData(data.filter(item => item._id !== id));
                setdeleteSuccessAlert(true);
                setTimeout(() => {
                    setdeleteSuccessAlert(false);
                }, 3000);
            } else {
                // Handle non-OK responses here
                setdeleteFailAlert(true);
                setTimeout(() => {
                    setdeleteFailAlert(false);
                }, 3000);
                console.error('Failed to delete the item:', response.statusText);
                // You might want to alert the user or handle this in the UI
            }
        } catch (error) {
            console.error('Error during fetch:', error);
            // Handle fetch errors here
            // Consider alerting the user or updating the UI accordingly
        }

        setReload(!reload);
    };


    return (
        <>
            <div className='FontFamliy' style={{ width: "80%", height: '600px', overflowY: 'scroll', fontSize: "15px" }}>
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
                    <div key={item._id} className="mb-3" style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", margin: "5px", padding: "10px", borderRadius: "4px" }}>
                        <label htmlFor="title" className="form-label">Edit News Card Title*</label>
                        <input className="form-control mb-2" value={item.title} name="title" onChange={e => handleChange(item._id, e)} placeholder="Edit Title" required={true} />
                        <label htmlFor="title" className="form-label">Edit News Card Description</label>
                        <textarea className="form-control mb-2" value={item.discription} name="discription" onChange={e => handleChange(item._id, e)} rows="3"></textarea>
                        <label htmlFor="title" className="form-label">Edit News Card Link</label>
                        <input className="form-control mb-2" value={item.link} name="link" onChange={e => handleChange(item._id, e)} placeholder="Edit Link" />
                        <label htmlFor="title" className="form-label">Edit News Card Uploaded by</label>
                        <input className="form-control mb-2" value={item.uploaded_by} name="uploaded_by" onChange={e => handleChange(item._id, e)} placeholder="Edit Uploader" required={true} readOnly={true} />
                        {editState[item._id] && <button type="button" className="btn btn-success m-1" onClick={() => handleSave(item._id)}>Save</button>}
                        <button type="button" className="btn btn-danger m-1" onClick={() => handleDelete(item._id)}>Delete</button>
                    </div>
                ))}
            </div>

        </>
    );
}

export default EditNewsUpdatesScreen;
