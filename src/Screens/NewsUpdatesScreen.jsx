import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeadingText from '../ReusableComponents/HeadingText';
import NewsCard from '../ReusableComponents/NewsCard';
import EditNewsUpdatesScreen from './EditNewsScreen';
import { useLoginUserContext } from '../Contexts/loginUserContext';

export const NewsUpdatesScreen = () => {

    const [screen, setScreen] = useState('Upload');
    const [Saveloading, setSaveLoading] = useState(false);
    const { User, setUser } = useLoginUserContext(); // Use context here


    const [formData, setFormData] = useState({
        title: '',
        discription: '',
        uploaded_by: User,
        link: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    console.log(User, "inside")
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaveLoading(true);
        try {
            const response = await fetch('https://ecorsuexpressapp.vercel.app/newUpload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSaveLoading(false);
                alert('Successfully uploaded');
                console.log('Success:', response);
                setFormData({
                    title: '',
                    discription: '',
                    uploaded_by: User,
                    link: ''
                })
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }


    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reload, setreload] = useState(false);

    if (screen === 'View') {
        setTimeout(() => {
            setreload(!reload);
        }, 5000);
    }

    useEffect(() => {
        setLoading(true);
        fetch('https://ecorsuexpressapp.vercel.app/newUpload')
            .then(response => response.json())
            .then(data => setData(data), setLoading(false))
            .catch(error => console.error('Error fetching data:', error));
    }, [reload]);

    return (
        <>
            <div style={{ margin: "20px" }}>
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <a className={`nav-link ${screen === 'Upload' ? ('active') : ('')}`} aria-current="page" onClick={() => setScreen('Upload')} style={{ cursor: "pointer", fontSize: "10px" }}>Upload Union updates</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${screen === 'Doc' ? ('active') : ('')}`} onClick={() => setScreen('Doc')} style={{ cursor: "pointer", fontSize: "10px" }}>Edit Union updates</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${screen === 'View' ? ('active') : ('')}`} onClick={() => setScreen('View')} style={{ cursor: "pointer", fontSize: "10px" }}>View Union updates</a>
                    </li>
                </ul>
            </div>
            {Saveloading && <div className="overlay" >
                <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                    <span className="loader"></span>
                </div>
            </div>}
            <div>
                {screen === 'Upload' && (
                    <>
                        <div className='FontFamliy' style={{ display: "flex", justifyContent: 'center' }}>
                            <div style={{ width: '80%', boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", padding: '15px', borderRadius: "4px", marginTop: "20px" }}>
                                <HeadingText text='You can Upload Union Updateds from below here it will reflect in main application ' />

                                <form onSubmit={handleSubmit} className='FontFamliy'>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label FontFamliy">Title*</label>
                                        <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} placeholder="Enter Title" required={true} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="discription" className="form-label">description</label>
                                        <textarea className="form-control" name="discription" value={formData.discription} onChange={handleChange} rows="3"></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="link" className="form-label" style={{ margin: '0px' }}>Link for Document/Photo</label>
                                        <p style={{ margin: '0px', fontSize: '9px', color: "red" }}>*If you dont have link, you can leave it empty</p>
                                        <input type="text" className="form-control" name="link" value={formData.link} onChange={handleChange} placeholder="Enter Link here" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="uploaded_by" className="form-label">Uploader</label>
                                        <input type="text" className="form-control" name="uploaded_by" value={User} onChange={handleChange} placeholder="Enter Uploader Name.." required={true} readOnly={true} />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Upload</button>
                                </form>
                            </div>
                        </div>
                    </>
                )}
                {screen === 'Doc' && (
                    <>
                        <div style={{ display: 'flex', justifyContent: "center" }}>
                            <EditNewsUpdatesScreen />
                        </div>
                    </>
                )}
                {screen === 'View' && (
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
                        {(!loading) ? (<>
                            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', height: '550px', overflowY: 'scroll' }}>
                                {[...data].reverse().map((item, index) => (
                                    <NewsCard key={index} item={item} />
                                ))}
                            </div>
                        </>) : (<>
                            <div>
                                <div className="card" aria-hidden="true">
                                    <div className="card-body">
                                        <h5 className="card-title placeholder-glow">
                                            <span className="placeholder col-6"></span>
                                        </h5>
                                        <p className="card-text placeholder-glow">
                                            <span className="placeholder col-7"></span>
                                            <span className="placeholder col-4"></span>
                                            <span className="placeholder col-4"></span>
                                            <span className="placeholder col-6"></span>
                                            <span className="placeholder col-8"></span>
                                        </p>
                                        <a class="btn btn-primary disabled placeholder col-6" aria-disabled="true"></a>
                                    </div>
                                </div>
                            </div>
                        </>)}
                    </>
                )}
            </div>

        </>
    );
}

export default NewsUpdatesScreen;
