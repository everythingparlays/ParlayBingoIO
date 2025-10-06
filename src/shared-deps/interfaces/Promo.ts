import mongoose from "mongoose";
import { User } from "./User";

export type PromoCodeType = "referral" | "marketing" | "first-time";
export type CodeStatus =
	| "pending"
	| "rewarded"
	| "expired"
	| "pending_payout"
	| "completed";

export interface StatusUpdate {
	status: CodeStatus;
	at: Date;
}

/*********BASE INTERFACES *********/

//Base Promo Code Interface
export interface PromoCodeBase {
	_id: string;
	userId: mongoose.Types.ObjectId | User;
	code: string;
	type: PromoCodeType;
	amount: number;
	triggerCriteria: "contest_entry" | "immediate";
	isActive: boolean;
	createdAt: Date;
}

export interface ReferralCode extends PromoCodeBase {
	type: "referral";
	referrer: mongoose.Types.ObjectId | User;
}

export interface MarketingCode extends PromoCodeBase {
	type: "marketing";
	expiresAt: Date;
	contestLink: string;
}

export interface FirstTimeCode extends PromoCodeBase {
	type: "first-time";
	expiresAt: Date; // This should expire the first 24 hours
}

//Promo Code Interface
export type PromoCode = ReferralCode | MarketingCode | FirstTimeCode;

//Applied Code Interface
export interface AppliedCodeBase {
	_id: string;
	userId: mongoose.Types.ObjectId | User;
	type: PromoCodeType;
	promoCodeId: mongoose.Types.ObjectId | PromoCode;
	status: StatusUpdate[];
	appliedAt: Date;
}

export interface FeatureFlag {
	_id: string;
	name: string;
	isEnabled: boolean;
	config: {
		windowHours: number;
		signupBonus?: number;
		referrerBonus?: number;
	};
	updatedAt: Date;
}

export interface GetUserDataRequest {
	userId: string;
}

/** **********REFERRAL EARNINGS INTERFACES *********/
export interface ReferralEarning {
	referredUsername: string;
	referredUserProfile?: {
		userId: string;
		email?: string;
		profilePictureUrl?: string;
		accountCreationDate?: Date;
	};
	amount: number;
	status: CodeStatus;
	appliedAt: Date;
	referralCode: string;
}

/*********USER ENDPOINT REQUEST TYPES *********/
export type UserAppliedCodesRequest = GetUserDataRequest;
export type UserReferralProfileRequest = GetUserDataRequest;
export type UserSentCodesRequest = GetUserDataRequest;

// Validate code interfaces
export interface ValidateCodeRequest {
	code: string;
	userId: string;
}

export interface ValidateCodeResponse {
	valid: boolean;
	amount?: number;
	requirements?: string;
	error?: string;
	message?: string;
}

/*********APPLY CODE INTERFACES *********/
export interface ApplyCodeRequest {
	code: string;
	userId: string;
}

export interface ApplyCodeResponse {
	success: boolean;
	message?: string;
	status?: CodeStatus;
	error?: string;
}

// Generate referral interfaces
export interface GenerateReferralRequest {
	userId: string;
}

export interface GenerateReferralResponse {
	code: string;
	shareUrl: string;
}

/*********USER PROFILE RESPONSE INTERFACES *********/
export interface AppliedCode {
	code: string;
	amount: number;
	status: CodeStatus;
	appliedAt?: Date;
}

export interface Referral {
	username: string;
	amount: number;
	status: CodeStatus;
	appliedAt?: Date;
}

export interface UserReferralProfileResponse {
	referralCode: string;
	canEnterCode: boolean;
	timeRemainingHours?: number;
	totalReferred: number;
	totalEarnings: number;
	pendingRewards: number;
	appliedCodes: AppliedCode[];
	referrals: Referral[];
}

export interface SentCodesResponse {
	referralCode: string;
	sentReferrals: Referral[];
	totalEarnings: number;
	pendingEarnings: number;
}

