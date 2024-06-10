import { calculateAmortisationSchedule } from '../services/amortisationService';
import { GenerateAmortisationScheduleRequest } from '../model/amortisationModel';
import getInterestRate from '../utils/interestRateEndpoint';

jest.mock('../utils/interestRateEndpoint');
const mockedGetInterestRate = getInterestRate as jest.MockedFunction<typeof getInterestRate>;

describe('Amortisation Service', () => {
  it('should calculate the amortisation schedule correctly for 800,000 and 30 years', async () => {
    // Mock the getInterestRate function to return a fixed interest rate
    mockedGetInterestRate.mockResolvedValue(0.0649);

    const request: GenerateAmortisationScheduleRequest = {
      loanPrincipal: 800000,
      loanDuration: 30
    };

    const response = await calculateAmortisationSchedule(request);

    // Check the general structure of the response
    expect(response.loanPrincipal).toBe(800000);
    expect(response.annualLoanInterestRate).toBe(0.0649);
    expect(response.loanTermYears).toBe(30);
    expect(response.repaymentFrequency).toBe('Month');
    
    // Check the length of the schedule
    expect(response.schedule.length).toBe(360);

    // Check the first payment details
    const firstPayment = response.schedule[0];
    expect(firstPayment.period).toBe(1);
    expect(firstPayment.estimatedPayment).toBeCloseTo(5051.29, 1);
    expect(firstPayment.estimatedInterest).toBeCloseTo(4326.67, 1);
    expect(firstPayment.estimatedPrincipal).toBeCloseTo(724.62, 1);
    expect(firstPayment.estimatedBalance).toBeCloseTo(799275.38, 1);
    
    // Check the last payment details
    const lastPayment = response.schedule[response.schedule.length - 1];
    expect(lastPayment.period).toBe(360);
    expect(lastPayment.estimatedPayment).toBeCloseTo(5051.28, 1);
    expect(lastPayment.estimatedInterest).toBeCloseTo(27.17, 1);
    expect(lastPayment.estimatedPrincipal).toBeCloseTo(5024.11, 1);https://www.google.com/search?client=safari&rls=en&q=27&ie=UTF-8&oe=UTF-8
    expect(lastPayment.estimatedBalance).toBeCloseTo(0, 1);
  });

  it('should calculate the amortisation schedule correctly for 50000 and 15 years', async () => {
    // Mock the getInterestRate function to return a fixed interest rate
    mockedGetInterestRate.mockResolvedValue(0.0649);

    const request: GenerateAmortisationScheduleRequest = {
      loanPrincipal: 50000,
      loanDuration: 15
    };

    const response = await calculateAmortisationSchedule(request);

    // Check the general structure of the response
    expect(response.loanPrincipal).toBe(50000);
    expect(response.annualLoanInterestRate).toBe(0.0649);
    expect(response.loanTermYears).toBe(15);
    expect(response.repaymentFrequency).toBe('Month');
    
    // Check the length of the schedule
    expect(response.schedule.length).toBe(180);

    // Check the first payment details
    const firstPayment = response.schedule[0];
    expect(firstPayment.period).toBe(1);
    expect(firstPayment.estimatedPayment).toBeCloseTo(435.28, 1);
    expect(firstPayment.estimatedInterest).toBeCloseTo(270.42, 1);
    expect(firstPayment.estimatedPrincipal).toBeCloseTo(164.86, 1);
    expect(firstPayment.estimatedBalance).toBeCloseTo(49835.14, 1);
    
    // Check the last payment details
    const lastPayment = response.schedule[response.schedule.length - 1];
    expect(lastPayment.period).toBe(180);
    expect(lastPayment.estimatedPayment).toBeCloseTo(435.28, 1);
    expect(lastPayment.estimatedInterest).toBeCloseTo(2.36, 1);
    expect(lastPayment.estimatedPrincipal).toBeCloseTo(432.92, 1);
    expect(lastPayment.estimatedBalance).toBeCloseTo(0, 1);
  });
});