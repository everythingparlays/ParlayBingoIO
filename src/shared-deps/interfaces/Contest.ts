import { BetEvent, EventStatusOpensSoon, getEventStatus } from "./BetEvent";
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
    externalLink?:string; //payment link (venmo link)
    boardSubmitInfo?: string; //info shown on the payment code screen
    finalized?: boolean;//Dont change this in propEntry Directly
    customPrizeStructure?: null | CustomPrizeStructureData;
    overrideEntryCode?: null | string; //password to overide a generated entry code
    chatMessageCount?: number; //Should not be editable from the prop entry system
    chatLastMessager?: Types.ObjectId; //userId of the user that last messaged in chat
    contestInfoAlertList?: string[]; //list of alerts to be shown on the rules page in blue boxes
    //NEW
    additionalRulesList?: string[]; //rule bulletpoints to be added to the official rules section
    contestPrizesAlertList?: string[];//alerts to show on the prizes page
    contestBoardsAlertList?: string[]; //alerts to show on all of the individual boards in a contest
    twoTeamsNotRequired?:boolean;

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


export function getContestDates(allowedBetEvents: BetEvent[]): { contestStart: Date, contestEnd: Date} {
    if (allowedBetEvents.length === 0) {
        return { contestStart: new(Date), contestEnd: new(Date) };
    }

    const sortedEvents = allowedBetEvents.map(event => ({
        ...event,
        eventTime: new Date(event.eventTime)
    })).sort((a: BetEvent, b: BetEvent) => a.eventTime.getTime() - b.eventTime.getTime());

    const contestStart = sortedEvents[0].eventTime;
    const contestEnd = sortedEvents[sortedEvents.length - 1].eventTime;

    return { contestStart, contestEnd };
}

export function isJoinable(lastEventStart : any): boolean{
    const now = new Date().getTime(); // Current timestamp in milliseconds
    const endTime = new Date(lastEventStart).getTime(); // Event start timestamp in milliseconds
    const differenceInSeconds = Math.floor((endTime - now) / 1000);
    if(differenceInSeconds > 0){
      return true
    }else{
      return false
    }
}



/**
 * @deprecated Use getContestStatusV2 instead.
 */
export function getContestStatus(allowedBetEvents: BetEvent[]): string {  
    const eventStatuses = allowedBetEvents.map(event => getEventStatus(event));

    const joinableEvent = eventStatuses.find(status => status.status === "Joinable");
    if (joinableEvent) {
        return "Joinable";
    }
    const opensSoonEvents = eventStatuses.filter((status): status is EventStatusOpensSoon => status.status === "OpensSoon" );
    if (opensSoonEvents.length > 0) {
        const minTimeUntilOpen = Math.min(...opensSoonEvents.map(status => status.timeUntilOpen!));
        
        if (minTimeUntilOpen < 60) {
            return `Opens in ${Math.ceil(minTimeUntilOpen)} mins`;
        } else if (minTimeUntilOpen < 1440) { // 1440 minutes in a day
            const hours = minTimeUntilOpen / 60;
            return `Opens in ${Math.ceil(hours)} hours`;
        } else {
            const days = minTimeUntilOpen / 1440;
            return `Opens in ${Math.ceil(days)} days`;
        }
    }
    return "Closed";
}


export enum ContestStatusEnum {
    Joinable = "Joinable",
    OpensSoon = "OpensSoon",
    Closed = "Closed",
    Filled = "Filled"
}
interface ContestStatusBase {
    status: ContestStatusEnum; // Use the enum for status
    stringStatus?: string; // String representation of the status for frontend display
}

interface ContestStatusOpensSoon extends ContestStatusBase {
    status: ContestStatusEnum.OpensSoon; 
    timeUntilOpen: number; // Time in minutes until the contest opens
}

export type ContestStatus = ContestStatusBase | ContestStatusOpensSoon;

/**
 * Returns the contest status in a more detailed format, including time until open.
 * @param contest - The contest object containing allowedBetEvents.
 * @returns A ContestStatusBase object with status information
 */
export function getContestStatusV2(contest: Contest): ContestStatus {
    const { allowedBetEvents} = contest;
    if (!allowedBetEvents || allowedBetEvents.length === 0) {
        return { 
            status: ContestStatusEnum.Closed,
            stringStatus: "Closed" 
        };
    }  
    const eventStatuses = allowedBetEvents.map(event => getEventStatus(event as BetEvent));

    const joinableEvent = eventStatuses.find(status => status.status === "Joinable");
    if (joinableEvent) {
        if( contest.maxParticipants && contest.numberParticipants >= contest.maxParticipants){
            return { 
                status: ContestStatusEnum.Filled,
                stringStatus: "Filled" 
            };
        }
        return { 
            status: ContestStatusEnum.Joinable,
            stringStatus: "Joinable" 
        };
    }
    const opensSoonEvents = eventStatuses.filter((status): status is EventStatusOpensSoon => status.status === "OpensSoon");
    if (opensSoonEvents.length > 0) {
        const minTimeUntilOpen = Math.min(...opensSoonEvents.map(status => status.timeUntilOpen!));
        let stringStatus: string;
        
        if (minTimeUntilOpen < 60) {
            stringStatus = `Opens in ${Math.ceil(minTimeUntilOpen)} mins`;
        } else if (minTimeUntilOpen < 1440) { // 1440 minutes in a day
            const hours = minTimeUntilOpen / 60;
            stringStatus = `Opens in ${Math.ceil(hours)} hours`;
        } else {
            const days = minTimeUntilOpen / 1440;
            stringStatus = `Opens in ${Math.ceil(days)} days`;
        }
        
        return {
            status: ContestStatusEnum.OpensSoon,
            timeUntilOpen: minTimeUntilOpen,
            stringStatus
        };
    }
    return { 
        status: ContestStatusEnum.Closed,
        stringStatus: "Closed" 
    };
}


