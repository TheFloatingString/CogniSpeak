import numpy as np
from fastapi import FastAPI, File, Form, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from model import predict_audio
from pydub import AudioSegment

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/upload-audio")
async def upload_audio(request: Request):
    form = await request.form()
    file = form.get("audioFile")
    if file is not None:
        print(dir(file))
        audio_content = await file.read()
        print(len(audio_content))
        with open("audiofile.wav", "wb") as f:
            f.write(audio_content)
    prediction = predict_audio(file_name="audiofile.wav")

    return {"prediction": prediction}


@app.get("/")
async def root():
    return {"message": "Welcome to the Dementia Analysis API"}
