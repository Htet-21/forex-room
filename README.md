
# Full-Stack Chat Application

## Project Overview

This full-stack project integrates a **real-time chat application**, **Forex trading feed**, and **notification system**. Users can interact through channels, exchange private messages, view live Forex data, and receive notifications.

### Features:
1. **User Authentication**: Registration and login with hashed passwords.
2. **Chat System**: Real-time communication within channels.
3. **Forex Feed**: Real-time Forex updates in a dedicated channel.
4. **Notifications**: Alerts for new private messages, new users in a channel, and Forex updates.
5. **Admin Panel**: Manage channels and messages (CRUD operations).

---

## Technologies Used

### Frontend:
- **React.js**
- **Socket.IO Client**
- **Axios** for API requests
- **CSS** for styling

### Backend:
- **Node.js**
- **Express.js**
- **MongoDB** with Mongoose for the database
- **Socket.IO Server**
- **JWT** for authentication
- **Bcrypt** for password hashing

---

## Installation and Setup

### Prerequisites:
- **Node.js** (v14 or higher)
- **MongoDB** (locally or cloud-hosted)
- **NPM** or **Yarn**

### Steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/fullstack-chat-app.git
   cd fullstack-chat-app
   ```

2. **Backend Setup**:
   ```bash
   cd server
   npm install

   ```
   - Start the backend:
     ```bash
     npm start
     ```

3. **Frontend Setup**:
   ```bash
   cd client
   npm install
   ```
   - Start the frontend:
     ```bash
     npm start
     ```

---

## API Endpoints

### Authentication

| Method | Endpoint        | Description                    |
|--------|------------------|--------------------------------|
| POST   | `/api/auth/register` | Registers a new user.         |
| POST   | `/api/auth/login`    | Logs in a user.               |

---

### Channels

| Method | Endpoint         | Description                           |
|--------|-------------------|---------------------------------------|
| GET    | `/api/channels`   | Get a list of all channels.           |
| GET    | `/api/channels/:id` | Get details of a specific channel.   |
| POST   | `/api/channels`   | Create a new channel.                 |
| PUT    | `/api/channels/:id` | Update a specific channel.           |
| DELETE | `/api/channels/:id` | Delete a specific channel.           |

---

### Messages

| Method | Endpoint           | Description                           |
|--------|---------------------|---------------------------------------|
| GET    | `/api/messages`     | Get a list of all messages.           |
| GET    | `/api/messages/:id` | Get details of a specific message.    |
| POST   | `/api/messages`     | Create a new message.                 |
| PUT    | `/api/messages/:id` | Update a specific message.            |
| DELETE | `/api/messages/:id` | Delete a specific message.            |

---

### Forex Feed

| Method | Endpoint             | Description                          |
|--------|-----------------------|--------------------------------------|
| GET    | `/api/forex`          | Retrieve the latest forex updates.   |

---

## Frontend Components

### Notifications
- File: `src/components/Notifications.js`
- Real-time display of notifications:
  - New private message
  - New user in a channel
  - Forex updates

### Chat Area
- File: `src/components/ChatArea.js`
- Manages real-time chat messages within a channel.

### Forex Feed
- File: `src/components/ForexFeed.js`
- Displays the latest Forex data updates in a table format.

---

## WebSocket Events

### Client-Side Events:
- **joinChannel**: Joins a specific channel.
- **leaveChannel**: Leaves a channel.
- **sendMessage**: Sends a new message.
- **forexUpdate**: Receives live Forex updates.

### Server-Side Events:
- **receiveMessage**: Broadcasts a new message.
- **newNotification**: Sends notifications to the client.

---

## Project Structure

```plaintext
fullstack-chat-app/
│
├── backend/
│   ├── controllers/
│   │   └── authController.js
│   ├── models/
│   │   ├── Channel.js
│   │   ├── Message.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── channelRoutes.js
│   │   └── messageRoutes.js
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatArea.js
│   │   │   ├── ForexFeed.js
│   │   │   └── Notifications.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles/
│   │       └── (CSS files)
│   ├── public/
│   └── package.json
│
├── README.md
└── (Other configuration files)
```
