import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';

function AdminAllReq() {
    const [userItems, setUserItems] = useState([]);
    const { user } = useAuthContext();

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Fetch user's items from the server
        const fetchUserItems = async () => {
            try {
                const token = user.token;
                const response = await axios.get('http://localhost:4000/api/itemrequest/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

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

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'blue';
            case 'approved':
                return 'green';
            case 'rejected':
                return 'red';
            default:
                return 'inherit';
        }
    };

    return (
        <div className="user-collection">
            <Link className='user-collection-link'><h1>Requests History</h1></Link>

            {loading ? (
                <div className="loading-animation">
                    <div className="loader"></div>
                    <p>Loading...</p>
                </div>
            ) : userItems.length > 0 ? (
                <ul className="item-list">
                    {userItems.map((request) => (
                        <li key={request.item._id} className='item'>
                            <h1 style={{ color: getStatusColor(request.status) }}>{request.status}</h1>
                            <img src={request.item.myFile} alt="Item" className="item-image" />
                            <p className="item-brand">Brand: {request.item.brand}</p>
                            <p className="item-model">Model: {request.item.model}</p>
                            <p className="item-year">Year: {request.item.year}</p>
                            <p className="item-description">Description: {request.item.description}</p>
                            <div className='a-r-buttons'>
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

export default AdminAllReq;
