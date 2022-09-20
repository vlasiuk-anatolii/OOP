// import React from 'react';
// import ReactDOM from 'react-dom/client';
import './index.css';
import Canvas from "./Classes/Canvas";
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

const canvas = new Canvas(document.getElementById('canvas') as HTMLCanvasElement, 750, 450);

const button = document.getElementById('btn');
if (button) {
  button.onclick = () => {
    if (!canvas.isPressed) {
      canvas.animation();
    };

    canvas.isPressed = true;
  }
}

