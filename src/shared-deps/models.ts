import * as mongoose from "mongoose";
import { Board } from "./interfaces/Board";
import { BetEvent, IndividualBetEvent, IndividualBetEventDetails, PlayerScore, SharedBetEventFields, TeamBetEvent, TeamBetEventDetails, betEventTypeValidator, statusTypeValidator } from "./interfaces/BetEvent";
import { BettingProp, consensusOutcomeTypeValidator, outcomeTypeValidator } from "./interfaces/BettingProp";
import { Contest, PrivateContest, PublicContest, SharedContestFields, SponsoredContest, contestTypeValidator, isPositiveInteger, pctRakeValidator, roundPctRake } from "./interfaces/Contest";
import { PlayerEntity, SharedEntityFields, TeamEntity, entityTypeValidator, injuryStatusTypeValidator } from "./interfaces/Entity";
import { AttendantCall, attendantCallStatusTypeValidator, AttendantCallStatusTypes } from "./interfaces/AttendantCall";
import { PaymentCode } from "./interfaces/PaymentCode";
import { User } from "./interfaces/User";
import { ContentBanner } from "./interfaces/ContentBanner";
import { CustomPrizeStructureData, PrizeStructureItem } from "./interfaces/PrizeStructures";
import { IRelationship } from "./interfaces/Relationship";
import { DeferredDeepLink } from "./interfaces/DeferredLinking";

const stageName: string = "cdk_test";

const testSchema = new mongoose.Schema({
    name: String,
    age: Number,
}, { collection: stageName })

/************************Custom Prize Structure Schema **************/
const PrizeStructureItemSchema = new mongoose.Schema<PrizeStructureItem>({
    startPosition: { type: Number, required: true },
    endPosition: { type: Number, required: true },
    minUsers: { type: Number, required: true },
    maxUsers: { type: Number, required: true },
    fixed: { type: Boolean, required: true },
    percentage: { type: Number, required: true },
    fixedAmount: { type: Number, required: true },
});

const CustomPrizeStructureDataSchema = new mongoose.Schema<CustomPrizeStructureData>({
    backendName: { type: String, required: true },
    displayName: { type: String, required: true },
    prizeStructureData: { type: [PrizeStructureItemSchema], required: true, default: [] },
}, {
    _id: true,
    collection: `${stageName}_prize_structures`,
    timestamps: true,
});

const CustomPrizeStructureDataModel = mongoose.model<CustomPrizeStructureData>('CustomPrizeStructureData', CustomPrizeStructureDataSchema);
/***************Contest Schemas **********************/
const defaultContestRakePct = 20;

const contestSchema = new mongoose.Schema<SharedContestFields>({
    contestId: { type: String, required: true, index: true }, //use this to match with the boards
    contestOwner: { type: String, required: false },
    contestName: { type: String, required: true },
    contestDescription: { type: String, required: false },
    maxParticipants: {
        type: Number,
        validate: {
            validator: isPositiveInteger,
            message: "maxParticipants must be an integer",
        },
        required: true
    },
    numberParticipants: {
        type: Number,
        validate: {
            validator: isPositiveInteger,
            message: "numberParticipants must be an integer",
        },
        required: true
    },
    allowedBetEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BetEvent' }],
    entryFee: {
        type: Number,
        validate: {
            validator: isPositiveInteger,
            message: "entryFee must be an integer",
        },
        required: true
    },
    maxEntriesPerPerson: { type: Number, required: true },
    prizeStructure: { type: String, required: true },
    pctRake: {
        type: Number,
        set: roundPctRake,
        validate: {
            validator: pctRakeValidator,
            message: "pctRake must be a number between 0-100",
        }, default: defaultContestRakePct, required: true
    },
    showContest: { type: Boolean, required: true, default: true },
    finalized: { type: Boolean, required: false, default: false },
    skipAttendant: { type: Boolean, required: false, default: false },
    externalLink: { type: String, required: false, default: null },
    boardSubmitInfo: { type: String, required: false, default: null },
    customPrizeStructure: { type: mongoose.Schema.Types.ObjectId, ref: 'CustomPrizeStructureData', required: false, default: null },
    overrideEntryCode: { type: String, required: false, default: null },
    chatMessageCount: { type: Number, required: false, default: 0 },
    chatLastMessager: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false, default: null },
    contestInfoAlertList: { type: [String], required: false, default: [] },
    additionalRulesList: { type: [String], required: false, default: [] },
    contestPrizesAlertList: { type: [String], required: false, default: [] },
    contestBoardsAlertList: { type: [String], required: false, default: [] },
    twoTeamsNotRequired: { type: Boolean, required: false, default: false },
    type: {
        type: String, validate: {
            validator: contestTypeValidator,
            message: 'Invalid ContestType (see Contest.ts interface)',
        }, required: true
    },
}, {
    _id: true,
    collection: `${stageName}_contests`,
    discriminatorKey: 'type',
})

