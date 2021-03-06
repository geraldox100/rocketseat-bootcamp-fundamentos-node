import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import AddBalanceService from '../services/AddBalanceService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    response.json({transactions:transactionsRepository.all(), balance:transactionsRepository.getBalance()})
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const {title, value, type} = request.body;

    const addBalanceService = new AddBalanceService(transactionsRepository);
    addBalanceService.execute({ value, type});

    const createTransactionService = new CreateTransactionService(transactionsRepository);
    const transaction = createTransactionService.execute({title, value, type})
    
    return response.json(transaction);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
