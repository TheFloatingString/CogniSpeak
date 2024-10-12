"use client";

import { useState, useRef } from "react";
// import { ReactMediaRecorder } from "react-media-recorder";
// import { useReactMediaRecorder } from "react-media-recorder";

// const RecordView = () => (
//   <div>
//     <ReactMediaRecorder
//       video
//       render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
//         <div>
//           <p>{status}</p>
//           <button onClick={startRecording}>Start Recording</button>
//           <button onClick={stopRecording}>Stop Recording</button>
//           <video src={mediaBlobUrl} controls autoPlay loop />
//         </div>
//       )}
//     />
//   </div>
// );

export default function Home() {
  // const { status, startRecording, stopRecording, mediaBlobUrl } =
  //   useReactMediaRecorder({ video: true });

  return (
    <main>
      <p>Dementia Insights</p>
      {/* <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button> */}
    </main>
  );
}
