import numpy as np
from fastapi import FastAPI, File, Form, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from model import predict_audio
from pydub import AudioSegment

import requests
import subprocess

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
    requests.get("http://localhost:8080/api/generate_defang")

    return {"prediction": prediction}


@app.post("/api/create_custom_webapp")
async def api_create_custom_webapp(request: Request):
    data = await request.json()
    subprocess.run("defang")
    return {"message": "success"}


@app.get("/")
async def root():
    return {"message": "Welcome to the Dementia Analysis API"}
