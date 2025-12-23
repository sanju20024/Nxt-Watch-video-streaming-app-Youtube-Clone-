# ▶️ Nxt Watch – Video Streaming Platform

A YouTube-like video streaming platform built using **React JS** as part of the **NxtWave ReactJS Coding Practices**.  
This project implements authentication, protected routes, theme switching, and video browsing features similar to a real-world video streaming application.

---

## 🔗 Links

- **Repository:** https://github.com/sanju20024/Nxt-Watch-video-streaming-app-Youtube-Clone-
- **Live Application:** https://nxtwatchytsanju.ccbp.tech/

---

## 📌 Overview

**Nxt Watch** is a video streaming platform inspired by YouTube.  
Users can log in, browse videos across multiple sections, view video details, like or dislike videos, save videos, and switch between dark and light themes.

The application strictly follows **NxtWave UI guidelines and test cases**.

---

## ✨ Features

### 🔐 Authentication
- Login using username and password
- JWT-based authentication
- Protected routes
- Logout functionality

### 📺 Video Sections
- Home (All videos)
- Trending videos
- Gaming videos
- Saved videos

### 🎬 Video Details
- Video player
- Channel information
- Like and Dislike buttons
- Save / Unsave video functionality

### 🌗 Theme Support
- Dark mode
- Light mode
- Theme persisted across pages

### 🎨 UI & UX
- Responsive design
- Loader views during API calls
- Failure views on API errors
- Clean and consistent layout

---

## 🧰 Tech Stack

- **Frontend:** React JS
- **Routing:** React Router DOM
- **State Management:** React Context API
- **Styling:** CSS
- **Authentication:** JWT
- **API Integration:** REST APIs

---

## 📂 Project Structure

<pre>
src/
├── components/
│   ├── Login/
│   ├── Header/
│   ├── Slidebar/
│   ├── Home/
│   ├── Trending/
│   ├── Gaming/
│   ├── SavedVideos/
│   ├── VideoItemDetails/
│   ├── AllVideosItem/
│   ├── ProtectedRoute/
│   └── NotFound/
├── ThemeContext/
├── ThemeStyledContext/
├── App.js
├── index.js
└── App.css
</pre>

---

## 🚀 Local Setup

### 1. Clone the repository
git clone git@github.com:sanju20024/Nxt-Watch-video-streaming-app-Youtube-Clone-.git

### 2. Navigate to the project directory
cd nxtWatchApp

### 3. Install dependencies
npm install

### 4. Start the development server
npm start

The application will run at:
http://localhost:3000

---

## 🔑 Test Login Credentials

username: rahul
password: rahul@2021

---

## 🧪 Learning Outcomes

- Implemented authentication and protected routes
- Built reusable React components
- Managed global state using Context API
- Implemented dark and light themes
- Worked with REST APIs and async data handling
- Followed test-case-driven development

---

## 👨‍💻 Author

**Sanjay Thadaka**

- GitHub: https://github.com/sanju20024

---

## 📄 License

This project is developed for **educational and learning purposes** under the **NxtWave ReactJS curriculum**.
