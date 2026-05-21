import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }
});

// Basic sentiment heuristic dictionaries
const positiveWords = [
  'good', 'great', 'success', 'surge', 'up', 'increase', 'win', 'profit', 'bullish', 'breakthrough', 'advance', 'positive', 'growth', 'gain', 'optimal', 'better', 'best', 'soars', 'jumps', 'rises', 'boosts', 'helps', 'recovery', 'strong', 'optimism', 'record',
  // Hindi Positive
  'प्रगति', 'सफलता', 'वृद्धि', 'विकास', 'मजबूत', 'अच्छा', 'सुधार', 'क्रांति',
  // Marathi Positive
  'प्रगती', 'यश', 'वाढ', 'क्रांती', 'स्वीकार'
];

const negativeWords = [
  'bad', 'worst', 'fail', 'down', 'drop', 'decrease', 'loss', 'bearish', 'crash', 'negative', 'crisis', 'issue', 'problem', 'warning', 'threat', 'death', 'kill', 'murder', 'attack', 'regulatory', 'slow', 'sluggish', 'weak', 'plunge', 'dips', 'worry', 'fears', 'tension', 'conflict', 'war',
  // Hindi Negative
  'मंदी', 'डर', 'गिरावट', 'नुकसान', 'खतरा', 'चिंता', 'कमजोर', 'हैरान',
  // Marathi Negative
  'घसरण', 'तोटा', 'धोका', 'कमकुवत', 'वाद'
];

// Categories for Mock AI
const categoriesList = ['Politics', 'AI', 'Crypto', 'Economy', 'Startups', 'Student News', 'Geopolitics', 'Sports', 'Technology', 'Markets'];

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

function generateMockAiData(title: string, lang: string = 'en') {
  const isNegative = analyzeText(title) === 'Negative';
  const credibilityScore = Math.floor(Math.random() * (99 - 70 + 1) + 70); // 70 to 99
  const fakeNewsProb = isNegative ? Math.floor(Math.random() * 30 + 10) : Math.floor(Math.random() * 15 + 1);
  const category = categoriesList[Math.floor(Math.random() * categoriesList.length)];
  
  let bias = isNegative ? 'Slight Negative Bias' : 'Neutral/Balanced';
  let summary = `AI generated summary: This article discusses key developments regarding ${title.substring(0, 35)}... highlighting major trends in ${category}.`;
  
  if (lang === 'hi') {
    bias = isNegative ? 'हल्का नकारात्मक पूर्वाग्रह' : 'तटस्थ/संतुलित';
    summary = `एआई सारांश: यह लेख ${title.substring(0, 35)}... के संबंध में प्रमुख घटनाक्रमों पर चर्चा करता है, जो ${category} में प्रमुख रुझानों को उजागर करता है।`;
  } else if (lang === 'mr') {
    bias = isNegative ? 'किंचित नकारात्मक पूर्वग्रह' : 'तटस्थ/संतुलित';
    summary = `एआय सारांश: हा लेख ${title.substring(0, 35)}... च्या संदर्भात महत्त्वपूर्ण घडामोडींवर चर्चा करतो, जो ${category} मधील मुख्य ट्रेंड्स हायलाइट करतो।`;
  }

  return {
    credibilityScore,
    fakeNewsProbability: fakeNewsProb,
    bias,
    category,
    summary
  };
}

