import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage, faParagraph } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useProfileEdit } from "../../../../Context/ProfileEditContext.jsx";
import "../../assets/css/editProfil.css";

function EditMyProfil() {
    const { profile, updateProfile } = useProfileEdit();
    const [presentation, setPresentation] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (profile) {
            setPresentation(profile.presentation || "");
            setProfilePicture(profile.pictureProfil || "");
            setPreviewImage(profile.pictureProfil ? `/uploads/pictureProfilUser/${profile.pictureProfil}` : "");
        }
    }, [profile]);

    const handleChange = (value) => {
        setPresentation(value);
    };

    const handlePictureChange = (e) => {
        const file = e.target.files[0];
        setProfilePicture(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("presentation", presentation);
        if (profilePicture) {
            formData.append("pictureProfil", profilePicture);
        }

        try {
            await updateProfile(formData);
            toast("Votre profil a été mis à jour avec succès !", { type: "success" });
        } catch (error) {
            console.error(error);
            toast("Une erreur s'est produite lors de la mise à jour de votre profil", { type: "error" });
        }
    };

    return (
        <div className="bg-navigation p-4">
            <h5>Mon profil</h5>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6 mb-2">
                        <FontAwesomeIcon className="me-1 icon-color" icon={faFileImage} />
                        <label className="mb-1" htmlFor="profilePicture">Photo de profil</label>
                        <div className="image-preview">
                            {previewImage && <img src={previewImage} alt="Prévisualisation" />}
                            <label htmlFor="profilePicture" className="btn btn-primary mt-2">Changer de photo</label>
                            <input type="file" className="form-control" id="profilePicture" onChange={handlePictureChange} style={{ display: 'none' }} />
                        </div>
                    </div>
                    <div className="col-md-12 mb-2">
                        <FontAwesomeIcon className="me-1 icon-color" icon={faParagraph} />
                        <label className="mb-1" htmlFor="presentation">Présentation</label>
                        <ReactQuill
                            theme="snow"
                            value={presentation}
                            onChange={handleChange}
                            modules={{
                                toolbar: [
                                    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                    [{ 'color': [] }, { 'background': [] }],
                                    [{ 'align': [] }],
                                    ['link', 'image', 'video'],
                                    ['clean']
                                ],
                            }}
                            formats={[
                                'header', 'font',
                                'bold', 'italic', 'underline', 'strike', 'blockquote',
                                'list', 'bullet',
                                'color', 'background',
                                'align',
                                'link', 'image', 'video'
                            ]}
                        />
                    </div>
                </div>
                <button type="submit" className="w-100 mt-2 bg-primary-color border border-0 p-1">Modifier</button>
            </form>
        </div>
    );
}

export default EditMyProfil;
