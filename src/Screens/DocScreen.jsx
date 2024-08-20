import React, { useEffect, useState } from 'react'
import HeadingText from '../ReusableComponents/HeadingText';
import './Styles/Styles.css';
import EditDocScreen from './EditDocScreen';
import NewsCard from '../ReusableComponents/NewsCard';
import DocCard from '../ReusableComponents/DocVIewCard';
import { useLoginUserContext } from '../Contexts/loginUserContext';

export const DocScreen = () => {
    const { User, setUser } = useLoginUserContext(); // Use context here
    const [screen, setScreen] = useState('Upload');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        doc_title: '',
        doc_discription: '',
        doc_link: '',
        doc_uploaded_by: User
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('https://ecorsuexpressapp.vercel.app/docUpload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setLoading(false);
                alert('Successfully uploaded');
                console.log('Success:', response);
                setFormData({
                    doc_title: '',
                    doc_discription: '',
                    doc_link: '',
                    doc_uploaded_by: User
                })
            } else {
                console.error('Error:', response.statusText, setLoading(false), alert('Sorry,failed to Upload.Please Try again'));
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const [data, setData] = useState([]);
    const [reload, setreload] = useState(false);

    if (screen === 'view') {
        setTimeout(() => {
            setreload(!reload);
        }, 5000);
    }

    useEffect(() => {
        fetch('https://ecorsuexpressapp.vercel.app/docUpload')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [reload]);
    return (
        <>
            <div style={{ margin: "10px" }}>
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <a className={`nav-link ${screen === 'Upload' ? "active" : ""}`} aria-current="page" onClick={() => setScreen('Upload')} style={{ cursor: "pointer", fontSize: "10px" }}>Upload Document </a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${screen === 'edit' ? "active" : ""}`} onClick={() => setScreen('edit')} style={{ cursor: "pointer", fontSize: "10px" }}>Edit Document</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${screen === 'view' ? "active" : ""}`} onClick={() => setScreen('view')} style={{ cursor: "pointer", fontSize: "10px" }}>View Uploded Documents</a>
                    </li>
                </ul>
            </div>
            {loading && <div className="overlay" >
                <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                    <span className="loader"></span>
                </div>
            </div>}

            <div>
                <div>
                    {screen === 'Upload' && (
                        <>
                            <div style={{ display: "flex", justifyContent: 'center' }}>
                                <div style={{ width: '80%', boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", padding: '15px', borderRadius: "4px", marginTop: "20px" }}>
                                    <HeadingText text='You can Upload Usefull Document from here. it will reflect in main application' />

                                    <form onSubmit={handleSubmit} className='FontFamliy'>
                                        <div className="mb-3">
                                            <label htmlFor="title" className="form-label">Doc Title*</label>
                                            <input type="text" className="form-control" name="doc_title" value={formData.doc_title} onChange={handleChange} placeholder="Enter Title" required={true} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="discription" className="form-label">Doc description</label>
                                            <textarea className="form-control" name="doc_discription" value={formData.doc_discription} onChange={handleChange} rows="3"></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="link" className="form-label" style={{ margin: '0px' }}>Link for Document/Photo</label>
                                            <p style={{ margin: '0px', fontSize: '9px', color: "red" }}>*If you dont have link, you can leave it empty</p>
                                            <input type="text" className="form-control" name="doc_link" value={formData.doc_link} onChange={handleChange} placeholder="Enter Link here" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="uploaded_by" className="form-label">Uploader</label>
                                            <input type="text" className="form-control" name="doc_uploaded_by" value={User} onChange={handleChange} placeholder="Enter Uploader Name.." required={true} readOnly={true} />
                                        </div>
                                        <button type="submit" className="btn btn-primary">Upload</button>
                                    </form>
                                </div>
                            </div>
                        </>
                    )}
                    {screen === 'edit' &&
                        <>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <EditDocScreen />
                            </div>
                        </>
                    }
                    {screen === 'view' &&
                        <>
                            <div style={{ display: 'flex', justifyContent: 'center', margin: "10px" }}>
                                <div class="alert alert-primary d-flex align-items-center" role="alert">
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '20px' }} class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:" fill='#EA262A'>
                                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                    </svg>
                                    <div className='FontFamliy' style={{ fontSize: '12px' }}>
                                        No need to refresh the Page! it will auto update every 5 Sec's
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', height: '550px', overflowY: 'scroll' }}>
                                {[...data].reverse().map((item, index) => (
                                    <DocCard key={index} item={item} />
                                ))}
                            </div>

                        </>
                    }
                </div>

            </div>

        </>
    )
}
