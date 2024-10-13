// "use client";

// import { useState, useRef } from "react";

// export default function Home() {
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioUrl, setAudioUrl] = useState(null);
//   const mediaRecorderRef = useRef(null);
//   const audioChunks = useRef([]);

//   const handleStartRecording = async () => {
//     setIsRecording(true);
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     mediaRecorderRef.current = new MediaRecorder(stream);
//     mediaRecorderRef.current.ondataavailable = (event) => {
//       audioChunks.current.push(event.data);
//     };
//     mediaRecorderRef.current.onstop = () => {
//       const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
//       const audioUrl = URL.createObjectURL(audioBlob);
//       setAudioUrl(audioUrl);
//       audioChunks.current = [];
//     };
//     mediaRecorderRef.current.start();
//   };

//   const handleStopRecording = () => {
//     setIsRecording(false);
//     mediaRecorderRef.current.stop();
//   };

//   return (
//     <div>
//       <h1>Audio Recording with Next.js</h1>
//       <div>
//         {isRecording ? (
//           <button onClick={handleStopRecording}>Stop Recording</button>
//         ) : (
//           <button onClick={handleStartRecording}>Start Recording</button>
//         )}
//       </div>
//       {audioUrl && (
//         <div>
//           <h3>Recorded Audio</h3>
//           <audio controls src={audioUrl}></audio>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import React, { useRef, useState } from "react";
const Home = () => {
  return (
    <main>
      <header>
        <h1>Dementia Detection Platform</h1>
        <p>Identify Early Signs of Dementia Using AI Voice Analysis</p>
      </header>

      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/upload">Upload</a>
          </li>
          <li>
            <a href="#contact">Contact Us</a>
          </li>
        </ul>
      </nav>

      <section class="hero">
        <h1>Welcome to Our Dementia Detection Service</h1>
        <p>
          Upload your voice recording and let our AI analyze it for early signs
          of dementia.
        </p>
        <a href="/upload" class="cta-button">
          Upload Voice Recording
        </a>
      </section>

      <footer>
        <p>&copy; 2024 Dementia Detection Platform. All rights reserved.</p>
      </footer>
    </main>
  );
};
export default Home;
