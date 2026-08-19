export type PromptGroup = 'brief' | 'research' | 'meetings' | 'renewal' | 'recovery';

export type PromptStep = {
  label: string;
  text: string;
};

export type PromptSlot = {
  key: string;
  placeholder: string;
  sample: string;
  label?: string;
  hint?: string;
};

export type Prompt = {
  slug: string;
  title: string;
  when: string;
  tag: string;
  group: PromptGroup;
  text?: string;
  steps?: PromptStep[];
  startN?: 1 | 2 | 3 | 4 | 5;
  teaches: string;
  slots?: PromptSlot[];
};

const customerName: PromptSlot = {
  key: 'Customer Name',
  placeholder: '[Customer Name]',
  sample: 'Acme Group',
  label: 'Customer name',
  hint: 'The account, as they say it internally.',
};

export const groups: { id: PromptGroup; label: string }[] = [
  { id: 'brief', label: 'Brief' },
  { id: 'research', label: 'Research' },
  { id: 'meetings', label: 'Meetings' },
  { id: 'renewal', label: 'Renewal' },
  { id: 'recovery', label: 'Recovery' },
];

export const filterPills: { id: string; label: string }[] = [
  { id: 'brief', label: 'Brief' },
  { id: 'research', label: 'Research' },
  { id: 'meetings', label: 'Meetings' },
  { id: 'renewal', label: 'Renewal' },
  { id: 'recovery', label: 'Recovery' },
  { id: 'animal-health', label: 'Animal health' },
  { id: 'manufacturing', label: 'Manufacturing' },
];

