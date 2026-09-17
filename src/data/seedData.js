export const INITIAL_CHAPTERS = [
  {
    id: "chap-reg-framework",
    title: "Indian Regulatory Framework",
    unitNumber: "Chapter 1",
    order: 1,
    highWeightage: false,
    verified: true,
    description: "Overview of legal system, sources of law, court structures, and legislative processes in India."
  },
  {
    id: "chap-contract-act",
    title: "The Indian Contract Act, 1872",
    unitNumber: "Chapter 2",
    order: 2,
    highWeightage: true,
    verified: true,
    description: "General principles of contract law, essential elements, performance, breach, indemnity, bailment, and agency."
  },
  {
    id: "chap-soga",
    title: "The Sale of Goods Act, 1930",
    unitNumber: "Chapter 3",
    order: 3,
    highWeightage: true,
    verified: true,
    description: "Contracts of sale, conditions & warranties, transfer of ownership, and rights of unpaid seller."
  },
  {
    id: "chap-partnership",
    title: "The Indian Partnership Act, 1932",
    unitNumber: "Chapter 4",
    order: 4,
    highWeightage: false,
    verified: true,
    description: "General nature of partnership, relations of partners to one another & third parties, registration and dissolution of firm."
  },
  {
    id: "chap-llp",
    title: "The Limited Liability Partnership Act, 2008",
    unitNumber: "Chapter 5",
    order: 5,
    highWeightage: false,
    verified: true,
    description: "Salient features of LLP, body corporate status, limited liability, incorporation, and partner duties."
  },
  {
    id: "chap-companies-act",
    title: "The Companies Act, 2013",
    unitNumber: "Chapter 6",
    order: 6,
    highWeightage: false,
    verified: true,
    description: "Corporate veil, company types, Memorandum & Articles of Association, doctrines of ultra vires & indoor management."
  },
  {
    id: "chap-negotiable-instruments",
    title: "The Negotiable Instruments Act, 1881",
    unitNumber: "Chapter 7",
    order: 7,
    highWeightage: false,
    verified: true,
    description: "Promissory notes, bills of exchange, cheques, negotiation, endorsement, holder in due course, and dishonour under Sec 138."
  }
];