type SharedContestFieldsDocument = SharedContestFields & mongoose.Document;

const sponsoredContestSchema = new mongoose.Schema<SponsoredContest>({
    advertiserPhoto: { type: String, required: true, default: '' },
    geolocated: { type: Boolean, required: true, default: false },
    location: { type: String, required: true, default: '' },
    qrCodeLink: { type: String, required: true, default: '' },
});

const publicContestSchema = new mongoose.Schema<PublicContest>({
    //nothing here for now
});

const privateContestSchema = new mongoose.Schema<PrivateContest>({
    contestPassword: { type: String, required: true, default: '' },
});


/***************User Schemas **********************/
const userSchema = new mongoose.Schema<User>({
    cognitoSubNumber: { type: String, required: true, index: true }, //'NE
    oldCognitoSubNumber: { type: String, required: false, default: "" }, //NE
    username: { type: String, required: true }, //NE
    email: { type: String, required: true }, //NE
    phoneNumber: { type: String, required: true },
    accountCreationDate: { type: Date, required: true },//NE
    accountUpdateDate: { type: Date, required: true }, //TODO: change this to auto increment
    profilePictureUrl: { type: String, required: true },
    parlaysHit: { type: Number, required: true }, //NE
    gamesPlayed: { type: Number, required: true }, //NE
    bestScore: { type: Number, required: false, default: 0 },
    biggestWin: { type: Number, required: false, default: 0 },
    totalWinnings: { type: Number, required: false, default: 0 },
    averageScore: { type: Number, required: false, default: 0 },
    totalBoards: { type: Number, required: false, default: 0 },
    tokensSpent: { type: Number, required: false, default: 0 },
    accountBalance: { type: Number, required: true }, //NE
    accountFreePlay: { type: Number, required: true },  //NE
    admin: { type: Boolean, required: true }, //NE
    verified: { type: String, required: true }, //NE
    pushToken: { type: String, required: false, default: null },
    color1: { type: String, required: false, default: null }, //NE
    color2: { type: String, required: false, default: null }, //NE
    color3: { type: String, required: false, default: null }, //NE
    userBio: { type: String, required: false, default: "" },
    friendsCount: { type: Number, required: false, default: 0 }, //NE
    // friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { collection: `${stageName}_users` })

/***************Entity Schemas  *************************/
const entitySchema = new mongoose.Schema<SharedEntityFields>({
    displayName: { type: String, required: true },
    sport: { type: String, required: true },
    position: { type: String, required: true },
    photoUri: { type: String, required: true, default: '' },
    teamName: { type: String, required: true },
    type: {
        type: String, validate: {
            validator: entityTypeValidator,
            message: 'Invalid EntityType (see Entity.ts interface)',
        }, required: true
    }
}, {
    _id: true,
    collection: `${stageName}_entities`,
    discriminatorKey: 'type',
})

type SharedEntityFieldsDocument = SharedEntityFields & mongoose.Document;

const playerEntitySchema = new mongoose.Schema<PlayerEntity>({
    PlayerId: { type: String, required: false, default: '' },
    position: { type: String, required: true },
    injuryStatus: {
        type: String, validate: {
            validator: injuryStatusTypeValidator,
            message: 'Invalid Injury Status (see Entity.ts interface)',
        }, required: true, default: "Good"
    },
    depthChartOrder: { type: Number, required: true, default: 1 },
    jerseyNumber: { type: Number, required: false, default: null },
});

const teamEntitySchema = new mongoose.Schema<TeamEntity>({
    TeamId: { type: String, required: false, default: '' },
})

/***************Prop Schemas ********************/
const propSchema = new mongoose.Schema<BettingProp>({
    betEventId: { type: mongoose.Schema.Types.ObjectId, ref: 'BetEvent', required: true },
    BettingEventID: { type: Number, required: false, default: 0 }, //game that is being bet on
    BettingMarketID: { type: Number, required: false, default: 0 },
    BettingOutcomeID: { type: Number, required: false, default: 0 },
    //Betting type, shared attributes
    //TODO: delete betting Event
    //bettingEvent: { type: String, required: true }, // Bulls @ Nets
    //TODO: bettingMarketType might need to be re-added
    //bettingMarketType:{ type: String, required: true }, // this will need to be update for individual
    bettingBetType: { type: String, required: true }, //Total Rebounds, Rushing Yards, Total Points, Money Line
    bettingPeriodType: { type: String, required: true }, //Full Game | First quarter... (will always be full game for now)

    entityInfo: { type: mongoose.Schema.Types.ObjectId, ref: 'Entity', required: true }, //player info for player props
    //Betting details
    value: { type: Number, required: true, default: null }, //+35 | -4 (can be a game spread or a points, rebounds etc)
    multiplier: { type: Number, required: true }, //parlay bingo multiplier
    outcomeType: {
        type: String, validate: {
            validator: outcomeTypeValidator,
            message: 'Invalid Outcome Type (see BettingProp.ts interface)',
        }, required: true
    }, //over, under, home, away etc.
    consensusOutcome: {
        type: String, validate: {
            validator: consensusOutcomeTypeValidator,
            message: 'Invalid Outcome Type (see BettingProp.ts interface)',
        }, default: null, required: false
    },// "hit" | "missed" | "none"these will change for real integration
    progressValue: { type: Number, required: true, default: 0 },
    isFinal: { type: Boolean, required: true, default: false },
    showProp: { type: Boolean, required: true, default: true },
    alternateValue: { type: String, required: false, default: null }, //overide for what is displayed on Prop Card
    locked: { type: Boolean, required: false, default: false },
}, {
    collection: `${stageName}_props`,
    timestamps: true,
})

/********Transaction Schema ************/

const transactionSchema = new mongoose.Schema({
    userInfo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    from: { type: String, required: true },
    destination: { type: String, required: true },
    description: { type: String, required: true },
    transactionTime: { type: Date, required: true },
}, { collection: `${stageName}_transactions` })

/*******************Board Schema ************/
const boardSchema = new mongoose.Schema<Board>({
    contestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contest', required: false },
    currentScore: { type: Number, required: true },
    maxPossibleScore: { type: Number, required: true }, //highest score factoring in wins and losses
    userInfo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, default: null }, //will either be the user _id from MongoDb, populate data or null;
    topLeft: { type: mongoose.Schema.Types.ObjectId, ref: 'Prop', required: false, default: null },
    topMiddle: { type: mongoose.Schema.Types.ObjectId, ref: 'Prop', required: false, default: null },
    topRight: { type: mongoose.Schema.Types.ObjectId, ref: 'Prop', required: false, default: null },
    middleLeft: { type: mongoose.Schema.Types.ObjectId, ref: 'Prop', required: false, default: null },
    middleMiddle: { type: mongoose.Schema.Types.ObjectId, ref: 'Prop', required: false, default: null },
    middleRight: { type: mongoose.Schema.Types.ObjectId, ref: 'Prop', required: false, default: null },
    bottomLeft: { type: mongoose.Schema.Types.ObjectId, ref: 'Prop', required: false, default: null },
    bottomMiddle: { type: mongoose.Schema.Types.ObjectId, ref: 'Prop', required: false, default: null },
    bottomRight: { type: mongoose.Schema.Types.ObjectId, ref: 'Prop', required: false, default: null },
    parlaysHit: { type: Number, required: false, default: 0 },
    remainingParlays: { type: Number, required: false, default: 0 },
    boardRank: { type: Number, required: false },//TODO: change this to required after every entry is updated
    transactionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', required: true, default: null },
    numEntries: { type: Number, required: true, default: 1 },
    settled: { type: Boolean, required: true, default: false },
    earnings: { type: Number, required: true, default: 1 }
    //TODO:  change expiration date to required later for sorting, need to update mongodb
}, { collection: `${stageName}_boards`, timestamps: true })

/********Bet Event Schemas *****************/
const betEventSchema = new mongoose.Schema<SharedBetEventFields>({
    status: {
        type: String, validate: {
            validator: statusTypeValidator,
            message: 'Invalid Status (see BetEvents.ts interface)',
        }, required: true
    },
    GameID: { type: Number, required: true },
    sport: { type: String, required: true },
    eventTime: { type: Date, required: true },
    nextPropOpenTime: {
        type: Date,
        required: false,
        default: function (this: any) {
            const twoHoursBefore = new Date(this.eventTime);
            twoHoursBefore.setHours(twoHoursBefore.getHours() - 2);
            return twoHoursBefore;
        }
    },
    bettingEvent: { type: String, required: true },
    scoreAvailable: { type: Boolean, required: true },
    televisionChannel: { type: String, required: true }, //tv channel with the game
    photoUri: { type: String, required: true },
    type: {
        type: String, validate: {
            validator: betEventTypeValidator,
            message: 'Invalid BetEventType (see BetEvents.ts interface)',
        }, required: true
    }
}, {
    _id: true,
    collection: `${stageName}_betevents`,
    discriminatorKey: 'type',
})

type SharedBetEventFieldsDocument = SharedBetEventFields & mongoose.Document;

const teamBetEventDetailsSchema = new mongoose.Schema<TeamBetEventDetails>({
    awayTeamId: { type: Number, required: true, default: 0 },
    homeTeamId: { type: Number, required: true, default: 0 },
    awayTeamScore: { type: Number, required: true, default: 0 },
    homeTeamScore: { type: Number, required: true, default: 0 },
    gamePeriod: { type: Number, required: true, default: 0 },
    timeRemainingMinutes: { type: Number, required: true, default: 0 },
    timeRemainingSeconds: { type: Number, required: true, default: 0 }
});

const playerScoreSchema = new mongoose.Schema<PlayerScore>({
    playerName: { type: String, required: true },
    standing: { type: Number, required: true },
    points: { type: Number, required: true }
});

const individualBetEventDetailsSchema = new mongoose.Schema<IndividualBetEventDetails>({
    scores: [playerScoreSchema]
})

/*********************Define Models ******************/
/********Bet Event Model ****************/
const BetEventModel: any = mongoose.model<SharedBetEventFields>('BetEvent', betEventSchema);
const TeamBetEventModel = BetEventModel.discriminator(
    'TeamBetEvent',
    new mongoose.Schema<TeamBetEvent>({
        awayTeam: { type: String, required: true, default: '' },
        homeTeam: { type: String, required: true, default: '' },
        awayTeamLogo: { type: String, required: true, default: '' },
        homeTeamLogo: { type: String, required: true, default: '' },
        homeTeamJersey: { type: String, required: false, default: null },
        awayTeamJersey: { type: String, required: false, default: null },
        eventDetails: { type: teamBetEventDetailsSchema, required: false }
    })
);
const TeamBetEventDetailsModel = mongoose.model<TeamBetEventDetails>('TeamBetEventDetails', teamBetEventDetailsSchema);

const IndividualBetEventModel = BetEventModel.discriminator(
    'IndividualBetEvent',
    new mongoose.Schema<IndividualBetEvent>({
        eventDetails: { type: individualBetEventDetailsSchema, required: false }
    })
);
const IndividualBetEventDetailsModel = mongoose.model<IndividualBetEventDetails>('IndividualBetEventDetails', individualBetEventDetailsSchema);

/******** Entity Model ****************/
const EntityModel: any = mongoose.model<SharedEntityFields>('Entity', entitySchema);
//q: write a json to test PlayerEntityModel and TeamEntityModel

const PlayerEntityModel = EntityModel.discriminator(
    'PlayerEntity', playerEntitySchema
);
const TeamEntityModel = EntityModel.discriminator(
    'TeamEntity', teamEntitySchema
);
/*****************Attendant Call  ***********/
const attendantCallSchema = new mongoose.Schema<AttendantCall>({
    userInfo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    locationInfo: { type: String, required: true },
    details: { type: String, required: true },
    status: {
        type: String, validate: {
            validator: attendantCallStatusTypeValidator,
            message: 'Invalid Status (see AttendantCall.ts interface)',
        }, required: true, default: "Open"
    },
    contestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contest', required: false },
    boardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: false },

}, {
    collection: `${stageName}_attendant_calls`,
    timestamps: true,
});
/**************** Payment Code  ***************/
const paymentCodeSchema = new mongoose.Schema<PaymentCode>({
    code: { type: String, required: true, unique: true },
    numEntries: { type: Number, required: true },
    used: { type: Boolean, required: true, default: false },
    contestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contest', required: true, default: null },
    boardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: false, default: null },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false, default: null },
}, {
    collection: `${stageName}_payment_codes`,
    timestamps: true,
});

