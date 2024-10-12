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
const AudioRecorder = () => {
  const [recordedUrl, setRecordedUrl] = useState("");
  const mediaStream = useRef(null);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStream.current = stream;
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };
      mediaRecorder.current.onstop = () => {
        const recordedBlob = new Blob(chunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(recordedBlob);
        setRecordedUrl(url);
        chunks.current = [];
      };
      mediaRecorder.current.start();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };
  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
    }
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => {
        track.stop();
      });
    }
  };
  return (
    <div>
      <audio controls src={recordedUrl} />
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
    </div>
  );
};
export default AudioRecorder;
