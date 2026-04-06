// @ts-ignore
export const OLLAMA_MODEL = import.meta.env.VITE_OLLAMA_MODEL || 'llama3.2';
// @ts-ignore
export const OLLAMA_BASE_URL = import.meta.env.VITE_OLLAMA_BASE_URL || 'http://localhost:11434';

export interface OllamaMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function sendChat(messages: OllamaMessage[], format?: 'json'): Promise<string> {
  const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      messages,
      stream: false,
      ...(format ? { format } : {}),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    if (response.status === 404 || errorText.includes('model')) {
      throw new Error(`Model '${OLLAMA_MODEL}' not found. Please pull it using Docker or Ollama CLI.`);
    }
    throw new Error(`Ollama error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.message?.content ?? '';
}