/****************** Content Banner  *****************/
const contentBannerSchema = new mongoose.Schema<ContentBanner>({
    header: { type: String, required: false },
    body: { type: String, required: false },
    backgroundImage: { type: String, required: true },
    cardLink: { type: String, required: true },
    show: { type: Boolean, required: true },
    startDate: { type: Date, required: true },
    expirationDate: { type: Date, required: true },
    showButtonOnCard: { type: Boolean, required: false },
    buttonOnCardText: { type: String, required: false },
    buttonLink: { type: String, required: false },
    showButtonTwoOnCard: { type: Boolean, required: false },
    buttonTwoOnCardText: { type: String, required: false },
    buttonTwoLink: { type: String, required: false },
}, {
    collection: `${stageName}_content_banners`,
    timestamps: true,
});

/****************** Content Banner Model  *****************/
const ContentBannerModel = mongoose.model<ContentBanner>('ContentBanner', contentBannerSchema);

/** Promo Code Schema *************/
const promoCodeSchema = new mongoose.Schema({
    code: { type: String, required: true, index: true, unique: true },
    type: { type: String, enum: ["referral", "marketing", "first-time"], required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false, default: null },
    amount: { type: Number, required: true },
    triggerCriteria: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
    createdAt: { type: Date, required: true, default: () => new Date() },
}, {
    collection: `${stageName}_promo_codes`,
    discriminatorKey: 'type'
});

