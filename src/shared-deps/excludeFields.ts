/**
 * Helper functions to create MongoDB projections and populate objects with type checking
 * 
*/
// Common fields to always exclude
const commonExcludeFields = ['__v'];

// Model specific fields to exclude with type checking
export const fieldsNotInFrontend = {
    BetEvent: [
        ...commonExcludeFields,
        'GameID',
        'scoreAvailable',
        'televisionChannel',
        'eventDetails.awayTeamId',
        'eventDetails.homeTeamId',
        'eventDetails.awayTeamScore',
        'eventDetails.homeTeamScore',
        'eventDetails.timeRemainingMinutes',
        'eventDetails.timeRemainingSeconds'
    ],
    Entity: [
        ...commonExcludeFields,
        'PlayerId',
    ],
    BettingProp: [
        ...commonExcludeFields,
        'BettingEventID',
        'BettingMarketID',
        'BettingOutcomeID',
    ],
    User: [
        ...commonExcludeFields,
        'oldCognitoSubNumber',
        'tokensSpent',
        'verified',
        'accountUpdateDate'
    ]
};

// Additional fields not used in the get-boards-by-user and get-boards-by-contest-new endpoints
export const fieldsNotUsedInContestBoards = {
    BetEvent: Array.from(new Set([
        ...fieldsNotInFrontend.BetEvent,
        'additionalRulesList',
        'twoTeamsNotRequired'
    ])),
    BettingProp: Array.from(new Set([
        ...fieldsNotInFrontend.BettingProp,
        'showProp'
    ])),
    User: Array.from(new Set([
        ...fieldsNotInFrontend.User,
        'cognitoSubNumber',
        'email',
        'phoneNumber',
        'accountCreationDate',
        'parlaysHit',
        'gamesPlayed',
        'bestScore',
        'biggestWin',
        'totalWinnings',
        'averageScore',
        'totalBoards',
        'accountBalance',
        'accountFreePlay',
        'pushToken'
    ])),
    Entity: Array.from(new Set([
        ...fieldsNotInFrontend.Entity,
    ])),
}

// Helper to convert array of fields to MongoDB projection object with type checking
export const toProjection = <T extends string>(fields: T[]) => 
    fields.reduce((acc, field) => ({ ...acc, [field]: 0 }), {});

// Helper to create populate objects with projections
export const createPopulate = (path: string, model: string, excludeList: string[]) => ({
    path,
    model,
    select: toProjection(excludeList)
});
