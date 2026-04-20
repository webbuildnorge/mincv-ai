import { NextResponse } from 'next/server';

export async function POST(request) {
  const { cv, ad } = await request.json();

  if (!cv || !ad) {
    return NextResponse.json({ error: 'Mangler CV eller stillingsannonse' }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `Du er en norsk karriererådgiver. Analyser CV-en mot stillingsannonsen og returner KUN et JSON-objekt (ingen markdown, ingen forklaring) med disse feltene:
{
  "score": <tall 0-100>,
  "sammendrag": "<2 setninger om match>",
  "styrker": ["<punkt>", "<punkt>", "<punkt>"],
  "mangler": ["<punkt>", "<punkt>", "<punkt>"],
  "tips": ["<konkret tips>", "<konkret tips>", "<konkret tips>"]
}

CV:
${cv}

Stillingsannonse:
${ad}`
        }]
      }],
      generationConfig: { temperature: 0.4 }
    })
  });

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const clean = text.replace(/```json|```/g, '').trim();

  try {
    const parsed = JSON.parse(clean);
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({ error: 'Kunne ikke analysere svaret' }, { status: 500 });
  }
}
