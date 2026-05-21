async function run() {
  console.log('Fetching local API endpoint...');
  try {
    const res = await fetch('http://localhost:3000/api/analyze?topic=Apple');
    const json = await res.json();
    console.log('API Response:', JSON.stringify(json, null, 2));
  } catch (e) {
    console.error('Fetch Error:', e.message);
  }
}
run();