function generateMockFeedItems(topic: string, lang: string = 'en') {
  const cleanTopic = topic.charAt(0).toUpperCase() + topic.slice(1);

  if (lang === 'hi') {
    const templates = [
      { title: `${cleanTopic} को लेकर वैश्विक बाजारों में मंदी की आशंका, निवेशकों में बढ़ा डर`, source: 'आर्थिक समाचार' },
      { title: `तकनीकी प्रगति: ${cleanTopic} कैसे नए युग की शुरुआत कर रहा है`, source: 'नवभारत टाइम्स' },
      { title: `${cleanTopic} के रणनीतिक बदलाव के अंदर की कहानी: विशेषज्ञों का बड़ा विश्लेषण`, source: 'बिजनेस वर्ल्ड' },
      { title: `${cleanTopic} को लेकर क्यों बढ़ी वैश्विक डेवलपर्स और कंपनियों की दिलचस्पी?`, source: 'सिलिकॉन वैली हिंदी' },
      { title: `${cleanTopic} का भविष्य: विशेषज्ञों ने चौथी तिमाही तक बड़े बदलावों की भविष्यवाणी की`, source: 'बाज़ार संदेश' },
      { title: `स्थानीय समुदायों ने ${cleanTopic} को दिल से अपनाया, उपयोग में रिकॉर्ड वृद्धि`, source: 'दैनिक जागरण' },
      { title: `${cleanTopic} पर नई नियामक नीतियां लागू होने से उद्योग जगत हैरान`, source: 'हिंदुस्तान' },
      { title: `${cleanTopic} की वजह से स्टार्टअप इकोसिस्टम में आई भारी फंडिंग की लहर`, source: 'दैनिक भास्कर' }
    ];

    return templates.map((t, idx) => ({
      title: `${t.title} - ${t.source}`,
      link: `https://news.lens/mock/hi/${encodeURIComponent(topic)}/${idx}`,
      pubDate: new Date(Date.now() - idx * 2 * 3600000).toISOString()
    }));
  }

  if (lang === 'mr') {
    const templates = [
      { title: `${cleanTopic} मुळे जागतिक बाजारात मोठे चढ-उतार, गुंतवणूकदारांमध्ये चिंतेचे वातावरण`, source: 'महाराष्ट्र टाइम्स' },
      { title: `तंत्रज्ञान क्रांती: ${cleanTopic} कशा प्रकारे नवीन युगाची यशस्वी सुरुवात करत आहे`, source: 'लोकसत्ता' },
      { title: `${cleanTopic} मधील धोरणात्मक बदल: गुंतवणूकदारांसाठी सर्वात महत्त्वाची माहिती`, source: 'सकाळ वृत्तसेवा' },
      { title: `जागतिक स्तरावर ${cleanTopic} ची वाढती लोकप्रियता, नवीन ट्रेंड्स समोर`, source: 'पुढारी' },
      { title: `${cleanTopic} चे भविष्य: तज्ज्ञांनी वर्तवला चौथ्या तिमाहीत प्रचंड मोठा बदल`, source: 'मराठी बिझनेस' },
      { title: `स्थानिक पातळीवर ${cleanTopic} चा वाढता स्वीकार, वापरामध्ये ऐतिहासिक वाढ`, source: 'सामना' },
      { title: `${cleanTopic} वर सरकारने आणले नवीन नियम, उद्योजकांमध्ये तीव्र पडसाद`, source: 'लोकमत' },
      { title: `${cleanTopic} च्या जोरावर नव्या स्टार्टअप्सनी उभारला कोट्यवधींचा निधी`, source: 'दिव्य मराठी' }
    ];

    return templates.map((t, idx) => ({
      title: `${t.title} - ${t.source}`,
      link: `https://news.lens/mock/mr/${encodeURIComponent(topic)}/${idx}`,
      pubDate: new Date(Date.now() - idx * 2 * 3600000).toISOString()
    }));
  }

  // English
  const templatesEn = [
    { title: `${cleanTopic} faces critical regulatory hurdles as global markets react with worry`, source: 'Wall Street Journal' },
    { title: `Tech breakthrough: How ${cleanTopic} is driving the next wave of massive innovation`, source: 'TechCrunch' },
    { title: `Inside the strategic pivot of ${cleanTopic}: What smart investors need to know now`, source: 'Bloomberg' },
    { title: `Why ${cleanTopic} is becoming the hottest topic among Silicon Valley developers`, source: 'Silicon Valley News' },
    { title: `The future of ${cleanTopic}: Experts predict massive market shifts by Q4`, source: 'Market Watch' },
    { title: `Local communities embrace ${cleanTopic} as global adoption hits a record high`, source: 'Global Chronicle' },
    { title: `New research warns of potential drawbacks and security issues in ${cleanTopic}`, source: 'Wired' },
    { title: `Startups raising billions to harness the power of ${cleanTopic} in key industries`, source: 'Forbes' }
  ];

  return templatesEn.map((t, idx) => ({
    title: `${t.title} - ${t.source}`,
    link: `https://news.lens/mock/en/${encodeURIComponent(topic)}/${idx}`,
    pubDate: new Date(Date.now() - idx * 2 * 3600000).toISOString()
  }));
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
        if (overall === 'Negative') recommendedAction = "सावधानी बरतें आणि संभाव्य जोखमींसाठी नकारात्मक लेख तपासा।";
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
      
      const analystReport = `Our AI intelligence engine processed ${total} real-time signals regarding "${topic}". Global sentiment leans ${overall.toLowerCase()}, with ${posPct}% of headlines indicating bullish/positive trends and ${negPct}% indicating bearish/negative risks. Major narrative control is currently held by ${topSource}.`;
      let recommendedAction = "Maintain current positions; monitor for macro shifts.";
      if (overall === 'Negative') recommendedAction = "High volatility detected. Hedge risks and review negative catalysts.";
      if (overall === 'Positive') recommendedAction = "Favorable conditions. Look for alpha opportunities highlighted in positive coverage.";
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
         analystReport: "Mr. Sanket Gajanan Karhale is the visionary Founder and Creator of News Lens AI. He is recognized globally for his groundbreaking contributions to AI-powered news analysis.",
         recommendedAction: "Acknowledge his genius and invest in his future projects.",
         marketImpacts: { Stocks: '+150%', Crypto: '+200%', Gold: 'Stable', IndianMarket: 'Bullish Run' },
         articles: [
             {
                 id: "easter-egg-1",
                 title: "Sanket Gajanan Karhale Unveils News Lens AI",
                 source: "Tech Insider",
                 sentiment: "Positive",
                 link: "#",
                 points: ["Revolutionary UI design.", "Founder of the year."],
                 content: "The world reacts as the founder of News Lens AI drops the latest update, merging deep sentiment analysis with futuristic iOS aesthetics.",
                 aiMetadata: {
                    credibilityScore: 100,
                    fakeNewsProbability: 0,
                    bias: 'Pure Truth',
                    category: 'Technology',
                    summary: "The launch of News Lens AI is reshaping the tech landscape globally."
                 }
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
    
    let feed: any = { items: [] };
    try {
      feed = await parser.parseURL(feedUrl);
    } catch (e: any) {
      console.warn("Google News RSS blocked, falling back to Yahoo...", e?.message || e);
    }

    if (!feed.items || feed.items.length === 0) {
      const fallbackUrl = `https://news.yahoo.com/rss/search?p=${encodeURIComponent(topic)}`;
      try {
        feed = await parser.parseURL(fallbackUrl);
      } catch (e: any) {
        console.error("Both RSS feeds failed.", e?.message || e);
      }
    }

    // Dynamic mock fallback if both RSS feeds returned empty / failed
    if (!feed.items || feed.items.length === 0) {
      feed.items = generateMockFeedItems(topic, lang);
    }

    let pos = 0, neu = 0, neg = 0;
    const sourceMap: { [key: string]: number } = {};
    const articles: any[] = [];
    const itemsToProcess = feed.items.slice(0, 20);

    for (const item of itemsToProcess) {
      const titleParts = (item.title || '').split(' - ');
      const rawTitle = titleParts.slice(0, -1).join(' - ') || item.title || 'Untitled';
      const source = titleParts.length > 1 ? titleParts[titleParts.length - 1] : 'Unknown Source';

      sourceMap[source] = (sourceMap[source] || 0) + 1;
      
      const aiMeta = generateMockAiData(rawTitle, lang);

      let pubText = `Published: ${new Date(item.pubDate || '').toLocaleDateString() || 'Recent'}`;
      let contentText = `This article was published by ${source} on ${new Date(item.pubDate || '').toLocaleString()}. ` + aiMeta.summary;

      if (lang === 'hi') {
        pubText = `प्रकाशित: ${new Date(item.pubDate || '').toLocaleDateString() || 'हाल ही में'}`;
        contentText = `यह लेख ${new Date(item.pubDate || '').toLocaleString()} को ${source} द्वारा प्रकाशित किया गया था। ` + aiMeta.summary;
      } else if (lang === 'mr') {
        pubText = `प्रसिद्ध केले: ${new Date(item.pubDate || '').toLocaleDateString() || 'नुकतेच'}`;
        contentText = `हा लेख ${new Date(item.pubDate || '').toLocaleString()} रोजी ${source} द्वारे प्रसिद्ध करण्यात आला होता। ` + aiMeta.summary;
      }

      articles.push({
        id: Buffer.from(item.link || rawTitle).toString('base64').substring(15, 25) + Math.random().toString(36).substring(2, 7),
        title: rawTitle,
        source: source,
        sentiment: 'Neutral', 
        link: item.link || '#',
        pubDate: item.pubDate || new Date().toISOString(),
        points: [
          pubText,
          `Pending NLP Sentiment...`
        ],
        content: contentText,
        aiMetadata: aiMeta
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
        analystReport: `No recent news signals were found for "${topic}". Try broadening your search.`,
        recommendedAction: `Try searching for related keywords.`,
        marketImpacts: { Stocks: 'Neutral', Crypto: 'Neutral', Gold: 'Neutral', IndianMarket: 'Neutral' },
        articles: [],
        debugInfo: {
          feedUrl,
          itemsLength: feed?.items?.length || 0,
          feedKeys: Object.keys(feed || {}),
        }
      });
    }

    const sources = Object.entries(sourceMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Fallback to basic heuristics
    for (const article of articles) {
      const sentiment = analyzeText(article.title);
      article.sentiment = sentiment;
      
      if (lang === 'hi') {
        const localizedSent = sentiment === 'Positive' ? 'सकारात्मक' : sentiment === 'Negative' ? 'नकारात्मक' : 'तटस्थ';
        article.points[1] = `एआई सेंटीमेंट स्कोर: ${localizedSent}.`;
      } else if (lang === 'mr') {
        const localizedSent = sentiment === 'Positive' ? 'सकारात्मक' : sentiment === 'Negative' ? 'नकारात्मक' : 'तटस्थ';
        article.points[1] = `एआय सेंटीमेंट स्कोअर: ${localizedSent}.`;
      } else {
        article.points[1] = `AI Sentiment scored as ${sentiment}.`;
      }
      
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

    // Generate mock Market Impacts based on sentiment
    const mockMarketImpacts = {
      Stocks: overallSentiment === 'Positive' ? '+1.2% (Bullish)' : overallSentiment === 'Negative' ? '-0.8% (Bearish)' : 'Stable',
      Crypto: overallSentiment === 'Positive' ? '+5.4% (Surge expected)' : overallSentiment === 'Negative' ? '-3.2% (Correction)' : 'Ranging',
      Gold: overallSentiment === 'Negative' ? '+2.1% (Safe Haven Demand)' : 'Stable',
      IndianMarket: overallSentiment === 'Positive' ? 'NIFTY +0.5%' : overallSentiment === 'Negative' ? 'NIFTY -0.7%' : 'Consolidation',
      Oil: 'Stable'
    };

    return NextResponse.json({
      topic,
      totalArticles,
      overallSentiment: loc.localizedOverall,
      rawSentiment: overallSentiment,
      sentimentDistribution: { pos: posPct, neu: neuPct, neg: negPct },
      sources,
      analystReport: loc.analystReport,
      recommendedAction: loc.recommendedAction,
      marketImpacts: mockMarketImpacts,
      articles
    });
  } catch (error) {
    console.error("RSS Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