export interface AppliedCodesResponse {
	appliedCodes: AppliedCode[];
	totalAmount: number;
	pendingAmount: number;
}

export interface ReferralEarningsResponse {
	completedEarnings: ReferralEarning[]; // status: "rewarded"
	pendingEarnings: ReferralEarning[]; // status: "pending"
	pendingPayouts: ReferralEarning[]; // status: "pending_payout"
	totals: {
		completed: number;
		pending: number;
		pendingPayout: number;
		total: number;
	};
}

export type UserReferralEarningsRequest = GetUserDataRequest;

/**
 * ADMIN INTERFACES
 */
export interface AdminReferralRecord {
	id: string;
	referrerId?: string;
	referredUserId: string;
	promoCodeId: string;
	referrerUsername: string;
	referrerEmail: string;
	referredUsername: string;
	referredEmail: string;
	referralCode: string;
	amount: number;
	status: CodeStatus;
	appliedAt: Date;
	completedAt?: Date;
}

export interface AdminReferralsResponse {
	referrals: AdminReferralRecord[];
	totalItems: number;
	currentPage: number;
	totalPages: number;
	summary: {
		totalPending: number;
		totalRewarded: number;
		totalExpired: number;
		totalAmount: number;
	};
}

export interface AdminPromoCode {
	id: string;
	code: string;
	type: PromoCodeType;
	amount: number;
	isActive: boolean;
	usageCount: number;
	createdAt: Date;
	expiresAt?: Date;
	createdBy?: string;
}

export interface AdminPromoCodesResponse {
	promoCodes: AdminPromoCode[];
	totalItems: number;
	currentPage: number;
	totalPages: number;
}


export interface UpdateReferralStatusRequest {
	referralIds: string[];
	newStatus: CodeStatus;
	adminNote?: string;
	paymentTransactionId?: string;
}

export interface UpdateReferralStatusResponse {
	success: boolean;
	updatedCount: number;
	updatedReferrals: Array<{
		id: string;
		oldStatus: string;
		newStatus: string;
		updatedAt: Date;
	}>;
	error?: string;
	message?: string;
}

//New updated referral interfaces
// Request - identify by user relationship
export interface UpdateAppliedCodeStatusRequest {
	userId: string;
	referredUserId: string;
	promoCodeId: string;
	newStatus: CodeStatus;
	adminNote?: string;
}

export interface UpdateAppliedCodeStatusResponse {
	message: string;
	appliedCode: AppliedCodeBase; // The updated document
}

/*********FEATURE FLAGS INTERFACES *********/
export interface FeatureFlagConfig {
	enabled: boolean;
	windowHours?: number;
	signupBonus?: number;
	referrerBonus?: number;
	maxEntries?: number;
}

export interface AppSettingsResponse {
	referralSystem: FeatureFlagConfig;
	contests: FeatureFlagConfig;
}

/*********ERROR HANDLING INTERFACES *********/
export interface ErrorResponse {
	success: false;
	error: string;
	message: string;
}

export enum ErrorCode {
	INVALID_CODE = "INVALID_CODE",
	WINDOW_EXPIRED = "WINDOW_EXPIRED",
	ALREADY_USED = "ALREADY_USED",
	SELF_REFERRAL = "SELF_REFERRAL",
	SYSTEM_DISABLED = "SYSTEM_DISABLED",
}

export interface UserReferralData {
	referralCode: ReferralCode;
	canEnterCode: boolean;
	timeRemainingHours?: number;
	totalReferred: number;
	totalEarnings: number;
	pendingRewards: number;
	appliedCodes: {
		code: string;
		amount: number;
		status: CodeStatus;
		appliedAt: Date;
	}[];
	promoCode: {
		username: string;
		amount: number;
		status: CodeStatus;
		appliedAt: Date;
	}[];
}
