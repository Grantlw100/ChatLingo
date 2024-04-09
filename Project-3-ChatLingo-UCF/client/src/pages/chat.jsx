import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { ADD_MESSAGE } from '../utils/mutations';

const Chat = () => {
    const [selectedContact, setSelectedContact] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const { data: userData, loading, error } = useQuery(QUERY_ME);

    const contacts = userData?.me.contactList.contacts || [];
    const userMessages = userData?.me.messages || [];

    useEffect(() => {
        if (selectedContact) {
            const filteredMessages = userMessages.filter(
                (message) => message.receiver.username === selectedContact.username || message.sender.username === selectedContact.username
            );
            setMessages(filteredMessages);
        }
    }, [selectedContact, userMessages]);

    const [sendMessage] = useMutation(ADD_MESSAGE, {
        refetchQueries: [QUERY_ME], // Refetch user data to update messages
    });

    const handleSendMessage = async () => {
        if (newMessage.trim() !== "" && selectedContact) {
            await sendMessage({
                variables: { content: newMessage, receiverId: selectedContact.id },
            });
            setNewMessage("");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error! {error.message}</p>;

    return (
        <div>
            <div>
                <h2>Contacts</h2>
                <ul>
                    {contacts.map((contact) => (
                        <li key={contact._id} onClick={() => setSelectedContact(contact)}>
                            {contact.username}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Messages</h2>
                {messages.length ? (
                    <ul>
                        {messages.map((message) => (
                            <li key={message._id}>{message.originalContent} - {message.translationContent}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No recent messages</p>
                )}
            </div>
            <div>
                <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
