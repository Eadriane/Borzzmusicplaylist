# WinxMPL

A modern, responsive music player web application with an elegant dark theme interface.

## Features

- 🎵 **Song Library**: Browse and play a collection of songs
- 🎚️ **Player Controls**: Play, pause, next, previous controls
- 🔊 **Volume Control**: Adjust volume with a slider
- ⏱️ **Playback Speed**: Adjust playback speed from 0.5x to 2.0x
- 🔁 **Repeat Modes**: No repeat, repeat all, or repeat one song
- 🔀 **Shuffle**: Randomize song playback
- 📊 **Progress Bar**: Visual progress indicator with seek functionality
- 🎨 **Modern UI**: Dark theme with neon cyan accents
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile

## How to Run Locally

### Option 1: VS Code Live Server (Recommended)
1. Open this folder in VS Code
2. Install the "Live Server" extension if not already installed
3. Right-click and select "Open with Live Server"
4. The site will open at `http://127.0.0.1:5500` (or similar)

### Option 2: Python
```bash
python -m http.server 8080
# Then open http://localhost:8080
```

### Option 3: Node.js
```bash
npx http-server -p 8080
# Then open http://localhost:8080
```

## Files

- `index.html` - Main HTML structure
- `style.css` - Styling and layout
- `script.js` - Player functionality and interactions

## Customization

### Add Your Own Songs
Edit the `songs` array in `script.js`:
```javascript
const songs = [
    {
        id: 1,
        title: "Your Song Title",
        artist: "Artist Name",
        album: "Album Name",
        duration: 240, // in seconds
        url: "https://path-to-your-audio-file.mp3",
        image: "https://path-to-album-art.jpg"
    },
    // ... more songs
];
```

## Deployment

### GitHub Pages
1. Push this repo to GitHub
2. Enable GitHub Pages in Settings
3. Choose the main branch as the source
4. Your site will be available at `https://username.github.io/repo-name/`

### Netlify
1. Drag and drop this folder to https://app.netlify.com/drop
2. Or connect your GitHub repo for automatic deployments

### Vercel
1. Import your GitHub repo
2. Deploy with default settings

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Font Awesome Icons

## Credits

Code by: @Borjzz

## License

Free to use and modify for personal projects.
