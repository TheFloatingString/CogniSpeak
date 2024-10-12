from pydub import AudioSegment

def process_audio(uploaded_file):
    # saving the file
    file_location = f"temp/{uploaded_file.filename}"
    with open(file_location, "wb+") as file_object:
        file_object.write(uploaded_file.file.read())
    
    # Process the audio (e.g., convert to text, etc.)
    audio = AudioSegment.from_file(file_location)
    #process audio here
    
    return "Processed audio successfully"
