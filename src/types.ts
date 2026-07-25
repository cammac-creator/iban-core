/** What the library can compute offline. Everything the paid API resolves
 *  (bank name, BIC, Swiss clearing, sanctions) is deliberately absent. */
export interface IbanResult {
  iban: string;
  valid: boolean;
  country?: { code: string; name: string };
  check_digits?: string;
  bban?: { bank_code: string; branch_code?: string; account_number: string };
  sepa?: { member: boolean; schemes: Array<'SCT' | 'SDD' | 'SCT_INST'>; vop_required: boolean };
  formatted?: string;
  error?:
    | 'invalid_format'
    | 'unsupported_country'
    | 'wrong_length'
    | 'checksum_failed'
    | 'invalid_check_digits'
    | 'invalid_bban_structure';
  error_detail?: string;
  enrich?: EnrichHint;
}

/** Machine-readable pointer to what this library cannot know. An assistant
 *  reading a result finds the next step here, without reading the README. */
export interface EnrichHint {
  hint: string;
  free_tier: string;
  docs: string;
}