const referralCodeSchema = new mongoose.Schema({
    referrer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const marketingCodeSchema = new mongoose.Schema({
    expiresAt: { type: Date, required: true },
    contestLink: { type: String, required: true },

});

const appliedCodeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: { type: String, enum: ["referral", "marketing", "first-time"], required: true },
    promoCodeId: { type: mongoose.Schema.Types.ObjectId, ref: 'PromoCode', required: true },
    status: [{
        status: { type: String, enum: ["pending", "rewarded", "pending_payout", "completed"], required: true },
        at: { type: Date, required: true },
        notes: { type: String, required: false }
    }],
    appliedAt: { type: Date, required: true, default: () => new Date() }
}, {
    collection: `${stageName}_applied_codes`,
    timestamps: true
});

const firstTimeCodeSchema = new mongoose.Schema({
    expiresAt: { type: Date, required: true },
});

// Create compound index for efficient queries
appliedCodeSchema.index({ userId: 1, type: 1 });
appliedCodeSchema.index({ userId: 1, promoCodeId: 1 }, { unique: true });

/***********Promo Code Models ***************/
const PromoCodeModel = mongoose.model('PromoCode', promoCodeSchema);
const AppliedCodeModel = mongoose.model('AppliedCode', appliedCodeSchema);
const ReferralCodeModel = PromoCodeModel.discriminator('referral', referralCodeSchema);
const MarketingCodeModel = PromoCodeModel.discriminator('marketing', marketingCodeSchema);
const FirstTimeCodeModel = PromoCodeModel.discriminator('first-time', firstTimeCodeSchema);

