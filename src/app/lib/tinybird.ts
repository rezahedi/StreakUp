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

export async function fetchCounts() {
  let result = await fetch('https://api.us-east.tinybird.co/v0/pipes/counts.json', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env.TINYBIRD_API_KEY
    }
  })
  .then((res) => res.json())
  .then(r => r)
  .catch(e => e.toString())

  if (!result.data)
    return null

  // Convert the array of objects
  // from [{ "key": "create", "count": 1 }]
  // to [{ "create": 1 }]
  return await result.data.reduce((prev: any, curr: any) => {
    return { ...prev, [curr.key]: curr.count }
  }, {})
}