import { describe, it, expect } from 'vitest';
import { validate } from './iban.js';

describe('the enrich hint', () => {
  it('is present on a valid IBAN and names what the library cannot know', () => {
    const r = validate('CH10 0023 0000 0000 1234 5');
    expect(r.valid).toBe(true);
    expect(r.enrich).toBeDefined();
    expect(r.enrich?.hint).toMatch(/bank name/i);
    expect(r.enrich?.hint).toMatch(/api\.ibanforge\.com/);
    expect(r.enrich?.free_tier).toMatch(/200/);
  });

  it('is absent on an invalid IBAN — there is nothing to enrich', () => {
    expect(validate('XX00BAD').enrich).toBeUndefined();
  });

  it('never carries a price: this library is free', () => {
    expect(JSON.stringify(validate('CH1000230000000012345'))).not.toMatch(/cost_usdc/);
  });
});