export const prompts: Prompt[] = [
  {
    slug: 'qbr-reframe',
    title: 'QBR reframe',
    when: 'Before a quarterly review when the first draft would otherwise be generic.',
    tag: 'Brief / logistics (supplier)',
    group: 'brief',
    startN: 2,
    teaches:
      'Names the industry pressure before asking for the agenda, so the model cannot default to generic SLA slides.',
    text: 'You are a Key Account Manager preparing for a quarterly review with a mid-sized European logistics provider facing rising fuel overheads and labour shortages. Identify the three operational bottlenecks most likely to threaten their gross margin this quarter and outline how a technology partner can address each one.',
  },
  {
    slug: 'meta-prompt',
    title: 'Meta-prompt',
    when: 'You have messy notes and need a real brief before you ask for the deliverable.',
    tag: 'Brief',
    group: 'brief',
    startN: 1,
    teaches: 'Makes the model write the brief, not the deliverable. Role, constraints, XML, output format.',
    slots: [
      {
        key: 'notes',
        placeholder: '[Insert your unedited notes or goal here]',
        sample: 'Need a QBR agenda that is not a generic SLA deck',
        label: 'Your notes',
        hint: 'Unedited notes or the goal. Leave them messy.',
      },
    ],
    text: `I want to create an effective prompt for a Key Account Management task. Below is my rough draft.

Please rewrite it into a highly structured, professional prompt. Your optimised version must include:
1. An explicit executive role for the AI.
2. Clear ground rules and commercial constraints.
3. XML tags separating context from core instructions.
4. A defined, professional output format.

My rough draft: [Insert your unedited notes or goal here]`,
  },
  {
    slug: 'stakeholder-alignment',
    title: 'Stakeholder alignment',
    when: 'Onboarding / kick-off, two agendas in the room.',
    tag: 'Meetings',
    group: 'meetings',
    startN: 3,
    teaches: 'Two named roles in one prompt so you get two agendas, not one blended summary.',
    slots: [customerName],
    text: "Analyse the attached kick-off transcript for [Customer Name]. Identify the primary business drivers for the Procurement Director and list three immediate operational risks raised by their implementation lead.",
  },
  {
    slug: 'post-qbr-follow-up',
    title: 'Post-QBR follow-up (tagged)',
    when: 'After a quarterly review, before you send the email.',
    tag: 'Meetings',
    group: 'meetings',
    teaches:
      'XML tags keep the facts, the constraints, and the email structure from bleeding into each other.',
    slots: [customerName],
    text: `<Task>
Draft an executive summary email to [Customer Name]'s VP of Procurement following our Quarterly Business Review.
</Task>

<Context>
We successfully met all Tier-1 uptime SLAs for Q2. However, the customer raised concerns about onboarding delays in their European offices.
</Context>

<Constraints>
Keep the length under 200 words. Do not make financial commitments regarding service credits.
</Constraints>

<Tone>
Direct, professional, and solution-focused.
</Tone>

<RequiredOutput>
1. A brief thank-you acknowledging their Q2 partnership.
2. A single bullet confirming our 99.9% uptime metric.
3. A clear action item setting an audit date for European onboarding.
</RequiredOutput>`,
  },
  {
    slug: 'sequential-chain',
    title: 'Sequential chain',
    when: 'A messy transcript that must become a short proposal.',
    tag: 'Meetings',
    group: 'meetings',
    teaches: 'Extraction, then proposal, then tone. Do not ask for all three in one go.',
    steps: [
      {
        label: 'Turn 1 — Extraction',
        text: 'Analyse the attached raw meeting transcript. List the 5 main pain points expressed by the customer.',
      },
      {
        label: 'Turn 2 — Proposal',
        text: 'Based on those 5 pain points, draft a three-paragraph commercial proposal outlining how our services directly address them.',
      },
      {
        label: 'Turn 3 — Tighten',
        text: 'Take that proposal draft and rewrite it using an executive, concise tone. Keep it under 250 words.',
      },
    ],
  },
  {
    slug: 'renewal-pre-mortem',
    title: 'Renewal pre-mortem',
    when: '90 days out, before the commercial conversation.',
    tag: 'Renewal',
    group: 'renewal',
    startN: 4,
    teaches: 'Asks why they leave, not why they stay. Five reasons plus a mitigation for each.',
    slots: [customerName],
    text: 'Review our meeting history and contract terms for [Customer Name]. Act as a critical account auditor and list five reasons why this customer might choose not to renew their contract at the end of the year, alongside recommended mitigation steps for each.',
  },
  {
    slug: 'value-realisation-audit',
    title: 'Value realisation audit',
    when: 'You need evidence of ROI before you talk price.',
    tag: 'Renewal',
    group: 'renewal',
    teaches: 'Hours and money before price. Forces evidence.',
    slots: [customerName],
    text: 'Examine the usage metrics and support logs for [Customer Name] over the past six months. Draft an executive summary quantifying the measurable return on investment delivered, expressed in total hours saved and cost efficiencies.',
  },
  {
    slug: 'de-escalation',
    title: 'De-escalation',
    when: 'Service failure, executive on the line.',
    tag: 'Recovery',
    group: 'recovery',
    teaches: 'Acknowledge and next step. No liability, no unapproved credits.',
    slots: [customerName],
    text: "Draft a response to [Customer Name]'s Chief Technology Officer acknowledging the recent service disruption. Reiterate our commitment to service quality, outline immediate corrective actions, and suggest a formal review meeting without admitting legal liability or promising unapproved financial credits.",
  },
  {
    slug: 'scope-creep',
    title: 'Scope creep',
    when: 'They ask for work that is not in the SOW.',
    tag: 'Recovery',
    group: 'recovery',
    teaches: 'Names the SOW and the change-request path so "yes" is not the default.',
    slots: [customerName],
    text: "Draft a polite but firm message to [Customer Name]'s project manager regarding their request for additional custom deliverables. Explain that these fall outside the current Statement of Work and outline options for adding them through a formal change request.",
  },
  {
    slug: 'c-suite-pitch',
    title: 'C-suite pitch',
    when: 'You have their annual strategy report and one shot at the COO.',
    tag: 'Research',
    group: 'research',
    teaches: 'Strategy report in, COO out. Margin language, not feature language.',
    slots: [customerName],
    text: "Analyse [Customer Name]'s annual strategy report. Draft a personalised, three-paragraph pitch to their Chief Operations Officer explaining how our advanced capabilities directly support their primary operating margin goals.",
  },
  {
    slug: 'vet-group-margins',
    title: 'Vet-group margins',
    when: 'Animal health / clinic-group account review.',
    tag: 'Research / animal health',
    group: 'research',
    startN: 5,
    teaches: 'Three commercial pressures that are not price. Buyer-side animal health.',
    text: 'You are a Key Account Manager in animal health preparing a quarterly review with a national veterinary group. Identify the three commercial pressures most likely to squeeze clinic margins this year — staffing, buying-group terms, and own-brand mix — and outline how a supplier can help the group protect each one without leading on price.',
  },
  {
    slug: 'plant-director-proof',
    title: 'Plant-director proof',
    when: 'Multi-site manufacturer, procurement is shopping the category.',
    tag: 'Research / manufacturing',
    group: 'research',
    teaches: 'Watch for category shopping. Take the proof to the plant director, not purchasing.',
    slots: [customerName],
    text: 'Review these notes from the last two business reviews with [Customer Name], a multi-site manufacturer. Highlight any signs the procurement lead is shopping the category, and list three value proofs we should take to the plant director rather than to purchasing.',
  },
];
