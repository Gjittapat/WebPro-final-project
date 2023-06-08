import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext'
import { Link } from 'react-router-dom';

function AdminReq() {
  const [userItems, setUserItems] = useState([]);
  const { user } = useAuthContext()

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch user's items from the server
    const fetchUserItems = async () => {
      try {
        const token = user.token;
        const response = await axios.get('http://localhost:4000/api/itemrequest/pendingitems', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // console.log("response.data:  ", response.data);
        console.log("1st img.data only: ", response.data[0]);

        setUserItems(response.data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.log('Error fetching user items:', error);
        setLoading(false); // Set loading to false on error as well
      }
    };

    fetchUserItems();
  }, [user.token]);

  const createPost = async (newItem) => {
    try {
      const token = user.token;
      // newItem = e = request = requestItem type with field "item"
      console.log("inside createPost")
      console.log("newItem: before sending ", newItem)
      await axios.post('http://localhost:4000/api/item', newItem, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("sending this to backend: ", newItem)
      window.location.reload();
    } catch (error) {
      console.log("error in createPost")
      console.log(error);
    }
  }

  const setApprove = async (newItem) => {
    try {
      const token = user.token;
      console.log("token: ", token)
      // newItem = e = request = requestItem type with field "item"
      await axios.put(`http://localhost:4000/api/itemrequest/approve/${newItem._id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("update to approved: ")
    } catch (error) {
      console.log("error in setApprove")
      console.log(error);
    }
  }

  const setReject = async (newItem) => {
    try {
      const token = user.token;
      console.log("token: ", token)
      // newItem = e = request = requestItem type with field "item"
      await axios.put(`http://localhost:4000/api/itemrequest/reject/${newItem._id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("update to rejected: ")
      window.location.reload();
    } catch (error) {
      console.log("error in setReject")
      console.log(error);
    }
  }


  const approveButton = async (e) => {
    setLoading(true); // Set loading to true before performing actions
    try {
      await Promise.all([setApprove(e), createPost(e)]);
      console.log("approve request / e: ", e);
    } catch (error) {
      console.log("Error approving request:", error);
    } finally {
      setLoading(false); // Set loading to false after the actions are completed
    }
  };

  const rejectButton = async (e) => {
    setLoading(true); // Set loading to true before performing actions
    try {
      await setReject(e);
      console.log("reject request / e: ", e);
    } catch (error) {
      console.log("Error rejecting request:", error);
    } finally {
      setLoading(false); // Set loading to false after the actions are completed
    }
  };


  return (
    <div className="user-collection">
      <Link className='user-collection-link' ><h1>Requests to Admin</h1></Link>

      {loading ? (
        <div className="loading-animation">
          <div className="loader"></div>
          <p>Loading...</p>
        </div>
      ) : userItems.length > 0 ? (
        <ul className="item-list">
          {userItems.map((request) => (
            <li key={request.item._id} className='item'>
              <h1>id: {request.item._id}</h1>
              <img src={request.item.myFile} alt="Item" className="item-image" />
              <p className="item-brand">Brand: {request.item.brand}</p>
              <p className="item-model">Model: {request.item.model}</p>
              <p className="item-year">Year: {request.item.year}</p>
              <p className="item-description">Description: {request.item.description}</p>
              <div className='a-r-buttons'>
                <button className="btn btn-approve" onClick={() => approveButton(request)}>Approve</button>
                <button className="btn btn-reject" onClick={() => rejectButton(request)}>Reject</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-items">No items found in user's collection.</p>
      )}
    </div>
  );

}

export default AdminReq