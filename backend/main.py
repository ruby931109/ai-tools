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

# @app.get("/")
# async def read_root():
#     return {"message": "Hello, world!"}

# Initialize pipelines
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
sentiment_analyzer = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")

# Define the request body
class SummarizationRequest(BaseModel):
    text: str

class SentimentRequest(BaseModel):
    text: str

# Define the response model
class SummarizationResponse(BaseModel):
    summary: str
	
class SentimentResponse(BaseModel):
    label: str
    score: float

@app.post("/api/summarize", response_model=SummarizationResponse)
async def summarize(request: SummarizationRequest):
    try:
        # Run the summarization pipeline with some parameters
        result = summarizer(request.text, max_length=130, min_length=30, do_sample=False)
        summary_text = result[0]["summary_text"]
        return SummarizationResponse(summary=summary_text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/sentiment_analysis", response_model=SentimentResponse)
async def sentiment_analysis(request: SentimentRequest):
    try:
        # Run the sentiment analysis pipeline with some parameters
        result = sentiment_analyzer(request.text)
        sentiment_label = result[0]["label"]
        confidence_score = result[0]["score"]

        return SentimentResponse(label=sentiment_label, score=confidence_score)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))