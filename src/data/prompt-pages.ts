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
      'The first QBR draft is heading for a generic pack.',
      'You know the pressure but it is not in the brief.',
      'You want the model to set the agenda, not decorate one.',
    ],
    needs: [
      { label: 'Customer name', hint: 'The account on the review.' },
      { label: 'Sector', hint: 'Their industry, in their words.' },
      { label: 'Pressures', hint: 'What is squeezing them this quarter.' },
      { label: 'Metric', hint: 'The number that must not slip.' },
    ],
    example:
      'Three pressures this quarter, named in their language. The review opens on those, and on how we attach to each, not on a generic pack.',
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
      'A structured brief: role (KAM preparing a QBR), constraints (no unapproved commercial offers), context separated from instructions, output as a one-page agenda with three decisions. Still a brief, not the deliverable.',
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
      'You need a thank-you, one proof, and one next step. Nothing else.',
    ],
    needs: [
      { label: 'Customer name', hint: 'The account on the email.' },
      { label: 'Recipient', hint: 'Who the email is for.' },
      { label: 'What went well', hint: 'One proof from the review.' },
      { label: 'The concern', hint: 'What they pushed back on.' },
      { label: 'Next step', hint: 'One clear action.' },
    ],
    example:
      'Thanks for the review. One proof from what went well. One action on the concern. Under 200 words. No money promised.',
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
      'Five ways they walk: a cheaper alternative, an internal build, a sponsor move, unused scope, and a service scar. Beside each, the mitigation you can start this month, not a speech about partnership.',
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
      'Something has gone wrong and an executive is on the line.',
      'You need acknowledgement and a next step.',
      'You must not admit liability or invent a concession.',
    ],
    needs: [
      { label: 'Customer name', hint: 'The account you are writing to.' },
      { label: 'Executive', hint: 'The title of the person on the line.' },
      { label: 'Incident', hint: 'What went wrong, in plain words.' },
    ],
    example:
      'We acknowledge what happened. Here is what is in motion tonight. Here is a time for a formal review. We do not admit legal liability and we do not promise money nobody has approved.',
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
      'They sit on the buying side.',
      'Price cannot be the opening move.',
      'You need three commercial pressures that are not price.',
    ],
    needs: [
      { label: 'Customer name', hint: 'The account on the review.' },
      { label: 'Metric', hint: 'The number they are trying to protect.' },
    ],
    example:
      'Three ways their margin is getting squeezed, none of them a price conversation. A supplier protects each one without leading on the number.',
    related: 'qbr-reframe',
  },
  'plant-director-proof': {
    whenBullets: [
      'Procurement is shopping the category.',
      'The proof belongs with the person who feels the work, not purchasing.',
      'You have notes from the last two reviews.',
    ],
    needs: [
      { label: 'Customer name', hint: 'The account on the reviews.' },
      { label: 'Operational buyer', hint: 'The person who feels the work, not the person who buys it.' },
      { label: 'Notes from the last two reviews', hint: 'Attach them. Look for signs they are shopping, then name three proofs.' },
    ],
    example:
      'Signs purchasing is testing the category: a late check of the market, a line-by-line compare, a new contact copied from a rival. Three proofs for the operations director, in their language, not a price matrix.',
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
