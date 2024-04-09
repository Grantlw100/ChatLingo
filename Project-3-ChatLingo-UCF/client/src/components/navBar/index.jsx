import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useLazyQuery } from '@apollo/client';
import { QUERY_ME, QUERY_GROUP, QUERY_USER } from '../../utils/queries';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [loadUser] = useLazyQuery(QUERY_USER);
    const [loadGroup] = useLazyQuery(QUERY_GROUP);
    const navigate = useNavigate();
    const { data: queryMeData, loading: queryMeLoading } = useQuery(QUERY_ME);
    const userData = queryMeData; // Correctly initializes userData with the query's result
    const notifications = !queryMeLoading && userData?.me.notifications.filter(notification => !notification.read) || [];

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault(); // Prevent the form from refreshing the page
        const isUserSearch = searchTerm.startsWith("@");
        const searchQuery = searchTerm.slice(1); // Remove "@" for username search
        console.log(searchQuery || searchTerm)
        if (isUserSearch) {
            loadUser({
                variables: { username: searchQuery },
                onCompleted: data => {
                    // Navigate to OtherProfile with the user ID
                    navigate(`/OtherProfile/${data.user.username}`);
                }
            });
        } else {
            loadGroup({ variables: { groupName: searchTerm },
                onCompleted: data => {
                    // Navigate to a group page (assuming you have one)
                    navigate('/group', { state: { group: data.group } });
                } 
            });
        }
    };

    return (
        <nav className="navbar">
            <div
            className="navbar-container"
            onClick={() => setIsOpen(!isOpen)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                setIsOpen(!isOpen);
            }}}>
                Menu
            </div>
      
            
            <Link to="/" className="nav-link">Home</Link>
            <div className="search-container">
                <form onSubmit={handleSearchSubmit}>
                    <input type="text" placeholder="Search users or groups..." value={searchTerm} onChange={handleSearchChange} />
                    <button type="submit">Search</button>
                </form>
            </div>
            <div className="notification-container">
                <Link to="/notifications" className="nav-link">
                    <FontAwesomeIcon icon={faBell} />
                    {notifications.length > 0 && (
                        <span className="notification-count">{notifications.length}</span>
                    )}
                </Link>
            </div>      
                {isOpen && (
                    <ul className={`navbar-nav ${isOpen ? 'show' : ''}`}>
                        <li className="nav-item">
                            <Link to="/profile" className="nav-link">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/chat" className="nav-link">Chat</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/settings" className="nav-link">Settings</Link>
                        </li>
                        <li className="nav-item">  
                            <Link to="/about" className="nav-link">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/logout" className="nav-link">Logout</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/signup" className="nav-link">Signup</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/help" className="nav-link">Help</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contactList" className="nav-link">Contact List</Link>
                        </li>
                    </ul>
                )}
        </nav>
    );
};

export default Nav;