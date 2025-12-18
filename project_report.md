# Brain Tumor Detection Project Report

## 1. Project Overview
This project is a full-stack web application designed to detect brain tumors from MRI scans. It utilizes a deep learning model to classify MRI images into four categories: Glioma, Meningioma, Pituitary tumor, and No tumor. The application features a modern React-based frontend for user interaction and a Node.js backend that interfaces with a Python script for model inference.

## 2. System Architecture

### 2.1 Frontend
-   **Framework**: React (built with Vite)
-   **Styling**: Tailwind CSS for a responsive and modern UI.
-   **Key Components**:
    -   `ImageUpload`: Handles file selection and preview.
    -   `ResultDisplay`: Shows the prediction result and confidence score.
    -   `App.jsx`: Main application logic managing state and API calls.
-   **Communication**: Uses `axios` to send image data to the backend API.

### 2.2 Backend
-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **File Handling**: `multer` for handling `multipart/form-data` (image uploads).
-   **Inference Interface**: `python-shell` is used to spawn a Python process and execute the inference script (`predict_api.py`).
-   **API Endpoints**:
    -   `POST /api/predict`: Accepts an image file, runs the prediction script, and returns the result.
    -   `GET /api/history`: Returns the history of recent predictions (stored in-memory).

### 2.3 Model & AI
-   **Model Architecture**: Xception (implied by input size `299x299` and context).
-   **Framework**: TensorFlow/Keras.
-   **Input Resolution**: 299x299 pixels.
-   **Classes**:
    1.  **Glioma**
    2.  **Meningioma**
    3.  **Notumor**
    4.  **Pituitary**
-   **Training**: The model is trained using `ImageDataGenerator` for data augmentation and preprocessing (rescaling 1/255).

## 3. Workflow
1.  **User Action**: User selects an MRI image via the frontend interface.
2.  **Upload**: The frontend sends the image to the backend `/api/predict` endpoint.
3.  **Processing**:
    -   The backend saves the image temporarily.
    -   It invokes `predict_api.py` with the path to the saved image.
4.  **Inference**:
    -   The Python script loads the trained model (`brain_tumor_model.keras`).
    -   It preprocesses the image (resize to 299x299, normalize).
    -   It performs inference and outputs the predicted class and confidence as JSON.
5.  **Response**: The backend parses the JSON output and sends it back to the frontend.
6.  **Display**: The frontend displays the prediction result to the user.

## 4. Model Verification
Two utility scripts are provided to evaluate the trained model:
-   **`test_accuracy.py`**: Performs batch evaluation on the test dataset (subset of 20 images/class). It generates a classification report and confusion matrix. *Recent runs show 100% accuracy on this subset.*
-   **`verify_fix.py`**: Performs a spot-check on a single random test image to verify predictions and probability scores.

## 5. Key Files
-   `model.ipynb`: Jupyter notebook for model training and evaluation.
-   `backend/server.js`: Main entry point for the backend server.
-   `backend/predict_api.py`: Python script for running inference on a single image.
-   `frontend/src/App.jsx`: Main frontend component.
-   `test_accuracy.py`: Script for batch accuracy testing.
-   `verify_fix.py`: Script for single image verification.
