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
    // The key must be PRESENT and empty. A missing `dependencies` would also
    // install nothing, but it states nothing either: the empty object is the
    // claim, written down where a reader and a diff can both see it.
    expect(Object.prototype.hasOwnProperty.call(pkg, 'dependencies')).toBe(true);
    expect(pkg.dependencies).toEqual({});
  });

  it('ships as an ES module, MIT, Node >= 20', () => {
    expect(pkg.type).toBe('module');
    expect(pkg.license).toBe('MIT');
    expect(pkg.engines?.node).toContain('>=20');
  });

  it('publishes the build output and nothing else', () => {
    expect(pkg.files).toEqual(['dist', 'README.md', 'LICENSE']);
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
