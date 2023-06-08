import React, { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import './AddItem.css';

function AddItem() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [postImage, setPostImage] = useState({
    myFile: '',
    brand: '',
    model: '',
    year: '',
    description: '',
  });

  const createPost = async (newImage) => {
    try {
      setLoading(true);
      const token = user.token;
      await axios.post(
        'http://localhost:4000/api/itemrequest',
        { item: newImage, user: { email: user.email } },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      navigate('/'); // Redirect to home page after successful upload
    } catch (error) {
      console.log('error in createPost:', error);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postImage);
    console.log('Uploaded', postImage);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, myFile: base64 });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostImage({ ...postImage, [name]: value });
  };

  return (
    <div >
      {loading ? (
        <div className="loading-animation">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <form className="uploadform" onSubmit={handleSubmit}>
          <h3>Request Item</h3>

          <label htmlFor="file-upload" className="custom-file-upload">
            {postImage.myFile ? (
              <img width="100" src={postImage.myFile} alt="Selected Image" />
            ) : (
              <div className="file-icon">
                <i className="fa fa-image"></i>
              </div>
            )}
          </label>


          <div className="chooseFileButton">
            <input
              type="file"
              lable="Image"
              name="myFile"
              id="file-upload"
              accept=".jpeg, .png, .jpg"
              onChange={handleFileUpload}
            />
          </div>

          <input
            type="text"
            name="brand"
            id="brand"
            onChange={handleInputChange}
            placeholder='Brand'
          />

          <input
            type="text"
            name="model"
            id="model"
            onChange={handleInputChange}
            placeholder='Model'
          />

          <input
            type="text"
            name="year"
            id="year"
            onChange={handleInputChange}
            placeholder='Year'
          />

          <input
            type="text"
            name="description"
            id="description"
            onChange={handleInputChange}
            placeholder='Description'
          />

          <button>Upload</button>
        </form>
      )}
    </div>
  );
}

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

export default AddItem;
