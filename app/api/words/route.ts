import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Cache for the wordlist
let wordlistCache: string[] | null = null;

// Load and cache the wordlist
function loadWordlist(): string[] {
  if (wordlistCache) return wordlistCache;
  
  const wordlistPath = path.join(process.cwd(), 'public', 'wordlist.txt');
  const content = fs.readFileSync(wordlistPath, 'utf-8');
  wordlistCache = content.split('\n').map((word: string) => word.trim().toLowerCase());
  return wordlistCache;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = (searchParams.get('query') || '').toLowerCase();
    const limit = parseInt(searchParams.get('limit') || '5', 10);

    // Load wordlist (will use cache after first load)
    const words = loadWordlist();
    
    // Perform optimized search with early break
    const matches: string[] = [];
    for (let i = 0; i < words.length; i++) {
      if (words[i].startsWith(query)) {
        matches.push(words[i]);
        if (matches.length >= limit) break;
      }
    }

    return NextResponse.json(matches);
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}