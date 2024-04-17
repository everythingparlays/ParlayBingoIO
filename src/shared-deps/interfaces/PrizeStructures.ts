import { Contest } from "./Contest";

export interface PrizeStructureItem {
    startPosition: number;
    endPosition: number;
    minUsers: number;
    maxUsers: number;
    fixed: boolean; //fixed is true if the amount should be used intead of proportional
    percentage: number;
    fixedAmount: number;
}

export type PrizeType = "Top 1" | "Top 2" | "Top 3" |
                                 "Top 5" | "Top 10" | "Top 15" |
                                  "Top 20" | "Top 50%" | "SuperBowl" | "Proprietary";

const top1: PrizeStructureItem[] = [
    // Position 1
    { startPosition: 1, endPosition: 1, minUsers: 2, maxUsers: 100000, fixed: false, percentage: 100, fixedAmount: 0},
];

const top2: PrizeStructureItem[] = [
    // Position 1
    { startPosition: 1, endPosition: 1, minUsers: 2, maxUsers: 3, fixed: false, percentage: 100, fixedAmount: 0},
    { startPosition: 1, endPosition: 1, minUsers: 4, maxUsers: 100000, fixed: false, percentage: 66.7, fixedAmount: 0 },
    // Position 2
    { startPosition: 2, endPosition: 2, minUsers: 4, maxUsers: 100000, fixed: false, percentage: 33.3, fixedAmount: 0 }
];


const top3: PrizeStructureItem[] = [
    // Position 1
    { startPosition: 1, endPosition: 1, minUsers: 2, maxUsers: 3, fixed: false, percentage: 100, fixedAmount: 0 },
    { startPosition: 1, endPosition: 1, minUsers: 4, maxUsers: 7, fixed: false, percentage: 66.7, fixedAmount: 0 },
    { startPosition: 1, endPosition: 1, minUsers: 8, maxUsers: 100000, fixed: false, percentage: 55.0, fixedAmount: 0 },
    // Position 2
    { startPosition: 2, endPosition: 2, minUsers: 4, maxUsers: 7, fixed: false, percentage: 33.3, fixedAmount: 0 },
    { startPosition: 2, endPosition: 2, minUsers: 8, maxUsers: 100000, fixed: false, percentage: 25.0, fixedAmount: 0 },
    // Position 3
    { startPosition: 3, endPosition: 3, minUsers: 8, maxUsers: 100000, fixed: false, percentage: 20.0, fixedAmount: 0 }
];

const top5: PrizeStructureItem[] = [
    // Position 1
    { startPosition: 1, endPosition: 1, minUsers: 2, maxUsers: 3, fixed: false, percentage: 100, fixedAmount: 0 },
    { startPosition: 1, endPosition: 1, minUsers: 4, maxUsers: 5, fixed: false, percentage: 66.7, fixedAmount: 0 },
    { startPosition: 1, endPosition: 1, minUsers: 8, maxUsers: 16, fixed: false, percentage: 55.0, fixedAmount: 0 },
    { startPosition: 1, endPosition: 1, minUsers: 17, maxUsers: 100000, fixed: false, percentage: 35.0, fixedAmount: 0 },
    // Position 2
    { startPosition: 2, endPosition: 2, minUsers: 4, maxUsers: 5, fixed: false, percentage: 33.3, fixedAmount: 0 },
    { startPosition: 2, endPosition: 2, minUsers: 8, maxUsers: 100000, fixed: false, percentage: 25.0, fixedAmount: 0 },
    // Position 3
    { startPosition: 3, endPosition: 3, minUsers: 8, maxUsers: 100000, fixed: false, percentage: 20.0, fixedAmount: 0 },
    // Position 4
    { startPosition: 4, endPosition: 4, minUsers: 17, maxUsers: 100000, fixed: false, percentage: 12.5, fixedAmount: 0 },
    // Position 5
    { startPosition: 5, endPosition: 5, minUsers: 17, maxUsers: 100000, fixed: false, percentage: 7.5, fixedAmount: 0 }
];


