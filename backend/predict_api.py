import sys
import json
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import os

# Suppress TensorFlow logs
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

def predict(img_path):
    try:
        # Load model (adjust path as needed)
        # Assuming script is in backend/ and model is in root BrainProject/
        model_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../brain_tumor_model.keras'))
        
        if not os.path.exists(model_path):
            print(json.dumps({"error": f"Model not found at {model_path}"}))
            return

        model = load_model(model_path)

        # Preprocess image
        img = image.load_img(img_path, target_size=(299, 299))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array /= 255.0  # Rescale as per training

        # Predict
        prediction = model.predict(img_array, verbose=0)
        predicted_class_index = np.argmax(prediction)
        confidence = float(np.max(prediction))

        labels = ['glioma', 'meningioma', 'notumor', 'pituitary']
        predicted_class = labels[predicted_class_index]

        result = {
            "class": predicted_class,
            "confidence": confidence
        }
        
        print(json.dumps(result))

    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    if len(sys.argv) > 1:
        img_path = sys.argv[1]
        predict(img_path)
    else:
        print(json.dumps({"error": "No image path provided"}))
