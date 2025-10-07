
export interface ContentBanner {
    _id?: string;
    header?: string;
    body?: string;
    backgroundImage: string;
    cardLink: string; //link card takes user too
    show: boolean; // shows content to Users
    startDate: Date; //date the card will start showing (show must also be marked)
    expirationDate: Date; //date the card expires (show will also be marked)
    //BUTTON #1
    showButtonOnCard?: boolean; //show button on the card
    buttonOnCardText?: string; //text on card button
    buttonLink?: string; //link that the button should take users to
    //Button #2
    showButtonTwoOnCard?: boolean;
    buttonTwoOnCardText?: string;
    buttonTwoLink?: string;
    //MONGO GENERATED
    createDate: Date;
    updatedAt: Date;
};