const top10: PrizeStructureItem[] = [
    // Position 1
    { startPosition: 1, endPosition: 1, minUsers: 2, maxUsers: 3, fixed: false, percentage: 100, fixedAmount: 0 },
    { startPosition: 1, endPosition: 1, minUsers: 4, maxUsers: 5, fixed: false, percentage: 66.7, fixedAmount: 0 },
    { startPosition: 1, endPosition: 1, minUsers: 8, maxUsers: 16, fixed: false, percentage: 55.0, fixedAmount: 0 },
    { startPosition: 1, endPosition: 1, minUsers: 17, maxUsers: 27, fixed: false, percentage: 35.0, fixedAmount: 0 },
    { startPosition: 1, endPosition: 1, minUsers: 28, maxUsers: 45, fixed: false, percentage: 30.0, fixedAmount: 0 },
    { startPosition: 1, endPosition: 1, minUsers: 46, maxUsers: 100000, fixed: false, percentage: 30.0, fixedAmount: 0 },
    // Position 2
    { startPosition: 2, endPosition: 2, minUsers: 4, maxUsers: 5, fixed: false, percentage: 33.3, fixedAmount: 0 },
    { startPosition: 2, endPosition: 2, minUsers: 8, maxUsers: 16, fixed: false, percentage: 25.0, fixedAmount: 0 },
    {startPosition: 2,endPosition: 2,minUsers: 17,maxUsers: 27,fixed: false,percentage: 25.0,fixedAmount: 0 },
    {startPosition: 2,endPosition: 2,minUsers: 28,maxUsers: 45,fixed: false,percentage: 20.0,fixedAmount: 0 },
    {startPosition: 2,endPosition: 2,minUsers: 46,maxUsers: 100000,fixed: false,percentage: 20.0,fixedAmount: 0 },
    // Position 3
    {startPosition: 3,endPosition: 3,minUsers: 8,maxUsers: 16,fixed: false,percentage: 20.0,fixedAmount: 0 },
    {startPosition: 3,endPosition: 3,minUsers: 17,maxUsers: 27,fixed: false,percentage: 20.0,fixedAmount: 0 },
    {startPosition: 3,endPosition: 3,minUsers: 28,maxUsers: 45,fixed: false,percentage: 15.0,fixedAmount: 0 },
    {startPosition: 3,endPosition: 3,minUsers: 46,maxUsers: 100000,fixed: false,percentage: 13.5,fixedAmount: 0 },
    // Position 4
    { startPosition: 4, endPosition: 4, minUsers: 17, maxUsers: 45, fixed: false, percentage: 12.5, fixedAmount: 0 },
    { startPosition: 4, endPosition: 4, minUsers: 46, maxUsers: 100000, fixed: false, percentage: 10.0, fixedAmount: 0 },
    // Position 5
    { startPosition: 5, endPosition: 5, minUsers: 17, maxUsers: 27, fixed: false, percentage: 7.5, fixedAmount: 0 },
    { startPosition: 5, endPosition: 5, minUsers: 28, maxUsers: 45, fixed: false, percentage: 10.0, fixedAmount: 0 },
    { startPosition: 5, endPosition: 5, minUsers: 46, maxUsers: 100000, fixed: false, percentage: 7.0, fixedAmount: 0 },
    // Position 6
    { startPosition: 6, endPosition: 6, minUsers: 28, maxUsers: 45, fixed: false, percentage: 7.5, fixedAmount: 0 },
    { startPosition: 6, endPosition: 6, minUsers: 46, maxUsers: 100000, fixed: false, percentage: 5.5, fixedAmount: 0 },
    // Position 7
    { startPosition: 7, endPosition: 7, minUsers: 28, maxUsers: 45, fixed: false, percentage: 5.0, fixedAmount: 0 },
    { startPosition: 7, endPosition: 7, minUsers: 46, maxUsers: 100000, fixed: false, percentage: 4.5, fixedAmount: 0 },
    // Position 8
    { startPosition: 8, endPosition: 8, minUsers: 46, maxUsers: 100000, fixed: false, percentage: 3.5, fixedAmount: 0 },
    // Position 9
    { startPosition: 9, endPosition: 9, minUsers: 46, maxUsers: 100000, fixed: false, percentage: 3.0, fixedAmount: 0 },
    // Position 10
    { startPosition: 10, endPosition: 10, minUsers: 46, maxUsers: 100000, fixed: false, percentage: 3.0, fixedAmount: 0 }
];

