import os

import joblib
import librosa
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
from sklearn.model_selection import train_test_split


def extract_features(file_name):
    try:
        audio_data, sample_rate = librosa.load(file_name, res_type="kaiser_fast")

        # Check if audio_data is empty
        if len(audio_data) == 0:
            print(f"Empty audio file: {file_name}")
            return None

        # Extract features
        mfccs = np.mean(
            librosa.feature.mfcc(y=audio_data, sr=sample_rate, n_mfcc=40).T, axis=0
        )

        # Chroma features may fail on short or silent audio; use a try-except block
        try:
            chroma = np.mean(
                librosa.feature.chroma_stft(y=audio_data, sr=sample_rate).T, axis=0
            )
        except:
            chroma = np.zeros(12)  # Chroma has 12 bins

        zcr = np.mean(librosa.feature.zero_crossing_rate(y=audio_data).T, axis=0)
        features = np.hstack([mfccs, chroma, zcr])
    except Exception as e:
        print(f"Error encountered while parsing file: {file_name}")
        print(e)
        return None
    return features


def load_data():
    features_list = []
    labels = []

    dementia_path = "data/dementia/"
    control_path = "data/control/"

    for file_name in os.listdir(dementia_path):
        print(file_name)
        file_path = os.path.join(dementia_path, file_name)
        data = extract_features(file_path)
        if data is not None:
            features_list.append(data)
            labels.append(1)

    for file_name in os.listdir(control_path):
        file_path = os.path.join(control_path, file_name)
        data = extract_features(file_path)
        if data is not None:
            features_list.append(data)
            labels.append(0)

    return np.array(features_list), np.array(labels)


def train_model():
    X, y = load_data()
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    print("Accuracy:", accuracy_score(y_test, y_pred))
    print("Classification Report:\n", classification_report(y_test, y_pred))

    joblib.dump(model, "model/audio_dementia_model.pkl")


def predict_audio(file_name):
    loaded_model = joblib.load("model/audio_dementia_model.pkl")
    features = extract_features(file_name)
    features = features.reshape(1, -1)
    prediction = loaded_model.predict(features)
    if prediction[0] == 1:
        return "The model predicts that the person may have signs of dementia."
    else:
        return (
            "The model predicts that the person is unlikely to have signs of dementia."
        )


if __name__ == "__main__":
    # Train the model
    train_model()
    # print("MODEL TRAINED")
    # Use the model on a new audio file
    # new_audio_file = "data/dementia123/txting_press_a.wav"
    # predict_audio(new_audio_file)
