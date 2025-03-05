import fitz 
import base64

def pdf_to_base64():
    path = "./attention.pdf"

    with fitz.open(path) as doc:
        pymupdf_text = ""
        for page in doc:
            pymupdf_text += page.get_text()

    with fitz.open(path) as doc:
        for page in doc:
            image = page.get_pixmap()
            image_data = image.tobytes("png")

            image_b64 = base64.b64encode(image_data)
            image_b64_string = image_b64.decode('utf-8')

            return image_b64_string
            
            # print(image_b64_string)
            # pix.save("page-%i.png" % page.number)
        # to save this and put this into the ai, i think there are two ways
        #   - turn it into base64 then send it to claude
        #   - send the png into a database, get a url link, then send it to claude

        # I think it would be much easier and faster to turn it into base64
        
    
    # print(pymupdf_text)
