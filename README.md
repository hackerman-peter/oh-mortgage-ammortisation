# oh-mortgage-ammortisation

This project is a Mortgage Amortisation Schedule API built using Node.js, TypeScript, and Express.js. It calculates and returns an amortisation schedule based on the inputs provided and product configuration.

## Features

- REST API built with Node.js and Express.js
- TypeScript for type safety
- Fetches interest rate from an external API
- Calculates amortisation schedule
- Dockerized for easy deployment
- Deployed on Google Cloud Run

## Project Structure

```plaintext
.
├── src
│   ├── controllers
│   │   └── amortisationController.ts
│   ├── models
│   │   └── amortisationModel.ts
│   ├── routes
│   │   └── amortisationRoutes.ts
│   ├── services
│   │   └── amortisationService.ts
│   ├── utils
│   │   └── interestRateAPI.ts
│   ├── app.ts
│   └── server.ts
├── package.json
├── tsconfig.json
├── Dockerfile
├── .gitignore
└── README.md
```

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/hackerman-peter/oh-mortgage-ammortisation.git
   cd oh-mortgage-ammortisation
   npm install
   ```

2. Run the application locally:

   `npm start`

### API Endpoints

POST `/api/amortisation-schedule`
calculates the amortisation schedule

Request Body:

```json
{
  "loanPrincipal": 50000,
  "loanDuration": 15
}
```

Response:

```json
{
  "loanPrincipal": 50000,
  "annualLoanInterestRate": 0.0649,
  "loanTermYears": 15,
  "loanRepayment": 435.28,
  "repaymentFrequency": "Month",
  "schedule": [
    {
      "period": 1,
      "estimatedPayment": 435.28,
      "estimatedInterest": 270.42,
      "estimatedCumulativeInterest": 270.42,
      "estimatedPrincipal": 164.86,
      "estimatedBalance": 49835.14
    },
    ...
  ]
}

```

You may also make the same request to an deployed image of this code on Google Cloud Platform. Service Url being `https://mortgage-amortisation-yvb75nynaq-ts.a.run.app`

```bash
curl -X POST https://mortgage-amortisation-yvb75nynaq-ts.a.run.app/api/amortisation-schedule \
-H "Content-Type: application/json" \
-d '{
  "loanPrincipal": 50000,
  "loanDuration": 15
}'
```

### Testing

To run unit tests:

1. Install Jest:

```bash
npm install --save-dev jest ts-jest @types/jest
```

2. Run the tests:

```bash
npx jest
```
