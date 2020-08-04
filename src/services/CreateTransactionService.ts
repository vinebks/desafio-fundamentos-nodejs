import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome') {
      if (total < value) {
        throw Error('Your total value is lower than this outcome');
      }
    }

    const criarTransacao = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return criarTransacao;
  }
}

export default CreateTransactionService;
