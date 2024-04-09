import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME, QUERY_USER } from '../utils/queries';
import { ADD_CONTACT, REMOVE_CONTACT } from '../utils/mutations';
import Auth from '../utils/auth';
import defaultProfilePic from '../assets/maxresdefault.jpg';

const OtherProfile = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [isContact, setIsContact] = useState(false);
    const [mutualContacts, setMutualContacts] = useState([]);

    // Fetching logged-in user's data, including their contact list
    const { data: meData } = useQuery(QUERY_ME);
    const { data: userDataQuery, loading, error } = useQuery(QUERY_USER, { variables: { username } });

    const [addToContactList] = useMutation(ADD_CONTACT);
    const [removeContact] = useMutation(REMOVE_CONTACT);

    useEffect(() => {
        if (userDataQuery) {
            setUserData(userDataQuery.user);

            // Assuming you have contacts for both the logged-in user and the viewed profile
            const myContacts = meData?.me.contactList?.contacts.map(contact => contact._id) || [];
            const theirContacts = userDataQuery.user.contactList?.contacts.map(contact => contact._id) || [];
            const mutual = theirContacts.filter(contactId => myContacts.includes(contactId));
            setMutualContacts(mutual);
        }
    }, [userDataQuery, meData]);

    useEffect(() => {
        if (userDataQuery && userDataQuery.user) {
            setUserData(userDataQuery.user);
            // Once both user data and logged-in user's data are loaded, compare to set isContact
            if (meData && meData.me && meData.me.contactList) {
                const contactIds = meData.me.contactList.contacts.map(contact => contact._id);
                setIsContact(contactIds.includes(userDataQuery.user._id));
            }
        }
    }, [meData, userDataQuery]);

    const handleAddContact = async () => {
        if (!Auth.loggedIn()) {
            navigate('/login');
            return;
        }

        try {
            await addToContactList({ variables: { contactId: userData._id } });
            setIsContact(true); // Update state to reflect the change
        } catch (e) {
            console.error('Error adding to contact list:', e);
        }
    };

    const handleRemoveContact = async () => {
        if (!Auth.loggedIn()) {
            navigate('/login');
            return;
        }

        try {
            await removeContact({ variables: { contactId: userData._id } });
            setIsContact(false); // Update state to reflect the change
        } catch (e) {
            console.error('Error removing contact:', e);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="profile">
            <img src={defaultProfilePic} alt="Profile" className="profile-pic" />
            <h1>{userData?.username}</h1>
            <p>{userData?.firstName} {userData?.lastName}</p>
            {isContact ? (
                <button onClick={handleRemoveContact}>Remove from Contacts</button>
            ) : (
                <button onClick={handleAddContact}>Add to Contacts</button>
            )}
            <div className="language-display">
                <p>Speaks: {userData?.language?.name}</p>
                <img src={userData?.language?.flag} alt={`${userData?.language?.name} flag`} />
            </div>
            <div className="message-link-container">
                <button onClick={() => navigate(`/chat`)}>Message</button>
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
                {mutualContacts.length > 0 && (
                    <p>You have {mutualContacts.length} mutual friends</p>
                )}
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
        </div>
    );
    
};

export default OtherProfile;
