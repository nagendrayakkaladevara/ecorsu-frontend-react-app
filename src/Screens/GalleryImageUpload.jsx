import React, { useState, useEffect } from "react";
import { useLoginUserContext } from "../Contexts/loginUserContext";
import HeadingText from "../ReusableComponents/HeadingText";

const GalleryImageUpload = () => {
    const [screen, setScreen] = useState('Upload');
    const [Saveloading, setSaveLoading] = useState(false);
    const { User, setUser } = useLoginUserContext(); // Use context here


    const [formData, setFormData] = useState({
        img_title: '',
        img_uploaded_by: User,
        img_link: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaveLoading(true);

        try {
            const response = await fetch('https://ecorsuexpressapp.vercel.app/GelleryUpload', {
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
                    img_title: '',
                    img_uploaded_by: User,
                    img_link: ''
                })
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function convertToDirectGoogleDriveLink(shareableLink) {
        const fileIdMatch = shareableLink.match(/\/d\/(.+?)\//);
        if (fileIdMatch && fileIdMatch.length > 1) {
            return `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`;
        } else {
            return null; // or handle the error as you prefer
        }
    }

    // ......

    const [images, setImages] = useState([]);
    // const [loader, setloader] = useState(true);
    const [reload, setReload] = useState(false)

    useEffect(() => {
        fetchImages();
    }, [reload]);

    const fetchImages = async () => {
        setSaveLoading(true);
        try {
            const response = await fetch('https://ecorsuexpressapp.vercel.app/GelleryUpload');
            const data = await response.json();
            setImages(data); // Adjust according to the API response structure
            setSaveLoading(false);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    const handleDelete = async (imageId) => {
        if (window.confirm("Are you sure you want to delete this image?")) {
            try {
                const response = await fetch(`https://ecorsuexpressapp.vercel.app/GelleryUpload/${imageId}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    alert('Image deleted successfully');
                    // Remove the image from the images state
                    setReload(!reload);
                    setImages(images.filter(image => image.id !== imageId));
                } else {
                    alert('Error deleting image');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while deleting the image');
            }
        }
    };



    return (
        <>
            <div style={{ margin: "20px" }}>
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <a className={`nav-link ${screen === 'Upload' ? ('active') : ('')}`} aria-current="page" onClick={() => setScreen('Upload')} style={{ cursor: "pointer", fontSize: "10px" }}>Upload Gallery Images</a>
                    </li>
                    {/* <li className="nav-item">
                        <a className={`nav-link ${screen === 'Doc' ? ('active') : ('')}`} onClick={() => setScreen('Doc')} style={{ cursor: "pointer", fontSize: "10px" }}>Edit Gallery Images</a>
                    </li> */}
                    <li className="nav-item">
                        <a className={`nav-link ${screen === 'View' ? ('active') : ('')}`} onClick={() => setScreen('View')} style={{ cursor: "pointer", fontSize: "10px" }}>View/Delete Gallery Images</a>
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
                                <HeadingText text='You can Upload Gallery Images from below here it will reflect in main application ' />

                                <form onSubmit={handleSubmit} className='FontFamliy'>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label FontFamliy">Image Title*</label>
                                        <input type="text" className="form-control" name="img_title" value={formData.img_title} onChange={handleChange} placeholder="Enter Title" required={true} />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="link" className="form-label" style={{ margin: '0px' }}>Link for Image*</label>
                                        <input type="text" className="form-control" name="img_link" value={formData.img_link} onChange={handleChange} placeholder="Enter Link here" required={true} />
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
            </div>
            <div>
                {screen === 'View' && (
                    <>
                        <div style={{ display: 'flex', justifyContent: "space-evenly", flexWrap: "wrap", gap: "10px" }}>

                            {images.map((image, index) => (
                                <div className="card" style={{ width: "8rem" }}>
                                    <img src={convertToDirectGoogleDriveLink(image.img_link)} className="card-img-top" alt={image.img_title} />
                                    <div className="card-body" style={{ padding: '5px' }}>
                                        <p className="card-text FontFamliy" style={{ fontSize: "10px", margin: "0px" }}>{image.img_title}</p>
                                        <p className="card-text FontFamliy" style={{ fontSize: "8px", margin: "0px" }}>{image.img_uploaded_by}</p>
                                        <button onClick={() => handleDelete(image._id)} className="btn btn-danger btn-sm" style={{ fontSize: "10px", margin: '10px 5px 5px 5px' }}>Delete</button>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </>
                )}
            </div>
        </>
    )
}
export default GalleryImageUpload;