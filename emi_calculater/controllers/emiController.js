const { EMI } = require('../models/index');
const { calculateEMI, generateAmortizationSchedule } = require('../utils/emiCalculater');

exports.calculateEMI = async (req, res) => {
  try {
    const { loan_amount, interest_rate, loan_tenure_months, prepayment_amount = 0 } = req.body;

    const emi = calculateEMI(loan_amount, interest_rate, loan_tenure_months);
    const monthWisePayments = generateAmortizationSchedule(loan_amount, interest_rate, loan_tenure_months, emi, prepayment_amount);

    const emiRecord = await EMI.create({
      loan_amount,
      interest_rate,
      loan_tenure_months,
      emi,
      prepayment_amount,
      remaining_balance: monthWisePayments[monthWisePayments.length - 1].remainingBalance,
    });

    res.status(201).json({
      id: emiRecord.id,
      loanAmount: loan_amount,
      interestRate: interest_rate,
      loanTenureMonths: loan_tenure_months,
      emi,
      prepayment: prepayment_amount,
      monthWisePayments,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllEMIs = async (req, res) => {
  try {
    const emis = await EMI.findAll();
    res.status(200).json(emis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEMIById = async (req, res) => {
  try {
    const emi = await EMI.findByPk(req.params.id);
    if (!emi) {
      return res.status(404).json({ error: 'EMI record not found' });
    }

    const monthWisePayments = generateAmortizationSchedule(
      emi.loan_amount,
      emi.interest_rate,
      emi.loan_tenure_months,
      parseFloat(emi.emi),
      parseFloat(emi.prepayment_amount)
    );

    res.status(200).json({
      ...emi.toJSON(),
      monthWisePayments,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};