const top15: PrizeStructureItem[] = [
    // Position 1
    { startPosition: 1, endPosition: 1, minUsers: 2, maxUsers: 3, fixed: false, percentage: 100, fixedAmount: 0 },
    { startPosition: 1, endPosition: 1, minUsers: 4, maxUsers: 5, fixed: false, percentage: 66.7, fixedAmount: 0 },
    { startPosition: 1, endPosition: 1, minUsers: 6, maxUsers: 11, fixed: false, percentage: 55.0, fixedAmount: 0 },
    { startPosition: 1, endPosition: 1, minUsers: 12, maxUsers: 27, fixed: false, percentage: 35.0, fixedAmount: 0 },
    { startPosition: 1, endPosition: 1, minUsers: 28, maxUsers: 37, fixed: false, percentage: 30.0, fixedAmount: 0 },
    { startPosition: 1, endPosition: 1, minUsers: 38, maxUsers: 68, fixed: false, percentage: 26.0, fixedAmount: 0 },
    { startPosition: 1, endPosition: 1, minUsers: 69, maxUsers: 100000, fixed: false, percentage: 25.0, fixedAmount: 0 },
    // Position 2
    { startPosition: 2, endPosition: 2, minUsers: 4, maxUsers: 5, fixed: false, percentage: 33.3, fixedAmount: 0 },
    { startPosition: 2, endPosition: 2, minUsers: 6, maxUsers: 11, fixed: false, percentage: 25.0, fixedAmount: 0 },
    { startPosition: 2, endPosition: 2, minUsers: 12, maxUsers: 27, fixed: false, percentage: 25.0, fixedAmount: 0 },
    { startPosition: 2, endPosition: 2, minUsers: 28, maxUsers: 37, fixed: false, percentage: 20.0, fixedAmount: 0 },
    { startPosition: 2, endPosition: 2, minUsers: 38, maxUsers: 68, fixed: false, percentage: 18.0, fixedAmount: 0 },
    { startPosition: 2, endPosition: 2, minUsers: 69, maxUsers: 100000, fixed: false, percentage: 15.0, fixedAmount: 0 },
    // Position 3
    { startPosition: 3, endPosition: 3, minUsers: 6, maxUsers: 11, fixed: false, percentage: 20.0, fixedAmount: 0 },
    { startPosition: 3, endPosition: 3, minUsers: 12, maxUsers: 27, fixed: false, percentage: 20.0, fixedAmount: 0 },
    { startPosition: 3, endPosition: 3, minUsers: 28, maxUsers: 37, fixed: false, percentage: 15.0, fixedAmount: 0 },
    { startPosition: 3, endPosition: 3, minUsers: 38, maxUsers: 68, fixed: false, percentage: 14.0, fixedAmount: 0 },
    { startPosition: 3, endPosition: 3, minUsers: 69, maxUsers: 100000, fixed: false, percentage: 11.0, fixedAmount: 0 },
    // Position 4
    { startPosition: 4, endPosition: 4, minUsers: 12, maxUsers: 27, fixed: false, percentage: 12.5, fixedAmount: 0 },
    { startPosition: 4, endPosition: 4, minUsers: 28, maxUsers: 37, fixed: false, percentage: 12.5, fixedAmount: 0 },
    { startPosition: 4, endPosition: 4, minUsers: 38, maxUsers: 68, fixed: false, percentage: 10.5, fixedAmount: 0 },
    { startPosition: 4, endPosition: 4, minUsers: 69, maxUsers: 100000, fixed: false, percentage: 9.0, fixedAmount: 0 },
    // Position 5
    { startPosition: 5, endPosition: 5, minUsers: 12, maxUsers: 27, fixed: false, percentage: 7.5, fixedAmount: 0 },
    { startPosition: 5, endPosition: 5, minUsers: 28, maxUsers: 37, fixed: false, percentage: 10.0, fixedAmount: 0 },
    { startPosition: 5, endPosition: 5, minUsers: 38, maxUsers: 68, fixed: false, percentage: 9.0, fixedAmount: 0 },
    { startPosition: 5, endPosition: 5, minUsers: 69, maxUsers: 100000, fixed: false, percentage: 8.0, fixedAmount: 0 },
    // Position 6
    { startPosition: 6, endPosition: 6, minUsers: 28, maxUsers: 68, fixed: false, percentage: 7.5, fixedAmount: 0 },
    { startPosition: 6, endPosition: 6, minUsers: 69, maxUsers: 100000, fixed: false, percentage: 6.5, fixedAmount: 0 },
    // Position 7
    { startPosition: 7, endPosition: 7, minUsers: 28, maxUsers: 37, fixed: false, percentage: 5.0, fixedAmount: 0 },
    { startPosition: 7, endPosition: 7, minUsers: 38, maxUsers: 68, fixed: false, percentage: 6.0, fixedAmount: 0 },
    { startPosition: 7, endPosition: 7, minUsers: 69, maxUsers: 100000, fixed: false, percentage: 5.5, fixedAmount: 0 },
    // Position 8
    { startPosition: 8, endPosition: 8, minUsers: 38, maxUsers: 68, fixed: false, percentage: 5.0, fixedAmount: 0 },
    { startPosition: 8, endPosition: 8, minUsers: 69, maxUsers: 100000, fixed: false, percentage: 4.5, fixedAmount: 0 },
    // Position 9
    { startPosition: 9, endPosition: 9, minUsers: 38, maxUsers: 68, fixed: false, percentage: 4.0, fixedAmount: 0 },
    { startPosition: 9, endPosition: 9, minUsers: 69, maxUsers: 100000, fixed: false, percentage: 3.0, fixedAmount: 0 },
    // Position 10
    { startPosition: 10, endPosition: 10, minUsers: 69, maxUsers: 100000, fixed: false, percentage: 2.5, fixedAmount: 0 },
    // Position 11-15
    { startPosition: 11, endPosition: 15, minUsers: 69, maxUsers: 100000, fixed: false, percentage: 2.0, fixedAmount: 0 }
  ];

