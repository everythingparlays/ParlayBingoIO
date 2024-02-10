import axios from 'axios';
import { Board } from "shared-deps/interfaces/Board";

export default async function getBoardsByContest(contestId: string): Promise<Board[]> {
  try {
    const response = await axios.get(`https://d7hwmlam1e.execute-api.us-east-2.amazonaws.com/dev/app-client/board/get-by-contest?contestId=${contestId}`);
    // Directly assign response.data to boards if no transformation is needed
    const boards: Board[] = response.data;
    console.log(boards);
    return boards;
  } catch (error) {
    console.error('Error fetching boards by contest:', error);
    throw error; // Or handle this error appropriately
  }
}