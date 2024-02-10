import axios from 'axios';
import { Contest } from "shared-deps/interfaces/Contest";
import { BetEvent } from "shared-deps/interfaces/BetEvent";
import { Types } from 'mongoose'; // If you're using mongoose

export default async function getAvailableContests(): Promise<Contest[]> {
  try {
    const response = await axios.get('https://d7hwmlam1e.execute-api.us-east-2.amazonaws.com/dev/contest/get-shown-contests');
    const now = new Date();
    // Subtract 12 hours from the current time to keep the contest availible on the website for 12 more hours
    now.setHours(now.getHours() - 12);

    const availableContests: Contest[] = response.data.filter((contest: Contest) => {
      // Check if allowedBetEvents is not null
      if (contest.allowedBetEvents && contest.allowedBetEvents.length > 0) {
        // Filter only BetEvent objects and check their eventTime
        return contest.allowedBetEvents.some((event: Types.ObjectId | BetEvent) => {
          // Check if event is a BetEvent object by checking for the eventTime property
          if ((event as BetEvent).eventTime) {
            const eventTime = new Date((event as BetEvent).eventTime);
            return eventTime > now;
          }
          // If event is not a BetEvent object, we can't check eventTime, so return false
          return false;
        });
      }
      // If allowedBetEvents is null, the contest has no events, so return false
      return false;
    });

    return availableContests;
  } catch (error) {
    console.error('Failed to fetch contests:', error);
    return []; // or throw new Error('Failed to fetch contests');
  }
}