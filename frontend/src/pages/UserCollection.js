import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext'
import { Link } from 'react-router-dom';
function UserCollection() {
  const [userItems, setUserItems] = useState([]);
  const { user } = useAuthContext()
  useEffect(() => {
    // Fetch user's items from the server
    const fetchUserItems = async () => {
      try {
        console.log('user: ', user)
        const token = user.token;
        const response = await axios.get('http://localhost:4000/api/collection/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("response.data: ", response.data);
        // console.log("1st img.data: ", response.data[0].img.data);
        setUserItems(response.data);
      } catch (error) {
        console.log('Error fetching user items:', error);
      }
    };

    fetchUserItems();
  }, [user.token]);

  return (
    <div className="user-collection">
      <h1 className='your-collection'>Your Collection</h1>
      {userItems.length > 0 ? (
        <ul className="item-list">
          {userItems.map((item) => (
            <Link to={`/collecteditemdetail/${item._id}`} key={item._id} className="item">
              <li key={item._id}>
                <br></br>
                <br></br>
                <img src={item.img.data} alt="Item" className="item-image" />
                <p className="item-brand">Brand: {item.brand}</p>
                <p className="item-model">Model: {item.model}</p>
                <p className="item-year">Year: {item.year}</p>
                <p className="item-description">Description: {item.description}</p>
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p className="no-items">No items found in user's collection.</p>
      )}
    </div>
  );
}

export default UserCollection;