const top20: PrizeStructureItem[] = [
    //Position 1
    { startPosition: 1, endPosition: 1, minUsers: 2, maxUsers: 3, fixed: false, percentage: 100, fixedAmount: 0 },
    { startPosition: 1, endPosition: 1, minUsers: 4, maxUsers: 5, fixed: false, percentage: 66.7, fixedAmount: 0 },
    { startPosition: 1, endPosition: 1, minUsers: 6, maxUsers: 11, fixed: false, percentage: 55.0, fixedAmount: 0 },
    { startPosition: 1, endPosition: 1, minUsers: 12, maxUsers: 27, fixed: false, percentage: 35.0, fixedAmount: 0 },
    { startPosition: 1, endPosition: 1, minUsers: 28, maxUsers: 37, fixed: false, percentage: 30.0, fixedAmount: 0 },
    { startPosition: 1, endPosition: 1, minUsers: 38, maxUsers: 56, fixed: false, percentage: 27.5, fixedAmount: 0 },
    { startPosition: 1, endPosition: 1, minUsers: 57, maxUsers: 91, fixed: false, percentage: 25.0, fixedAmount: 0 },
    { startPosition: 1, endPosition: 1, minUsers: 92, maxUsers: 100000, fixed: false, percentage: 22.0, fixedAmount: 0 },
    //Position 2
    { startPosition: 2, endPosition: 2, minUsers: 4, maxUsers: 5, fixed: false, percentage: 33.3, fixedAmount: 0 },
    { startPosition: 2, endPosition: 2, minUsers: 6, maxUsers: 11, fixed: false, percentage: 25.0, fixedAmount: 0 },
    { startPosition: 2, endPosition: 2, minUsers: 12, maxUsers: 27, fixed: false, percentage: 25.0, fixedAmount: 0 },
    { startPosition: 2, endPosition: 2, minUsers: 28, maxUsers: 37, fixed: false, percentage: 20.0, fixedAmount: 0 },
    { startPosition: 2, endPosition: 2, minUsers: 38, maxUsers: 56, fixed: false, percentage: 18.5, fixedAmount: 0 },
    { startPosition: 2, endPosition: 2, minUsers: 57, maxUsers: 91, fixed: false, percentage: 18.0, fixedAmount: 0 },
    { startPosition: 2, endPosition: 2, minUsers: 92, maxUsers: 100000, fixed: false, percentage: 14.0, fixedAmount: 0 },
    //Posittion 3
    { startPosition: 3, endPosition: 3, minUsers: 6, maxUsers: 11, fixed: false, percentage: 20.0, fixedAmount: 0 },
    { startPosition: 3, endPosition: 3, minUsers: 12, maxUsers: 27, fixed: false, percentage: 20.0, fixedAmount: 0 },
    { startPosition: 3, endPosition: 3, minUsers: 28, maxUsers: 37, fixed: false, percentage: 15.0, fixedAmount: 0 },
    { startPosition: 3, endPosition: 3, minUsers: 38, maxUsers: 56, fixed: false, percentage: 15.0, fixedAmount: 0 },
    { startPosition: 3, endPosition: 3, minUsers: 57, maxUsers: 91, fixed: false, percentage: 15.0, fixedAmount: 0 },
    { startPosition: 3, endPosition: 3, minUsers: 92, maxUsers: 100000, fixed: false, percentage: 10.0, fixedAmount: 0 },
    //Position 4
    { startPosition: 4, endPosition: 4, minUsers: 12, maxUsers: 27, fixed: false, percentage: 12.5, fixedAmount: 0 },
    { startPosition: 4, endPosition: 4, minUsers: 28, maxUsers: 37, fixed: false, percentage: 12.5, fixedAmount: 0 },
    { startPosition: 4, endPosition: 4, minUsers: 38, maxUsers: 56, fixed: false, percentage: 12.0, fixedAmount: 0 },
    { startPosition: 4, endPosition: 4, minUsers: 57, maxUsers: 91, fixed: false, percentage: 12.0, fixedAmount: 0 },
    { startPosition: 4, endPosition: 4, minUsers: 92, maxUsers: 100000, fixed: false, percentage: 8.0, fixedAmount: 0 },
    //Position 5
    { startPosition: 5, endPosition: 5, minUsers: 12, maxUsers: 27, fixed: false, percentage: 7.5, fixedAmount: 0 },
    { startPosition: 5, endPosition: 5, minUsers: 28, maxUsers: 37, fixed: false, percentage: 10.0, fixedAmount: 0 },
    { startPosition: 5, endPosition: 5, minUsers: 38, maxUsers: 56, fixed: false, percentage: 9.0, fixedAmount: 0 },
    { startPosition: 5, endPosition: 5, minUsers: 57, maxUsers: 91, fixed: false, percentage: 8.0, fixedAmount: 0 },
    { startPosition: 5, endPosition: 5, minUsers: 92, maxUsers: 100000, fixed: false, percentage: 7.0, fixedAmount: 0 },
    //Position 6
    { startPosition: 6, endPosition: 6, minUsers: 28, maxUsers: 37, fixed: false, percentage: 7.5, fixedAmount: 0 },
    { startPosition: 6, endPosition: 6, minUsers: 38, maxUsers: 56, fixed: false, percentage: 7.0, fixedAmount: 0 },
    { startPosition: 6, endPosition: 6, minUsers: 57, maxUsers: 91, fixed: false, percentage: 6.0, fixedAmount: 0 },
    { startPosition: 6, endPosition: 6, minUsers: 92, maxUsers: 100000, fixed: false, percentage: 6.0, fixedAmount: 0 },
    //Position 7
    { startPosition: 7, endPosition: 7, minUsers: 28, maxUsers: 37, fixed: false, percentage: 5.0, fixedAmount: 0 },
    { startPosition: 7, endPosition: 7, minUsers: 38, maxUsers: 56, fixed: false, percentage: 6.0, fixedAmount: 0 },
    { startPosition: 7, endPosition: 7, minUsers: 57, maxUsers: 91, fixed: false, percentage: 5.0, fixedAmount: 0 },
    { startPosition: 7, endPosition: 7, minUsers: 92, maxUsers: 100000, fixed: false, percentage: 5.0, fixedAmount: 0 },
    //Position 8
    { startPosition: 8, endPosition: 8, minUsers: 38, maxUsers: 56, fixed: false, percentage: 5.0, fixedAmount: 0 },
    { startPosition: 8, endPosition: 8, minUsers: 57, maxUsers: 100000, fixed: false, percentage: 4.5, fixedAmount: 0 },
    //Position 9
    { startPosition: 9, endPosition: 9, minUsers: 57, maxUsers: 100000, fixed: false, percentage: 3.5, fixedAmount: 0 },
    //Position 10
    { startPosition: 10, endPosition: 10, minUsers: 57, maxUsers: 100000, fixed: false, percentage: 3.0, fixedAmount: 0 },
    //Position 11-14
    { startPosition: 11, endPosition: 14, minUsers: 92, maxUsers: 100000, fixed: false, percentage: 2.0, fixedAmount: 0 },
    //Position 15-20
    { startPosition: 15, endPosition: 20, minUsers: 92, maxUsers: 100000, fixed: false, percentage: 1.5, fixedAmount: 0 },
];


