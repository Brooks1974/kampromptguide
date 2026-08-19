import type { PromptGroup } from './prompts';
import { prompts } from './prompts';

export const chapterVerb: Record<PromptGroup, 'Prepare' | 'Diagnose' | 'Draft' | 'Brief' | 'Review'> = {
  brief: 'Prepare',
  research: 'Diagnose',
  meetings: 'Draft',
  renewal: 'Review',
  recovery: 'Brief',
};

export type Need = {
  label: string;
  hint: string;
};

export type PromptPage = {
  whenBullets: [string, string, string] | [string, string];
  needs: Need[];
  example: string;
  related: string;
};

export const promptPages: Record<string, PromptPage> = {
  'qbr-reframe': {
    whenBullets: [
      'The first QBR draft is heading for generic slides.',
      'You know the operational pressure but it is not in the brief.',
      'You want the model to set the agenda, not decorate one.',
    ],
    needs: [
      { label: 'Nothing to fill', hint: 'The logistics pressure is already in the prompt. Paste it as written.' },
    ],
    example:
      'Three pressures this quarter: fuel on the trunking network, overtime in the hubs, and missed collection windows already leaking margin. The review should open on those, and on how a technology partner attaches to each — not on another SLA slide.',
    related: 'post-qbr-follow-up',
  },
  'meta-prompt': {
    whenBullets: [
      'You have scrap notes, not a brief.',
      'You are about to ask for the deliverable too early.',
      'You want role, constraints, structure, and an output format before anything is drafted.',
    ],
    needs: [
      { label: 'Your unedited notes', hint: 'Leave them messy. The model’s job is to write the brief, not the deck.' },
    ],
    example:
      'A structured brief: role (KAM preparing a QBR), constraints (no unapproved commercial offers), context separated from instructions, output as a one-page agenda with three decisions. Still a brief — not the deliverable.',
    related: 'qbr-reframe',
  },
  'stakeholder-alignment': {
    whenBullets: [
      'Kick-off, and two jobs are in the room.',
      'Procurement and implementation will not want the same first week.',
      'A blended summary would hide the conflict.',
    ],
    needs: [
      { label: 'Customer name', hint: 'The account, as they say it internally.' },
      { label: 'Kick-off transcript', hint: 'Attach it. The prompt asks the model to read it, not guess it.' },
    ],
    example:
      'Procurement: lock volume and cut onboarding friction. Implementation: data mapping, site sequence, and who signs a delay. Two lists. Not one paragraph that splits the difference.',
    related: 'sequential-chain',
  },
  'post-qbr-follow-up': {
    whenBullets: [
      'The review is over. The email is not sent.',
      'Facts, constraints, and structure must stay in their own lanes.',
      'You need a thank-you, one confirmed metric, and one date — nothing else.',
    ],
    needs: [
      { label: 'Customer name', hint: 'The account on the email.' },
    ],
    example:
      'Thanks for the Q2 review. We confirm the uptime already in the brief. One action: a date for the European onboarding audit. No credits. Under 200 words.',
    related: 'qbr-reframe',
  },
  'sequential-chain': {
    whenBullets: [
      'The transcript is messy and the next artefact is a short proposal.',
      'You need extraction before writing.',
      'Tone comes last, not in the same paste.',
    ],
    needs: [
      { label: 'Meeting transcript', hint: 'Paste it in turn 1 only.' },
      { label: 'The five pains', hint: 'Turn 2 uses the list from turn 1. Do not skip ahead.' },
      { label: 'The draft proposal', hint: 'Turn 3 tightens that draft. Copy each turn separately.' },
    ],
    example:
      'We heard five pains in the room. This is the offer that answers them, cut to executive length: the outcome we attach to, how it sits in their operation, and the decision we need in the next fortnight. No preamble.',
    related: 'stakeholder-alignment',
  },
  'renewal-pre-mortem': {
    whenBullets: [
      'Ninety days out, before the commercial conversation.',
      'You need why they leave, not why they stay.',
      'Each reason needs a mitigation you can start now.',
    ],
    needs: [
      { label: 'Customer name', hint: 'The account whose contract is coming up.' },
      { label: 'Meeting history and terms', hint: 'The prompt assumes you attach them. Do not ask the model to invent the file.' },
    ],
    example:
      'Five ways they walk: a cheaper alternative, an internal build, a sponsor move, unused scope, and a service scar. Beside each, the mitigation you can start this month — not a speech about partnership.',
    related: 'value-realisation-audit',
  },
  'value-realisation-audit': {
    whenBullets: [
      'Price will come up and you do not yet have evidence.',
      'You need hours and cost, not a vibe.',
      'Usage and support logs are the source, not a slide template.',
    ],
    needs: [
      { label: 'Customer name', hint: 'The account you are quantifying.' },
      { label: 'Usage and support logs', hint: 'Attach the last six months. The prompt cannot invent the hours.' },
    ],
    example:
      'An executive paragraph that states hours given back and cost taken out, drawn from the logs, before anyone opens the price conversation. If the logs are thin, the summary should say so.',
    related: 'renewal-pre-mortem',
  },
  'de-escalation': {
    whenBullets: [
      'There has been a service failure and an executive is on the line.',
      'You need acknowledgement and a next step.',
      'You must not admit liability or invent a credit.',
    ],
    needs: [
      { label: 'Customer name', hint: 'The account whose CTO you are writing to.' },
    ],
    example:
      'We acknowledge the disruption. Here is what is in motion tonight. Here is a time for a formal review. We do not admit legal liability and we do not promise money nobody has approved.',
    related: 'scope-creep',
  },
  'scope-creep': {
    whenBullets: [
      'They have asked for work that is not in the SOW.',
      '“Yes” cannot be the default reply.',
      'You need the change-request path on the table, politely.',
    ],
    needs: [
      { label: 'Customer name', hint: 'The account whose project manager asked.' },
    ],
    example:
      'Thank you for the request. It sits outside the current Statement of Work. If you want it added, here is the change-request path and what we would need to scope it. Until then, we stay on the signed work.',
    related: 'de-escalation',
  },
  'c-suite-pitch': {
    whenBullets: [
      'You have their annual strategy report and one shot at the COO.',
      'The pitch has to be about operating margin, not features.',
      'Three paragraphs. No appendix.',
    ],
    needs: [
      { label: 'Customer name', hint: 'The account on the report.' },
      { label: 'Annual strategy report', hint: 'Attach it. The model should read their words, not yours.' },
    ],
    example:
      'Their margin goal, in their language. Where our work attaches to that number. The conversation we want next. Three paragraphs. No feature list.',
    related: 'plant-director-proof',
  },
  'vet-group-margins': {
    whenBullets: [
      'Animal health. A clinic-group review, not a software QBR.',
      'Price cannot be the opening move.',
      'You need the three commercial pressures already named in the prompt.',
    ],
    needs: [
      { label: 'Nothing to fill', hint: 'Staffing, buying-group terms, and own-brand mix are already in the brief.' },
    ],
    example:
      'Clinic margin is getting squeezed three ways: who you can hire, what the buying group will stand, and how much own-brand sits on the shelf. A supplier protects each without leading on price — locum cover, terms that do not punish the small sites, and mix that does not hollow the basket.',
    related: 'qbr-reframe',
  },
  'plant-director-proof': {
    whenBullets: [
      'A multi-site manufacturer. Procurement is shopping the category.',
      'The proof belongs with the plant director, not purchasing.',
      'You have notes from the last two reviews.',
    ],
    needs: [
      { label: 'Customer name', hint: 'The manufacturer on the reviews.' },
      { label: 'Notes from the last two reviews', hint: 'Attach them. Look for signs they are shopping, then name three proofs.' },
    ],
    example:
      'Signs purchasing is testing the category: a late “just checking the market,” a request for a line-by-line compare, a new contact copied from a rival. Three proofs for the plant director: uptime on their line, changeover time, and the last quality escape we stopped — not a price matrix.',
    related: 'c-suite-pitch',
  },
};

export function pageFor(slug: string): PromptPage | undefined {
  return promptPages[slug];
}

export function relatedPrompt(slug: string) {
  const relatedSlug = promptPages[slug]?.related;
  return prompts.find((prompt) => prompt.slug === relatedSlug);
}
