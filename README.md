# tubestamp

AI YouTube Timestamps Generator (https://stamptube.online/)

This project generates AI-powered timestamps for YouTube videos using the Bumpups API, with a React frontend and Firebase backend (Cloud Functions, Hosting, Auth, and App Check). It supports YouTube links from both desktop and mobile, including all common formats.

## Features
- Paste any YouTube link (desktop or mobile format)
- Anonymous or authenticated usage via Firebase Auth
- App Check for security
- Friendly error messages for API issues (e.g., insufficient Bumpups credit)
- Mobile-friendly UI
- Saves timestamp history

## Tech Stack
- **Frontend:** React (with create-react-app)
- **Backend:** Firebase Cloud Functions (Python)
- **Hosting:** Firebase Hosting
- **API:** [Bumpups.com](https://bumpups.com) for AI timestamp generation

## Usage
1. Paste a YouTube video link (any format)
2. Select language (English, Spanish, etc.)
3. Click "Generate Timestamps"
4. View and copy the generated timestamps

## Development
- Run `npm start` for local frontend development
- Run `firebase emulators:start` to test functions locally
- Deploy frontend: `npm run build` then `firebase deploy`
- Deploy backend: `firebase deploy --only functions`

## Notes
- Make sure your Bumpups API key is set in your Firebase environment
- If you see a 400 error, check your Bumpups credit or API key
- All YouTube URL formats (including mobile) are supported

---

That was cool
