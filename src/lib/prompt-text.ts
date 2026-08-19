import type { Prompt, PromptSlot } from '../data/prompts';

export type PromptPart =
  | { type: 'text'; value: string }
  | { type: 'slot'; slot: PromptSlot };

export function promptSource(prompt: Prompt): string {
  if (prompt.text) return prompt.text;
  return prompt.steps?.map((step) => step.text).join('\n\n') ?? '';
}

export function splitPromptText(text: string, slots: PromptSlot[] = []): PromptPart[] {
  if (slots.length === 0) return [{ type: 'text', value: text }];

  const escaped = slots
    .map((slot) => slot.placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .sort((a, b) => b.length - a.length);
  const re = new RegExp(escaped.join('|'), 'g');
  const parts: PromptPart[] = [];
  let last = 0;

  for (const match of text.matchAll(re)) {
    const index = match.index ?? 0;
    if (index > last) parts.push({ type: 'text', value: text.slice(last, index) });
    const slot = slots.find((item) => item.placeholder === match[0]);
    if (slot) parts.push({ type: 'slot', slot });
    last = index + match[0].length;
  }

  if (last < text.length) parts.push({ type: 'text', value: text.slice(last) });
  return parts;
}

export function previewText(prompt: Prompt): string {
  const source = promptSource(prompt);
  const filled = (prompt.slots ?? []).reduce(
    (text, slot) => text.replaceAll(slot.placeholder, slot.sample),
    source,
  );
  const compact = filled.replace(/\s+/g, ' ').trim();
  return compact.length > 110 ? `${compact.slice(0, 107).trimEnd()}…` : compact;
}

export function searchBlob(prompt: Prompt): string {
  return [
    prompt.title,
    prompt.when,
    prompt.tag,
    prompt.group,
    prompt.teaches,
    promptSource(prompt),
    prompt.slug === 'vet-group-margins' ? 'animal health' : '',
    prompt.slug === 'plant-director-proof' ? 'manufacturing' : '',
  ]
    .join(' ')
    .toLowerCase();
}

export function pillsOf(prompt: Prompt): string[] {
  const pills = [prompt.group];
  if (prompt.slug === 'vet-group-margins') pills.push('animal-health');
  if (prompt.slug === 'plant-director-proof') pills.push('manufacturing');
  return pills;
}