const proprietary: PrizeStructureItem[] = [
    { startPosition: 1, endPosition: 1, minUsers: 1, maxUsers: 4, fixed: false, percentage: 100.0, fixedAmount: 0 },
    { startPosition: 1, endPosition: 1, minUsers: 5, maxUsers: 8, fixed: false, percentage: 66.7, fixedAmount: 0 },
    { startPosition: 1, endPosition: 1, minUsers: 9, maxUsers: 16, fixed: false, percentage: 55.0, fixedAmount: 0 },
    { startPosition: 1, endPosition: 1, minUsers: 17, maxUsers: 32, fixed: false, percentage: 35.0, fixedAmount: 0 },
    { startPosition: 1, endPosition: 1, minUsers: 33, maxUsers: 64, fixed: false, percentage: 30.0, fixedAmount: 0 },
    { startPosition: 1, endPosition: 1, minUsers: 65, maxUsers: 100, fixed: false, percentage: 27.5, fixedAmount: 0 },
    { startPosition: 1, endPosition: 1, minUsers: 101, maxUsers: 250, fixed: false, percentage: 25.0, fixedAmount: 0 },
    { startPosition: 1, endPosition: 1, minUsers: 251, maxUsers: 500, fixed: false, percentage: 20.0, fixedAmount: 0 },
    { startPosition: 1, endPosition: 1, minUsers: 501, maxUsers: 1000, fixed: false, percentage: 18.0, fixedAmount: 0 },
    { startPosition: 1, endPosition: 1, minUsers: 1001, maxUsers: 100000, fixed: false, percentage: 13.0, fixedAmount: 0 },
    { startPosition: 2, endPosition: 2, minUsers: 5, maxUsers: 8, fixed: false, percentage: 33.3, fixedAmount: 0 },
    { startPosition: 2, endPosition: 2, minUsers: 9, maxUsers: 16, fixed: false, percentage: 25.0, fixedAmount: 0 },
    { startPosition: 2, endPosition: 2, minUsers: 17, maxUsers: 32, fixed: false, percentage: 25.0, fixedAmount: 0 },
    { startPosition: 2, endPosition: 2, minUsers: 33, maxUsers: 64, fixed: false, percentage: 20.0, fixedAmount: 0 },
    { startPosition: 2, endPosition: 2, minUsers: 65, maxUsers: 100, fixed: false, percentage: 18.5, fixedAmount: 0 },
    { startPosition: 2, endPosition: 2, minUsers: 101, maxUsers: 250, fixed: false, percentage: 18.0, fixedAmount: 0 },
    { startPosition: 2, endPosition: 2, minUsers: 251, maxUsers: 500, fixed: false, percentage: 15.0, fixedAmount: 0 },
    { startPosition: 2, endPosition: 2, minUsers: 501, maxUsers: 1000, fixed: false, percentage: 13.0, fixedAmount: 0 },
    { startPosition: 2, endPosition: 2, minUsers: 1001, maxUsers: 100000, fixed: false, percentage: 8.0, fixedAmount: 0 },
    { startPosition: 3, endPosition: 3, minUsers: 9, maxUsers: 16, fixed: false, percentage: 20.0, fixedAmount: 0 },
    { startPosition: 3, endPosition: 3, minUsers: 17, maxUsers: 32, fixed: false, percentage: 20.0, fixedAmount: 0 },
    { startPosition: 3, endPosition: 3, minUsers: 33, maxUsers: 64, fixed: false, percentage: 15.0, fixedAmount: 0 },
    { startPosition: 3, endPosition: 3, minUsers: 65, maxUsers: 100, fixed: false, percentage: 15.0, fixedAmount: 0 },
    { startPosition: 3, endPosition: 3, minUsers: 101, maxUsers: 250, fixed: false, percentage: 15.0, fixedAmount: 0 },
    { startPosition: 3, endPosition: 3, minUsers: 251, maxUsers: 500, fixed: false, percentage: 12.0, fixedAmount: 0 },
    { startPosition: 3, endPosition: 3, minUsers: 501, maxUsers: 1000, fixed: false, percentage: 10.0, fixedAmount: 0 },
    { startPosition: 3, endPosition: 3, minUsers: 1001, maxUsers: 100000, fixed: false, percentage: 6.0, fixedAmount: 0 },
    { startPosition: 4, endPosition: 4, minUsers: 12, maxUsers: 27, fixed: false, percentage: 12.5, fixedAmount: 0 },
    { startPosition: 4, endPosition: 4, minUsers: 28, maxUsers: 37, fixed: false, percentage: 12.5, fixedAmount: 0 },
    { startPosition: 4, endPosition: 4, minUsers: 38, maxUsers: 56, fixed: false, percentage: 12.0, fixedAmount: 0 },
    { startPosition: 4, endPosition: 4, minUsers: 57, maxUsers: 91, fixed: false, percentage: 12.0, fixedAmount: 0 },
    { startPosition: 4, endPosition: 4, minUsers: 92, maxUsers: 100, fixed: false, percentage: 9.0, fixedAmount: 0 },
    { startPosition: 4, endPosition: 4, minUsers: 128, maxUsers: 250, fixed: false, percentage: 9.0, fixedAmount: 0 },
    { startPosition: 4, endPosition: 4, minUsers: 251, maxUsers: 500, fixed: false, percentage: 5.0, fixedAmount: 0 },
    { startPosition: 5, endPosition: 5, minUsers: 7, maxUsers: 8, fixed: false, percentage: 7.5, fixedAmount: 0 },
    { startPosition: 5, endPosition: 5, minUsers: 9, maxUsers: 16, fixed: false, percentage: 10.0, fixedAmount: 0 },
    { startPosition: 5, endPosition: 5, minUsers: 17, maxUsers: 32, fixed: false, percentage: 9.0, fixedAmount: 0 },
    { startPosition: 5, endPosition: 5, minUsers: 33, maxUsers: 64, fixed: false, percentage: 8.0, fixedAmount: 0 },
    { startPosition: 5, endPosition: 5, minUsers: 65, maxUsers: 100, fixed: false, percentage: 8.0, fixedAmount: 0 },
    { startPosition: 5, endPosition: 5, minUsers: 101, maxUsers: 250, fixed: false, percentage: 8.0, fixedAmount: 0 },
    { startPosition: 5, endPosition: 5, minUsers: 251, maxUsers: 500, fixed: false, percentage: 8.0, fixedAmount: 0 },
    { startPosition: 5, endPosition: 5, minUsers: 501, maxUsers: 1000, fixed: false, percentage: 8.0, fixedAmount: 0 },
    { startPosition: 5, endPosition: 5, minUsers: 1001, maxUsers: 100000, fixed: false, percentage: 5.0, fixedAmount: 0 },
    { startPosition: 6, endPosition: 6, minUsers: 7, maxUsers: 8, fixed: false, percentage: 7.5, fixedAmount: 0 },
    { startPosition: 6, endPosition: 6, minUsers: 9, maxUsers: 16, fixed: false, percentage: 7.0, fixedAmount: 0 },
    { startPosition: 6, endPosition: 6, minUsers: 17, maxUsers: 32, fixed: false, percentage: 6.0, fixedAmount: 0 },
    { startPosition: 6, endPosition: 6, minUsers: 33, maxUsers: 64, fixed: false, percentage: 7.0, fixedAmount: 0 },
    { startPosition: 6, endPosition: 6, minUsers: 65, maxUsers: 100, fixed: false, percentage: 7.0, fixedAmount: 0 },
    { startPosition: 6, endPosition: 6, minUsers: 101, maxUsers: 250, fixed: false, percentage: 7.0, fixedAmount: 0 },
    { startPosition: 6, endPosition: 6, minUsers: 251, maxUsers: 500, fixed: false, percentage: 7.0, fixedAmount: 0 },
    { startPosition: 6, endPosition: 6, minUsers: 501, maxUsers: 1000, fixed: false, percentage: 7.0, fixedAmount: 0 },
    { startPosition: 6, endPosition: 6, minUsers: 1001, maxUsers: 100000, fixed: false, percentage: 3.0, fixedAmount: 0 },
    { startPosition: 7, endPosition: 7, minUsers: 5, maxUsers: 8, fixed: false, percentage: 5.0, fixedAmount: 0 },
    { startPosition: 7, endPosition: 7, minUsers: 9, maxUsers: 16, fixed: false, percentage: 6.0, fixedAmount: 0 },
    { startPosition: 7, endPosition: 7, minUsers: 17, maxUsers: 32, fixed: false, percentage: 5.0, fixedAmount: 0 },
    { startPosition: 7, endPosition: 7, minUsers: 33, maxUsers: 64, fixed: false, percentage: 7.0, fixedAmount: 0 },
    { startPosition: 7, endPosition: 7, minUsers: 65, maxUsers: 100, fixed: false, percentage: 6.0, fixedAmount: 0 },
    { startPosition: 7, endPosition: 7, minUsers: 101, maxUsers: 250, fixed: false, percentage: 6.0, fixedAmount: 0 },
    { startPosition: 7, endPosition: 7, minUsers: 251, maxUsers: 500, fixed: false, percentage: 5.0, fixedAmount: 0 },
    { startPosition: 7, endPosition: 7, minUsers: 501, maxUsers: 1000, fixed: false, percentage: 3.0, fixedAmount: 0 },
    { startPosition: 8, endPosition: 8, minUsers: 5, maxUsers: 8, fixed: false, percentage: 5.0, fixedAmount: 0 },
    { startPosition: 8, endPosition: 8, minUsers: 9, maxUsers: 16, fixed: false, percentage: 4.5, fixedAmount: 0 },
    { startPosition: 8, endPosition: 8, minUsers: 17, maxUsers: 32, fixed: false, percentage: 6.0, fixedAmount: 0 },
    { startPosition: 8, endPosition: 8, minUsers: 33, maxUsers: 64, fixed: false, percentage: 5.0, fixedAmount: 0 },
    { startPosition: 8, endPosition: 8, minUsers: 65, maxUsers: 100, fixed: false, percentage: 5.0, fixedAmount: 0 },
    { startPosition: 8, endPosition: 8, minUsers: 101, maxUsers: 250, fixed: false, percentage: 4.0, fixedAmount: 0 },
    { startPosition: 8, endPosition: 8, minUsers: 251, maxUsers: 500, fixed: false, percentage: 2.0, fixedAmount: 0 },
    { startPosition: 9, endPosition: 9, minUsers: 5, maxUsers: 8, fixed: false, percentage: 3.5, fixedAmount: 0 },
    { startPosition: 9, endPosition: 9, minUsers: 9, maxUsers: 16, fixed: false, percentage: 5.0, fixedAmount: 0 },
    { startPosition: 9, endPosition: 9, minUsers: 17, maxUsers: 32, fixed: false, percentage: 4.0, fixedAmount: 0 },
    { startPosition: 9, endPosition: 9, minUsers: 33, maxUsers: 64, fixed: false, percentage: 2.0, fixedAmount: 0 },
    { startPosition: 10, endPosition: 10, minUsers: 5, maxUsers: 8, fixed: false, percentage: 3.0, fixedAmount: 0 },
    { startPosition: 10, endPosition: 10, minUsers: 9, maxUsers: 16, fixed: false, percentage: 3.0, fixedAmount: 0 },
    { startPosition: 10, endPosition: 10, minUsers: 17, maxUsers: 32, fixed: false, percentage: 3.0, fixedAmount: 0 },
    { startPosition: 10, endPosition: 10, minUsers: 33, maxUsers: 64, fixed: false, percentage: 1.5, fixedAmount: 0 },
    { startPosition: 11, endPosition: 14, minUsers: 5, maxUsers: 8, fixed: false, percentage: 2.0, fixedAmount: 0 },
    { startPosition: 11, endPosition: 14, minUsers: 9, maxUsers: 16, fixed: false, percentage: 2.0, fixedAmount: 0 },
    { startPosition: 11, endPosition: 14, minUsers: 17, maxUsers: 32, fixed: false, percentage: 2.0, fixedAmount: 0 },
    { startPosition: 11, endPosition: 14, minUsers: 33, maxUsers: 64, fixed: false, percentage: 0.75, fixedAmount: 0 },
    { startPosition: 15, endPosition: 20, minUsers: 5, maxUsers: 8, fixed: false, percentage: 1.5, fixedAmount: 0 },
    { startPosition: 15, endPosition: 20, minUsers: 9, maxUsers: 16, fixed: false, percentage: 1.5, fixedAmount: 0 },
    { startPosition: 15, endPosition: 20, minUsers: 17, maxUsers: 32, fixed: false, percentage: 1.5, fixedAmount: 0 },
    { startPosition: 15, endPosition: 20, minUsers: 33, maxUsers: 64, fixed: false, percentage: 0.5, fixedAmount: 0 },
    { startPosition: 21, endPosition: 50, minUsers: 5, maxUsers: 8, fixed: false, percentage: 0.35, fixedAmount: 0 },
    { startPosition: 21, endPosition: 50, minUsers: 9, maxUsers: 16, fixed: false, percentage: 0.35, fixedAmount: 0 },
    { startPosition: 21, endPosition: 50, minUsers: 17, maxUsers: 32, fixed: false, percentage: 0.35, fixedAmount: 0 },
    { startPosition: 21, endPosition: 50, minUsers: 33, maxUsers: 64, fixed: false, percentage: 0.35, fixedAmount: 0 },
    { startPosition: 51, endPosition: 100, minUsers: 5, maxUsers: 8, fixed: false, percentage: 0.25, fixedAmount: 0 },
    { startPosition: 51, endPosition: 100, minUsers: 9, maxUsers: 16, fixed: false, percentage: 0.25, fixedAmount: 0 },
    { startPosition: 51, endPosition: 100, minUsers: 17, maxUsers: 32, fixed: false, percentage: 0.25, fixedAmount: 0 },
    { startPosition: 51, endPosition: 100, minUsers: 33, maxUsers: 64, fixed: false, percentage: 0.25, fixedAmount: 0 },
    { startPosition: 101, endPosition: 250, minUsers: 5, maxUsers: 8, fixed: false, percentage: 0.15, fixedAmount: 0 },
    { startPosition: 101, endPosition: 250, minUsers: 9, maxUsers: 16, fixed: false, percentage: 0.15, fixedAmount: 0 },
    { startPosition: 101, endPosition: 250, minUsers: 17, maxUsers: 32, fixed: false, percentage: 0.15, fixedAmount: 0 },
    { startPosition: 101, endPosition: 250, minUsers: 33, maxUsers: 64, fixed: false, percentage: 0.15, fixedAmount: 0 }
  ];
