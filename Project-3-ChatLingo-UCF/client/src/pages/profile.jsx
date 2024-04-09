import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import defaultProfilePic from '../assets/maxresdefault.jpg'; // Make sure the path is correct

const Profile = () => {
    const navigate = useNavigate();
    const { data: meData, loading, error } = useQuery(QUERY_ME);
    
    useEffect(() => {
        if (!Auth.loggedIn()) {
            navigate('/login');
        }
        // Assuming meData.me is correctly fetched
        // Add checks for loading and error states as needed
    }, [meData, navigate]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error! {error.message}</div>;

    const userData = meData?.me;
    return (
        <div className="profile">
            <img src={defaultProfilePic} alt="Profile" className="profile-pic" />
            <h1>{userData?.username}</h1>
            <p>{userData?.firstName} {userData?.lastName}</p>
            <div className="language-display">
                <p>Speaks: {userData?.language?.name}</p>
                <img src={userData?.language?.flag} alt={`${userData?.language?.name} flag`} />
            </div>
            <div className="settings-link">
                <button onClick={() => navigate('/settings')}>Edit Profile</button>
            </div>
    
            <div className="groups-container">
                <h2>Groups</h2>
                {userData?.groups.length > 0 ? (
                    <ul>
                        {userData?.groups.map(group => (
                            <li key={group._id}>{group.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No groups to display.</p>
                )}
            </div>
    
            <div className="contacts-container">
                <h2>Contacts</h2>
                {userData?.contactList?.contacts.length > 0 ? (
                    <ul>
                        {userData?.contactList.contacts.map(contact => (
                            <li key={contact._id}>{contact.username}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No contacts to display.</p>
                )}
            </div>
    
            {/* Consider adding additional sections for messages, notifications, etc., similar to how you added for groups and contacts. */}
        </div>
    );    
};

export default Profile;
