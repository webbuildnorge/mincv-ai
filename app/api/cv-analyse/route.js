import { NextResponse } from 'next/server';

export async function POST(request) {
  const { cv, ad } = await request.json();

  if (!cv || !ad) {
    return NextResponse.json({ error: 'Mangler CV eller stillingsannonse' }, { status: 400 });
  }

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: `Du er en norsk karriererådgiver. Analyser CV-en mot stillingsannonsen og returner KUN et JSON-objekt (ingen markdown, ingen forklaring) med disse feltene:
{
  "score": <tall 0-100>,
  "sammendrag": "<2 setninger om match>",
  "styrker": ["<punkt>", "<punkt>", "<punkt>"],
  "mangler": ["<punkt>", "<punkt>", "<punkt>"],
  "tips": ["<konkret tips>", "<konkret tips>", "<konkret tips>"]
}`,
      messages: [{
        role: 'user',
        content: `CV:\n${cv}\n\nStillingsannonse:\n${ad}`
      }]
    })
  });

  const data = await res.json();
  const text = data.content?.map(b => b.text || '').join('') || '';
  const clean = text.replace(/```json|```/g, '').trim();

  try {
    const parsed = JSON.parse(clean);
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({ error: 'Kunne ikke analysere svaret' }, { status: 500 });
  }
}
