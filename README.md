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

<img width="1438" alt="Screenshot 2022-01-17 at 3 45 40 PM" src="https://user-images.githubusercontent.com/69674721/149880782-ff2d4f45-7e78-4f68-90d4-38d7154b7b45.png">

<img width="1438" alt="Screenshot 2022-01-17 at 3 45 54 PM" src="https://user-images.githubusercontent.com/69674721/149880800-0f3597dc-7089-428a-b01e-b452572783c1.png">
