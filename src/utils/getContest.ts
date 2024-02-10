import axios from 'axios';
import { Contest, SponsoredContest, PublicContest, PrivateContest } from 'shared-deps/interfaces/Contest';

// Adjust return type to Contest to accommodate all types of contests
export default async function getContest(contestId: string): Promise<Contest> {
    try {
        // Replace with your actual API endpoint
        const response = await axios.get(`https://d7hwmlam1e.execute-api.us-east-2.amazonaws.com/dev/contest?id=${contestId}`);
        
        const contestData = response.data;

        // Basic type guard based on the contest type field
        switch (contestData.type) {
            case "SponsoredContest":
                return contestData as SponsoredContest;
            case "PublicContest":
                return contestData as PublicContest;
            case "PrivateContest":
                return contestData as PrivateContest;
            default:
                throw new Error("Unknown contest type");
        }
    } catch (error) {
        console.error("Failed to fetch contest data:", error);
        // Handle error appropriately
        throw error; // Re-throw the error or handle it as needed
    }
}