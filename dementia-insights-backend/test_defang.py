import pyautogui
from subprocess import PIPE, Popen
import subprocess
import time

from fastapi import FastAPI
import uvicorn

app = FastAPI()


@app.get("/api/generate_defang")
def api_generate_defang():
    p = Popen("defang generate", shell=True)
    time.sleep(2)
    pyautogui.press("enter")
    time.sleep(1)
    pyautogui.press("enter")
    time.sleep(2)
    pyautogui.write(
        "Generate a landing page for custom therapy treatment for dementia, with a checklist of 7-step action plan."
    )
    time.sleep(1)
    pyautogui.press("enter")
    time.sleep(1)
    pyautogui.press("enter")
    time.sleep(30)
    resp = subprocess.Popen("cd project1 && npm i && node main.js", shell=True)

    return {"message": "success"}
