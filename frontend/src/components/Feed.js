import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';

function Feed() {
    const [userItems, setUserItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchUserItems = async () => {
            try {
                const token = user.token;
                const response = await axios.get('http://localhost:4000/api/item/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUserItems(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log('Error fetching user items:', error);
            }
        };

        fetchUserItems();
    }, []);

    useEffect(() => {
        const filterItems = () => {
            const filtered = userItems.filter((item) => {
                const searchRegex = new RegExp(searchQuery, 'i');
                return (
                    searchRegex.test(item.brand) ||
                    searchRegex.test(item.model) ||
                    searchRegex.test(item.year) ||
                    searchRegex.test(item.description)
                );
            });
            setFilteredItems(filtered);
        };

        filterItems();
    }, [searchQuery, userItems]);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    if (isLoading) {
        return (
            <div className="loading-animation">
                <div className="spinner"></div>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="user-collection">
            <Link className="user-collection-link">
                <h1 id='welcome-msg'>Welcome, rockers</h1>
            </Link>
            <div className="form__group field">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    placeholder="Search by brand, model, year, or description..."
                    className="form__field"
                    name="search"
                    id="search"
                />
                <label htmlFor="search" className="form__label">Search by brand, model, year, or description...</label>
            </div>





            {filteredItems.length > 0 ? (
                <ul className="item-list">
                    {filteredItems.map((item) => (
                        <Link to={`/itemdetail/${item._id}`} key={item._id} className="item">
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

export default Feed;
