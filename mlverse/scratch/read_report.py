import docx

def read_docx(file_path):
    doc = docx.Document(file_path)
    full_text = []
    for para in doc.paragraphs:
        full_text.append(para.text)
    return '\n'.join(full_text)

file_path = 'mlverse/client/public/SIN_School_AI_Streamlit_Tools_Final_Report.docx'
try:
    content = read_docx(file_path)
    print(content[:2000]) # Print first 2000 chars
except Exception as e:
    print(f"Error: {e}")
