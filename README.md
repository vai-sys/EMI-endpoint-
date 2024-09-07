# EMI Calculator REST API with Prepayment Option

This is a simple REST API built with Node.js and PostgreSQL that calculates EMI (Equated Monthly Installment) for a loan, with the option to include prepayments or extra EMI payments. It also provides a month-wise breakdown of payments.

## Features

* Calculate EMI based on loan amount, interest rate, and loan tenure.
* Option to make prepayments or extra EMI payments and see how they impact the loan.
* Provides a month-wise breakdown of EMI payments.
* Stores the EMI details in a PostgreSQL database.
* REST API with endpoints to calculate EMI and retrieve loan details.

## Technologies Used

* Node.js
* Express.js (for building the REST API)
* PostgreSQL (database)
* Sequelize (ORM for PostgreSQL)
* Postman (for testing)

## Installation

### Prerequisites

* Node.js installed on your system
* PostgreSQL database setup
* Postman (optional, for testing the API)

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/vai-sys/EMI-endpoint-.git
   ```

2. **Navigate to the Project Directory and Install Dependencies**

   ```bash
   cd emi-calculator
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory with the following configuration:

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_pg_username
   DB_PASSWORD=your_pg_password
   DB_NAME=emi_calculator_db
   ```

4. **Create a PostgreSQL Database**

   Open your PostgreSQL client and run the following command:

   ```sql
   CREATE DATABASE emi_calculator_db;
   ```

5. **Run the SQL Script to Create Tables**

   Execute the provided SQL script (`database.sql`) to create the required tables in the database:

   ```bash
   psql -U your_pg_username -d emi_calculator_db -f database.sql
   ```

6. **Run the Application**

   Start the Node.js application:

   ```bash
   npm start
   ```

   The API will be available at `http://localhost:3000`.

## API Endpoints

### POST /api/calculate-emi

Calculates the EMI based on the loan amount, interest rate, and tenure, with the option to include a prepayment.

* **Request Body**:

  ```json
  {
    "loanAmount": 500000,
    "interestRate": 8.5,
    "loanTenureMonths": 60,
    "prepaymentAmount": 20000
  }
  ```

* **Response**:

  ```json
  {
    "loanAmount": 500000,
    "interestRate": 8.5,
    "loanTenureMonths": 60,
    "emi": 10234.65,
    "prepayment": 20000,
    "monthWisePayments": [
      {
        "month": 1,
        "emiPaid": 10234.65,
        "interestPaid": 3541.67,
        "principalPaid": 6692.98,
        "prepayment": 20000,
        "remainingBalance": 473307.02
      }
    ]
  }
  ```

### GET /api/emis

Fetches all EMI records from the database.

* **Response**:

  ```json
  [
    {
      "id": 1,
      "loanAmount": 500000,
      "interestRate": 8.5,
      "loanTenureMonths": 60,
      "emi": 10234.65,
      "prepaymentAmount": 20000,
      "remainingBalance": 466419.07
    }
  ]
  ```

### GET /api/emi/:id

Fetches a specific EMI record by its ID, including the month-wise breakdown of payments.

* **Response**:

  ```json
  {
    "loanAmount": 500000,
    "interestRate": 8.5,
    "loanTenureMonths": 60,
    "emi": 10234.65,
    "prepayment": 20000,
    "monthWisePayments": [...]
  }
  ```

## Testing

You can test the API using Postman by sending requests to the API endpoints mentioned above.

1. Install Postman: https://www.postman.com/
2. Import the API requests (example available in the `/postman_collection.json` file).
3. Make requests to the local server.

## License

This project is licensed under the MIT License.