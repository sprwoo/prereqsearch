import fitz 

if __name__ == "__main__":
    path = "./attention.pdf"

    with fitz.open(path) as doc:
        pymupdf_text = ""
        for page in doc:
            pymupdf_text += page.get_text()

    with fitz.open(path) as doc:
        for page in doc:
            pix = page.get_pixmap()
            pix.save("page-%i.png" % page.number)
            # to save this and put this into the ai, i think there are two ways
            #   - turn it into base64 then send it to claude
            #   - send the png into a database, get a url link, then send it to claude
    
    print(pymupdf_text)
