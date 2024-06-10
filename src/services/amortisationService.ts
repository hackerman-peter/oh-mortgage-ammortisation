import { AmortisationScheduleResponse, GenerateAmortisationScheduleRequest, StandardAmortisationScheduleRow, StandardPeriod } from "../model/amortisationModel";
import getInterestRate from "../utils/interestRateEndpoint";


export const calculateAmortisationSchedule = async (request: GenerateAmortisationScheduleRequest): Promise<AmortisationScheduleResponse> => {
  // fetch interest rate from provided endpoint
  const interestRate = await getInterestRate();

  // interest rate per month = annual interest rate / 12
  const monthlyInterestRate = interestRate / 12;

  // number of payments = loan duration in years * 12 in months
  const numberOfPayments = request.loanDuration * 12;
  
  let balance = request.loanPrincipal;

  // Calculate monthly payment using the using the amortisation formular
  const monthlyPayment = balance * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
  
  let cumulativeInterest = 0;
  const schedule: StandardAmortisationScheduleRow[] = [];
  

  // loop through each month to calculate the interest, principal and balance
  for (let period = 1; period <= numberOfPayments; period++) {
    const interestPayment = balance * monthlyInterestRate;
    const principalPayment = monthlyPayment - interestPayment; // principle payment is just the total monthly payment minus the interest payment
    
    balance -= principalPayment; // balance at the end of the month
    cumulativeInterest += interestPayment;

    schedule.push({
      period,
      estimatedPayment: monthlyPayment,
      estimatedInterest: interestPayment,
      estimatedCumulativeInterest: cumulativeInterest,
      estimatedPrincipal: principalPayment,
      estimatedBalance: balance
    });
  }

  return {
    loanPrincipal: request.loanPrincipal,
    annualLoanInterestRate: interestRate,
    loanTermYears: request.loanDuration,
    loanRepayment: monthlyPayment,
    repaymentFrequency: StandardPeriod.Month,
    schedule
  };
};

