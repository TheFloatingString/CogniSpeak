from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
from pydub import AudioSegment
from io import BytesIO

app = FastAPI()

@app.post("/upload-audio/")
async def upload_audio(
    name: str = Form(...),
    age: int = Form(...),
    gender: str = Form(...),
    file: UploadFile = File(...)
):
    try:

        audio_bytes = await file.read()


        audio = AudioSegment.from_wav(BytesIO(audio_bytes))


        duration_ms = len(audio)


        return {
            "name": name,
            "age": age,
            "gender": gender,
            "duration": duration_ms
        }
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)

@app.get("/")
async def root():
    return {"message": "Welcome to the Dementia Analysis API"}
