import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/SideBar.css';

const Sidebar = ({ setCurrentChannel, currentChannel }) => {
    const [channels, setChannels] = useState([]);
    const [newChannel, setNewChannel] = useState('');
    const role = localStorage.getItem('role');

    const fetchChannels = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/channels', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setChannels(response.data);
        } catch (error) {
            console.error('Error fetching channels:', error);
        }
    };

    useEffect(() => {
        fetchChannels();
    }, []);

    const createChannel = async () => {
        try {
            await axios.post(
                'http://localhost:5000/api/channels',
                { name: newChannel },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            setNewChannel('');
            fetchChannels();
        } catch (error) {
            console.error('Error creating channel:', error);
        }
    };

    const deleteChannel = async (channelId) => {
        try {
            await axios.delete(`http://localhost:5000/api/channels/${channelId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            fetchChannels();
        } catch (error) {
            console.error('Error deleting channel:', error);
        }
    };

    return (
        <div className="sidebar-container">
            <h3>Channels</h3>
            <ul>
                {channels.map((channel) => (
                    <li
                        key={channel._id}
                        className={currentChannel === channel._id ? 'active' : ''}
                        onClick={() => setCurrentChannel(channel._id, channel.name)}
                    >
                        {channel.name}
                        {role === 'admin' && (
                            <button
                                className="delete-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteChannel(channel._id);
                                }}
                            >
                                ✖
                            </button>
                        )}
                    </li>
                ))}
            </ul>
            {role === 'admin' && (
                <div className="create-channel">
                    <input
                        type="text"
                        value={newChannel}
                        onChange={(e) => setNewChannel(e.target.value)}
                        placeholder="New channel"
                    />
                    <button onClick={createChannel}>Add</button>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
