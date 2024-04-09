import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import defaultProfilePic from '../assets/maxresdefault.jpg';
import { Link } from 'react-router-dom';

const ContactList = () => {
    const navigate = useNavigate();
    const { data: meData, loading, error } = useQuery(QUERY_ME);

    useEffect(() => {
        if (!Auth.loggedIn()) {
            navigate('/login');
        }
    }, [navigate]);

    // Safeguard against null values
    const contacts = meData?.me?.contactList?.contacts ?? [];
    console.log(contacts);
    console.log(meData);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error! {error.message}</div>;

    return (
        <div className='contact-list'>
            <h1>Contact List</h1>
            <div className='contact-list-items'>
                {contacts.length > 0 ? (
                    contacts.map(contact => (
                        <div key={contact._id} className='contact-item'>
                            <img src={contact.profilePic || defaultProfilePic} alt='Profile' className='profile-pic' />
                            <h2>{contact.username}</h2>
                            <button onClick={() => navigate(`/OtherProfile/${contact.username}`)}>View Profile</button>
                            <Link to={`/chat/${contact.username}`}>Chat with {contact.username}</Link>
                        </div>
                    ))
                ) : (
                    <p>No contacts found.</p>
                )}
            </div>
        </div>
    );
};

export default ContactList;
