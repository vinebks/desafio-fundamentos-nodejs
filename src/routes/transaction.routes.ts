import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import Transaction from '../models/Transaction';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (_request, response) => {
  try {
    const balance: { income: number; outcome: number; total: number } = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    const totalResult = [
      transactionsRepository.all(),
      transactionsRepository.getBalance(balance),
    ];

    return response.json(totalResult);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const newTransaction: Transaction = transactionsRepository.create({
      title,
      value,
      type,
    });

    const createTransaction = new CreateTransactionService(newTransaction);

    return response.json(createTransaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
