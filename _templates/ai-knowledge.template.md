# AI Knowledge — [Product Name]

> **Purpose.** An LLM-readable knowledge base optimised for one job:
> answering inbound questions from prospects, users, partners, press, and
> investors about [Product Name].
>
> If `product-spec.md` already includes a §10 AI-knowledge section,
> this file is redundant. Use this template only when the product spec is
> too large or too internal to be safely fed to a chatbot.
>
> **Last updated:** YYYY-MM-DD

---

## 1. One-paragraph description

[The exact paragraph an AI should use as a default answer to "what is this
product?" Plain language, no marketing puff, no jargon. 3–4 sentences max.]

---

## 2. Audiences and routing

| Audience | Signals in the email | Action |
|---|---|---|
| Prospective user | how does it work, is it free, when can I use it | Auto-reply |
| Existing customer | bug, doesn't work, wrong value | Acknowledge + log + route to support |
| Partner / channel | partnership, integration, feed | Draft for human review |
| Press / media | journalist, article, comment, interview | Draft for human review, route to founder |
| Investor | funding, raise, deck, cap table | Route to founder, do **not** send numbers |
| Legal / data | terms, scraping, GDPR, copyright, cease | Route to human immediately, no auto-reply |

---

## 3. Canned answer bank

[Q&A pairs. Each answer must be supportable purely from `product-spec.md`
and this file — no invented facts.]

**Q: What does it do?**
A: [...]

**Q: How much does it cost?**
A: [Pull from product-spec §11. Include both monthly and annual prices and
mention currency.]

**Q: Where do I sign up?**
A: [Onboarding flow — concierge / self-serve / pilot only.]

**Q: How fast is delivery / response / output?**
A: [Pull from product-spec §4.]

**Q: How is my data protected?**
A: [Pull from product-spec §8.]

[...add the FAQs that match this product specifically.]

---

## 4. What the auto-responder must NOT do

- Do **not** state launch dates, prices, or financial figures that are not
  confirmed in `product-spec.md` or in this file.
- Do **not** answer legal, partnership-terms, or investor questions
  automatically — route to a human.
- Do **not** invent features, integrations, cities, or data sources.
- Do **not** promise accuracy beyond what `product-spec.md` claims.
- Do **not** disclose internal tier caps if they conflict with marketing
  copy (`product-spec.md` will flag known discrepancies).

---

## 5. When to escalate

Any of the following triggers an immediate human handoff (no auto-reply):

- Anything mentioning a lawyer, claim, breach, fine, regulator, or
  cease-and-desist.
- Anything from a journalist or publication.
- Anything mentioning an investment offer, term sheet, or equity.
- Repeated messages from the same sender that have not been answered to
  their satisfaction.
- Anything that cannot be answered from `product-spec.md` + this file
  without speculation.

---

*This file is read by the auto-responder. When the product changes, update
sections 1, 3, and 4 here as well as `product-spec.md`.*
