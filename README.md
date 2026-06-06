# Ehsan Ahmad Portfolio - Professional Graphics & Video Studio

A premium, modern, and cinematic portfolio application built with React, Vite, Express, and Firebase.

## Technology Stack
- **Frontend**: React 19, Tailwind CSS v4, Motion (Framer Motion)
- **Backend**: Express.js (on Node.js)
- **Database**: Firestore (Firebase)
- **Authentication**: Firebase Auth (Email/Password)
- **Storage**: Cloudinary (Images & Videos)

## Features
- **Cinematic Dark Theme**: Premium black and gold aesthetic.
- **Admin Dashboard**: Secure management of portfolio items, videos, and testimonials.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.
- **WhatsApp Integration**: Floating contact button for instant communication.
- **Cloudinary Integration**: High-performance image and video serving.

## Setup Instructions

### 1. Firebase Setup
- Ensure the `firebase-applet-config.json` is present (automatically handled by the AI Studio environment).
- Enable **Email/Password** authentication in your Firebase Console.
- Deploy the provided `firestore.rules`.

### 2. Cloudinary Setup
Set the following environment variables in your Cloud Run / Vercel settings:
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

### 3. Development
```bash
npm install
npm run dev
```

### 4. Production Build
```bash
npm run build
npm start
```

## Admin Information
- **Name**: Ehsan Ahmad
- **Admin Email**: mawlanaehsan24@gmail.com
- **Role**: Super Admin (Role-based access control implemented via Firestore Rules)

---
© 2026 Ehsan Ahmad Portfolio Studio.
