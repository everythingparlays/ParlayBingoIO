import { BetEvent } from "./BetEvent";
import { Board } from "./Board";
import { Types } from "mongoose";
import { CustomPrizeStructureData, PrizeStructureItem } from "./PrizeStructures";

export type Contest = SponsoredContest | PublicContest | PrivateContest;
export type ContestTypes = "SponsoredContest" | "PublicContest" | "PrivateContest";
const contestTypesList: ContestTypes[] = ["SponsoredContest", "PublicContest", "PrivateContest"];

export const contestTypeValidator = (inputVar: any): inputVar is ContestTypes => {
    return ((contestTypesList.includes(inputVar)));
}

export const pctRakeValidator = (inputVar: number): inputVar is number => {
    const parsedValue = parseFloat(inputVar.toFixed(2));
    // Check if the parsed value is a valid number and between 0 and 100.
    if (isNaN(parsedValue) || parsedValue < 0 || parsedValue > 100) {
        return false;
    }
    return true;
}

export const roundPctRake = (inputVar: number): number => {
    const parsedValue = parseFloat(inputVar.toFixed(2));
    return parsedValue;
}

export function isPositiveInteger(value: number): boolean {
    return Number.isInteger(value) && (value >= 0);
}
    

export interface SharedContestFields { 
    _id?: string; //UUID
    contestId: string; //use this to match with the boards
    contestOwner?: string;//username of whoever created the contest
    contestName: string;
    contestDescription:string;
    maxParticipants: number;
    numberParticipants: number; //current number of participants
    allowedBetEvents: Types.ObjectId[] | BetEvent [] | null;
    entryFee: number;
    maxEntriesPerPerson: number;
    prizeStructure: string; //TODO: later set some limits on this
    pctRake: number;
    showContest: boolean;
    type: string; //used to discriminate between types of contest Details
    //Flags
    skipAttendant?:boolean;
    externalLink?:string;
    boardSubmitInfo?: string;
    finalized?: boolean;
    customPrizeStructure?: null | CustomPrizeStructureData;
};

export interface SponsoredContest extends SharedContestFields {
    type: 'SponsoredContest'; //discriminator override
    advertiserPhoto: string;
    geolocated: boolean;
    location: string;
    qrCodeLink: string;
}

export interface PublicContest extends SharedContestFields {
    type: 'PublicContest'; //discriminator override
}


export interface PrivateContest extends SharedContestFields {
    type: 'PrivateContest'; //discriminator override
    contestPassword: string;
}

//Three contest types, sponsored, private, public

export function isContest(obj: any): obj is Contest {
    return (
      obj &&
      typeof obj.contestId === 'number' &&
      typeof obj.contestName === 'string' &&
      obj.contestStartDate ==='string' &&
      obj.contestEndDate === 'string' &&
      typeof obj.privateContest === 'boolean' &&
      typeof obj.contestPassword === 'string' &&
      typeof obj.maxParticipants === 'number' &&
      typeof obj.numberParticipants === 'number' &&
      typeof obj.sponsored === 'string' &&
      (obj.advertiserPhoto === null || typeof obj.advertiserPhoto === 'string') &&
      Array.isArray(obj.allowedBetEvents) &&
      typeof obj.entryFee === 'number' &&
      typeof obj.maxEntriesPerPerson === 'number' &&
      typeof obj.prizeStructure === 'string' &&
      typeof obj.pctRake === 'string'
    );
  }


export function getContestDates(events: BetEvent[]): { contestStart: Date, contestEnd: Date} {
    if (events.length === 0) {
        return { contestStart: new(Date), contestEnd: new(Date) };
    }

    const sortedEvents = events.map(event => ({
        ...event,
        eventTime: new Date(event.eventTime)
    })).sort((a: BetEvent, b: BetEvent) => a.eventTime.getTime() - b.eventTime.getTime());

    const contestStart = sortedEvents[0].eventTime;
    const contestEnd = sortedEvents[sortedEvents.length - 1].eventTime;

    return { contestStart, contestEnd };
}
