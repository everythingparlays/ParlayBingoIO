//Add new sports names here
type Sport = "basketball" | "football" | "soccer" |
             "baseball" | "hockey" | null; 

export type NewSports = "NFL" | "NBA" | "MMA" | "MLB" | "Soccer" | "CFB" | "CBB" | "NHL" | "Special";
export const NewSportsList: NewSports[] = ["NFL" , "NBA" , "MMA" , "MLB" , "Soccer" , "CFB" , "CBB" , "NHL", "Special"]
export const NewSportsInfo = {"NFL":{
                                    longname: "Football"
                                } ,
                             "NBA":{
                                    longname: "Basketball"
                                } ,
                             "MMA":{
                                    longname: "Mixed Martial Arts"
                                } ,
                             "MLB":{
                                    longname: "Baseball"
                                } ,
                             "Soccer":{
                                    longname: "Soccer"
                                } ,
                             "CFB":{
                                    longname: "College Football"
                                } ,
                             "CBB":{
                                    longname: "College Basketball"
                                } ,
                             "NHL":{
                                    longname: "Hockey" 
                            }};

export default Sport;

export const sportMappings = {
    "All":"All Sports",
    "NFL":"Football",
    "NBA":"Basketball",
    "MMA":"MMA",
    "MLB":"Baseball",
    "Soccer":"Soccer",
    "CFB":"College Football",
    "CBB":"College Basketball",
    "NHL":"Hockey",
    "Special":"Special Events"
}

interface SportsPositions {
    NBA: string[];
    NFL: string[];
    MLB: string[];
    CFB: string[];
    CBB: string[];
    NHL: string[];
}

export const sportsPositions: SportsPositions = {
    NBA: ["PG","SG","SF","PF","C"],
    NFL: ["QB","RB","TE","WR","K"],
    MLB: ["IF","OF","P"],
    CFB: ["QB","RB","TE","WR","K"],
    CBB: ["PG","SG","SF","PF","C"],
    NHL: ["F","D","G"],
};