export async function recordEvent(key: string) {
  const payload = {
    timestamp: new Date(Date.now()).toISOString(),
    key,
  };
  
  return await fetch('https://api.us-east.tinybird.co/v0/events?name=click_events&wait=true',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env.TINYBIRD_API_KEY
    },
    body: JSON.stringify(payload)
  }).then((res) => res.json())
}