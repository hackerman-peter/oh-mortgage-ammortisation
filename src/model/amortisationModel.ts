// Supporting Types/Enums
enum StandardPeriod {
    "Week" = "Week",
    "Fortnight" = "Fortnight",
    "Month" = "Month",
    "Quarter" = "Quarter",
    "Year" = "Year"
}

// Request
type GenerateAmortisationScheduleRequest = {
	loanPrincipal: number;
	loanDuration: number;
}

// Response
type AmortisationScheduleResponse = {
    loanPrincipal: number;
    annualLoanInterestRate: number;
    loanTermYears: number;
    loanRepayment: number;
    repaymentFrequency: StandardPeriod; // Default to Monthly
    schedule: StandardAmortisationScheduleRow[];
};

type StandardAmortisationScheduleRow = {
    period: number;
    estimatedPayment: number;
    estimatedInterest: number;
    estimatedCumulativeInterest: number;
    estimatedPrincipal: number;
    estimatedBalance: number;
};