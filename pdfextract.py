import fitz 

path = "C:\\Users\\verys\\Documents\\prereqsearch\\testpdf.pdf"

with fitz.open(path) as doc:
    pymupdf_text = ""
    for page in doc:
        pymupdf_text += page.get_text()
print(pymupdf_text)
