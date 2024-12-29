import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatArea from '../components/ChatArea';
import ForexFeed from '../components/ForexFeed';
import Notifications from '../components/Notifications';
import '../styles/HomePage.css';

const HomePage = () => {
    const [currentChannel, setCurrentChannel] = useState('');
    const [currentChannelName, setCurrentChannelName] = useState('');

    const handleChannelChange = (channelId, channelName) => {
        setCurrentChannel(channelId);
        setCurrentChannelName(channelName);
    };

    return (
        <div className="homepage-container">
            <Notifications />
            <Sidebar 
                setCurrentChannel={handleChannelChange} 
                currentChannel={currentChannel}
            />
            <ChatArea currentChannel={currentChannel} currentChannelName={currentChannelName} />
            <ForexFeed />
        </div>
    );
};

export default HomePage;
