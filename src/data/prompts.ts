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

const competitorName: PromptSlot = {
  key: 'Competitor Name',
  placeholder: '[Competitor Name]',
  sample: 'the named rival',
  label: 'Competitor name',
  hint: 'The rival in the conversation.',
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
  {
    slug: 'competitor-compare',
    title: 'Competitor compare',
    when: 'You have a named rival and need the difference in one page.',
    tag: 'Research',
    group: 'research',
    teaches: 'Names the rival and the account, so the model cannot write a generic battlecard.',
    slots: [competitorName, customerName],
    text: "Compare [Competitor Name]'s offer to [Customer Name] against ours. Highlight where they position their value, where we are stronger, and where we are exposed. Do not invent prices or features we have not given you.",
  },
  {
    slug: 'earnings-brief',
    title: 'Earnings brief',
    when: 'Their results just landed and you have a meeting this week.',
    tag: 'Research',
    group: 'research',
    teaches: 'Strategy initiatives out, not a rewrite of the press release.',
    slots: [
      customerName,
      {
        key: 'timeframe',
        placeholder: '[timeframe]',
        sample: 'six months',
        label: 'Timeframe',
        hint: 'The window you want the initiatives for.',
      },
    ],
    text: "Summarise [Customer Name]'s latest results from the attached report. Pull out their primary strategic initiatives for the next [timeframe] and what each one means for our account. Quote the report. Do not add figures that are not in it.",
  },
  {
    slug: 'commercial-pressures',
    title: 'Commercial pressures',
    when: 'You need the three pressures on this account, not the sector in general.',
    tag: 'Research',
    group: 'research',
    teaches: 'The initiative is the lens. Without it you get a trend piece.',
    slots: [
      customerName,
      {
        key: 'initiative',
        placeholder: '[initiative]',
        sample: 'the initiative on the table',
        label: 'Initiative',
        hint: 'The specific programme or move, not the sector.',
      },
    ],
    text: "You are a Key Account Manager. What commercial pressures are most likely to affect [Customer Name]'s [initiative] in the current climate? List three, say how each shows up in the account, and what we should do about each. Use only the attached notes plus what I typed. Label anything you inferred.",
  },
  {
    slug: 'order-patterns',
    title: 'Order patterns',
    when: 'You have twelve months of orders and a feeling something moved.',
    tag: 'Research',
    group: 'research',
    teaches: 'Asks for dips and erosion, not a chart commentary.',
    slots: [customerName],
    text: 'Review this order history for [Customer Name]. Identify seasonal dips, unusual drops in volume, or signs of margin erosion. For each, say what you would ask them next. Do not invent lines that are not in the file.',
  },
  {
    slug: 'board-priorities',
    title: 'Board priorities',
    when: 'You have a board pack and email, and you need the real three.',
    tag: 'Research',
    group: 'research',
    teaches: 'Two sources, one role. Stops a blended "the customer wants growth" answer.',
    slots: [
      customerName,
      {
        key: 'role',
        placeholder: '[role]',
        sample: 'Procurement Director',
        label: 'Role',
        hint: 'Whose priorities you want named.',
      },
    ],
    text: 'Based on the attached board pack and recent email for [Customer Name], what are the top three strategic priorities for their [role] right now? Point to the line in the pack or email that supports each one.',
  },
  {
    slug: 'churn-signals',
    title: 'Churn signals',
    when: 'The last two reviews felt polite. You need the tells.',
    tag: 'Meetings',
    group: 'meetings',
    teaches: 'Subtle dissatisfaction, not a churn score.',
    slots: [customerName],
    text: 'Analyse these notes from the last two business reviews with [Customer Name]. Highlight any signs of dissatisfaction, a shifting priority, or a sponsor going quiet. For each, give the quote or the absence that made you flag it, and one thing to do this month.',
  },
  {
    slug: 'kpi-benchmark',
    title: 'KPI benchmark',
    when: 'They asked how they compare. You must not invent a league table.',
    tag: 'Research',
    group: 'research',
    teaches: 'Forces the source. If you have no peer file, it must say so.',
    slots: [
      customerName,
      {
        key: 'metric',
        placeholder: '[metric]',
        sample: 'the metric they asked about',
        label: 'Metric',
        hint: 'The number they want compared.',
      },
      {
        key: 'audience',
        placeholder: '[audience]',
        sample: 'the person who asked',
        label: 'Audience',
        hint: 'Who will read the comparison.',
      },
    ],
    text: 'Benchmark [Customer Name] on [metric] against the peer set in the attached file. If no peer file is attached, say what you would need and do not invent averages. Write it for [audience].',
  },
  {
    slug: 'co-innovation',
    title: 'Co-innovation',
    when: 'You need three offers that are not a product list.',
    tag: 'Research',
    group: 'research',
    teaches: 'Their priority first. Our capability second.',
    slots: [
      customerName,
      {
        key: 'priority',
        placeholder: '[priority]',
        sample: 'the priority they named',
        label: 'Priority',
        hint: 'Their job, in their words.',
      },
    ],
    text: 'Draft three distinct joint proposals for [Customer Name] that connect what we can do to their [priority]. Each proposal: the customer job, what we put in, what they put in, and how value is shared. No prices unless I supplied them.',
  },
  {
    slug: 'price-frame',
    title: 'Price frame',
    when: 'The number is going up. You need four ways to say it that are not "costs rose".',
    tag: 'Renewal',
    group: 'renewal',
    teaches: 'Value first. The number last.',
    slots: [
      {
        key: 'increase',
        placeholder: '[increase]',
        sample: '8 percent',
        label: 'Increase',
        hint: 'The change you have to explain.',
      },
      customerName,
    ],
    text: 'Brainstorm four ways to frame a [increase] to [Customer Name], focusing on extra capability and risk we take off them, not on our costs. One paragraph each. Do not promise anything we have not agreed internally.',
  },
  {
    slug: 'roundtable-invite',
    title: 'Roundtable invite',
    when: 'You want a senior in the room and "it will be useful" will not get them there.',
    tag: 'Meetings',
    group: 'meetings',
    teaches: 'Three reasons, their job, not our agenda.',
    slots: [
      customerName,
      {
        key: 'executive',
        placeholder: '[executive]',
        sample: 'the senior you want in the room',
        label: 'Executive',
        hint: 'The title of the person you are inviting.',
      },
      {
        key: 'event',
        placeholder: '[event]',
        sample: 'the session',
        label: 'Event',
        hint: 'What you are asking them to attend.',
      },
      {
        key: 'priority',
        placeholder: '[priority]',
        sample: 'the priority they own',
        label: 'Priority',
        hint: 'Their job, not our agenda.',
      },
    ],
    text: "Suggest three compelling reasons for [Customer Name]'s [executive] to attend [event]. Each reason must serve their [priority], not our brand. Keep each to two sentences.",
  },
  {
    slug: 'meeting-follow-up',
    title: 'Meeting follow-up',
    when: 'The meeting just ended. The email has to go before you lose the thread.',
    tag: 'Meetings',
    group: 'meetings',
    teaches: 'Actions, owners, dates. Not a recap of the chat.',
    slots: [
      customerName,
      {
        key: 'recipient',
        placeholder: '[recipient]',
        sample: 'the person you just met',
        label: 'Recipient',
        hint: 'Who the email is for.',
      },
    ],
    text: "Draft a concise follow-up email to [Customer Name]'s [recipient] after today's review. Include the agreed actions, who owns each, and the next date. Do not add commitments that are not in the notes I attached.",
  },
  {
    slug: 'exec-one-pager',
    title: 'Executive one-pager',
    when: 'You have a long draft and ten minutes with a senior.',
    tag: 'Brief',
    group: 'brief',
    teaches: 'Audience first. Length is a constraint, not a style note.',
    slots: [
      customerName,
      {
        key: 'audience',
        placeholder: '[audience]',
        sample: 'CFO',
        label: 'Audience',
        hint: 'Who has the ten minutes.',
      },
      {
        key: 'care-about',
        placeholder: '[care-about]',
        sample: 'cost recovery',
        label: 'What they care about',
        hint: 'The one thing they will scan for.',
      },
    ],
    text: "Turn this document into a one-page brief for [Customer Name]'s [audience]. They care about [care-about]. No jargon. No new numbers. If a number is not in the source, leave it out.",
  },
  {
    slug: 'proposal-draft',
    title: 'Proposal draft',
    when: 'The pain is clear. You need a first commercial draft, not a brochure.',
    tag: 'Meetings',
    group: 'meetings',
    teaches: 'Their bottlenecks in, our phases out. ROI only if you supplied it.',
    slots: [
      customerName,
      {
        key: 'bottlenecks',
        placeholder: '[bottlenecks]',
        sample: 'the bottlenecks you named',
        label: 'Bottlenecks',
        hint: 'The pains you already agree on.',
      },
    ],
    text: 'Write a formal commercial proposal for [Customer Name] that addresses [bottlenecks], outlines a three-phase plan, and states the expected return only using figures I have given you. If I have not given figures, say what we would measure instead.',
  },
  {
    slug: 'renewal-watchouts',
    title: 'Renewal watchouts',
    when: 'You can give the model a short background and you want three risks, not a novel.',
    tag: 'Renewal',
    group: 'renewal',
    teaches: 'Background first, then the ask. Three risks you can monitor.',
    slots: [
      customerName,
      {
        key: 'background',
        placeholder: '[background]',
        sample: 'the short background you would give a colleague',
        label: 'Background',
        hint: 'A few lines. Not the whole file.',
      },
    ],
    text: 'Context: [Customer Name] [background]. Based only on that, what three risk areas should we monitor during the renewal? For each: the early tell, and what we do if we see it.',
  },
  {
    slug: 'account-vulnerabilities',
    title: 'Account vulnerabilities',
    when: 'You want a hard look before you walk in optimistic.',
    tag: 'Renewal',
    group: 'renewal',
    teaches: 'Role is an auditor, not a cheerleader.',
    slots: [customerName],
    text: 'Act as an experienced Key Account Director preparing for renewal. Review the account summary below for [Customer Name] and highlight the top commercial vulnerabilities. For each: why it matters, and the mitigation we still have time for.',
  },
  {
    slug: 'pressure-to-offer',
    title: 'Pressure to offer',
    when: 'You need the chain: pressure, margin, then an offer.',
    tag: 'Research',
    group: 'research',
    teaches: 'Step by step on purpose. Do not jump to the pitch.',
    slots: [
      customerName,
      {
        key: 'metric',
        placeholder: '[metric]',
        sample: 'operating margin',
        label: 'Metric',
        hint: 'The number the pressure hits.',
      },
    ],
    text: "Examine [Customer Name]'s account notes. First, list three cost or demand pressures they are under. Next, say how each one hits [metric]. Finally, recommend two offers we can make that do not lead on price. Show the steps.",
  },
  {
    slug: 'price-notice',
    title: 'Price notice',
    when: 'The letter has to go. Frame it as investment, not inflation.',
    tag: 'Renewal',
    group: 'renewal',
    teaches: 'Enhancements they will feel. No apology tour.',
    slots: [
      customerName,
      {
        key: 'recipient',
        placeholder: '[recipient]',
        sample: 'the commercial contact',
        label: 'Recipient',
        hint: 'Who the notice is addressed to.',
      },
      {
        key: 'adjustment',
        placeholder: '[adjustment]',
        sample: '5 percent',
        label: 'Adjustment',
        hint: 'The change you are notifying.',
      },
    ],
    text: "Draft a commercial notice to [Customer Name]'s [recipient] explaining our [adjustment]. Frame it around extra capability and support they will actually get. Do not invent investments. Do not apologise for the number.",
  },
  {
    slug: 'onboarding-roadmap',
    title: 'Onboarding roadmap',
    when: 'Kick-off is done. You need 90 days that someone will own.',
    tag: 'Meetings',
    group: 'meetings',
    teaches: 'Milestones, owners, sign-offs. Not a Gantt in prose.',
    slots: [
      customerName,
      {
        key: 'timeline',
        placeholder: '[timeline]',
        sample: 'the dates you already have',
        label: 'Timeline',
        hint: 'What they told you about the first 90 days.',
      },
    ],
    text: "Based on [Customer Name]'s [timeline], draft a 90-day onboarding roadmap. Include bi-weekly milestones, who owns each, and which sign-offs we need. Flag anything I have not told you that you would need before this is real.",
  },
  {
    slug: 'onboarding-kpis',
    title: 'Onboarding KPIs',
    when: 'You need four numbers that prove adoption, not activity.',
    tag: 'Meetings',
    group: 'meetings',
    teaches: 'Quantitative, adoption-shaped. Not "number of meetings".',
    slots: [
      customerName,
      {
        key: 'focus',
        placeholder: '[focus]',
        sample: 'actual use, not training attendance',
        label: 'Focus',
        hint: 'What adoption means here.',
      },
    ],
    text: 'Propose four quantitative KPIs to track onboarding for [Customer Name], focused on [focus]. For each: the number, where it comes from, and what "good" looks like at day 90. Do not invent a baseline if I have not given one.',
  },
  {
    slug: 'white-space',
    title: 'White space',
    when: 'You have an org chart and you are still stuck with one sponsor.',
    tag: 'Research',
    group: 'research',
    teaches: 'Names the gaps. Outreach is specific, not "build a relationship".',
    slots: [customerName],
    text: 'Review the attached org chart and notes for [Customer Name]. Identify decision-makers where we lack coverage. For each: why they matter, the risk of leaving them cold, and one tailored first move.',
  },
  {
    slug: 'competitive-defence',
    title: 'Competitive defence',
    when: 'A rival is in the account. You need a brief, not a rant.',
    tag: 'Research',
    group: 'research',
    teaches: 'Three things we do that they cannot, grounded in what you attached.',
    slots: [competitorName, customerName],
    text: '[Competitor Name] is targeting [Customer Name]. Using only the attached notes and what I typed, draft a defensive brief: what they will offer, three things we do that they cannot match, and the one conversation we must have this week. Label anything you guessed.',
  },
  {
    slug: 'urgent-call-prep',
    title: 'Urgent call prep',
    when: 'The call is in an hour. You need talking points and a fence.',
    tag: 'Recovery',
    group: 'recovery',
    teaches: 'What we can promise, and three questions that buy time and trust.',
    slots: [
      customerName,
      {
        key: 'executive',
        placeholder: '[executive]',
        sample: 'the person on the call',
        label: 'Executive',
        hint: 'Who you are speaking to.',
      },
      {
        key: 'issue',
        placeholder: '[issue]',
        sample: 'the issue on the call',
        label: 'Issue',
        hint: 'What the call is about, in plain words.',
      },
    ],
    text: "I have an urgent call with [Customer Name]'s [executive] about [issue]. Draft a bulleted prep sheet: talking points, a hard line on what we can promise, and three constructive questions to regain trust. No legal admission. No unapproved money.",
  },
  {
    slug: 'expand-the-book',
    title: 'Expand the book',
    when: 'They want us in another part of the group.',
    tag: 'Research',
    group: 'research',
    teaches: 'A SWOT that is about this move, not the company in general.',
    slots: [
      customerName,
      {
        key: 'new-area',
        placeholder: '[new-area]',
        sample: 'another part of the group',
        label: 'New area',
        hint: 'Where they want you next.',
      },
    ],
    text: 'Complete a SWOT for taking our work with [Customer Name] into [new-area]. Strengths and weaknesses must be ours. Opportunities and threats must be theirs. Four bullets each. No new numbers.',
  },
  {
    slug: 'cfo-challenge',
    title: 'CFO challenge',
    when: 'You need the objection before they say it.',
    tag: 'Renewal',
    group: 'renewal',
    teaches: 'Role-play as the sceptical buyer. Then you answer it yourself.',
    slots: [
      customerName,
      {
        key: 'proposal',
        placeholder: '[proposal]',
        sample: 'the proposal on the table',
        label: 'Proposal',
        hint: 'What they will challenge.',
      },
    ],
    text: 'Act as a risk-averse CFO at [Customer Name]. Challenge our [proposal]. Give the three strongest commercial objections, and the evidence you would demand. Stay in character. Do not write our rebuttal unless I ask in the next turn.',
  },
  {
    slug: 'meeting-debrief',
    title: 'Meeting debrief',
    when: 'You have a transcript and you need owners, not a summary.',
    tag: 'Meetings',
    group: 'meetings',
    teaches: 'Actions by owner. The email is a by-product.',
    slots: [
      customerName,
      {
        key: 'recipient',
        placeholder: '[recipient]',
        sample: 'the person who needs the follow-up',
        label: 'Recipient',
        hint: 'Who the short follow-up is for.',
      },
    ],
    text: 'Process this transcript from [Customer Name]. List decisions, open questions, and actions by owner with a date if one was said. Then draft a short follow-up for [recipient]. Do not invent owners or dates.',
  },
  {
    slug: 'cite-the-source',
    title: 'Cite the source',
    when: 'The draft looks polished. You need to know what is real.',
    tag: 'Brief',
    group: 'brief',
    teaches: 'Every claim needs a pointer. If it cannot point, it is unverified.',
    slots: [customerName],
    text: 'Review this draft for [Customer Name]. For every factual claim, say where it came from in the attached files. If you cannot point to a file, mark it Unverified. Do not silently drop claims. Do not add new ones.',
  },
  {
    slug: 'sanitise-for-the-library',
    title: 'Sanitise for the library',
    when: "A prompt worked. You want to save it without the client's life in it.",
    tag: 'Brief',
    group: 'brief',
    teaches: 'Names and money become slots. The job stays.',
    slots: [
      {
        key: 'live prompt',
        placeholder: '[live prompt]',
        sample: 'the prompt that worked',
        label: 'The live prompt',
        hint: 'Paste the prompt that worked, names and all.',
      },
    ],
    text: `Rewrite the prompt below as a reusable template. Replace company names, people, and figures with [placeholders]. Keep the role, the job, the constraints, and the format. Then list the placeholders with a one-line hint each.

My prompt:
[live prompt]`,
  },
  {
    slug: 'qbr-from-usage',
    title: 'QBR from usage',
    when: 'You have the usage file and you need the review story, not a dashboard dump.',
    tag: 'Brief',
    group: 'brief',
    teaches: 'Three wins, two risks, then a slide outline. Evidence only from the file.',
    slots: [customerName],
    text: 'Read the attached usage and notes for [Customer Name]. Give three value wins, two retention risks, and a six-slide QBR outline. Every win and risk must point at the file. If the file cannot support a win, do not write one.',
  },
];
