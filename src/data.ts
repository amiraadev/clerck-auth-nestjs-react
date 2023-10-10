/* eslint-disable prettier/prettier */
export enum ReportType {
    INCOME = "income",
    EXPENSE = "expense"
}
export const data: Data =  { 
    report: [
        { 
         id: "uid1",
        source: "salary",
        amount: 7500,
        created_at: new Date(),
        updated_at: new Date(),
        type:ReportType.INCOME
    },
        { 
         id: "uid2",
        source: "youtube",
        amount: 2500,
        created_at: new Date(),
        updated_at: new Date(),
        type:ReportType.INCOME
    },
        { 
         id: "uid3",
        source: "food",
        amount: 2500,
        created_at: new Date(),
        updated_at: new Date(),
        type:ReportType.EXPENSE
    },
   ]
 }

interface Data {
    report: {
        id: string;
        source: string;
        amount: number;
        created_at: Date;
        updated_at: Date;
        type:ReportType
    }[]
}

