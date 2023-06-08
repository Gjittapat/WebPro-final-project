import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

import './NewNav.css'
function NewNav() {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const handleClick = () => {
        logout();
    };

    return (
        <nav id='menu'>
            <ul>
                <li><Link to='/'>Home</Link></li>
                {user && user.role === 'admin' && (
                    <li ><a className='dropdown-arrow'>Admin</a>
                        <ul className='sub-menus'>
                            <li><Link to='/pendingrequests'>Pending items</Link></li>
                            <li><Link to='/requests'>All requests</Link></li>
                        </ul>
                    </li>
                )}
                <li><Link to='/usercollection'>My collection</Link></li>
            </ul>
            {user && (
                <ul>
                    <li><Link onClick={handleClick}>Log out</Link></li>
                </ul>
            )}
            {!user && (
                <ul>
                    <li><Link to='/signup'>Sign-up</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                </ul>)}
        </nav>
    )
}
export default NewNav