export const INITIAL_TOPICS = [
  // --- CHAPTER 1: INDIAN REGULATORY FRAMEWORK ---
  { 
    id: "reg-sources-law", 
    chapterId: "chap-reg-framework", 
    title: "Sources of Law & Legal System in India", 
    order: 1, 
    verified: true,
    content: {
      fullExplanation: "Indian law originates from primary sources: the Constitution of India (Grundnorm), Statutory Law (Acts passed by Parliament & State Legislatures), Judicial Precedents (Stare Decisis), Customary Law, and Personal Laws. Article 13 makes the Constitution supreme, rendering inconsistent statutes void.",
      exceptions: [
        "Customs that are immoral, unreasonable, or opposed to public policy are void.",
        "Judicial precedents of a High Court are persuasive (not binding) on equal benches of other High Courts."
      ]
    },
    definitionBreakdown: {
      originalText: "Law includes any Ordinance, order, bye-law, rule, regulation, notification, custom or usage having in the territory of India the force of law.",
      parts: [
        { phrase: "Ordinance, order, bye-law, rule, regulation", explanation: "Includes secondary and delegated legislations enacted by executive administrative bodies." },
        { phrase: "custom or usage", explanation: "Longstanding unwritten traditions accepted by community as binding legal norms." },
        { phrase: "having the force of law", explanation: "Must be legally enforceable by state authority and recognized by courts." }
      ],
      plainSummary: "Law in India encompasses written Parliamentary Acts, executive rules, and recognized community customs enforceable by courts."
    }
  },
  { 
    id: "reg-court-hierarchy", 
    chapterId: "chap-reg-framework", 
    title: "Hierarchy of Courts & Legislative Process", 
    order: 2, 
    verified: true,
    content: {
      fullExplanation: "India follows a unified judicial hierarchy. Supreme Court of India is the highest constitutional court (Article 124), followed by High Courts in states (Article 214), District/Sessions Courts, and Subordinate Courts. Statutes are passed through 3 readings in both Houses of Parliament followed by Presidential Assent under Article 111.",
      exceptions: [
        "Money Bills (Article 110) can only originate in Lok Sabha; Rajya Sabha cannot reject or amend them.",
        "Specialized statutory tribunals (NCLT, ITAT) have jurisdiction limited strictly to their governing enactments."
      ]
    },
    definitionBreakdown: {
      originalText: "The Supreme Court shall be a court of record and shall have all powers of such a court including the power to punish for contempt of itself.",
      parts: [
        { phrase: "court of record", explanation: "Its judicial proceedings and decisions are preserved as authoritative legal precedents." },
        { phrase: "all powers of such a court", explanation: "Possesses inherent constitutional jurisdiction to enforce compliance nationwide." },
        { phrase: "power to punish for contempt", explanation: "Can penalize willful disobedience of its decrees or scandalizing the judicial system." }
      ],
      plainSummary: "The Supreme Court stands as India's ultimate judicial authority whose rulings bind all lower courts nationwide."
    }
  },

  // --- CHAPTER 2: INDIAN CONTRACT ACT, 1872 ---
  { 
    id: "contract-nature", 
    chapterId: "chap-contract-act", 
    title: "Nature of Contracts", 
    order: 1, 
    verified: true,
    content: {
      fullExplanation: "A contract under Section 2(h) is an agreement enforceable by law. Section 10 mandates essential elements: offer and acceptance, intention to create legal relations, free consent, competent parties, lawful consideration, and lawful object.",
      exceptions: [
        "Domestic and social agreements are presumed NOT to create legal relations (Balfour v. Balfour).",
        "Expressly void agreements (Sec 24–30) cannot become contracts even if all Sec 10 elements exist."
      ]
    },
    definitionBreakdown: {
      originalText: "All agreements are contracts if they are made by the free consent of parties competent to contract, for a lawful consideration and with a lawful object, and are not hereby expressly declared to be void.",
      parts: [
        { phrase: "All agreements are contracts if...", explanation: "Every contract starts as an agreement, but only those meeting Sec 10 criteria become legally binding." },
        { phrase: "free consent of parties", explanation: "Parties must agree voluntarily without coercion, undue influence, fraud, misrepresentation, or mistake." },
        { phrase: "competent to contract", explanation: "Parties must be of sound mind, major (18+), and not disqualified by law." },
        { phrase: "lawful consideration and object", explanation: "What is exchanged and the purpose must be legal and not opposed to public policy." }
      ],
      plainSummary: "An agreement becomes a binding contract only when competent parties freely agree to a lawful object for lawful consideration."
    }
  },
  { 
    id: "contract-consideration", 
    chapterId: "chap-contract-act", 
    title: "Consideration", 
    order: 2, 
    verified: true,
    content: {
      fullExplanation: "Consideration under Sec 2(d) is the price paid for a promise. Rules: Must move at desire of promisor, may move from promisee or third party (Chinnaya v. Ramayya), can be past, present, or future, must be real (not illusory), need not be adequate.",
      exceptions: [
        "Natural Love & Affection (Sec 25(1)): Written and registered agreement between near relatives is valid without consideration.",
        "Past Voluntary Services (Sec 25(2)) and Promise to Pay Time-Barred Debt (Sec 25(3)) are enforceable without consideration."
      ]
    },
    definitionBreakdown: {
      originalText: "When, at the desire of the promisor, the promisee or any other person has done or abstained from doing, or does or abstains from doing, or promises to do or to abstain from doing something, such act or abstinence or promise is called a consideration for the promise.",
      parts: [
        { phrase: "at the desire of the promisor", explanation: "The act must be requested by the promisor, not done voluntarily or at a third party's request." },
        { phrase: "promisee or any other person", explanation: "Consideration can move from a third party (stranger to consideration), establishing English vs Indian distinction." },
        { phrase: "has done / does / promises to do", explanation: "Consideration can be past (already completed), present (executed), or future (executory)." }
      ],
      plainSummary: "Consideration is whatever the promisee (or another person) does or promises because the promisor asked for it."
    }
  },
  { 
    id: "contract-essential-elements", 
    chapterId: "chap-contract-act", 
    title: "Other Essential Elements of a Contract", 
    order: 3, 
    verified: true,
    content: {
      fullExplanation: "Covers Capacity to Contract (Minors under Sec 11, unsound mind, disqualified persons), Free Consent (Coercion Sec 15, Undue Influence Sec 16, Fraud Sec 17, Misrepresentation Sec 18, Mistake Sec 20-22), and Legality of Object (Sec 23).",
      exceptions: [
        "Minor's contract is void ab initio (Mohori Bibee), but minor can be beneficiary, partner for profits (Sec 30), or liable for necessaries (Sec 68).",
        "Bilateral mistake of fact makes agreement void (Sec 20); unilateral mistake generally does not render contract void (Sec 22)."
      ]
    },
    definitionBreakdown: {
      originalText: "Consent is said to be free when it is not caused by coercion, undue influence, fraud, misrepresentation, or mistake.",
      parts: [
        { phrase: "not caused by coercion", explanation: "No threat or committing of an act forbidden by IPC (Sec 15)." },
        { phrase: "undue influence", explanation: "Dominating position used to obtain unfair advantage (Sec 16)." },
        { phrase: "fraud / misrepresentation", explanation: "Intentional deception (fraud) or innocent false statement (misrepresentation)." }
      ],
      plainSummary: "Consent is free when both parties agree on the same thing in the same sense without pressure or deception."
    }
  },
  { 
    id: "contract-performance", 
    chapterId: "chap-contract-act", 
    title: "Performance of Contract", 
    order: 4, 
    verified: true,
    content: {
      fullExplanation: "Parties must perform or offer to perform promises (Sec 37). Performance can be actual or attempted (tender of performance Sec 38). Joint promisors are jointly and severally liable (Sec 42-44). Time is of essence when specified or implied by nature of business (Sec 55).",
      exceptions: [
        "Supervening Impossibility / Frustration (Sec 56): Contract becomes void if performance becomes unlawful or physically impossible after formation.",
        "Release of one joint promisor by promisee does not discharge other co-promisors (Sec 44)."
      ]
    },
    definitionBreakdown: {
      originalText: "The parties to a contract must either perform, or offer to perform, their respective promises, unless such performance is dispensed with or excused.",
      parts: [
        { phrase: "must perform or offer to perform", explanation: "Actual performance or valid tender discharges contract obligation." },
        { phrase: "unless dispensed with or excused", explanation: "Refers to legal excuses like novation, frustration, or waiver." }
      ],
      plainSummary: "Contracting parties are legally bound to fulfill their agreed duties unless excused by law."
    }
  },
  { 
    id: "contract-breach", 
    chapterId: "chap-contract-act", 
    title: "Breach of Contract and Remedies", 
    order: 5, 
    verified: true,
    content: {
      fullExplanation: "Breach occurs when a party fails to fulfill obligations without legal excuse. Can be Anticipatory (before due date) or Actual (on due date). Remedies: Damages (Sec 73), Rescission, Injunction, Quantum Meruit, Specific Performance.",
      exceptions: [
        "Hadley v. Baxendale Rule: Special damages are recoverable ONLY if special circumstances were communicated at time of contract formation.",
        "Aggrieved party has a legal duty to mitigate damages; cannot recover losses avoidable by reasonable action."
      ]
    },
    definitionBreakdown: {
      originalText: "When a contract has been broken, the party who suffers by such breach is entitled to receive compensation for any loss or damage caused to him thereby.",
      parts: [
        { phrase: "party who suffers", explanation: "Aggrieved innocent party entitled to monetary restitution." },
        { phrase: "compensation for loss or damage", explanation: "Ordinary damages arising naturally in usual course of things." }
      ],
      plainSummary: "Breach entitles the innocent party to monetary compensation restoring them to the position had contract been performed."
    }
  },
  { 
    id: "contract-contingent-quasi", 
    chapterId: "chap-contract-act", 
    title: "Contingent and Quasi Contracts", 
    order: 6, 
    verified: true,
    content: {
      fullExplanation: "Contingent Contract (Sec 31): Contract to do or not do something if a collateral event happens or does not happen. Quasi Contract (Sec 68-72): Obligations created by law based on doctrine of unjust enrichment without formal agreement.",
      exceptions: [
        "Contingent contract upon impossible event is void from beginning (Sec 36).",
        "Quasi-contractual reimbursement under Sec 69 requires claimant to have a legal interest in paying the money."
      ]
    },
    definitionBreakdown: {
      originalText: "A contingent contract is a contract to do or not to do something, if some event, collateral to such contract, does or does not happen.",
      parts: [
        { phrase: "collateral event", explanation: "An uncertain future event independent of performance of the main contract promise." },
        { phrase: "does or does not happen", explanation: "Enforceability depends strictly upon occurrence or non-occurrence of specified event." }
      ],
      plainSummary: "A contingent contract is a conditional contract whose enforcement depends on a future uncertain event."
    }
  },
  { 
    id: "contract-indemnity-guarantee", 
    chapterId: "chap-contract-act", 
    title: "Contract of Indemnity and Guarantee", 
    order: 7, 
    verified: true,
    content: {
      fullExplanation: "Indemnity (Sec 124): Contract saving one party from loss caused by promisor or third party (2 parties, 1 contract). Guarantee (Sec 126): Contract to perform promise or discharge liability of third party in case of default (3 parties, 3 contracts). Surety liability is co-extensive with principal debtor (Sec 128).",
      exceptions: [
        "Surety is discharged if creditor varies contract terms without surety consent (Sec 133) or releases principal debtor (Sec 134).",
        "Contract of indemnity does not cover losses caused by natural disasters unless specifically insured."
      ]
    },
    definitionBreakdown: {
      originalText: "A contract of guarantee is a contract to perform the promise, or discharge the liability, of a third person in case of his default.",
      parts: [
        { phrase: "perform promise or discharge liability", explanation: "Surety steps in to pay or perform only if primary debtor fails." },
        { phrase: "third person in case of default", explanation: "Establishes secondary liability of surety." }
      ],
      plainSummary: "Guarantee is a tripartite agreement where surety promises to fulfill debtor's obligation if debtor defaults."
    }
  },
  { 
    id: "contract-bailment-pledge", 
    chapterId: "chap-contract-act", 
    title: "Bailment and Pledge", 
    order: 8, 
    verified: true,
    content: {
      fullExplanation: "Bailment (Sec 148): Delivery of goods by one person to another for some purpose upon contract to return or dispose of. Duties of Bailee: Take reasonable care (Sec 151), not make unauthorized use (Sec 154). Pledge (Sec 172): Bailment of goods as security for payment of debt.",
      exceptions: [
        "Finder of lost goods (Sec 168) has right of lien and can sell goods if owner cannot be found or goods are perishable/costs exceed 2/3 value.",
        "Pledge by mercantile agent (Sec 178) is valid even without owner authorization if acting in ordinary course of business in good faith."
      ]
    },
    definitionBreakdown: {
      originalText: "A bailment is the delivery of goods by one person to another for some purpose, upon a contract that they shall, when the purpose is accomplished, be returned or otherwise disposed of.",
      parts: [
        { phrase: "delivery of goods", explanation: "Transfer of possession (actual or constructive) without transferring ownership." },
        { phrase: "for some purpose", explanation: "Goods delivered for repair, custody, carriage, or pawn." },
        { phrase: "returned or disposed of", explanation: "Specific goods must be returned in original or altered form." }
      ],
      plainSummary: "Bailment is delivering goods temporarily for a purpose, with ownership retained by bailor."
    }
  },
  { 
    id: "contract-agency", 
    chapterId: "chap-contract-act", 
    title: "Agency", 
    order: 9, 
    verified: true,
    content: {
      fullExplanation: "Agency (Sec 182): Relation between Principal and Agent where agent acts on behalf of principal with third parties. Creation: Express, Implied, Ratification (Sec 196), Estoppel, Necessity. Principle: 'Qui facit per alium facit per se' (He who acts through another acts himself).",
      exceptions: [
        "Agent cannot delegate authority ('Delegatus non potest delegare') unless authorized by custom or necessity (Sec 190).",
        "Irrevocable Agency (Sec 202): Agency coupled with interest cannot be terminated to prejudice of agent's interest."
      ]
    },
    definitionBreakdown: {
      originalText: "An agent is a person employed to do any act for another, or to represent another in dealings with third persons.",
      parts: [
        { phrase: "employed to do any act", explanation: "Authorized to represent principal in legal transactions." },
        { phrase: "represent another in dealings", explanation: "Creates direct legal relations between principal and third parties." }
      ],
      plainSummary: "An agent is a person authorized to act on behalf of a principal in legal dealings with third parties."
    }
  },

  // --- CHAPTER 3: THE SALE OF GOODS ACT, 1930 ---
  { 
    id: "soga-formation", 
    chapterId: "chap-soga", 
    title: "Formation of Contract of Sale", 
    order: 1, 
    verified: true,
    content: {
      fullExplanation: "Contract of Sale (Sec 4) includes Sale (immediate transfer of property) and Agreement to Sell (future transfer). Goods (Sec 2(7)): Existing, Future, Contingent. Price (Sec 9-10) must be money consideration.",
      exceptions: [
        "If goods perish before sale without fault of seller or buyer, contract is void (Sec 7).",
        "Ascertained vs Unascertained goods: Property passes only when goods are ascertained and appropriated to contract (Sec 18)."
      ]
    },
    definitionBreakdown: {
      originalText: "A contract of sale of goods is a contract whereby the seller transfers or agrees to transfer the property in goods to the buyer for a price.",
      parts: [
        { phrase: "seller transfers or agrees to transfer", explanation: "Distinguishes executed Sale from executory Agreement to Sell." },
        { phrase: "property in goods", explanation: "General ownership in goods, not merely possession." },
        { phrase: "for a price", explanation: "Consideration must be monetary; pure exchange/barter is excluded." }
      ],
      plainSummary: "A contract of sale is an agreement transferring ownership of goods from seller to buyer for money."
    }
  },
  { 
    id: "soga-conditions-warranties", 
    chapterId: "chap-soga", 
    title: "Conditions and Warranties", 
    order: 2, 
    verified: true,
    content: {
      fullExplanation: "Condition (Sec 12(2)): Stipulation essential to main purpose of contract; breach gives right to repudiate contract and claim damages. Warranty (Sec 12(3)): Stipulation collateral to main purpose; breach gives right to damages only. Implied conditions: Title, Description, Sample, Quality/Fitness (Sec 16). Caveat Emptor applies except under Sec 16 exceptions.",
      exceptions: [
        "Breach of condition can be treated as breach of warranty by buyer voluntarily or compulsory under Sec 13.",
        "Caveat Emptor exception (Sec 16(1)): Buyer relies on seller skill/judgment and goods are of seller's business description."
      ]
    },
    definitionBreakdown: {
      originalText: "A condition is a stipulation essential to the main purpose of the contract, the breach of which gives rise to a right to treat the contract as repudiated.",
      parts: [
        { phrase: "stipulation essential to main purpose", explanation: "Goes to the root of the contract." },
        { phrase: "treat contract as repudiated", explanation: "Allows buyer to reject goods and claim full refund plus damages." }
      ],
      plainSummary: "A condition is a vital contract term whose breach allows the buyer to reject the goods completely."
    }
  },
  { 
    id: "soga-transfer-ownership", 
    chapterId: "chap-soga", 
    title: "Transfer of Ownership and Delivery of Goods", 
    order: 3, 
    verified: true,
    content: {
      fullExplanation: "Risk passes with property (Sec 26: 'Risk follows ownership'). Rules for transfer of property: Specific goods in deliverable state (Sec 19-20), Unascertained goods (Sec 23 unconditional appropriation). Rule of 'Nemo dat quod non habet' (Sec 27: No one can transfer better title than he himself has).",
      exceptions: [
        "Nemo dat exceptions: Sale by Mercantile Agent (Sec 27), Sale by Joint Owner (Sec 28), Sale by Person under Voidable Contract before rescission (Sec 29), Sale by Seller/Buyer in possession after sale (Sec 30).",
        "Delivery to carrier (Sec 39) is prima facie delivery to buyer unless seller reserves right of disposal."
      ]
    },
    definitionBreakdown: {
      originalText: "Unless otherwise agreed, the goods remain at the seller's risk until the property therein is transferred to the buyer, but when the property therein is transferred to the buyer, the goods are at the buyer's risk whether delivery has been made or not.",
      parts: [
        { phrase: "risk remains at seller's risk until...", explanation: "Risk of loss attaches to legal ownership, not physical possession." },
        { phrase: "whether delivery has been made or not", explanation: "Even if seller still holds physical custody, buyer bears risk if property passed." }
      ],
      plainSummary: "Risk of damage or loss follows legal ownership in goods regardless of who holds physical custody."
    }
  },
  { 
    id: "soga-unpaid-seller", 
    chapterId: "chap-soga", 
    title: "Unpaid Seller and Rights", 
    order: 4, 
    verified: true,
    content: {
      fullExplanation: "Unpaid Seller (Sec 45): Whole price not paid or negotiable instrument dishonoured. Rights against Goods (Sec 46): (1) Right of Lien (Sec 47-49), (2) Right of Stoppage in Transit (Sec 50-52), (3) Right of Resale (Sec 54). Rights against Buyer Personally: Suit for price (Sec 55), Suit for damages (Sec 56), Suit for interest (Sec 61).",
      exceptions: [
        "Lien is lost when seller delivers goods to carrier without reserving right of disposal, or buyer lawfully obtains possession, or seller waives lien (Sec 49).",
        "Stoppage in transit requires buyer insolvency AND goods to be in transit between seller and buyer."
      ]
    },
    definitionBreakdown: {
      originalText: "The seller of goods is deemed to be an unpaid seller when the whole of the price has not been paid or tendered, or when a bill of exchange or negotiable instrument has been received as conditional payment and the condition has not been fulfilled by reason of dishonour.",
      parts: [
        { phrase: "whole of price not paid or tendered", explanation: "Even if partial payment made, seller remains unpaid for balance." },
        { phrase: "negotiable instrument dishonoured", explanation: "Conditional payment fails if cheque or bill bounces." }
      ],
      plainSummary: "An unpaid seller is a seller who has not received full payment or whose payment instrument was dishonoured."
    }
  },

  // --- CHAPTER 4: THE INDIAN PARTNERSHIP ACT, 1932 ---
  { 
    id: "partnership-general-nature", 
    chapterId: "chap-partnership", 
    title: "General Nature of Partnership", 
    order: 1, 
    verified: true,
    content: {
      fullExplanation: "Partnership (Sec 4) is relation between persons who have agreed to share profits of a business carried on by all or any of them acting for all. Essential elements: Agreement, 2+ persons (max 50 under Companies Rules), Business, Sharing of Profits, Mutual Agency. True test of partnership (Cox v. Hickman): Mutual Agency.",
      exceptions: [
        "Sharing of profits is prima facie evidence but NOT conclusive test. Lenders, widows of deceased partner, or sellers of goodwill receiving profit share are NOT partners.",
        "Minor cannot be partner but can be admitted to benefits of partnership with consent of all partners (Sec 30)."
      ]
    },
    definitionBreakdown: {
      originalText: "Partnership is the relation between persons who have agreed to share the profits of a business carried on by all or any of them acting for all.",
      parts: [
        { phrase: "agreed to share the profits", explanation: "Sharing profits is essential, though sharing losses is implied unless agreed otherwise." },
        { phrase: "carried on by all or any of them acting for all", explanation: "Mutual Agency — every partner is both principal and agent for all other partners." }
      ],
      plainSummary: "Partnership is a mutual agency relationship where partners run business together and share profits."
    }
  },
  { 
    id: "partnership-relations", 
    chapterId: "chap-partnership", 
    title: "Relations of Partners", 
    order: 2, 
    verified: true,
    content: {
      fullExplanation: "Relations to one another: Utmost good faith (uberrimae fidei), duty to indemnify firm (Sec 10, 13). Implied Authority of Partner (Sec 18-22): Acts done in usual way of firm business bind firm. Property of firm (Sec 14) includes all property brought into common stock or acquired for firm.",
      exceptions: [
        "Implied authority does NOT extend to: Submitting dispute to arbitration, opening bank account in partner's own name, compromising firm claim, purchasing immovable property (Sec 19(2)).",
        "Doctrine of Holding Out (Sec 28): Person representing himself as partner becomes liable to third parties relying on such representation."
      ]
    },
    definitionBreakdown: {
      originalText: "Subject to contract between the partners, the act of a partner which is done to carry on, in the usual way, business of the kind carried on by the firm, binds the firm.",
      parts: [
        { phrase: "done to carry on in the usual way", explanation: "Act must fall within ordinary scope of the firm's line of business." },
        { phrase: "binds the firm", explanation: "Firm and all co-partners become jointly and severally liable to third parties." }
      ],
      plainSummary: "Acts done by a partner in the ordinary course of firm business bind all partners jointly and severally."
    }
  },
  { 
    id: "partnership-registration-dissolution", 
    chapterId: "chap-partnership", 
    title: "Registration and Dissolution of a Firm", 
    order: 3, 
    verified: true,
    content: {
      fullExplanation: "Registration (Sec 58-59) is optional but non-registration imposes disabilities under Sec 69: Unregistered firm cannot sue third party, partner cannot sue firm/co-partners, set-off limited to ₹100. Dissolution of Firm (Sec 39): Without court order (agreement Sec 40, compulsory Sec 41, contingent Sec 42, notice Sec 43) or by Court order (Sec 44: insanity, permanent incapacity, misconduct, continuous loss).",
      exceptions: [
        "Third parties CAN sue an unregistered firm (Sec 69 disabilities apply only to firm/partners suing).",
        "Non-registration does not affect right of firm to enforce rights under tax laws or criminal proceedings."
      ]
    },
    definitionBreakdown: {
      originalText: "No suit to enforce a right arising from a contract or conferred by this Act shall be instituted in any Court by or on behalf of any person suing as a partner in a firm against the firm or any person alleged to be or to have been a partner in the firm unless the firm is registered.",
      parts: [
        { phrase: "No suit shall be instituted...", explanation: "Disability barring unregistered firm or partners from filing civil suits." },
        { phrase: "unless the firm is registered", explanation: "Registration must exist prior to filing suit." }
      ],
      plainSummary: "An unregistered partnership firm cannot file civil lawsuits to enforce contract rights against third parties or partners."
    }
  },

  // --- CHAPTER 5: LIMITED LIABILITY PARTNERSHIP ACT, 2008 ---
  { 
    id: "llp-act", 
    chapterId: "chap-llp", 
    title: "The Limited Liability Partnership Act, 2008", 
    order: 1, 
    verified: true,
    content: {
      fullExplanation: "LLP is a body corporate and legal entity separate from partners (Sec 3). Features: Perpetual succession, limited liability of partners to agreed contribution, minimum 2 partners, minimum 2 Designated Partners (at least 1 resident in India under Sec 7), LLP Agreement (Sec 23), separate seal optional.",
      exceptions: [
        "Partner liability becomes UNLIMITED in case of acts carried out with intent to defraud creditors or for fraudulent purpose (Sec 30).",
        "If number of partners falls below 2 for more than 6 months, remaining partner carrying on business becomes personally liable for LLP debts."
      ]
    },
    definitionBreakdown: {
      originalText: "A limited liability partnership is a body corporate formed and incorporated under this Act and is a legal entity separate from that of its partners.",
      parts: [
        { phrase: "body corporate", explanation: "Possesses legal personality separate from its individual members." },
        { phrase: "separate legal entity", explanation: "LLP can hold property, enter contracts, and sue/be sued in its own name." },
        { phrase: "perpetual succession", explanation: "Changes in partners do not affect existence or identity of LLP." }
      ],
      plainSummary: "An LLP is an incorporated corporate body with separate legal identity and limited partner liability."
    }
  },

  // --- CHAPTER 6: THE COMPANIES ACT, 2013 ---
  { 
    id: "companies-act", 
    chapterId: "chap-companies-act", 
    title: "The Companies Act, 2013", 
    order: 1, 
    verified: true,
    content: {
      fullExplanation: "Company under Sec 2(20) is incorporated under Companies Act. Corporate Veil (Salomon v. Salomon): Company is distinct legal person. Types: OPC (Sec 2(62)), Private Co (Sec 2(68): max 200 members, transfer restriction), Public Co (Sec 2(71): min 7 members, no transfer restriction), Small Co (Sec 2(85)). MOA & AOA. Doctrines: Ultra Vires (beyond objects clause), Indoor Management (Royal British Bank v. Turquand).",
      exceptions: [
        "Lifting of Corporate Veil: Courts pierce veil in cases of tax evasion (Dinshaw Maneckjee Petit), fraud, sham companies (Gilford Motor Co v. Horne), or enemy character (Daimler Co Ltd).",
        "Doctrine of Indoor Management does NOT protect outsiders having actual knowledge of irregularity, or cases of forgery, or negligence."
      ]
    },
    definitionBreakdown: {
      originalText: "Company means a company incorporated under this Act or under any previous company law.",
      parts: [
        { phrase: "incorporated under this Act", explanation: "Statutory creation requiring registration with Registrar of Companies (ROC)." },
        { phrase: "previous company law", explanation: "Includes companies registered under Companies Act 1956 or earlier Acts." }
      ],
      plainSummary: "A company is an artificial legal entity created through statutory registration with the Registrar of Companies."
    }
  },

  // --- CHAPTER 7: THE NEGOTIABLE INSTRUMENTS ACT, 1881 ---
  { 
    id: "negotiable-instruments", 
    chapterId: "chap-negotiable-instruments", 
    title: "The Negotiable Instruments Act, 1881", 
    order: 1, 
    verified: true,
    content: {
      fullExplanation: "Negotiable Instrument (Sec 13): Promissory Note (Sec 4: unconditional undertaking to pay), Bill of Exchange (Sec 5: unconditional order to pay), Cheque (Sec 6: bill drawn on specified banker). Holder in Due Course (HDC, Sec 9): Takes for consideration, before maturity, in good faith without notice of defect (gets title free from prior defects). Dishonour of Cheque (Sec 138): Criminal offence for insufficiency of funds.",
      exceptions: [
        "Section 138 Offence Requirements: Cheque presented within validity (3 months), statutory notice issued within 30 days of dishonour, drawer fails to pay within 15 days of notice.",
        "Forged endorsement passes NO title under Sec 58 (forgery is a complete nullity)."
      ]
    },
    definitionBreakdown: {
      originalText: "A negotiable instrument means a promissory note, bill of exchange or cheque payable either to order or to bearer.",
      parts: [
        { phrase: "promissory note, bill of exchange or cheque", explanation: "The three statutory negotiable instruments recognized under the Act." },
        { phrase: "payable to order or to bearer", explanation: "Transferable easily by endorsement & delivery (order) or simple delivery (bearer)." }
      ],
      plainSummary: "A negotiable instrument is a freely transferable written document entitling holder to a sum of money."
    }
  }
];

