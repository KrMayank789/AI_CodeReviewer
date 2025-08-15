import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise ValueError("GEMINI_API_KEY not set in .env")

genai.configure(api_key=API_KEY)

def get_gemini_response(prompt: str) -> str:
    """
    Sends a prompt to Google Gemini and returns the response text.
    Uses the latest available Gemini model for text.
    """
    try:
        # Use the latest text-capable model
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        return response.text if hasattr(response, "text") else str(response)
    except Exception as e:
        raise RuntimeError(f"Error fetching response from Gemini: {e}")
