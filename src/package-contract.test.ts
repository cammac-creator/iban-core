import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as lib from './index.js';

const pkg = JSON.parse(
  readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), '..', 'package.json'), 'utf-8'),
);

describe('the package keeps its promises', () => {
  it('has zero production dependencies — the headline claim', () => {
    expect(Object.keys(pkg.dependencies ?? {})).toEqual([]);
  });

  it('exports exactly the documented surface', () => {
    expect(Object.keys(lib).sort()).toEqual(
      [
        'validate',
        'validateBIC',
        'classifyIssuer',
        'normalizeIssuerName',
        'getCountryRisk',
        'getSepaInfo',
        'checkBBANStructure',
        'getBBANFieldSpec',
        'IBAN_LENGTHS',
        'BBAN_STRUCTURE',
        'BBAN_SPECS',
        'COUNTRY_NAMES',
        'EXAMPLE_IBANS',
      ].sort(),
    );
  });

  it('validates the canonical example of every supported country', () => {
    const failures = Object.entries(lib.EXAMPLE_IBANS)
      .filter(([, iban]) => !lib.validate(iban).valid)
      .map(([code]) => code);
    expect(failures).toEqual([]);
  });
});