export const INITIAL_FLASHCARDS = [
  // --- CHAPTER 1: INDIAN REGULATORY FRAMEWORK ---
  {
    id: "reg-01",
    topicId: "reg-sources-law",
    verified: true,
    front: "What are the primary sources of law in India?",
    back: {
      definition: "Primary sources of Indian law include the Constitution of India, Statutes (Acts of Parliament and State Legislatures), Precedents (judicial decisions), Customs, and Personal Laws.",
      keywords: ["Constitution of India", "statutes and legislation", "judicial precedents", "customs and usages"],
      sectionRef: "Indian Constitution Article 13",
      caseLaw: "Kesavananda Bharati v. State of Kerala",
      caseSummary: "Supreme Court affirmed supremacy of the Constitution and established the Basic Structure doctrine.",
      examples: ["Parliament passing the Companies Act 2013 is a statutory source of law."],
      definitionBreakdown: {
        originalText: "Law includes any Ordinance, order, bye-law, rule, regulation, notification, custom or usage having in the territory of India the force of law.",
        parts: [
          { phrase: "Ordinance, order, bye-law, rule", explanation: "Delegated legislation by executive bodies." },
          { phrase: "custom or usage", explanation: "Longstanding social practices recognized as binding legal norms." }
        ],
        plainSummary: "Law encompasses written statutes, executive orders, and legally binding customs."
      }
    }
  },
  {
    id: "reg-02",
    topicId: "reg-court-hierarchy",
    verified: true,
    front: "What is the Supreme Court's status as a 'Court of Record'?",
    back: {
      definition: "As a Court of Record under Article 129, Supreme Court judgments serve as binding precedents for all lower courts and it possesses inherent power to punish for contempt.",
      keywords: ["court of record", "Article 129", "binding precedent Article 141", "contempt powers"],
      sectionRef: "Article 129 & 141, Constitution of India",
      caseLaw: "Bengal Immunity Co. v. State of Bihar",
      caseSummary: "Supreme Court decisions bind all subordinate tribunals and High Courts across India.",
      examples: ["High Court must follow Supreme Court ruling on tax statute interpretation."]
    }
  },

  // --- CHAPTER 2: INDIAN CONTRACT ACT, 1872 ---
  {
    id: "nature-01",
    topicId: "contract-nature",
    verified: true,
    front: "What are the essential elements of a valid contract under Section 10?",
    back: {
      definition: "All agreements are contracts if made by free consent of parties competent to contract, for lawful consideration and object, and not expressly declared void.",
      keywords: ["offer and acceptance", "intention to create legal relation", "free consent", "capacity of parties", "lawful consideration and object"],
      sectionRef: "Section 10, Indian Contract Act, 1872",
      caseLaw: "Balfour v. Balfour (1919)",
      caseSummary: "Domestic agreements lack legal intention and do not form valid contracts.",
      examples: ["Husband promising monthly allowance to wife while abroad is a domestic agreement."]
    }
  },
  {
    id: "consideration-01",
    topicId: "contract-consideration",
    verified: true,
    front: "What is 'Consideration' under Section 2(d)?",
    back: {
      definition: "When at the desire of promisor, promisee or any other person has done or abstained from doing, or does or promises to do something — such act/abstinence is consideration.",
      keywords: ["at desire of promisor", "promisee or any other person", "act, abstinence, or promise", "privity of consideration"],
      sectionRef: "Section 2(d), Indian Contract Act, 1872",
      caseLaw: "Chinnaya v. Ramayya (1882)",
      caseSummary: "Consideration can move from a third party (stranger to consideration).",
      examples: ["A sells bicycle to B for ₹2,000 (present consideration)."]
    }
  },
  {
    id: "essential-01",
    topicId: "contract-essential-elements",
    verified: true,
    front: "What is the legal effect of an agreement entered into by a Minor?",
    back: {
      definition: "Agreement with minor is void ab initio. Cannot be ratified upon majority, no estoppel applies, minor cannot be declared insolvent, but minor can be a beneficiary.",
      keywords: ["void ab initio", "no ratification on majority", "no estoppel against minor", "beneficiary status allowed", "necessaries under Sec 68"],
      sectionRef: "Section 11 & Section 68, Indian Contract Act, 1872",
      caseLaw: "Mohori Bibee v. Dharmodas Ghose (1903)",
      caseSummary: "Privy Council ruled minor's agreement strictly void and unenforceable.",
      examples: ["Supplier providing necessaries to minor can claim reimbursement from minor's estate."]
    }
  },
  {
    id: "performance-01",
    topicId: "contract-performance",
    verified: true,
    front: "What are the rules regarding Joint Promisors under Sections 42-44?",
    back: {
      definition: "Joint promisors must jointly fulfill promise. Promisee can compel any ONE joint promisor to perform whole promise, who can then claim contribution from co-promisors.",
      keywords: ["joint and several liability", "right to compel any one promisor", "equal contribution to loss", "release of one joint promisor"],
      sectionRef: "Section 42, 43 & 44, Indian Contract Act, 1872",
      caseLaw: "Devendra Basu v. Satya Charan",
      caseSummary: "Release of one joint promisor does not release him from liability to co-promisors.",
      examples: ["A, B, C borrow ₹30,000. Lender can compel A alone to pay full ₹30,000."]
    }
  },
  {
    id: "breach-01",
    topicId: "contract-breach",
    verified: true,
    front: "What are the rules for measuring Damages for Breach of Contract in Hadley v. Baxendale?",
    back: {
      definition: "Aggrieved party gets ordinary damages arising naturally in usual course. Special damages (loss of profit) are recoverable ONLY if special circumstances were communicated at contract formation.",
      keywords: ["ordinary damages", "special damages", "remoteness of damage", "duty to mitigate loss", "Hadley v. Baxendale rule"],
      sectionRef: "Section 73, Indian Contract Act, 1872",
      caseLaw: "Hadley v. Baxendale (1854)",
      caseSummary: "Delayed mill shaft delivery loss of profit was unrecoverable as carrier was not informed mill was stopped.",
      examples: ["Delay in supplying sugar measured by market price difference on breach date."]
    }
  },
  {
    id: "contingent-01",
    topicId: "contract-contingent-quasi",
    verified: true,
    front: "Distinguish between Contingent Contract and Quasi Contract.",
    back: {
      definition: "Contingent contract is a conditional contract based on a collateral future event (Sec 31). Quasi contract is an obligation imposed by law to prevent unjust enrichment (Sec 68-72).",
      keywords: ["collateral event", "unjust enrichment", "impossibility of event", "quantum meruit"],
      sectionRef: "Section 31 & Section 68-72, Indian Contract Act, 1872",
      caseLaw: "State of West Bengal v. B.K. Mondal",
      caseSummary: "Government enjoying benefit of non-gratuitous construction work bound to compensate under Sec 70.",
      examples: ["Insurance policy payout on fire (Contingent); Money paid by mistake (Quasi)."]
    }
  },
  {
    id: "indemnity-01",
    topicId: "contract-indemnity-guarantee",
    verified: true,
    front: "Distinguish between Contract of Indemnity (Sec 124) and Contract of Guarantee (Sec 126).",
    back: {
      definition: "Indemnity is 2-party contract saving one from loss. Guarantee is 3-party contract (Creditor, Debtor, Surety) to discharge third party default.",
      keywords: ["2 parties vs 3 parties", "primary liability vs secondary liability", "one contract vs three contracts", "right to sue third party"],
      sectionRef: "Section 124 & Section 126, Indian Contract Act, 1872",
      caseLaw: "Gajanan Moreshwar v. Moreshwar Madan",
      caseSummary: "Indemnified party can compel indemnifier to pay once liability becomes absolute.",
      examples: ["Insurance is indemnity; bank surety loan is guarantee."]
    }
  },
  {
    id: "bailment-01",
    topicId: "contract-bailment-pledge",
    verified: true,
    front: "What is a Pledge and what are the rights of a Pawnee?",
    back: {
      definition: "Pledge (Sec 172) is bailment of goods as security for debt payment. Pawnee rights: Right of retainer (Sec 173), extraordinary expenses (Sec 175), right to sell goods on default after notice (Sec 176).",
      keywords: ["bailment as security", "right of retainer", "notice before sale", "pledge by mercantile agent"],
      sectionRef: "Section 172 to 176, Indian Contract Act, 1872",
      caseLaw: "Lallan Prasad v. Rahmat Ali",
      caseSummary: "Pawnee cannot sue for debt if he has put it out of his power to redeliver pledged goods.",
      examples: ["Pledging gold ornaments to bank for personal loan."]
    }
  },
  {
    id: "agency-01",
    topicId: "contract-agency",
    verified: true,
    front: "What is the Doctrine of Ratification in Agency under Section 196?",
    back: {
      definition: "Where acts are done by one person on behalf of another without his knowledge or authority, the principal may elect to ratify or disown such acts. Ratification relates back to time of act.",
      keywords: ["ratification relates back", "express or implied ratification", "full knowledge of facts", "no injury to third party"],
      sectionRef: "Section 196 to 200, Indian Contract Act, 1872",
      caseLaw: "Bolton Partners v. Lambert",
      caseSummary: "Ratification relates back to original date of contract, defeating intermediate revocation.",
      examples: ["Agent buys goods without authority; principal later accepts invoice and ratifies."]
    }
  },

  // --- CHAPTER 3: SALE OF GOODS ACT, 1930 ---
  {
    id: "soga-01",
    topicId: "soga-formation",
    verified: true,
    front: "Distinguish between a 'Sale' and an 'Agreement to Sell' under Section 4.",
    back: {
      definition: "In Sale, ownership passes immediately to buyer (executed). In Agreement to Sell, ownership passes at a future time/condition (executory).",
      keywords: ["executed vs executory", "transfer of risk", "jus in rem vs jus in personam", "remedy for breach (price vs damages)"],
      sectionRef: "Section 4, Sale of Goods Act, 1930",
      caseLaw: "Lee v. Butler",
      caseSummary: "Binding obligation to buy under hire-purchase constitutes agreement to sell.",
      examples: ["Buying cash book at store vs ordering custom furniture for next month."]
    }
  },
  {
    id: "soga-02",
    topicId: "soga-conditions-warranties",
    verified: true,
    front: "What is the doctrine of 'Caveat Emptor' and its major statutory exceptions?",
    back: {
      definition: "'Let the buyer beware.' Seller not bound to disclose defects. Exceptions: Fitness for buyer's purpose (Sec 16(1)), Merchantable quality (Sec 16(2)), Sale by description/sample, Fraud.",
      keywords: ["let the buyer beware", "reliance on seller skill", "merchantable quality", "sale by description and sample"],
      sectionRef: "Section 16, Sale of Goods Act, 1930",
      caseLaw: "Priest v. Last & Grant v. Australian Knitting Mills",
      caseSummary: "Purchaser of hot water bottle injured by burst bottle recovered damages under implied fitness.",
      examples: ["Underwear causing dermatitis due to chemicals — seller liable under Sec 16(1)."]
    }
  },
  {
    id: "soga-03",
    topicId: "soga-transfer-ownership",
    verified: true,
    front: "Explain the doctrine 'Nemo dat quod non habet' and its exceptions.",
    back: {
      definition: "No one can transfer a better title than he himself possesses (Sec 27). Exceptions: Sale by mercantile agent, sale by joint owner, sale under voidable contract, sale by seller in possession.",
      keywords: ["nemo dat quod non habet", "mercantile agent Sec 27", "voidable contract possession", "buyer in possession"],
      sectionRef: "Section 27 to 30, Sale of Goods Act, 1930",
      caseLaw: "Cundy v. Lindsay",
      caseSummary: "Fraudulent buyer obtained no title, so innocent sub-buyer also received no title.",
      examples: ["Thief selling stolen watch gives no legal title to innocent buyer."]
    }
  },
  {
    id: "soga-04",
    topicId: "soga-unpaid-seller",
    verified: true,
    front: "What are the rights of an Unpaid Seller against the Goods under Section 46?",
    back: {
      definition: "Unpaid seller rights against goods: (1) Right of Lien (possession retained), (2) Right of Stoppage in Transit (buyer insolvent & goods in transit), (3) Right of Resale.",
      keywords: ["unpaid seller", "right of lien", "stoppage in transit", "buyer insolvency", "right of resale"],
      sectionRef: "Section 46 to 54, Sale of Goods Act, 1930",
      caseLaw: "Lickbarrow v. Mason",
      caseSummary: "Stoppage in transit defeated if bill of lading endorsed to bona fide buyer for value.",
      examples: ["Seller stopping train delivery after buyer declares insolvency."]
    }
  },

  // --- CHAPTER 4: INDIAN PARTNERSHIP ACT, 1932 ---
  {
    id: "part-gen-01",
    topicId: "partnership-general-nature",
    verified: true,
    front: "What is the 'True Test of Partnership' laid down in Cox v. Hickman?",
    back: {
      definition: "Sharing of profits is prima facie evidence of partnership, but NOT conclusive proof. The true test of partnership is MUTUAL AGENCY — whether business is carried on by all or any of them acting for all.",
      keywords: ["mutual agency", "prima facie vs conclusive test", "sharing of profits", "Cox v. Hickman principle"],
      sectionRef: "Section 4 & Section 6, Indian Partnership Act, 1932",
      caseLaw: "Cox v. Hickman (1860)",
      caseSummary: "Creditors receiving profit share to pay off debts do not become partners without mutual agency.",
      examples: ["Lender receiving share of profits in lieu of interest is not a partner."]
    }
  },
  {
    id: "part-rel-01",
    topicId: "partnership-relations",
    verified: true,
    front: "What is the Implied Authority of a Partner and what acts are excluded?",
    back: {
      definition: "Act of partner done to carry on business in usual way binds firm (Sec 19(1)). Excluded acts (Sec 19(2)): Submitting dispute to arbitration, opening bank account in partner's name, acquiring immovable property.",
      keywords: ["implied authority", "usual course of business", "statutory exclusions Sec 19(2)", "holding out Sec 28"],
      sectionRef: "Section 19 & Section 28, Indian Partnership Act, 1932",
      caseLaw: "Holme v. Hammond",
      caseSummary: "Partner buying goods customary to firm's business binds all co-partners.",
      examples: ["Partner of trading firm borrowing money for business binds the firm."]
    }
  },
  {
    id: "part-diss-01",
    topicId: "partnership-registration-dissolution",
    verified: true,
    front: "What are the legal consequences of Non-Registration of a Partnership Firm?",
    back: {
      definition: "Under Sec 69: (1) Firm cannot sue third party, (2) Partner cannot sue firm/partners, (3) Firm cannot claim set-off over ₹100. Third parties CAN sue unregistered firm.",
      keywords: ["disabilities under Sec 69", "no bar on third party suit", "set-off limit Rs 100", "dissolution suit allowed"],
      sectionRef: "Section 69, Indian Partnership Act, 1932",
      caseLaw: "Delhi Motors v. Texas Co",
      caseSummary: "Suit filed by unregistered firm is void from inception and cannot be validated by subsequent registration.",
      examples: ["Unregistered firm cannot file suit to recover debt from customer."]
    }
  },

  // --- CHAPTER 5: LLP ACT, 2008 ---
  {
    id: "llp-01",
    topicId: "llp-act",
    verified: true,
    front: "What are the salient features of a Limited Liability Partnership (LLP)?",
    back: {
      definition: "A limited liability partnership is a body corporate formed and incorporated under this Act and is a legal entity separate from that of its partners.",
      keywords: ["body corporate", "separate legal entity", "perpetual succession", "limited liability", "designated partners Sec 7"],
      sectionRef: "Section 3 & Section 7, Limited Liability Partnership Act, 2008",
      caseLaw: "Salomon doctrine extension to LLP",
      caseSummary: "LLP possesses distinct corporate personality separate from partners.",
      examples: ["Partner of LLP is not personally liable for independent debts or wrongful acts of co-partner."]
    }
  },

  // --- CHAPTER 6: COMPANIES ACT, 2013 ---
  {
    id: "comp-01",
    topicId: "companies-act",
    verified: true,
    front: "What is the Doctrine of 'Ultra Vires' under the Companies Act, 2013?",
    back: {
      definition: "Acts done by a company beyond the powers specified in the Objects Clause of its Memorandum of Association (MOA) are 'Ultra Vires' (beyond powers). Such acts are null and void ab initio.",
      keywords: ["ultra vires", "beyond objects clause", "void ab initio", "no ratification by shareholders"],
      sectionRef: "Section 4 & Section 245, Companies Act, 2013",
      caseLaw: "Ashbury Railway Carriage & Iron Co. v. Riche (1875)",
      caseSummary: "Contract beyond MOA objects clause is completely void and incapable of ratification.",
      examples: ["Company incorporated to manufacture textiles invests money in sugar refining."]
    }
  },

  // --- CHAPTER 7: NEGOTIABLE INSTRUMENTS ACT, 1881 ---
  {
    id: "ni-01",
    topicId: "negotiable-instruments",
    verified: true,
    front: "What are the essential elements and penalties for Dishonour of Cheque under Section 138?",
    back: {
      definition: "Where any cheque drawn by a person on an account maintained by him is returned by the bank unpaid owing to insufficiency of funds, such person shall be deemed to have committed an offence.",
      keywords: ["Section 138 dishonour", "insufficiency of funds", "30 days demand notice", "15 days grace period", "imprisonment up to 2 years"],
      sectionRef: "Section 138 to 142, Negotiable Instruments Act, 1881",
      caseLaw: "K. Bhaskaran v. Sankaran Vaidhyan Balan",
      caseSummary: "Supreme Court clarified 5 components required to establish offence under Section 138.",
      examples: ["Cheque for ₹5 Lakhs bouncing due to insufficient funds."]
    }
  }
];

