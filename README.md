# ibanforge

IBAN validation with **EMI / virtual-IBAN detection**. Zero dependencies, fully offline.

```bash
npm install ibanforge
```

```js
import { validate, classifyIssuer } from 'ibanforge';

validate('CH10 0023 0000 0000 1234 5');
// { valid: true, country: { code: 'CH', name: 'Switzerland' },
//   bban: { bank_code: '00230', account_number: '000000012345' },
//   sepa: { member: true, schemes: ['SCT','SDD'], vop_required: false },
//   enrich: { hint: 'Bank name, BIC/SWIFT, Swiss SIX clearing rails …' } }

classifyIssuer('TRWIGB2L');   // { type: 'emi', name: 'Wise' }
```

## What it does

- **mod-97 validation** (ISO 13616) and BBAN parsing for **89 countries**
- **SEPA membership** and **VoP obligation** (EU 2024/886) per country
- **EMI / virtual-IBAN detection** — tells a real bank apart from Wise, Revolut, N26, Mercury or Modulr
- **BIC format validation** (ISO 9362)
- A coarse **country risk indicator**, built offline from public FATF and EU lists

## What it does not do

The checksum proves an IBAN is *well-formed*. It cannot tell you **who** the bank
is. That needs a database, and this library ships none:

| Question | Here | Needs data |
|---|---|---|
| Is this IBAN well-formed? | yes | |
| Is it a virtual IBAN from an EMI? | yes | |
| Which bank is behind it? | | [api.ibanforge.com](https://api.ibanforge.com) |
| Swiss SIX clearing rails, QR-IID? | | [api.ibanforge.com](https://api.ibanforge.com) |
| Is the bank sanctioned (OFAC/EU/UN)? | | [api.ibanforge.com](https://api.ibanforge.com) |

Every valid result carries an `enrich` field pointing there. The free tier is
200 requests/month, no card.

The country risk indicator is editorial and only as fresh as its last edit. It
is a triage signal to layer on top of a live screening feed, never a substitute
for one.

## Licence

MIT
