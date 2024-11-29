import { useState, useCallback } from 'react';
import axios from 'axios';
import { Upload } from 'lucide-react';

const API_URL = 'https://image-tagging-backend-production.up.railway.app';

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer?.files[0] || e.target.files[0];
    
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile);
      setError(null);
      setAnalysis(null);
      
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(droppedFile);
    } else {
      setError('Please upload an image file (JPG, PNG, etc.)');
    }
  }, []);

  const analyzeImage = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(`${API_URL}/api/analyze`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setAnalysis(response.data);
    } catch (err) {
      console.error('Analysis error:', err);
      const errorMessage = err.response?.data?.error || 
                          (err.response?.status === 401 ? 
                            'Authentication error. Please check the API key configuration.' :
                            'Failed to analyze image. Please try again.');
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          AI Image Analysis
        </h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div
            className="upload-area"
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <input
              type="file"
              className="hidden"
              id="file-upload"
              accept="image/*"
              onChange={onDrop}
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              {preview ? (
                <>
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-64 mb-4 rounded"
                  />
                  {analysis && (
                    <p className="text-sm text-blue-600 mt-2">
                      Click the image to upload a new one
                    </p>
                  )}
                </>
              ) : (
                <>
                  <Upload className="h-12 w-12 text-gray-400 mb-3" />
                  <p className="text-gray-600">
                    Drag and drop an image here, or click to select
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Supported formats: JPG, PNG, GIF (max 5MB)
                  </p>
                </>
              )}
            </label>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-center">{error}</p>
              {error.includes('API key') && (
                <p className="text-sm text-red-500 text-center mt-2">
                  Please add your OpenAI API key to the backend/.env file
                </p>
              )}
            </div>
          )}

          <button
            onClick={analyzeImage}
            disabled={!file || loading}
            className={`mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
              ${
                !file || loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } transition-colors duration-200`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </span>
            ) : 'Analyze Image'}
          </button>
        </div>

        {analysis && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Confidence Score
              </h2>
              <div className="confidence-bar">
                <div
                  className="confidence-progress"
                  style={{ width: `${analysis.confidence}%` }}
                />
              </div>
              <p className="text-right text-sm text-gray-600 mt-1">
                {analysis.confidence}%
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Description
              </h2>
              <p className="text-gray-700">{analysis.description}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Tags</h2>
              <div className="flex flex-wrap">
                {analysis.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
