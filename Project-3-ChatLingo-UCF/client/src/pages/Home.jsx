import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import React from 'react';

const Home = () => {
    const { loading, error, data } = useQuery(QUERY_ME);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
    const { me } = data;
  
    return (
      <div>
        <h1>Home Page</h1>
        <p>Welcome to the ChatLingo homepage, {me.firstName}!</p>
        <div className="home-page">
          <h2>Your Activity</h2>
          <div className="activity">
            <h3>Active Chats</h3>
            {/* Example for displaying recent messages */}
            {me.messages.map((message) => (
              <p key={message._id}>{message.originalContent} (from {message.sender.username} to {message.receiver.username})</p>
            ))}
            {/* You can add similar sections for rooms, groups, etc., by mapping over those arrays in `me` */}
          </div>
          <div className='activity'>
            {/* Notifications example */}
            <h3>Notifications</h3>
            {me.notifications.map((notification) => (
              <p key={notification._id}>{notification.message.originalContent} from {notification.sender.username}</p>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  export default Home;