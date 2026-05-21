const Parser = require('rss-parser');
const parser = new Parser({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }
});

async function run() {
  const topic = 'Apple';
  const feedUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(topic)}&hl=en-IN&gl=IN&ceid=IN:en`;
  console.log('Fetching Google News RSS...');
  try {
    const feed = await parser.parseURL(feedUrl);
    console.log('Google News Success. Items count:', feed.items ? feed.items.length : 0);
  } catch (e) {
    console.error('Google News Error:', e.message);
  }

  console.log('\nFetching Yahoo News RSS...');
  const fallbackUrl = `https://news.yahoo.com/rss/search?p=${encodeURIComponent(topic)}`;
  try {
    const feed = await parser.parseURL(fallbackUrl);
    console.log('Yahoo News Success. Items count:', feed.items ? feed.items.length : 0);
  } catch (e) {
    console.error('Yahoo News Error:', e.message);
  }
}

run();
