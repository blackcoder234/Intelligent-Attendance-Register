from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any
import numpy as np
import base64
import cv2

# Import our custom AI & CV modules
from core_cv.grid_detector import GridDetector
from core_cv.text_extractor import TextExtractor
from model.classification_engine import MarkClassifier

app = FastAPI(title="Intelligent Attendance AI Pipeline")

# Allow Next.js frontend to communicate with this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize engines at startup (loads models into memory immediately)
# WARNING: TextExtractor will download ~50MB of weights on its first ever run
grid_engine = GridDetector()
text_engine = TextExtractor(languages=['en'])
mark_model = MarkClassifier()

@app.get("/")
def read_root():
    return {"status": "AI Pipeline is running", "components_ready": True}

@app.post("/process-attendance")
async def process_attendance_image(image: UploadFile = File(...)) -> Dict[str, Any]:
    """
    Endpoint to receive an image of an attendance register,
    process it through OpenCV, and return extracted JSON data.
    """
    # 1. Read raw image bytes from incoming request
    image_bytes = await image.read()
    
    # 2. Extract bounding boxes and cell images via our OpenCV OpenCV GridSlicer
    try:
        processed_img, cells, bboxes = grid_engine.extract_table(image_bytes)
    except Exception as e:
        return {"status": "error", "message": f"Grid Detection Failed: {str(e)}"}

    # --- Architectural Note: Logic Router ---
    # At this point in a real execution, we need to know WHICH cells are names
    # and WHICH cells are dates. For architecture testing, we will assume column 0
    # is Roll Number, column 1 is Name, and column 2+ are Dates.
    
    structured_data = []

    # 3. Dummy Loop logic to show how data is extracted using our Engines
    if len(cells) > 0:
        for idx, (cell_matrix, bbox) in enumerate(zip(cells, bboxes)):
            cell_data = {"bbox": bbox}

            # If we assume the first two cells in a row are Roll/Name, we use Text OCR
            if idx % 5 < 2:  # Assume 5 columns wide for dummy example
                ocr_result = text_engine.extract_text(cell_matrix)
                cell_data['type'] = 'text'
                cell_data['value'] = ocr_result['text']
                cell_data['confidence'] = ocr_result['confidence']
            
            # If we assume the rest are attendance marks, we use Machine Learning Model
            else:
                ml_result = mark_model.predict_mark(cell_matrix)
                cell_data['type'] = 'mark'
                cell_data['value'] = ml_result['label']
                cell_data['confidence'] = ml_result['confidence']

            structured_data.append(cell_data)

    # Calculate some summary stats for the payload
    total_cells_found = len(cells)

    # (Optional) Encode the neon-green processed image back as Base64 to return to Next.js UI
    _, buffer = cv2.imencode('.jpg', processed_img)
    processed_base64 = base64.b64encode(buffer).decode('utf-8')

    return {
        "status": "success",
        "message": "Image processed successfully through CV pipeline.",
        "filename": image.filename,
        "metadata": {
            "total_cells_detected": total_cells_found
        },
        "extracted_data": structured_data, # Send to Next.js
        # "processed_image_b64": processed_base64 # Enable this when UI needs it
    }
