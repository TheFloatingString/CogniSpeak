import "./globals.css";

import axios from "axios";

import { useRef, useState } from "react";
import { useEffect } from "react";

export default function Upload() {
  const cloudflareResp = {
    questions: [
      { id: 1, question: "What were you doing one hour ago?" },
      { id: 2, question: "What did you have for dinner last night?" },
      {
        id: 3,
        question:
          "Can you recall and name three objects that were in this room 10 minutes ago?",
      },
      {
        id: 4,
        question:
          "Can you recall and describe the plot of a book you finished recently?",
      },
      {
        id: 5,
        question: "What is today’s date? (Including day, month, and year)",
      },
      {
        id: 6,
        question:
          "Can you remember the names of three new individuals you have recently met?",
      },
      {
        id: 7,
        question: "What was the color of the shirt you wore yesterday?",
      },
      {
        id: 8,
        question:
          "Can you recall and describe in detail an interesting news article or TV show you watched this week?",
      },
      {
        id: 9,
        question: "Name the last three places you have visited prior to today.",
      },
      {
        id: 10,
        question: "What were the main ingredients in the last meal you cooked?",
      },
    ],
  };

  const [recordedUrl, setRecordedUrl] = useState("");
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaStream = useRef(null);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const [modelAnswer, setModelAnswer] = useState("");
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
        console.log(recordedBlob);
        console.log(chunks);
        console.log(url);
        setRecordedUrl(url);
        chunks.current = [];

        const blobFile = new File([recordedBlob], "recordedBlob");
        const formDataAudio = new FormData();
        formDataAudio.append("audioBlob", recordedBlob);
        formDataAudio.append("audioFile", blobFile);

        console.log(blobFile);
        // saveAs(blobFile, "hackHarvardTest.wav");
        // fs.writeFileSync("audio.wav", Buffer.from(chunks));
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
      console.log(chunks);
    }
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => {
        track.stop();
      });
    }
    console.log(recordedUrl);
    console.log("Stop Recording.");

    var formData = new FormData();
    formData.append("name", "Bob");
    console.log(audioBlob);
    console.log(chunks);

    axios({
      method: "post",
      url: "https://e0a8-67-134-206-60.ngrok-free.app/upload-audio",
      data: formData,
      headers: { "Content-Type": "mutlipart/form-data" },
    }).then((resp) => {
      console.log(resp);
      setModelAnswer(resp.data.prediction);
    });
  };

  const submitForAnalysis = () => {
    var formData = new FormData();
    formData.append("name", "Alex");

    console.log(audioBlob);
    console.log(chunks);

    axios({
      method: "post",
      url: "http://localhost:8000/upload-audio",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  //   useEffect(() => {
  //     console.log("hi!");
  //     axios
  //       .get("https://openai-aig.jacobcardoso2003.workers.dev")
  //       .then((resp) => {
  //         {
  //           console.log(resp);
  //         }
  //       }, []);
  //   });

  let listOfQuestions = [];

  for (let i = 0; i < cloudflareResp.questions.length; i++) {
    console.log(i);
    listOfQuestions.push(<li>{cloudflareResp.questions[i].question}</li>);
  }

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

      <div className="flex flex-row">
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
        {/* 
<button type="submit" onClick={submitForAnalysis}>
    Submit for Analysis
</button> 
*/}
          </form>

          <a href="home.html" class="cta-button">
            Back to Home
          </a>
        </section>

        <section class="upload-form">
          <h2>Dashboard</h2>

          {listOfQuestions}

          <h2>Results</h2>
          {modelAnswer}
        </section>
      </div>


      <footer>
        <p>&copy; 2024 Dementia Detection Platform. All rights reserved.</p>
      </footer>
    </main>
  );
}
