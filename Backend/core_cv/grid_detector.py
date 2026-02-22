import cv2
import numpy as np
from typing import List, Tuple

class GridDetector:
    def __init__(self):
        # Parameters for line detection
        self.horizontal_kernel_scale = 40
        self.vertical_kernel_scale = 40

    def extract_table(self, image_bytes: bytes) -> Tuple[np.ndarray, List[np.ndarray], List[Tuple[int, int, int, int]]]:
        """
        Processes the raw image bytes to find the table and slice it into cells.
        Returns:
            - processed_image: The image with grid lines drawn (for debugging/UI feedback).
            - cells: List of cropped cell images (numpy arrays).
            - bounding_boxes: List of (x, y, w, h) for each cell to track their position.
        """
        # 1. Decode image bytes to numpy array
        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        if img is None:
            raise ValueError("Could not decode image.")

        # 2. Convert to Grayscale & Adaptive Threshold
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Invert the image (background black, text/lines white)
        thresh = cv2.adaptiveThreshold(
            gray, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY_INV, 15, -2
        )

        # 3. Morphological Transformations to detect Lines
        # Horizontal lines
        horizontal_kernel = cv2.getStructuringElement(
            cv2.MORPH_RECT, (img.shape[1] // self.horizontal_kernel_scale, 1)
        )
        detected_h_lines = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, horizontal_kernel, iterations=2)
        
        # Vertical lines
        vertical_kernel = cv2.getStructuringElement(
            cv2.MORPH_RECT, (1, img.shape[0] // self.vertical_kernel_scale)
        )
        detected_v_lines = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, vertical_kernel, iterations=2)

        # 4. Combine lines and find Intersections/Grid
        grid = cv2.addWeighted(detected_h_lines, 0.5, detected_v_lines, 0.5, 0.0)
        grid = cv2.bitwise_not(grid) # Invert back

        # Find cells (contours)
        contours, _ = cv2.findContours(cv2.bitwise_not(grid), cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

        bounding_boxes = []
        for c in contours:
            x, y, w, h = cv2.boundingRect(c)
            # Filter out tiny noise contours or the massive outer boundary
            if w > 20 and h > 10 and w < img.shape[1] * 0.9:
                bounding_boxes.append((x, y, w, h))

        # Sort contours top-to-bottom, then left-to-right to maintain table structure
        # (This is a simplified sort; robust implementations will group by row)
        bounding_boxes = sorted(bounding_boxes, key=lambda b: (b[1] // 10, b[0]))

        cells = []
        processed_image = img.copy()

        for box in bounding_boxes:
            x, y, w, h = box
            # Draw a green rectangle for the UI
            cv2.rectangle(processed_image, (x, y), (x + w, y + h), (0, 255, 0), 2)
            
            # Crop the cell
            cell_img = img[y:y+h, x:x+w]
            cells.append(cell_img)

        return processed_image, cells, bounding_boxes
