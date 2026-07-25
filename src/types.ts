/** What the library can compute offline. Anything that needs a database
 *  (bank name, BIC, Swiss clearing, sanctions) is deliberately absent —
 *  the `enrich` field says where to resolve it. */
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
  /** Frozen at runtime: the same object is shared by every result. */
  enrich?: Readonly<EnrichHint>;
}

/** Machine-readable pointer to what this library cannot know. An assistant
 *  reading a result finds the next step here, without reading the README. */
export interface EnrichHint {
  hint: string;
  free_tier: string;
  docs: string;
}

/** Structural analysis of a BIC/SWIFT code per ISO 9362. Format only: whether
 *  the code is registered, and to whom, needs a BIC directory this library
 *  does not ship. */
export interface BicResult {
  bic: string;
  valid: boolean;
  bic8?: string;
  bic11?: string;
  institution_code?: string;
  country_code?: string;
  location_code?: string;
  branch_code?: string;
  is_test_bic?: boolean;
  error?: string;
}