const superBowl: PrizeStructureItem[] = [
    // Position 1
    { startPosition: 1, endPosition: 1, minUsers: 0, maxUsers: 20, fixed: true, percentage: 0, fixedAmount: 80 },
    { startPosition: 1, endPosition: 1, minUsers: 21, maxUsers: 100000, fixed: false, percentage: 35.0, fixedAmount: 0 },
    // Position 2
    { startPosition: 2, endPosition: 2, minUsers: 0, maxUsers: 20, fixed: true, percentage: 0, fixedAmount: 45 },
    { startPosition: 2, endPosition: 2, minUsers: 21, maxUsers: 100000, fixed: false, percentage: 25.0, fixedAmount: 0 },
    // Position 3
    { startPosition: 3, endPosition: 3, minUsers: 0, maxUsers: 20, fixed: true, percentage: 0, fixedAmount: 30 },
    { startPosition: 3, endPosition: 3, minUsers: 21, maxUsers: 100000, fixed: false, percentage: 20.0, fixedAmount: 0 },
    // Position 4
    { startPosition: 4, endPosition: 4, minUsers: 0, maxUsers: 20, fixed: true, percentage: 0, fixedAmount: 25 },
    { startPosition: 4, endPosition: 4, minUsers: 21, maxUsers: 100000, fixed: false, percentage: 12.5, fixedAmount: 0 },
    // Position 5
    { startPosition: 5, endPosition: 5, minUsers: 0, maxUsers: 20, fixed: true, percentage: 0, fixedAmount: 20 },
    { startPosition: 5, endPosition: 5, minUsers: 21, maxUsers: 100000, fixed: false, percentage: 7.5, fixedAmount: 0 }
];

