import conf from "../conf/conf.js";

export const SelectTravelesList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'Going solo',
        icon: '🧳',
        people: '1',
    },
    {
        id: 2,
        title: 'Couple',
        desc: 'Traveling with a partner',
        icon: '🥂',
        people: '2 People',
    },
    {
        id: 3,
        title: 'Family',
        desc: 'Traveling with family members',
        icon: '🏠',
        people: '3 to 5 People',
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'Group trip with friends',
        icon: '⛵️',
        people: '5 to 10 People',
    }
]

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Economy',
        desc: 'Budget-friendly options',
        icon: '💸',
        // budget: 'Less than $1000',
    },
    {
        id: 2,
        title: 'Standard',
        desc: 'Comfortable and affordable',
        icon: '🛫',
        // budget: '$1000 - $3000',
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Premium experiences',
        icon: '🏝️',
        // budget: 'More than $3000',
    }
]

export const AI_PROMPT = `
  Generate a travel plan for the destination: {location} for {totalDays} days. 
  Traveler type: {traveler}, with a {budget} budget. 
  Provide a list of hotel options including the name, address, and the most recent image URL (ensure the URL is working), geo coordinates, rating, and descriptions. 
  Suggest a daily itinerary with place names, details, image URLs, geo coordinates, ticket pricing, ratings, and travel time for each location for {totalDays} days, including the best time to visit. 
  Output in JSON format.
`;

// Add this to the bottom of src/constants/options.jsx
export const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=" +
  conf.googlePlaceApiKey;