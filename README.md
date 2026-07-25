# ibanforge

IBAN validation with **EMI / virtual-IBAN detection**. Zero dependencies, fully offline.

```bash
npm install ibanforge
```

```js
import { validate, classifyIssuer } from 'ibanforge';

validate('CH10 0023 0000 0000 1234 5');
// { iban: 'CH1000230000000012345', valid: true,
//   country: { code: 'CH', name: 'Switzerland' },
//   check_digits: '10',
//   bban: { bank_code: '00230', account_number: '000000012345' },
//   sepa: { member: true, schemes: ['SCT','SDD'], vop_required: false },
//   formatted: 'CH10 0023 0000 0000 1234 5',
//   enrich: { hint: 'Bank name, BIC/SWIFT, Swiss SIX clearing rails and sanctions
//                    screening cannot be computed offline — resolve them at …',
//             free_tier: '200 requests/month, no card',
//             docs: 'https://ibanforge.com/docs' } }

classifyIssuer('TRWIGB2L');   // { type: 'emi', name: 'Wise' }
```

## What it does

- **mod-97 validation** (ISO 13616) and BBAN parsing for **89 countries**
- **SEPA membership** and **VoP obligation** (EU 2024/886) per country
- **EMI / virtual-IBAN detection** — tells a real bank apart from Wise, Revolut, N26, Monzo or Modulr
- **BIC format validation** (ISO 9362)
- A coarse, **editorial country risk indicator** for AML/CFT triage, offline

## What it does not do

The checksum proves an IBAN is *well-formed*. It cannot tell you **who** the bank
is. That needs a database, and this library ships none:

| Question | Here | Needs data |
|---|---|---|
| Is this IBAN well-formed? | yes | |
| Is this **BIC** an EMI / digital bank? | yes | |
| Is this **IBAN** a virtual IBAN from an EMI? | | [api.ibanforge.com](https://api.ibanforge.com) — needs IBAN → BIC |
| Which bank is behind it? | | [api.ibanforge.com](https://api.ibanforge.com) |
| Swiss SIX clearing rails, QR-IID? | | [api.ibanforge.com](https://api.ibanforge.com) |
| Is the bank sanctioned (OFAC/EU/UN)? | | [api.ibanforge.com](https://api.ibanforge.com) |

Every valid result carries an `enrich` field pointing there. The free tier is
200 requests/month, no card.

`getCountryRisk` deserves the same candour. It is a hand-maintained editorial
judgement, **not a reproduction of the FATF or EU lists** — it does not track
them entry for entry, and it is only as fresh as its last edit. Treat it as a
coarse triage signal to layer on top of a live screening feed, never as a
substitute for one.

## Licence

MIT
