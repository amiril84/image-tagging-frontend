# AI Image Analysis Frontend

Modern React frontend for the AI Image Analysis application, built with Vite, Tailwind CSS, and React.

## Features

- Modern and responsive UI
- Drag-and-drop image upload
- Real-time image preview
- Detailed AI analysis display
- Loading states and error handling
- Confidence score visualization
- Tag-based categorization

## Setup

1. Clone the repository:
```bash
git clone [your-repo-url]
cd ai-image-analysis-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will start on http://localhost:5173

## Usage

1. Access the application in your browser
2. Upload an image by:
   - Dragging and dropping into the upload area
   - Clicking the upload area to select a file
3. Click "Analyze Image" to process the image
4. View the results:
   - Confidence score
   - Detailed description
   - Relevant tags
5. To analyze another image, click on the current image to upload a new one

## Backend Configuration

The frontend expects the backend server to be running on http://localhost:3001. If you need to change this, update the API endpoint in `src/App.jsx`.

## Technologies Used

- React
- Vite
- Tailwind CSS
- Axios for API requests
- Lucide React for icons

## Development

To modify the application:

1. Tailwind CSS configuration is in `tailwind.config.js`
2. Main application logic is in `src/App.jsx`
3. Styles are in `src/index.css`

## Building for Production

```bash
npm run build
```

This will create a `dist` directory with the production build.

## Error Handling

The application includes comprehensive error handling for:
- Invalid file types
- Network errors
- API errors
- Loading states

## Responsive Design

The UI is fully responsive and works well on:
- Desktop browsers
- Tablets
- Mobile devices
