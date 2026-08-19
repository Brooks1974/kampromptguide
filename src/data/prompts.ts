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
];

export const prompts: Prompt[] = [
  {
    slug: 'qbr-reframe',
    title: 'QBR reframe',
    when: 'Before a quarterly review when the first draft would otherwise be generic.',
    tag: 'Brief',
    group: 'brief',
    startN: 2,
    teaches: 'Names the pressure before asking for the agenda, so the model cannot default to a generic pack.',
    slots: [
      customerName,
      {
        key: 'sector',
        placeholder: '[sector]',
        sample: 'their industry',
        label: 'Sector',
        hint: 'Their industry, in their words.',
      },
      {
        key: 'pressures',
        placeholder: '[pressures]',
        sample: 'the squeeze this quarter',
        label: 'Pressures',
        hint: 'What is squeezing them this quarter.',
      },
      {
        key: 'metric',
        placeholder: '[metric]',
        sample: 'gross margin',
        label: 'Metric',
        hint: 'The number that must not slip.',
      },
    ],
    text: 'You are a Key Account Manager preparing for a quarterly review with [Customer Name], a [sector] organisation facing [pressures]. Identify the three operational bottlenecks most likely to threaten their [metric] this quarter and outline how we can address each one without leading on price.',
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
        sample: 'Need a QBR agenda that is not a generic pack',
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
    slots: [
      customerName,
      {
        key: 'recipient',
        placeholder: '[recipient]',
        sample: 'VP of Procurement',
        label: 'Recipient',
        hint: 'Who the email is for.',
      },
      {
        key: 'what went well',
        placeholder: '[what went well]',
        sample: 'We hit the agreed outcomes for the quarter.',
        label: 'What went well',
        hint: 'One proof from the review.',
      },
      {
        key: 'the concern',
        placeholder: '[the concern]',
        sample: 'They raised a delay in onboarding.',
        label: 'The concern',
        hint: 'What they pushed back on.',
      },
      {
        key: 'next step',
        placeholder: '[next step]',
        sample: 'Set a date for an onboarding audit',
        label: 'Next step',
        hint: 'One clear action.',
      },
    ],
    text: `<Task>
Draft an executive summary email to [Customer Name]'s [recipient] following our Quarterly Business Review.
</Task>

<Context>
[what went well]
[the concern]
</Context>

<Constraints>
Keep the length under 200 words. Do not make financial commitments.
</Constraints>

<Tone>
Direct, professional, and solution-focused.
</Tone>

<RequiredOutput>
1. A brief thank-you.
2. One proof point from the review.
3. A clear action item: [next step]
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
    when: 'Something has gone wrong and an executive is on the line.',
    tag: 'Recovery',
    group: 'recovery',
    teaches: 'Acknowledge and next step. No liability, no unapproved commercial concessions.',
    slots: [
      customerName,
      {
        key: 'executive',
        placeholder: '[executive]',
        sample: 'Chief Operating Officer',
        label: 'Executive',
        hint: 'The title of the person you are writing to.',
      },
      {
        key: 'incident',
        placeholder: '[incident]',
        sample: 'disruption',
        label: 'Incident',
        hint: 'What went wrong, in plain words.',
      },
    ],
    text: "Draft a response to [Customer Name]'s [executive] acknowledging the recent [incident]. Reiterate our commitment, outline immediate corrective actions, and suggest a formal review meeting without admitting legal liability or promising unapproved commercial concessions.",
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
    title: 'Buyer-side margins',
    when: 'A buyer-side account review, before anyone leads on price.',
    tag: 'Research',
    group: 'research',
    startN: 5,
    teaches: 'Three commercial pressures that are not price. Buyer-side.',
    slots: [
      customerName,
      {
        key: 'metric',
        placeholder: '[metric]',
        sample: 'operating margin',
        label: 'Metric',
        hint: 'The number they are trying to protect.',
      },
    ],
    text: 'You are a Key Account Manager preparing a quarterly review with [Customer Name]. They sit on the buying side. Identify the three commercial pressures most likely to squeeze their [metric] this year and outline how a supplier can help them protect each one without leading on price.',
  },
  {
    slug: 'plant-director-proof',
    title: 'Past procurement',
    when: 'Procurement is shopping the category.',
    tag: 'Research',
    group: 'research',
    teaches: 'Watch for category shopping. Take the proof to the person who feels the work, not purchasing.',
    slots: [
      customerName,
      {
        key: 'operational buyer',
        placeholder: '[operational buyer]',
        sample: 'operations director',
        label: 'Operational buyer',
        hint: 'The person who feels the work, not the person who buys it.',
      },
    ],
    text: 'Review these notes from the last two business reviews with [Customer Name]. Highlight any signs the procurement lead is shopping the category, and list three value proofs we should take to [operational buyer] rather than to purchasing.',
  },
];
