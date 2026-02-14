<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1GZn2rPK-eZM8xwvTNDh_Ex3aTI1uVz10

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`

2. **Optional: Set up Gemini API Key for AI Features**

   The app works without an API key using sample content. For AI-generated roadmaps and quizzes:

   - Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Open `.env.local` file
   - Replace `PLACEHOLDER_API_KEY` with your actual Gemini API key:
     ```
     GEMINI_API_KEY=your_actual_api_key_here
     ```

3. Run the app:
   `npm run dev`

## Features

- **Dynamic Engineering Roadmaps**: Generate learning paths for any engineering field (uses AI when API key is configured, otherwise provides sample roadmaps)
- **Interactive Quizzes**: Test your knowledge with questions and hints (AI-generated when API key is available, otherwise uses sample questions)
- **Progress Tracking**: Mark steps as complete and track your journey
- **Simple English**: Easy-to-understand explanations and instructions
- **No API Key Required**: App works immediately with sample content
