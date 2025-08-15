from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.gemini_handler import get_gemini_response
import json, re

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeRequest(BaseModel):
    code: str
    language: str | None = None

def detect_language_from_code(code: str) -> str:
    code_lower = code.lower()
    if "def " in code_lower and "print(" in code_lower:
        return "python"
    elif "function " in code_lower or "console.log" in code_lower:
        return "javascript"
    elif "public static void main" in code_lower:
        return "java"
    elif "#include" in code_lower:
        return "c++"
    else:
        return "generic programming code"

def safe_json_extract(raw: str, fallback_code: str, lang: str):
    match = re.search(r"\{.*\}", raw, re.S)
    if not match:
        return {
            "review": raw,
            "refactored_code": f"```{lang}\n{fallback_code}\n```"
        }
    try:
        ai_data = json.loads(match.group())
    except json.JSONDecodeError:
        return {
            "review": raw,
            "refactored_code": f"```{lang}\n{fallback_code}\n```"
        }
    refactored_code = ai_data.get("refactored_code", "").strip()
    if not refactored_code.startswith("```"):
        refactored_code = f"```{lang}\n{refactored_code}\n```"
    return {
        "review": ai_data.get("review", "").strip(),
        "refactored_code": refactored_code
    }

@app.post("/review")
async def review_code(data: CodeRequest):
    if not data.code.strip():
        raise HTTPException(status_code=400, detail="Code is empty.")
    language = data.language or detect_language_from_code(data.code)
    prompt = f"""
    You are an expert {language} code reviewer.
    Respond ONLY in JSON with exactly:
    - "review": bullet point style review (string)
    - "refactored_code": improved {language} code in triple backticks.

    Code:
    {data.code}
    """
    raw_response = get_gemini_response(prompt).strip()
    return safe_json_extract(raw_response, data.code, language)
