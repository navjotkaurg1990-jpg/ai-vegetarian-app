from fastapi import FastAPI, UploadFile, File, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import anthropic
import os
import json
import base64

app = FastAPI(title="AI Vegetarian Detector API")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextAnalysisRequest(BaseModel):
    text: str

# Use the Anthropic client
# We expect the API key to be in the environment variable ANTHROPIC_API_KEY
client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY", ""))

SYSTEM_PROMPT = """Act as an expert food scientist. Read the image or text provided. Identify all ingredients and translate them to English if necessary. Classify each into one of these strict categories: "Vegan", "Vegetarian", "Egg", "Dairy", "Meat/Fish", "Insect", or "Needs Checking". 

Return ONLY a valid JSON object (no markdown formatting, no code blocks) with the following structure:
{
    "verdict": "Vegan" | "Vegetarian" | "Non-Vegetarian" | "Needs Checking",
    "reasoning": "Brief 1-2 sentence explanation",
    "ingredients": [
        {
            "name": "Ingredient name",
            "classification": "Vegan" | "Vegetarian" | "Egg" | "Dairy" | "Meat/Fish" | "Insect" | "Needs Checking"
        }
    ]
}"""

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}

@app.post("/api/analyze/text")
async def analyze_text(request: TextAnalysisRequest):
    if not client.api_key:
        raise HTTPException(status_code=500, detail="ANTHROPIC_API_KEY environment variable is missing")
    
    try:
        response = client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=1500,
            system=SYSTEM_PROMPT,
            messages=[
                {"role": "user", "content": request.text}
            ]
        )
        # Parse the JSON response
        result_text = response.content[0].text
        # Clean up any potential markdown formatting
        clean_json = result_text.replace("```json", "").replace("```", "").strip()
        return json.loads(clean_json)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/analyze/image")
async def analyze_image(file: UploadFile = File(...)):
    if not client.api_key:
        raise HTTPException(status_code=500, detail="ANTHROPIC_API_KEY environment variable is missing")
    
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    # Read the file content
    content = await file.read()
    base64_image = base64.b64encode(content).decode("utf-8")
    
    try:
        response = client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=1500,
            system=SYSTEM_PROMPT,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": file.content_type,
                                "data": base64_image
                            }
                        },
                        {
                            "type": "text",
                            "text": "Analyze the ingredients in this image."
                        }
                    ]
                }
            ]
        )
        
        result_text = response.content[0].text
        clean_json = result_text.replace("```json", "").replace("```", "").strip()
        return json.loads(clean_json)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