const familyFun: PrizeStructureItem[] = [
    { startPosition: 1, endPosition: 1, minUsers: 0, maxUsers: 100000, fixed: true, percentage: 0, fixedAmount: 25 },
    // Position 2
    { startPosition: 2, endPosition: 2, minUsers: 0, maxUsers: 100000, fixed: true, percentage: 0, fixedAmount: 15 },
    // Position 3
    { startPosition: 3, endPosition: 3, minUsers: 0, maxUsers: 100000, fixed: true, percentage: 0, fixedAmount: 10 },
];

function validatePrizeStructureName(name: string): boolean {
    return (
        name === "Top 1" ||
        name === "Top 2" ||
        name === "Top 3" ||
        name === "Top 5" ||
        name === "Top 10" ||
        name === "Top 15" ||
        name === "Top 20" ||
        name === "Top 50%" ||
        name === "SuperBowl" ||
        name === "FamilyFun" ||
        name === "Proprietary"
    );
}

const getTopFiftyPercentPrizeItems = (numPlayers: number): PrizeStructureItem[] => {
    if (numPlayers < 2) return [];
    let pctPerPlayer = (100/(Math.floor(numPlayers/2)))
    return [{
                startPosition: 1, 
                endPosition: Math.floor(numPlayers/2), 
                minUsers: 2, 
                maxUsers: 100000, 
                fixed: false, 
                percentage: parseFloat(pctPerPlayer.toFixed(2)), //rounds to two decimal points
                fixedAmount: 0
            }
    ];
    
}
/*
export const fixedPrizeStructures = {
    "Top 1" : top1,
    "Top 2": top2,
    "Top 3": top3,
    "Top 5": top5,
    "Top 10": top10,
    "Top 15": top15,
    "Top 20": top20,
    "Proprietary": proprietary,
};*/