/****************Contest  *************/
const Contest = mongoose.model<SharedContestFields>('Contest', contestSchema);
const SponsoredContest = Contest.discriminator(
    'SponsoredContest', sponsoredContestSchema
);
const PublicContest = Contest.discriminator(
    'PublicContest', publicContestSchema
);
const PrivateContest = Contest.discriminator(
    'PrivateContest', privateContestSchema
);

const relationshipSchema = new mongoose.Schema<IRelationship>(
    {
        user1: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
        user2: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
        type: { type: String, enum: ['Added', 'Deleted'], required: true },
    },
    { timestamps: { createdAt: true, updatedAt: false }, collection: `${stageName}_relationships` }
);

relationshipSchema.index({ user1: 1, user2: 1 }, { unique: true });

/***********Deferred Linking Models ***************/
const deferredDeepLinkSchema = new mongoose.Schema<DeferredDeepLink>({
    userIP: { type: String, required: true, index: true },
    userAgent: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now },
    status: {
        type: String,
        enum: ['pending', 'matched', 'expired'],
        required: true,
        default: 'pending',
        index: true
    },
    // Generic link data - works for any deep link type
    baseUrl: { type: String, required: true },
    linkType: { type: String, required: true, index: true },
    urlParameters: { type: Map, of: String, required: true },
    deepLinkUrl: { type: String, required: true },

    // Attribution tracking - only present when status = 'matched'
}, {
    collection: `${stageName}_deferred_deep_links`,
    timestamps: true
});

