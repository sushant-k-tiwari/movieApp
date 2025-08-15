# MovieApp

A React Native movie application built with Expo Router and NativeWind.

## Features

- Search for movies and TV shows
- View movie details
- Modern UI with Tailwind CSS
- Responsive design

## Setup

### Prerequisites

- Node.js (v18 or higher)
- Expo CLI
- Android Studio / Xcode (for mobile development)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Setup

**Important**: You need to set up an OMDb API key to use this application.

1. Get a free API key from [OMDb API](http://www.omdbapi.com/)
2. Create a `.env` file in the root directory:
   ```bash
   # .env
   EXPO_PUBLIC_OMDB_API_KEY=your_actual_api_key_here
   ```
3. Replace `your_actual_api_key_here` with your actual API key
4. **Important**: After creating the `.env` file, restart your development server

### Running the App

```bash
# Start the development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on web
npm run web
```

## Project Structure

- `app/` - Expo Router pages and layouts
- `components/` - Reusable React components
- `services/` - API services and custom hooks
- `constants/` - App constants and assets
- `interfaces/` - TypeScript type definitions

## Technologies Used

- React Native
- Expo Router
- NativeWind (Tailwind CSS for React Native)
- TypeScript
- OMDb API

## Troubleshooting

If you see "OMDb API key is required" error:

1. Make sure you have created a `.env` file
2. Verify your API key is correct
3. **Restart the development server** after adding the `.env` file
4. Check that the `.env` file is in the root directory (same level as `package.json`)

### Common Issues

- **API key not working**: Make sure you're using the correct environment variable name: `EXPO_PUBLIC_OMDB_API_KEY`
- **Still getting errors after adding .env**: You must restart the development server after creating/modifying the `.env` file
- **Invalid API key**: Verify your API key at [OMDb API](http://www.omdbapi.com/) - it should be a longer string, not just numbers

## License

MIT
