import wave
from io import BytesIO

import soundfile
import librosa
import numpy as np
from fastapi import FastAPI, File, Form, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydub import AudioSegment

from model import predict_audio

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# @app.post("/upload-audio/")
# async def upload_audio(
#     name: str = Form(...),
#     age: int = Form(...),
#     gender: str = Form(...),
#     file: UploadFile = File(...),
# ):
@app.post("/upload-audio")
async def upload_audio(request: Request):
    # print(name)
    # print(age)
    # print(gender)
    # print(file)

    # data = await request.json()
    form = await request.form()
    file = form.get("audioFile")
    if file is not None:
        print(dir(file))
        audio_content = await file.read()
        print(len(audio_content))
        with open("audiofile.wav", "wb") as f:
            f.write(audio_content)

    # print(file)
    # print(dir(file))

    # # print(audio_content)

    # # print(await file.read())
    # print(dir(file.file))

    # print(file)
    # if file is not None:
    #     tmp = await file.read()
    #     print(type(tmp))
    #     print(len(tmp))

    #     # Parameters for the WAV file
    #     n_channels = 1  # Mono
    #     sampwidth = 2  # Sample width in bytes (2 bytes = 16-bit samples)
    #     framerate = 48000  # Frame rate (samples per second)
    #     n_frames = len(tmp) // sampwidth  # Number of frames

    #     f = BytesIO.read(tmp)
    #     audio_data, sample_rate = soundfile.read(f)

    #     print(f"audio_data: {audio_data}")
    #     print(f"sample_rate: {sample_rate}")

    # audio_data, sample_rate = librosa.read(file_name, res_type="kaiser_fast")

    # # Open a WAV file for writing
    # with wave.open("output.wav", "wb") as wav_file:
    #     wav_file.setnchannels(n_channels)
    #     wav_file.setsampwidth(sampwidth)
    #     wav_file.setframerate(framerate)
    #     wav_file.writeframes(tmp)

    # resp = predict_audio("output.wav")
    # print(f"Prediction: {resp}")

    # sample_rate = 44100
    # audio_data = tmp

    # mfccs = np.mean(
    #     librosa.feature.mfcc(y=audio_data, sr=sample_rate, n_mfcc=40).T, axis=0
    # )

    # print(mfccs)

    # content = await = (form.get("audioBlob").read())

    return "Done"

    # try:
    #     audio_bytes = await file.read()
    #     audio = AudioSegment.from_wav(BytesIO(audio_bytes))
    #     duration_ms = len(audio)

    #     return {"name": name, "age": age, "gender": gender, "duration": duration_ms}
    # except Exception as e:
    #     return JSONResponse(content={"error": str(e)}, status_code=400)


@app.get("/")
async def root():
    return {"message": "Welcome to the Dementia Analysis API"}