// Create compound indexes for efficient queries
deferredDeepLinkSchema.index({ userIP: 1, userAgent: 1, status: 1 });
deferredDeepLinkSchema.index({ linkType: 1, status: 1 });
deferredDeepLinkSchema.index({ timestamp: 1 }); // For TTL/cleanup

const DeferredDeepLinkModel = mongoose.model<DeferredDeepLink>('DeferredDeepLink', deferredDeepLinkSchema);
/***********Other Models ***************/
const Test = mongoose.model('Test', testSchema);
const User = mongoose.model('User', userSchema);
const Prop = mongoose.model('Prop', propSchema);
const Transaction = mongoose.model("Transaction", transactionSchema);
const Board = mongoose.model('Board', boardSchema);
const AttendantCallModel = mongoose.model('AttendantCall', attendantCallSchema);
const PaymentCodeModel = mongoose.model('PaymentCode', paymentCodeSchema);
const Relationship = mongoose.model<IRelationship>('Relationship', relationshipSchema);

/**********************Export*************************/
export { Test, User, Contest, Prop, Transaction, Board };
export { BetEventModel, TeamBetEventModel, IndividualBetEventModel }
export { TeamBetEventDetailsModel, IndividualBetEventDetailsModel }
export { EntityModel, PlayerEntityModel, TeamEntityModel }
export { PublicContest, PrivateContest, SponsoredContest }
export { AttendantCallModel, PaymentCodeModel, ContentBannerModel, CustomPrizeStructureDataModel }
export { PromoCodeModel, AppliedCodeModel, ReferralCodeModel, MarketingCodeModel, FirstTimeCodeModel }
export { Relationship }
export { DeferredDeepLinkModel }