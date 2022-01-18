## NEXT.JS 12 with TailwindCSS

npx create-next-app spotify-clone
cd spotify-clone
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

Add the paths to all of your template files in your tailwind.config.js file.
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

Add the @tailwind directives for each of Tailwind’s layers to your ./styles/globals.css file.
@tailwind base;
@tailwind components;
@tailwind utilities;

Run your build process with "npm run dev".

## About

I build this clone by using spotify api, as we know there are so many things in Spotify like trendings, artists, charts, genre, liked songs, playlists, tracks etc. But I include playlists, tracks and recents tracks in spotify-clone.  

## Screenshots
<img width="1552" alt="Screenshot 2022-01-17 at 3 45 40 PM" src="https://user-images.githubusercontent.com/69674721/149878424-6b1d97c6-7003-4449-bb68-dc56283263e6.png">

<img width="1552" alt="Screenshot 2022-01-17 at 3 45 54 PM" src="https://user-images.githubusercontent.com/69674721/149878448-9c7b3fb4-8fc8-4cd2-8c93-3451ee62d6f7.png">