export const INITIAL_WORKED_ANSWERS = [
  {
    id: "wa-contract-1",
    chapterId: "chap-contract-act",
    title: "Chinnaya v. Ramayya — Stranger to Consideration (6 Marks)",
    question: "An old lady transferred her whole property to her daughter by a deed of gift, with a direction that the daughter should pay an annuity to the lady's brother. On the same day, the daughter executed a promise in writing in favor of her uncle to pay the annuity. Subsequently, the daughter declined to pay on the ground that no consideration had moved from her uncle. Can the uncle recover the annuity from the daughter?",
    answerStructure: {
      step1: "1. PROVISION / LAW APPLICABLE: Under Section 2(d) of the Indian Contract Act, 1872, consideration may move from the promisee OR ANY OTHER PERSON. Consideration need not move from the promisee alone. A stranger to consideration can enforce a contract (Chinnaya v. Ramayya, 1882).",
      step2: "2. FACTS OF THE CASE: The mother transferred property to the daughter on the condition that the daughter pays an annuity to the uncle. The daughter agreed in writing, but later refused to pay citing lack of direct consideration from the uncle.",
      step3: "3. ANALYSIS & APPLICATION: In this case, consideration for the daughter's promise to pay annuity to her uncle was provided by her mother in the form of property transfer. Since consideration can legally move from a third party ('any other person'), the daughter is legally bound to fulfill her promise.",
      step4: "4. CONCLUSION: Yes, the uncle is entitled to recover the annuity from the daughter under Section 2(d)."
    }
  },
  {
    id: "wa-soga-1",
    chapterId: "chap-soga",
    title: "Unpaid Seller Right of Stoppage in Transit (6 Marks)",
    question: "A sold 50 bales of cotton to B and delivered them to Indian Railways for transport to B. While goods were in transit, B became insolvent. A notified Indian Railways to stop delivery. In the meantime, B transferred the bill of lading to C for value who took it in good faith. Can A exercise right of stoppage in transit against C?",
    answerStructure: {
      step1: "1. PROVISION / LAW APPLICABLE: Under Section 50 & 53 of Sale of Goods Act 1930, unpaid seller has right of stoppage in transit upon buyer's insolvency. However, under Sec 53(1), if document of title (Bill of Lading) has been lawfully transferred to a bona fide transferee for value, unpaid seller's right of stoppage is defeated (Lickbarrow v. Mason).",
      step2: "2. FACTS OF THE CASE: Goods were in transit with Railways. Buyer B became insolvent. Unpaid seller A issued stoppage notice. However, B endorsed Bill of Lading to C for value in good faith.",
      step3: "3. ANALYSIS & APPLICATION: C is a bona fide pledgee/transferee for value without notice of B's insolvency. Under Sec 53, such transfer overrides and defeats the unpaid seller's right of stoppage in transit.",
      step4: "4. CONCLUSION: No, A cannot exercise right of stoppage in transit against C."
    }
  }
];
