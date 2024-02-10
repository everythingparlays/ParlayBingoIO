export interface User{ 
    _id: string;
    cognitoSubNumber: string;
    username: string;
    email: string;
    phoneNumber: string;
    accountCreationDate: Date;
    accountUpdateDate: Date;
    profilePictureUrl: string;
    parlaysHit: Number;
    gamesPlayed: Number;
    accountBalance: Number;
    accountFreePlay: Number;
    admin: Boolean;
    verified: string; //"Yes" | "No"| "Pending"
    color1?: string;
    color2?: string;
    color3?: string;
}


export function isUser(obj: any): obj is User {
    return (
      obj &&
      typeof obj._id === 'string' &&
      typeof obj.cognitoSubNumber === 'string' &&
      typeof obj.username === 'string' &&
      typeof obj.email === 'string' &&
      typeof obj.phoneNumber === 'string' &&
      typeof obj.accountCreationDate === 'string' &&
      typeof obj.accountUpdateDate === 'string' &&
      typeof obj.profilePictureUrl === 'string' &&
      typeof obj.parlaysHit === 'number' &&
      typeof obj.gamesPlayed === 'number' &&
      typeof obj.accountBalance === 'number' &&
      typeof obj.accountFreePlay === 'number' &&
      typeof obj.admin === 'boolean' &&
      (obj.verified === 'Yes' || obj.verified === 'No' || obj.verified === 'Pending')
    );
  }

/*
New Transactions:
    1. When a new board is added it needs to be updated in the contests structure as a transaction
    2. User Balance needs to be updated as a transaction

    3. Do the ranking and scoring on the Device to save us computational costs?
        -This will work for private contests not over 100 but not public contests 

    Depositing Money:
    (Transactional)
        1. check if balance is sufficient
        2. Add to ledger transaction
    
    Withdrawling Money:
    (Transactional)
        1. check if balance is sufficient
        2. Add to ledger transaction

    Contest Settlement:
    (Transactional)
        1. Ranking and validation
        2. Add to Ledger
        3. Update Account Balance
        4. Update the board card to reflect winnings

    Entering into a contest: 
    (Preprocessing: Does not need to be entered into the transaction)
        1. Check that the board props added are valid props 
            1. There is a prop that corresponds in the database
            2. Sport and the starting time are valid
    (Transactional)
        1. Subtract the balance from the user and check that it is not less than zero
            ->abort if not valid
        2. Add transaction to the ledger
            ->return transactionId
            ->abort if not sucsessfull
        2. Increments the number of entries in the contest, make sure that it is not under the required amount
            ->abort if not valid
        3. Check that the user will not have more than the max number of entries
            ->abort if not valid
        3. Create the board, add transactionId to the board
            ->abort if not sucsessfull

    //TODO: Figure out how to implement the number of entries per contest
*/
