/* eslint-disable prettier/prettier */
export const data: Data =  { 
    report: []
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

enum ReportType {
    INCOME = "income",
    EXPENSE = "expense"
}