interface PrizeStructureData {
    displayName: string;
    prizeStructureData: PrizeStructureItem[]; // Replace 'any' with the actual type of your prize structure data
}

export interface CustomPrizeStructureData {
    _id?: string;
    createdAt?: string;
    updatedAt?: string;
    backendName: string;
    displayName:string;
    prizeStructureData: PrizeStructureItem[]
}

interface PrizeStructures {
    [key: string]: PrizeStructureData;
}

export const fixedPrizeStructures: PrizeStructures = {
    "Top 1":  { displayName: "Top 1", prizeStructureData: top1 },
    "Top 2": { displayName: "Top 2", prizeStructureData: top2 },
    "Top 3": { displayName: "Top 3", prizeStructureData: top3 },
    "Top 5": { displayName: "Top 5", prizeStructureData: top5 },
    "SuperBowl": {displayName: "Top 5" , prizeStructureData: superBowl},
    "Top 10": { displayName: "Top 10", prizeStructureData: top10 },
    "Top 15": { displayName: "Top 15", prizeStructureData: top15 },
    "Top 20": { displayName: "Top 20", prizeStructureData: top20 },
    "FamilyFun": { displayName: "Top 3", prizeStructureData: familyFun},
    "Proprietary": { displayName: "Proprietary", prizeStructureData: proprietary },
}

//gets prize structure Items as
export const getPrizeItems = (type: PrizeType, numPlayers: number): PrizeStructureItem[]  => {
    //Return for invalid prize structures
     if (!validatePrizeStructureName(type)){
         console.log("invalid prize structure name")
         return [];
     }
     //Top 50% prize structure must be generated
     if(type=="Top 50%"){
         console.log("Top 50 getPrizeItems")
         return getTopFiftyPercentPrizeItems(numPlayers);
     }
     //Non-Generated Prize Structures, Filter items 
     const temp = fixedPrizeStructures[type].prizeStructureData.filter((item: PrizeStructureItem) => ((numPlayers >= item.minUsers) && (numPlayers <= item.maxUsers)))
 
     return temp
};

export const getPrizeItemsFromCustom = (customPrizeStructure: PrizeStructureData, numPlayers: number): PrizeStructureItem[] => {
    return customPrizeStructure.prizeStructureData.filter((item: PrizeStructureItem) => ((numPlayers >= item.minUsers) && (numPlayers <= item.maxUsers)))
}

export const getPrizeItemsFromContest = (contest: Contest, numberParticipants?: number ): PrizeStructureItem[] => {
    if(!numberParticipants){
        numberParticipants = contest.numberParticipants;
    }
    if(contest.customPrizeStructure?.prizeStructureData){
        return getPrizeItemsFromCustom(contest.customPrizeStructure, numberParticipants)
    }
    return getPrizeItems(contest.prizeStructure as PrizeType, numberParticipants)
}


//d
export const getTotalPrizeAmount = (prizeItems: PrizeStructureItem[], entryFee: number, numEntries: number, pctRake: number): number => {
    const total = prizeItems.reduce((accumulator: number, item: PrizeStructureItem) => {
        const numPositionsGettingPrize = (item.endPosition - item.startPosition + 1);
        if(item.fixed===true){
            return accumulator + (item.fixedAmount * numPositionsGettingPrize)
        }else{
            return accumulator + ((item.percentage/100) * numEntries * entryFee * numPositionsGettingPrize * ((100-pctRake)/100));
        }
    }, 0);
    return total;
}


//rake pct comes as a number ex: 20% Rake -> rakePct = 20;
export const getPayoutAmountForPrizeItem = (prizeItem :PrizeStructureItem, entryFee: number, numPlayers: number, rakePct: number): number => {
    const totalPrizePool = entryFee * numPlayers * ((100-rakePct)/100);
    let prizeAmount;
    if(prizeItem.fixed===true){
        prizeAmount = prizeItem.fixedAmount;
    }else(
        prizeAmount = totalPrizePool * (prizeItem.percentage/100)
    )
    return parseFloat(prizeAmount.toFixed(2)); //round to nearest two decimals
}

//Given the prize Items for that number of participants, get the prize for a specific name, returns undefined otherwise
export const getPrizeItemForRankWithoutTies = (prizeItems: PrizeStructureItem[], rank: number): PrizeStructureItem | undefined => {
    return prizeItems.find((item: PrizeStructureItem) => (item.startPosition <= rank && item.endPosition >= rank));
}

export const getPrizeDisplayNameFromContest = (contest: Contest): string => {
    if(contest.customPrizeStructure){
        return contest.customPrizeStructure.displayName;
    }else{
        const prizeStructure = fixedPrizeStructures[contest.prizeStructure];
        if (!prizeStructure) {
            return "Invalid";
        }
            return prizeStructure.displayName;
    }
}


export const  getPrizeDisplayName = (prizeStructureName: PrizeType): string =>  {
    const prizeStructure = fixedPrizeStructures[prizeStructureName];
    if (!prizeStructure) {
       return "Invalid"
    }
    return prizeStructure.displayName;
}

/*(
                (payout / 100) *
                ((100 - singleContest?.pctRake) / 100) *
                (Number(
                  joinable
                    ? singleContest?.maxParticipants
                    : singleContest.numberParticipants
                ) *
                  Number(singleContest?.entryFee))
              )*/