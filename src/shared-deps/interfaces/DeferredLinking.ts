export interface DeferredDeepLink {
  userIP: string;
  userAgent: string;
  timestamp: Date;        // When the web click occurred
  status: 'pending' | 'matched' | 'expired';
  baseUrl: string;                           // "https://overboardsports.com/link"
  linkType: string;                          // "referral", "contest", "marketing"
  urlParameters: Record<string, string>;     // { type: "referral", referral_code: "ABC123" }
  deepLinkUrl: string;                       // somethign along the lines of "parlaybingo://app?type=referral&referral_code=ABC123"
}

export interface WebLinkAttributionRequest {
  linkType: string;        // From ?type= parameter
  urlParameters: Record<string, string>;  // All other query params
  userIP: string;
  userAgent: string;
}

export interface AppLaunchAttributionRequest {
  userIP: string;
  userAgent: string;
}

export type AppLaunchAttributionResponse =
  | {
      attributed: true;
      linkType: string;                      // "referral"
      urlParameters: Record<string, string>; // { referral_code: "ABC123" }
      autoApply: boolean;                    // true = navigate to apply page
    }
  | {
      attributed: false;
      reason: 'no_match_found' | 'attribution_expired' | 'low_confidence' | 'already_attributed';
    };