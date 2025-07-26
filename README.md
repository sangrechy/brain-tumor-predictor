# 🧠 NeuroOncoPredict AI - Brain Tumor Prediction App

A browser-based machine learning application that predicts brain tumor type, WHO grade, and urgency level based on clinical features.

# Note : You must have installed python and git.

---

## 📁 Project Structure

```
brain-tumor-predictor/
├── backend/
│   ├── main.py                     # FastAPI backend
│   ├── requirements.txt           # Python dependencies
│   ├── model_tumor_type.joblib    # ML model for tumor type
│   ├── model_who_grade.joblib     # ML model for WHO grade
│   ├── model_urgency.joblib       # ML model for urgency
│   ├── type_encoder.joblib
│   ├── grade_encoder.joblib
│   ├── urgency_encoder.joblib
│
├── frontend/
│   ├── index.html                 # Main HTML UI
│   ├── style.css                  # Dark/Light theme + styling
│   ├── app.js                     # Form logic + request handling
│
├── run_app.bat                    # Batch file to activate and run backend+frontend
├── setup.bat                      # Optional: Clone + setup venv + install
```

---

## 🚀 How to Run the App

### 🧾 Step-by-step Setup

1. **Clone the repository**:

```bash
git clone https://github.com/sangrechy/brain-tumor-predictor.git
cd brain-tumor-predictor
```

2. **Create and activate virtual environment**:

```bash
cd backend
python -m venv venv
venv\Scripts\activate
```

3. **Install required packages**:

```bash
pip install -r requirements.txt
```

4. **Run the application**:

```bash
cd ..
run_app.bat
```

This will:

* Start the FastAPI backend on `http://127.0.0.1:8000`
* Open the frontend on `http://127.0.0.1:3000`

> 📌 You may need to allow firewall access the first time.

---

## ✨ Features

* Predicts:

  * Tumor Type (e.g., Glioblastoma, Meningioma, etc.)
  * WHO Grade (I–IV)
  * Urgency Level (Low/Medium/High)
* Clean commercial-style UI (Dark/Light theme toggle)
* Interactive sliders and toggle switches
* SHAP-based visual explainability (backend response)
* Fully local setup with `.bat` automation scripts

---

## 🔮 Future Enhancements

* MRI image upload support using CNNs (e.g., BraTS)
* Cloud deployment (e.g., ngrok, Vercel, or AWS)
* Multilingual UI for wider accessibility
* User authentication for secure predictions

---

## 🔗 Links

* GitHub: [github.com/sangrechy/brain-tumor-predictor](https://github.com/sangrechy/brain-tumor-predictor)
* Developer: Mithun Sakthivel
* Email: [stmithun.cse2024@citchennai.net](mailto:stmithun.cse2024@citchennai.net)

> 💡 For Windows users only. Ensure Python 3.11+ and Git are installed.

---

**🧠 NeuroOncoPredict AI – Fast, portable, and interpretable brain tumor prediction.**
