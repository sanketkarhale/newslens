from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from typing import List

app = FastAPI(title="NewsLens Antigravity ML Pipeline")
analyzer = SentimentIntensityAnalyzer()

class ArticleInput(BaseModel):
    title: str
    content: str

class AnalysisRequest(BaseModel):
    articles: List[ArticleInput]

@app.post("/analyze")
async def analyze_sentiment(request: AnalysisRequest):
    try:
        results = []
        pos_count = 0
        neg_count = 0
        neu_count = 0

        for article in request.articles:
            # Combine title and content for a robust sentiment score
            text = f"{article.title}. {article.content}"
            scores = analyzer.polarity_scores(text)
            compound = scores['compound']
            
            if compound >= 0.05:
                sentiment = "Positive"
                pos_count += 1
            elif compound <= -0.05:
                sentiment = "Negative"
                neg_count += 1
            else:
                sentiment = "Neutral"
                neu_count += 1
                
            results.append({
                "title": article.title,
                "sentiment": sentiment,
                "score": compound
            })

        total = len(request.articles)
        if total == 0:
            return {"error": "No articles provided"}

        overall_compound = sum(r['score'] for r in results) / total
        
        if overall_compound >= 0.05:
            overall = "Positive"
            action = "Market conditions look highly favorable. Recommend bullish positioning."
        elif overall_compound <= -0.05:
            overall = "Negative"
            action = "Market conditions show elevated risk. Recommend defensive posturing."
        else:
            overall = "Neutral"
            action = "Market is in consolidation. Monitor closely for breakout signals."

        return {
            "overallSentiment": overall,
            "sentimentDistribution": {
                "pos": round((pos_count / total) * 100),
                "neu": round((neu_count / total) * 100),
                "neg": round((neg_count / total) * 100)
            },
            "recommendedAction": action,
            "articleResults": results
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    # Run the server on port 8000
    uvicorn.run(app, host="0.0.0.0", port=8000)
