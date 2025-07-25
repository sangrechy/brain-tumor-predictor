from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
import shap
import pandas as pd
import uvicorn
import matplotlib.pyplot as plt
import os
import uuid

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"] for stricter security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# CORS settings for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # use ["http://localhost:3000"] in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load models and encoders
type_model = joblib.load("model_tumor_type.joblib")
grade_model = joblib.load("model_who_grade.joblib")
urgency_model = joblib.load("model_urgency.joblib")

type_encoder = joblib.load("type_encoder.joblib")
grade_encoder = joblib.load("grade_encoder.joblib")
urgency_encoder = joblib.load("urgency_encoder.joblib")

# Define expected input format
class PatientData(BaseModel):
    age: int
    tumor_size: float
    tumor_location: str
    contrast_enhancement: str
    seizures: bool
    headaches: bool
    vision_problems: bool

# Convert input to feature array
def preprocess_input(data: PatientData):
    return np.array([[  
        data.age,
        data.tumor_size,
        int(data.seizures),
        int(data.headaches),
        int(data.vision_problems),
    ]])


@app.post("/predict")
async def predict(data: PatientData):
    features = preprocess_input(data)

    type_pred = type_model.predict(features)
    grade_pred = grade_model.predict(features)
    urgency_pred = urgency_model.predict(features)

    tumor_type = type_encoder.inverse_transform(type_pred)[0]
    grade = grade_encoder.inverse_transform(grade_pred)[0]
    urgency = urgency_encoder.inverse_transform(urgency_pred)[0]

    return {
        "tumor_type": tumor_type,
        "grade": grade,
        "urgency": urgency
    }

@app.post("/explain")
async def explain(data: PatientData):
    features = preprocess_input(data)
    df = pd.DataFrame(features, columns=[f"f{i}" for i in range(features.shape[1])])

    explainer = shap.TreeExplainer(type_model)
    shap_values = explainer.shap_values(df)

    plt.clf()
    shap.plots._waterfall.waterfall_legacy(
        explainer.expected_value, shap_values[0], df.iloc[0], show=False
    )
    plot_id = f"shap_{uuid.uuid4().hex[:8]}.png"
    plot_path = os.path.join("static", plot_id)
    os.makedirs("static", exist_ok=True)
    plt.savefig(plot_path)

    return {"shap_plot_url": f"/{plot_path}"}

@app.get("/")
def root():
    return {"message": "✅ Dharan Tumor Prediction API is running!"}
