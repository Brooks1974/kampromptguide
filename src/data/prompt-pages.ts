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
  'competitor-compare': {
    whenBullets: [
      'You can name the rival. A generic battlecard will not do.',
      'You need where they position value, where you are stronger, and where you are exposed.',
      'Prices and features you have not supplied must stay out.',
    ],
    needs: [
      { label: 'Competitor name', hint: 'The rival in the conversation.' },
      { label: 'Customer name', hint: 'The account they are selling into.' },
      { label: 'What you actually know', hint: 'Attach notes. Do not ask the model to invent an offer.' },
    ],
    example:
      'One page: how they talk about value, two places you are stronger, one place you are exposed. No prices that were not in the brief.',
    related: 'competitive-defence',
  },
  'earnings-brief': {
    whenBullets: [
      'Results just landed and you have a meeting this week.',
      'You need their initiatives, not a rewrite of the release.',
      'Figures that are not in the report stay out.',
    ],
    needs: [
      { label: 'Customer name', hint: 'The account whose results you have.' },
      { label: 'Timeframe', hint: 'The window you want the initiatives for.' },
      { label: 'The results report', hint: 'Attach it. Quote it. Do not add numbers.' },
    ],
    example:
      'Three initiatives pulled from the report, each with the line you quoted and what it means for the account. No new figures.',
    related: 'board-priorities',
  },
  'commercial-pressures': {
    whenBullets: [
      'You need the three pressures on this account.',
      'A sector trend piece is the failure mode.',
      'The initiative is the lens.',
    ],
    needs: [
      { label: 'Customer name', hint: 'The account, not the sector.' },
      { label: 'Initiative', hint: 'The specific programme or move.' },
      { label: 'Account notes', hint: 'Attach them. Label anything inferred.' },
    ],
    example:
      'Three pressures on this initiative, how each shows up in the account, and what to do. Inferred lines labelled as inferred.',
    related: 'pressure-to-offer',
  },
  'order-patterns': {
    whenBullets: [
      'You have twelve months of orders.',
      'Something moved and you want the dips named.',
      'Chart commentary is not the job.',
    ],
    needs: [
      { label: 'Customer name', hint: 'The account on the file.' },
      { label: 'Order history', hint: 'Attach the twelve months. Do not ask the model to invent lines.' },
    ],
    example:
      'The dips and erosion that are in the file. For each, the next question you would ask. No invented rows.',
    related: 'qbr-from-usage',
  },
  'board-priorities': {
    whenBullets: [
      'You have a board pack and a recent email.',
      'You need the real three for one role.',
      'A blended "they want growth" answer is the failure.',
    ],
    needs: [
      { label: 'Customer name', hint: 'The account on the pack.' },
      { label: 'Role', hint: 'Whose priorities you want named.' },
      { label: 'Board pack and email', hint: 'Attach both. Point to the line that supports each priority.' },
    ],
    example:
      'Three priorities for that role, each pointed at a line in the pack or the email. Not one paragraph that splits the difference.',
    related: 'earnings-brief',
  },
  'churn-signals': {
    whenBullets: [
      'The last two reviews felt polite.',
      'You need the tells, not a score.',
      'A quote or an absence is the evidence.',
    ],
    needs: [
      { label: 'Customer name', hint: 'The account on the reviews.' },
      { label: 'Notes from the last two reviews', hint: 'Attach them. Look for dissatisfaction, a shift, or a quiet sponsor.' },
    ],
    example:
      'A shifting priority, a sponsor who stopped writing, a line that went cold. For each, the quote or the absence, and one move this month.',
    related: 'renewal-pre-mortem',
  },
  'kpi-benchmark': {
    whenBullets: [
      'They asked how they compare.',
      'You must not invent a league table.',
      'If there is no peer file, say what you would need.',
    ],
    needs: [
      { label: 'Customer name', hint: 'The account being compared.' },
      { label: 'Metric', hint: 'The number they want compared.' },
      { label: 'Audience', hint: 'Who will read the comparison.' },
      { label: 'Peer file', hint: 'Attach it, or the prompt must say it is missing.' },
    ],
    example:
      'A comparison against the peer file, written for that reader. If the file is missing, what you would need. No invented averages.',
    related: 'cite-the-source',
  },
  'co-innovation': {
    whenBullets: [
      'You need three offers that are not a product list.',
      'Their priority comes first.',
      'Prices only if you supplied them.',
    ],
    needs: [
      { label: 'Customer name', hint: 'The account you would work with.' },
      { label: 'Priority', hint: 'Their job, in their words.' },
    ],
    example:
      'Three joint proposals. Each has their job, what we put in, what they put in, and how value is shared. No prices unless they were supplied.',
    related: 'expand-the-book',
  },
  'price-frame': {
    whenBullets: [
      'The number is going up.',
      'You need four ways to say it that are not about your costs.',
      'Nothing promised that is not agreed internally.',
    ],
    needs: [
      { label: 'Increase', hint: 'The change you have to explain.' },
      { label: 'Customer name', hint: 'The account hearing it.' },
    ],
    example:
      'Four paragraphs. Extra capability and risk taken off them. The number last. Nothing promised that is not already agreed.',
    related: 'price-notice',
  },
  'roundtable-invite': {
    whenBullets: [
      'You want a senior in the room.',
      '"It will be useful" will not get them there.',
      'Each reason has to serve their job.',
    ],
    needs: [
      { label: 'Customer name', hint: 'The account you are inviting from.' },
      { label: 'Executive', hint: 'The title of the person you want.' },
      { label: 'Event', hint: 'What you are asking them to attend.' },
      { label: 'Priority', hint: 'Their job, not our agenda.' },
    ],
    example:
      'Three reasons, two sentences each, aimed at their priority. Not our brand.',
    related: 'meeting-follow-up',
  },
  'meeting-follow-up': {
    whenBullets: [
      'The meeting just ended.',
      'The email has to go before you lose the thread.',
      'Actions, owners, dates. Not a recap.',
    ],
    needs: [
      { label: 'Customer name', hint: 'The account you just met.' },
      { label: 'Recipient', hint: 'Who the email is for.' },
      { label: 'Meeting notes', hint: 'Attach them. Do not add commitments that are not there.' },
    ],
    example:
      'The agreed actions, who owns each, and the next date. Nothing that was not in the notes.',
    related: 'meeting-debrief',
  },
  'exec-one-pager': {
    whenBullets: [
      'You have a long draft and ten minutes with a senior.',
      'Audience first.',
      'Length is a constraint, not a style note.',
    ],
    needs: [
      { label: 'Customer name', hint: 'The account on the brief.' },
      { label: 'Audience', hint: 'Who has the ten minutes.' },
      { label: 'What they care about', hint: 'The one thing they will scan for.' },
      { label: 'The long draft', hint: 'Attach it. No new numbers.' },
    ],
    example:
      'One page for that reader. What they care about, in their language. No jargon. No number that was not in the source.',
    related: 'cite-the-source',
  },
  'proposal-draft': {
    whenBullets: [
      'The pain is clear.',
      'You need a first commercial draft, not a brochure.',
      'Return only from figures you supplied.',
    ],
    needs: [
      { label: 'Customer name', hint: 'The account the draft is for.' },
      { label: 'Bottlenecks', hint: 'The pains you already agree on.' },
      { label: 'Any figures you will allow', hint: 'If you have not given them, the draft must say what you would measure instead.' },
    ],
    example:
      'Their bottlenecks, a three-phase plan, and return only from figures you supplied. If none, what you would measure.',
    related: 'sequential-chain',
  },
  'renewal-watchouts': {
    whenBullets: [
      'You can give a short background.',
      'You want three risks, not a novel.',
      'Each risk needs an early tell.',
    ],
    needs: [
      { label: 'Customer name', hint: 'The account coming up.' },
      { label: 'Background', hint: 'A few lines. Not the whole file.' },
    ],
    example:
      'Three risks you can monitor. Each has an early tell and a move if you see it. Drawn only from the background you typed.',
    related: 'account-vulnerabilities',
  },
  'account-vulnerabilities': {
    whenBullets: [
      'You want a hard look before you walk in optimistic.',
      'The role is an auditor, not a cheerleader.',
      'Each hole needs a mitigation you still have time for.',
    ],
    needs: [
      { label: 'Customer name', hint: 'The account you are auditing.' },
      { label: 'Account summary', hint: 'Paste it under the prompt. Do not ask the model to invent the file.' },
    ],
    example:
      'The commercial holes, why each matters, and the mitigation still available. An auditor, not a cheerleader.',
    related: 'renewal-pre-mortem',
  },
  'pressure-to-offer': {
    whenBullets: [
      'You need the chain: pressure, then the metric, then an offer.',
      'Do not jump to the pitch.',
      'Offers must not lead on price.',
    ],
    needs: [
      { label: 'Customer name', hint: 'The account on the notes.' },
      { label: 'Metric', hint: 'The number the pressure hits.' },
      { label: 'Account notes', hint: 'Attach them. Show the steps.' },
    ],
    example:
      'Pressures first, then how each hits the metric, then two offers that do not lead on price. The steps shown.',
    related: 'commercial-pressures',
  },
  'price-notice': {
    whenBullets: [
      'The letter has to go.',
      'Frame it as capability they will feel, not inflation.',
      'No invented investments. No apology.',
    ],
    needs: [
      { label: 'Customer name', hint: 'The account receiving the notice.' },
      { label: 'Recipient', hint: 'Who the notice is addressed to.' },
      { label: 'Adjustment', hint: 'The change you are notifying.' },
    ],
    example:
      'The adjustment, framed as capability they will actually get. No invented investments. No apology for the number.',
    related: 'price-frame',
  },
  'onboarding-roadmap': {
    whenBullets: [
      'Kick-off is done.',
      'You need 90 days that someone will own.',
      'Milestones, owners, sign-offs. Not a Gantt in prose.',
    ],
    needs: [
      { label: 'Customer name', hint: 'The account being onboarded.' },
      { label: 'Timeline', hint: 'What they told you about the first 90 days.' },
    ],
    example:
      'Ninety days, bi-weekly milestones, owners, sign-offs. Gaps you have not been told flagged as missing.',
    related: 'onboarding-kpis',
  },
  'onboarding-kpis': {
    whenBullets: [
      'You need four numbers that prove adoption.',
      'Activity counts are the failure mode.',
      'No invented baseline.',
    ],
    needs: [
      { label: 'Customer name', hint: 'The account being onboarded.' },
      { label: 'Focus', hint: 'What adoption means here.' },
    ],
    example:
      'Four numbers about actual use. Source and what good looks like at day 90. No baseline unless you supplied one.',
    related: 'onboarding-roadmap',
  },
  'white-space': {
    whenBullets: [
      'You have an org chart and one sponsor.',
      'You need the gaps named.',
      'Outreach has to be a first move, not "build a relationship".',
    ],
    needs: [
      { label: 'Customer name', hint: 'The account on the chart.' },
      { label: 'Org chart and notes', hint: 'Attach them. Name who you do not cover.' },
    ],
    example:
      'The gaps on the chart. For each: why they matter, the risk of leaving them cold, one first move.',
    related: 'stakeholder-alignment',
  },
  'competitive-defence': {
    whenBullets: [
      'A rival is in the account.',
      'You need a brief, not a rant.',
      'Guesses must be labelled.',
    ],
    needs: [
      { label: 'Competitor name', hint: 'The rival targeting the account.' },
      { label: 'Customer name', hint: 'The account they are in.' },
      { label: 'Notes', hint: 'Attach them. Three things you do that they cannot match.' },
    ],
    example:
      'What they will offer, three things we do that they cannot match, and the conversation this week. Guesses labelled.',
    related: 'competitor-compare',
  },
  'urgent-call-prep': {
    whenBullets: [
      'The call is in an hour.',
      'You need talking points and a fence.',
      'No legal admission. No unapproved money.',
    ],
    needs: [
      { label: 'Customer name', hint: 'The account on the call.' },
      { label: 'Executive', hint: 'Who you are speaking to.' },
      { label: 'Issue', hint: 'What the call is about, in plain words.' },
    ],
    example:
      'Talking points, the hard line on promises, three questions. No legal admission. No unapproved money.',
    related: 'de-escalation',
  },
  'expand-the-book': {
    whenBullets: [
      'They want you in another part of the group.',
      'The SWOT is about this move, not the company in general.',
      'No new numbers.',
    ],
    needs: [
      { label: 'Customer name', hint: 'The account you already work with.' },
      { label: 'New area', hint: 'Where they want you next.' },
    ],
    example:
      'A SWOT for this move. Ours in strengths and weaknesses. Theirs in opportunities and threats. Four bullets each. No new numbers.',
    related: 'co-innovation',
  },
  'cfo-challenge': {
    whenBullets: [
      'You need the objection before they say it.',
      'Stay in character as the sceptical buyer.',
      'Do not write the rebuttal in the same turn.',
    ],
    needs: [
      { label: 'Customer name', hint: 'The account whose CFO you are playing.' },
      { label: 'Proposal', hint: 'What they will challenge.' },
    ],
    example:
      'Three commercial objections in their voice, and the evidence they would demand. No rebuttal yet.',
    related: 'price-frame',
  },
  'meeting-debrief': {
    whenBullets: [
      'You have a transcript.',
      'You need owners, not a summary.',
      'The email is a by-product.',
    ],
    needs: [
      { label: 'Customer name', hint: 'The account on the transcript.' },
      { label: 'Recipient', hint: 'Who the short follow-up is for.' },
      { label: 'Transcript', hint: 'Attach it. Do not invent owners or dates.' },
    ],
    example:
      'Decisions, open questions, actions by owner. Then a short follow-up. No invented owners or dates.',
    related: 'meeting-follow-up',
  },
  'cite-the-source': {
    whenBullets: [
      'The draft looks polished.',
      'You need to know what is real.',
      'If it cannot point, it is unverified.',
    ],
    needs: [
      { label: 'Customer name', hint: 'The account on the draft.' },
      { label: 'The draft and the files', hint: 'Attach both. Every claim points, or it is marked Unverified.' },
    ],
    example:
      'Every claim pointed at a file, or marked Unverified. Nothing dropped. Nothing added.',
    related: 'sanitise-for-the-library',
  },
  'sanitise-for-the-library': {
    whenBullets: [
      'A prompt worked.',
      'You want to save it without the client’s life in it.',
      'Names and money become slots. The job stays.',
    ],
    needs: [
      { label: 'The live prompt', hint: 'Paste the prompt that worked, names and all.' },
    ],
    example:
      'The same job, with names and money turned into slots, and a one-line hint for each placeholder.',
    related: 'meta-prompt',
  },
  'qbr-from-usage': {
    whenBullets: [
      'You have the usage file.',
      'You need the review story, not a dashboard dump.',
      'If the file cannot support a win, do not write one.',
    ],
    needs: [
      { label: 'Customer name', hint: 'The account on the file.' },
      { label: 'Usage and notes', hint: 'Attach them. Every win and risk must point at the file.' },
    ],
    example:
      'Three wins and two risks that point at the file, then a six-slide outline. No win the file cannot support.',
    related: 'qbr-reframe',
  },
};

export function pageFor(slug: string): PromptPage | undefined {
  return promptPages[slug];
}

export function relatedPrompt(slug: string) {
  const relatedSlug = promptPages[slug]?.related;
  return prompts.find((prompt) => prompt.slug === relatedSlug);
}
