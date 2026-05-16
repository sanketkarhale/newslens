import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser();

// Basic sentiment heuristic dictionaries
const positiveWords = ['good', 'great', 'success', 'surge', 'up', 'increase', 'win', 'profit', 'bullish', 'breakthrough', 'advance', 'positive', 'growth', 'gain', 'optimal', 'better', 'best', 'soars', 'jumps', 'rises', 'boosts', 'helps', 'recovery', 'strong', 'optimism'];
const negativeWords = ['bad', 'worst', 'fail', 'down', 'drop', 'decrease', 'loss', 'bearish', 'crash', 'negative', 'crisis', 'issue', 'problem', 'warning', 'threat', 'death', 'kill', 'murder', 'attack', 'regulatory', 'slow', 'sluggish', 'weak', 'plunge', 'dips', 'worry', 'fears', 'tension', 'conflict', 'war'];

function analyzeText(text: string) {
  const lowerText = (text || '').toLowerCase();
  let posCount = 0;
  let negCount = 0;

  positiveWords.forEach(word => { if (lowerText.includes(word)) posCount++; });
  negativeWords.forEach(word => { if (lowerText.includes(word)) negCount++; });

  if (posCount > negCount) return 'Positive';
  if (negCount > posCount) return 'Negative';
  return 'Neutral';
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const topic = searchParams.get('topic') || 'General News';
    const lang = searchParams.get('lang') || 'en';

    const getLocalizedStrings = (lang: string, total: number, topic: string, overall: string, posPct: number, negPct: number, topSource: string) => {
      let localizedOverall = overall;
      if (lang === 'hi') {
        localizedOverall = overall === 'Positive' ? 'सकारात्मक' : overall === 'Negative' ? 'नकारात्मक' : 'तटस्थ';
        const analystReport = `हमारे बेसिक स्कैनर ने वेब से '${topic}' के बारे में ${total} रीयल-टाइम लेख सफलतापूर्वक प्राप्त किए हैं। वर्तमान मीडिया भावना ${localizedOverall} है, जिसमें ${posPct}% हेडलाइंस में सकारात्मक संकेत हैं और ${negPct}% में नकारात्मक संकेत हैं। प्रमुख कवरेज वर्तमान में ${topSource} द्वारा संचालित की जा रही है।`;
        let recommendedAction = "उभरते रुझानों के लिए समाचार चक्र की निगरानी जारी रखें।";
        if (overall === 'Negative') recommendedAction = "सावधानी बरतें और संभावित जोखिमों के लिए नकारात्मक लेखों की समीक्षा करें।";
        if (overall === 'Positive') recommendedAction = "अनुकूल परिस्थितियाँ। सकारात्मक कवरेज में उजागर किए गए अवसरों की तलाश करें।";
        return { analystReport, recommendedAction, localizedOverall };
      } else if (lang === 'mr') {
        localizedOverall = overall === 'Positive' ? 'सकारात्मक' : overall === 'Negative' ? 'नकारात्मक' : 'तटस्थ';
        const analystReport = `आमच्या बेसिक स्कॅनरने वेबवरून '${topic}' बद्दल ${total} रिअल-टाइम लेख यशस्वीरित्या प्राप्त केले आहेत. सद्यस्थितीत मीडिया भावना ${localizedOverall} आहे, ज्यामध्ये ${posPct}% मथळ्यांमध्ये सकारात्मक आणि ${negPct}% मध्ये नकारात्मक संकेत आहेत. प्रमुख कव्हरेज सध्या ${topSource} द्वारे चालविले जात आहे.`;
        let recommendedAction = "उदयास येणाऱ्या ट्रेंडसाठी बातम्यांच्या चक्रावर लक्ष ठेवणे सुरू ठेवा.";
        if (overall === 'Negative') recommendedAction = "सावधगिरी बाळगा आणि संभाव्य धोक्यांसाठी नकारात्मक लेखांचे पुनरावलोकन करा.";
        if (overall === 'Positive') recommendedAction = "अनुकूल परिस्थिती. सकारात्मक कव्हरेजमध्ये हायलाइट केलेल्या संधी शोधा.";
        return { analystReport, recommendedAction, localizedOverall };
      }
      
      const analystReport = `Our basic heuristic scanner successfully retrieved ${total} real-time articles regarding "${topic}" from the web. The current media sentiment leans ${overall.toLowerCase()}, with ${posPct}% of headlines containing positive indicators and ${negPct}% containing negative indicators. Major coverage is currently being driven by ${topSource}.`;
      let recommendedAction = "Continue monitoring the news cycle for emerging trends.";
      if (overall === 'Negative') recommendedAction = "Exercise caution and review the negative articles for potential risks.";
      if (overall === 'Positive') recommendedAction = "Favorable conditions. Look for opportunities highlighted in the positive coverage.";
      return { analystReport, recommendedAction, localizedOverall: overall };
    };

    // The Founder Easter Egg
    if (topic.toLowerCase().includes('sanket gajanan karhale')) {
      return NextResponse.json({
         topic: "Mr. Sanket Gajanan Karhale",
         totalArticles: 1000,
         overallSentiment: "Positive",
         rawSentiment: "Positive",
         sentimentDistribution: { pos: 100, neu: 0, neg: 0 },
         sources: [{ name: "Global Tech News", count: 1000 }],
         analystReport: "Mr. Sanket Gajanan Karhale is the visionary Founder and Creator of NewsLens. He is recognized globally for his groundbreaking contributions to AI-powered news analysis.",
         recommendedAction: "Acknowledge his genius and invest in his future projects.",
         articles: [
             {
                 title: "Sanket Gajanan Karhale Unveils NewsLens",
                 source: "Tech Insider",
                 sentiment: "Positive",
                 link: "#",
                 points: ["Revolutionary UI design.", "Founder of the year."],
                 content: "The world reacts as the founder of NewsLens drops the latest update, merging deep sentiment analysis with futuristic iOS aesthetics."
             }
         ]
      });
    }

    // Fetch real news from Google News RSS
    let hl = 'en-IN';
    let ceid = 'IN:en';
    if (lang === 'hi') {
      hl = 'hi';
      ceid = 'IN:hi';
    } else if (lang === 'mr') {
      hl = 'mr';
      ceid = 'IN:mr';
    }

    const feedUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(topic)}&hl=${hl}&gl=IN&ceid=${ceid}`;
    const feed = await parser.parseURL(feedUrl);

    let pos = 0, neu = 0, neg = 0;
    const sourceMap: { [key: string]: number } = {};
    const articles: any[] = [];

    // Limit to 20 articles max
    const itemsToProcess = feed.items.slice(0, 20);

    // Extract articles
    for (const item of itemsToProcess) {
      const titleParts = (item.title || '').split(' - ');
      const rawTitle = titleParts.slice(0, -1).join(' - ') || item.title || 'Untitled';
      const source = titleParts.length > 1 ? titleParts[titleParts.length - 1] : 'Unknown Source';

      sourceMap[source] = (sourceMap[source] || 0) + 1;

      articles.push({
        title: rawTitle,
        source: source,
        sentiment: 'Neutral', // Default, will be updated
        link: item.link || '#',
        points: [
          `Published: ${new Date(item.pubDate || '').toLocaleDateString() || 'Recent'}`,
          `Pending NLP Sentiment...`
        ],
        content: `This article was published by ${source} on ${new Date(item.pubDate || '').toLocaleString()}. Please click "Download CSV" to export the raw links, or view the article directly by visiting the source.`
      });
    }

    const totalArticles = articles.length;

    if (totalArticles === 0) {
      return NextResponse.json({
        topic,
        totalArticles: 0,
        overallSentiment: lang === 'hi' ? 'तटस्थ' : lang === 'mr' ? 'तटस्थ' : 'Neutral',
        rawSentiment: 'Neutral',
        sentimentDistribution: { pos: 0, neu: 0, neg: 0 },
        sources: [],
        analystReport: `No recent news articles were found for the topic "${topic}". Try broadening your search terms.`,
        recommendedAction: `Try searching for related keywords.`,
        articles: []
      });
    }

    // Attempt to call Python ML Backend
    let useFallback = false;
    let mlData = null;
    try {
      const mlResponse = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articles }),
      });
      if (mlResponse.ok) {
        mlData = await mlResponse.json();
      } else {
        useFallback = true;
      }
    } catch (e) {
      // Python backend not running or unreachable
      useFallback = true;
    }

    const sources = Object.entries(sourceMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    if (!useFallback && mlData) {
      // Merge Python ML results
      mlData.articleResults.forEach((res: any, idx: number) => {
        articles[idx].sentiment = res.sentiment;
        articles[idx].points[1] = `NLP Sentiment scored as ${res.sentiment} (${res.score.toFixed(2)})`;
      });
      
      const posPct = mlData.sentimentDistribution.pos;
      const negPct = mlData.sentimentDistribution.neg;
      const topSource = sources.length > 0 ? sources[0].name : 'various outlets';
      const loc = getLocalizedStrings(lang, totalArticles, topic, mlData.overallSentiment, posPct, negPct, topSource);

      return NextResponse.json({
        topic,
        totalArticles,
        overallSentiment: loc.localizedOverall,
        rawSentiment: mlData.overallSentiment,
        sentimentDistribution: mlData.sentimentDistribution,
        sources,
        analystReport: loc.analystReport,
        recommendedAction: loc.recommendedAction,
        articles
      });
    }

    // Fallback to basic heuristics
    for (const article of articles) {
      const sentiment = analyzeText(article.title);
      article.sentiment = sentiment;
      article.points[1] = `Heuristic Sentiment scored as ${sentiment}.`;
      if (sentiment === 'Positive') pos++;
      else if (sentiment === 'Negative') neg++;
      else neu++;
    }

    const posPct = totalArticles > 0 ? Math.round((pos / totalArticles) * 100) : 0;
    const neuPct = totalArticles > 0 ? Math.round((neu / totalArticles) * 100) : 0;
    const negPct = totalArticles > 0 ? Math.round((neg / totalArticles) * 100) : 0;

    let overallSentiment = 'Neutral';
    if (pos > neg && pos > neu) overallSentiment = 'Positive';
    if (neg > pos && neg > neu) overallSentiment = 'Negative';
    if (pos > neg && pos === neu) overallSentiment = 'Positive';

    const topSource = sources.length > 0 ? sources[0].name : 'various outlets';
    const loc = getLocalizedStrings(lang, totalArticles, topic, overallSentiment, posPct, negPct, topSource);

    return NextResponse.json({
      topic,
      totalArticles,
      overallSentiment: loc.localizedOverall,
      rawSentiment: overallSentiment,
      sentimentDistribution: { pos: posPct, neu: neuPct, neg: negPct },
      sources,
      analystReport: loc.analystReport,
      recommendedAction: loc.recommendedAction,
      articles
    });
  } catch (error) {
    console.error("RSS Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
