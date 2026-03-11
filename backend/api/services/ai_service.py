import os
from google import genai

def generate_material_summary(title, subject_name, category, description):
    """
    Calls Google Gemini to generate a short, academic summary of the uploaded study material.
    """
    try:
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            print("AI Summary Error: No GEMINI_API_KEY found in environment.")
            return "AI Summary is currently unavailable."
            
        # Initialize the GenAI client using the provided API key
        client = genai.Client(api_key=api_key)
        
        prompt = f"""
        You are an expert academic assistant for SAGE University.
        A faculty member has just uploaded a new study material. 
        Based on the following metadata, write a short, concise, and engaging 2-3 sentence summary explaining what students will learn from this document.
        Maintain an encouraging and academic tone. Do not use formatting like bold (**) or headers.

        Subject: {subject_name}
        Title: {title}
        Category: {category}
        Faculty Description: {description}

        Summary:
        """
        
        # We are using the recommended gemini-2.5-flash for fastest latency
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
        )
        return response.text.strip()
    except Exception as e:
        print(f"AI Generation Error: {e}")
        return "AI Summary is currently unavailable due to a connection issue."
