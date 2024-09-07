function calculateEMI(loanAmount, interestRate, loanTenureMonths) {
  const monthlyRate = interestRate / 12 / 100;
  const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTenureMonths)) / (Math.pow(1 + monthlyRate, loanTenureMonths) - 1);
  return Number(emi.toFixed(2)); 
}

function generateAmortizationSchedule(loanAmount, interestRate, loanTenureMonths, emi, prepayment = 0) {
  let balance = loanAmount;
  const monthlyRate = interestRate / 12 / 100;
  const schedule = [];

  for (let month = 1; month <= loanTenureMonths; month++) {
      const interestPaid = balance * monthlyRate;
      let principalPaid = emi - interestPaid;

      if (month === 1 && prepayment > 0) {
          principalPaid += prepayment;
      }

      balance -= principalPaid;

      if (balance < 0) {
          principalPaid += balance;
          balance = 0;
      }

      schedule.push({
          month,
          emiPaid: Number(emi.toFixed(2)), 
          interestPaid: Number(interestPaid.toFixed(2)),
          principalPaid: Number(principalPaid.toFixed(2)),
          prepayment: month === 1 ? Number(prepayment.toFixed(2)) : 0,
          remainingBalance: Number(balance.toFixed(2)),
      });

      if (balance === 0) break;
  }

  return schedule;
}

  
  module.exports = { calculateEMI, generateAmortizationSchedule };