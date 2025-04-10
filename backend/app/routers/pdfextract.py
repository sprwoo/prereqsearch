import fitz 
import base64

def extract_first_page(paper):
    with fitz.open(stream=paper, filetype="pdf") as doc:
        # Extract text from the first page
        first_page_text = doc[0].get_text("text")
        
    return first_page_text

def pdf_to_base64(paper):
    pymupdf_text = ""
    with fitz.open(paper) as doc:
        for page in doc:
            pymupdf_text += page.get_text()

    pdf_images = []
    with fitz.open(paper) as doc:
        for page in doc:
            image = page.get_pixmap()
            image_data = image.tobytes("png")

            image_b64 = base64.b64encode(image_data)
            image_b64_string = image_b64.decode('utf-8')

            pdf_images.append(image_b64_string)
    
    return pymupdf_text, pdf_images

if __name__ == "__main__":
    pdf_to_base64()
