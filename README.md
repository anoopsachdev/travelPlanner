# 🌍 TripMate - AI-Powered Travel Planner

**TripMate** is a smart travel planning application that leverages the power of Artificial Intelligence to create personalized travel itineraries. By integrating Google Gemini AI and Google Places API, TripMate generates detailed daily plans, hotel recommendations, and dining suggestions tailored to your budget and travel companions.

## TripMate Landing page
<img width="1440" height="811" alt="520543201-ccbd3f77-1a11-4f8f-ba90-e4561969d67e" src="https://github.com/user-attachments/assets/f559c4ef-24d3-43aa-b9ad-24da5b8d27bc" />

## ✨ Features

* **🤖 AI-Generated Itineraries:** Generates day-by-day travel plans using Google Gemini AI based on destination, duration, budget, and group size.
* **🏨 Smart Recommendations:** Suggests hotels and restaurants with ratings, descriptions, and direct Google Maps links.
* **📍 Google Places Integration:** Uses Google Places Autocomplete for destination search and fetches real-time photos for locations.
* **🔐 User Authentication:** Secure Google Sign-In authentication via Firebase and React OAuth.
* **💾 Saved Trips:** Automatically saves generated trips to your personal dashboard (Firestore Database).
* **📱 Responsive Design:** Built with Tailwind CSS and Shadcn UI for a seamless mobile and desktop experience.
* **🗑️ Manage Trips:** View past itineraries or delete old trips from your profile.

## 🛠️ Tech Stack

**Frontend:**
* [React.js](https://react.dev/) (Vite)
* [Tailwind CSS](https://tailwindcss.com/)
* [Shadcn UI](https://ui.shadcn.com/)
* [React Router DOM](https://reactrouter.com/)

**Backend & Services:**
* [Firebase](https://firebase.google.com/) (Firestore & Authentication)
* [Google Gemini API](https://ai.google.dev/) (AI Model: `gemini-2.5-flash`)
* [Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview)

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

* Node.js (v18+ recommended)
* npm or yarn
* A Google Cloud Project (for Places API & OAuth)
* A Google AI Studio Key (for Gemini)
* A Firebase Project

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/anoopsachdev/travelplanner.git](https://github.com/anoopsachdev/travelplanner.git)
    cd travelplanner
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables:**
    Create a `.env` file in the root directory. You can use the provided `.env.sample` as a reference. Add your API keys:

    ```env
    VITE_GOOGLE_PLACE_API_KEY=your_google_places_api_key
    VITE_GOOGLE_GEMINI_API_KEY=your_google_gemini_api_key
    VITE_GOOGLE_AUTH_CLIENT_ID=your_google_oauth_client_id
    ```

4.  **Configure Firebase:**
    * Go to `src/services/firebaseConfig.jsx`.
    * Replace the `firebaseConfig` object with your own credentials from the Firebase Console if you wish to use your own database instance.

### Running the App

Start the development server:

```bash
npm run dev
