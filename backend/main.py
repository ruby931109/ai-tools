from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import pipeline

from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"message": "Hello, world!"}

# Initialize the summarization pipeline
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

# Define the request body
class SummarizationRequest(BaseModel):
    text: str

# Define the response model
class SummarizationResponse(BaseModel):
    summary: str

@app.post("/api/summarize", response_model=SummarizationResponse)
async def summarize(request: SummarizationRequest):
    try:
        # Run the summarization pipeline with some parameters
        result = summarizer(request.text, max_length=130, min_length=30, do_sample=False)
        summary_text = result[0]["summary_text"]
        return SummarizationResponse(summary=summary_text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))