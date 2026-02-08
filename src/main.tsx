
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Log the initial render attempt
// console.log("Starting application render");

// Create a function to handle rendering errors at the root level
const renderApp = () => {
  try {
    const rootElement = document.getElementById("root");
    
    if (!rootElement) {
      throw new Error("Root element not found");
    }
    
    const root = createRoot(rootElement);
    root.render(<App />);
    
    // console.log("App successfully mounted"); // Debug message
  } catch (error) {
    // console.error("Failed to render the application:", error);
    
    // Render a minimal error message if the app fails to load
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="font-family: system-ui, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; text-align: center; padding: 20px;">
          <h2 style="color: #ef4444; margin-bottom: 16px;">Application Error</h2>
          <p>We're sorry, but the application failed to load properly.</p>
          <p style="margin-top: 8px; font-family: monospace; background: #f1f5f9; padding: 8px; border-radius: 4px; max-width: 80%; overflow-x: auto;">
            ${error instanceof Error ? error.message : 'Unknown error'}
          </p>
          <button 
            style="margin-top: 16px; padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;"
            onclick="window.location.reload()">
            Reload the page
          </button>
        </div>
      `;
    }
  }
};

// Start rendering the app
renderApp();
