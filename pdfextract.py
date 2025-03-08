import fitz 
import base64

def pdf_to_base64():
    path = "./exmaple.pdf"

    pymupdf_text = ""
    with fitz.open(path) as doc:
        for page in doc:
            pymupdf_text += page.get_text()

    pdf_images = []
    with fitz.open(path) as doc:
        for page in doc:
            image = page.get_pixmap()
            image_data = image.tobytes("png")

            image_b64 = base64.b64encode(image_data)
            image_b64_string = image_b64.decode('utf-8')

            pdf_images.append(image_b64_string)
    
    return pymupdf_text, pdf_images
            
            # print(image_b64_string)
            # pix.save("page-%i.png" % page.number)
        # to save this and put this into the ai, i think there are two ways
        #   - turn it into base64 then send it to claude
        #   - send the png into a database, get a url link, then send it to claude

        # I think it would be much easier and faster to turn it into base64
        
    
    # print(pymupdf_text)
if __name__ == "__main__":
    pdf_to_base64()
