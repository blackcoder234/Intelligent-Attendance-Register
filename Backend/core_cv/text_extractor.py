import easyocr
import numpy as np

class TextExtractor:
    def __init__(self, languages=['en']):
        """
        Initializes the EasyOCR reader. 
        Note: The first time this runs, it will download the pre-trained weights.
        """
        self.reader = easyocr.Reader(languages, gpu=False) # Change gpu=True if applicable
        self.confidence_threshold = 0.5

    def extract_text(self, cell_image: np.ndarray) -> dict:
        """
        Reads text from a small cell image matrix.
        Returns the recognized string and confidence score.
        """
        # EasyOCR expects a numpy array
        results = self.reader.readtext(cell_image)

        if not results:
            return {"text": "", "confidence": 0.0}

        # Take the most prominent detected text in the cell
        # result format: (bbox, text, prob)
        best_match = results[0]
        text_content = best_match[1].strip()
        confidence = best_match[2]

        return {"text": text_content, "confidence": float(confidence)}
