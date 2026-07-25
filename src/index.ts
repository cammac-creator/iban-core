// Calculation
export { validate } from './iban.js';
export { validateBIC } from './bic-validator.js';
export { classifyIssuer, normalizeIssuerName } from './issuers.js';

// Country reference data (public IBAN registry)
export {
  getCountryRisk,
  getSepaInfo,
  checkBBANStructure,
  getBBANFieldSpec,
  IBAN_LENGTHS,
  BBAN_STRUCTURE,
  BBAN_SPECS,
  COUNTRY_NAMES,
  EXAMPLE_IBANS,
} from './countries.js';

export type { IbanResult, EnrichHint, BicResult } from './types.js';
export type { IssuerType, IssuerInfo } from './issuers.js';
export type { BBANStructure, BbanCheckResult, SepaScheme } from './countries.js';
