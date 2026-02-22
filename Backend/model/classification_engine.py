import numpy as np
import cv2

class MarkClassifier:
    def __init__(self):
        """
        Initializes the Model architecture and loads PyTorch/TensorFlow weights.
        Since we have no data yet, this acts as a placeholder structure.
        """
        self.model_loaded = False
        self.categories = ['P', 'A', 'BLANK']

    def preprocess_image(self, cell_image: np.ndarray) -> np.ndarray:
        """
        Resize and normalize the image exactly how the model was trained.
        e.g. grayscale, 28x28 padding, float32 conversion.
        """
        gray = cv2.cvtColor(cell_image, cv2.COLOR_BGR2GRAY)
        resized = cv2.resize(gray, (64, 64))
        normalized = resized / 255.0
        return normalized

    def predict_mark(self, cell_image_matrix: np.ndarray) -> dict:
        """
        Receives an individual cropped cell image matrix.
        Returns the classification result: 'P', 'A', or 'BLANK'.
        """
        # Preprocess Before Sending to Model
        processed = self.preprocess_image(cell_image_matrix)

        # --- Future ML Inference Call ---
        # prediction = self.model.predict(np.expand_dims(processed, axis=0))
        # confidence = np.max(prediction)
        # label_idx = np.argmax(prediction)
        # return {"label": self.categories[label_idx], "confidence": float(confidence)}

        # Dummy Pixel Density Fallback for until we train the model
        dark_pixels = np.sum(processed < 0.5)
        total_pixels = processed.size
        density = dark_pixels / total_pixels

        if density < 0.05:
            label = "BLANK"
            conf = 0.90
        elif density > 0.30:
            label = "P" # Dummy logic assuming heavy writing = P
            conf = 0.60
        else:
            label = "A" # Dummy logic assuming light mark = A
            conf = 0.40

        return {"label": label, "confidence": conf}
