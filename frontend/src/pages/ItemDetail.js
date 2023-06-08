import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import { useParams } from 'react-router-dom';

function ItemDetail() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [userItem, setUserItem] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchUserItem = async () => {
    try {
      const token = user.token;
      const response = await axios.get(`http://localhost:4000/api/item/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const item = response.data;
      setUserItem(item);
      setEditedItem(item);
    } catch (error) {
      console.log('Error fetching user items:', error);
    }
  };

  useEffect(() => {
    fetchUserItem();
  }, [id, user.token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsUpdating(true);
      const token = user.token;
      await axios.put(`http://localhost:4000/api/item/${userItem._id}`, editedItem, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Item updated:', editedItem);
      setEditMode(false);
      fetchUserItem();
    } catch (error) {
      console.log('Error updating item:', error);
    }
    setIsUpdating(false);
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  if (!userItem) {
    return null;
  }

  const handleAddClick = async () => {
    try {
      setIsUpdating(true);
      const token = user.token;
      await axios.post('http://localhost:4000/api/collection', userItem, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Item added to collection:', userItem);
      setIsUpdating(false);
      // redirect to home page
      window.location.replace('/');
    } catch (error) {
      console.log('Error adding item to collection:', error);
    }
  };

  return (
    <div>
      {isUpdating ? (
        <div className="loading-animation">
          <div className="spinner"></div>
          <p>Updating...</p>
        </div>
      ) : (
        <>
          {editMode ? (
            <form className="item-detail" onSubmit={handleSubmit}>
              <img src={userItem.img.data} alt="Item" className="item-image" />
              <label>
                Brand:
                <input
                  className="brand"
                  type="text"
                  name="brand"
                  value={editedItem.brand}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Model:
                <input
                  className="brand"
                  type="text"
                  name="model"
                  value={editedItem.model}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Year:
                <input
                  className="brand"
                  type="text"
                  name="year"
                  value={editedItem.year}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Description:
                <textarea
                  className="brand"
                  name="description"
                  value={editedItem.description}
                  onChange={handleInputChange}
                ></textarea>
              </label>
              <button type="submit">Save</button>
              <button type="button" onClick={handleCancelClick}>
                Cancel
              </button>
            </form>
          ) : (
            <div className="item-detail">
              <img src={userItem.img.data} alt="Item" className="item-image" />
              <p className="brand">Brand: {userItem.brand}</p>
              <p className="model">Model: {userItem.model}</p>
              <p className="year">Year: {userItem.year}</p>
              <p className="item-description">
                Description: {userItem.description}
              </p>
              <button onClick={handleAddClick}>Add</button>
              {user && user.role === 'admin' && (
                <>
                  <button onClick={() => setEditMode(true)}>Edit</button>
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ItemDetail;
