import "./globals.css";

import React, { useRef, useState } from "react";

export default function Upload() {
  //   let mediaRecorder;
  //   let audioChunks = [];
  //   const recordButton = document.getElementById("recordButton");
  //   const stopButton = document.getElementById("stopButton");
  //   const pulseRing = document.querySelector(".pulse-ring");
  //   const audioPlayback = document.getElementById("audioPlayback");
  //   let audioContext, analyser, dataArray;

  //   // Handle recording functionality
  //   recordButton.addEventListener("click", async () => {
  //     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  //     mediaRecorder = new MediaRecorder(stream);
  //     audioChunks = [];

  //     mediaRecorder.addEventListener("dataavailable", (event) => {
  //       audioChunks.push(event.data);
  //     });

  //     mediaRecorder.addEventListener("stop", () => {
  //       const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
  //       const audioUrl = URL.createObjectURL(audioBlob);
  //       audioPlayback.src = audioUrl;

  //       const recordingInput = document.createElement("input");
  //       recordingInput.type = "hidden";
  //       recordingInput.name = "recording";
  //       recordingInput.value = audioUrl;
  //       document.getElementById("recordForm").appendChild(recordingInput);
  //     });

  //     audioContext = new AudioContext();
  //     const source = audioContext.createMediaStreamSource(stream);
  //     analyser = audioContext.createAnalyser();
  //     analyser.fftSize = 256;
  //     const bufferLength = analyser.frequencyBinCount;
  //     dataArray = new Uint8Array(bufferLength);

  //     source.connect(analyser);

  //     mediaRecorder.start();
  //     recordButton.disabled = true;
  //     stopButton.disabled = false;

  //     animatePulse();
  //   });

  //   stopButton.addEventListener("click", () => {
  //     mediaRecorder.stop();
  //     recordButton.disabled = false;
  //     stopButton.disabled = true;
  //     cancelAnimationFrame(animationId);
  //   });

  //   // Animate the pulse based on voice volume
  //   let animationId;
  //   function animatePulse() {
  //     analyser.getByteTimeDomainData(dataArray);
  //     const amplitude = Math.max(...dataArray) - 128; // Calculate amplitude from data

  //     // Scale the pulse size and reduce opacity based on amplitude
  //     const scale = 1 + amplitude / 80; // Adjusted for a smoother ripple
  //     pulseRing.style.transform = `scale(${scale})`;
  //     pulseRing.style.opacity = 0.7 - amplitude / 255; // Softer fade

  //     animationId = requestAnimationFrame(animatePulse);
  //   }

  const [recordedUrl, setRecordedUrl] = useState("");
  const mediaStream = useRef(null);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
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
      console.log("Start recording.");
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
    console.log(recordedUrl);
    console.log("Stop Recording.");
  };

  return (
    <main>
      <header>
        <h1>Record Your Voice for Dementia Detection</h1>
        <p>Analyze voice recordings to detect early signs of dementia</p>
      </header>

      <nav>
        <ul>
          <li>
            <a href="home.html">Home</a>
          </li>
          <li>
            <a href="#">Upload</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
        </ul>
      </nav>

      <section class="upload-form">
        <h2>Record Your Voice for Analysis</h2>
        <form
          id="recordForm"
          action="/submit-recording"
          method="post"
          enctype="multipart/form-data"
        >
          <label for="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            required
          />

          <label for="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            placeholder="Enter your age"
            required
          />

          <label for="gender">Gender:</label>
          <select id="gender" name="gender" required>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <label for="recording">Record Your Voice:</label>

          <button
            type="button"
            id="recordButton"
            class="record-btn"
            onClick={startRecording}
          >
            Start Recording
          </button>
          <button
            type="button"
            id="stopButton"
            class="record-btn"
            onClick={stopRecording}
          >
            Stop Recording
          </button>

          <div class="listening-animation" id="listeningAnimation">
            <div class="pulse-ring"></div>
            <div class="pulse-center"></div>
          </div>

          <audio controls src={recordedUrl} />
          <button type="submit">Submit for Analysis</button>
        </form>

        <a href="home.html" class="cta-button">
          Back to Home
        </a>
      </section>

      <footer>
        <p>&copy; 2024 Dementia Detection Platform. All rights reserved.</p>
      </footer>
    </main>
  );
}
