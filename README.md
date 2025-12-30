Free Education & Mentorship Platform

A full-stack education platform built using React and Firebase, designed to provide free learning resources with an optional paid mentorship & mock interview system.

This project focuses on accessibility, scalability, and real-time experience, making it ideal for students and mentors.

🚀 Features
👨‍🎓 Student Features

.Browse free courses

.View detailed course curriculum

.Book mentorship sessions

.Book mock interviews

.View learning progress on profile page

.Real-time success & error notifications

.Clean, modern & responsive UI

🛠️ Admin Features

Secure admin login

View all mentorship bookings

View mock interview bookings

Real-time updates using Firestore

Export bookings to Excel (.xlsx)

Pagination for large data

Dark mode support

🧠 Tech Stack
Frontend

React (Create React App)

React Router DOM

CSS (Custom Babua UI theme)

Backend / Services

Firebase Authentication

Firebase Firestore (Real-time database)

Utilities

react-hot-toast (notifications)

EmailJS (email confirmations)

xlsx (Excel export)

Deployment

Vercel

<img width="405" height="838" alt="Screenshot 2025-12-30 222157" src="https://github.com/user-attachments/assets/7720d6c5-bb3c-4cb9-93ee-9552c7f4402d" />


Setup Instructions (Local Run)

1️⃣ Clone Repository

git clone https://github.com/ankurmittal9081/free-education-platform.git
cd free-education-platform

2️⃣ Install Dependencies

npm install

3️⃣ Create .env File (IMPORTANT)

Create a file named .env in the root directory:

<img width="587" height="311" alt="image" src="https://github.com/user-attachments/assets/4950fac5-980d-459a-b7c2-2085f41185a0" />


⚠️ Never commit .env to GitHub

4️⃣ Firebase Setup

Go to 👉 https://console.firebase.google.com

Create a new project

Enable:

Authentication → Email/Password

Firestore Database

Copy Firebase config into .env

Set Firestore rules properly (auth-based)

5️⃣ Run Project Locally
npm start


Open 👉 http://localhost:3000

🔐 Admin Access

Admin login is protected

Admin can:

View all bookings

Delete bookings

Export data to Excel

Monitor real-time activity

📊 Firestore Collections Used

users

courses

bookings

mockInterviews

courseProgress

🌐 Deployment (Vercel)
npm run build


Then:

Push code to GitHub

Import repo in Vercel

Add same .env variables in Vercel dashboard

Deploy 🚀🎯 Hackathon Value Proposition

Free education for everyone

Optional low-cost mentorship

Real-time scalable backend

Admin analytics & export

Industry-grade UI/UX👨‍💻

Author

Ankur Mittal

Engineering Student | Full-Stack Developer

GitHub: https://github.com/ankurmittal9081

