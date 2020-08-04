import Transaction from '../models/Transaction';

interface TransactionsDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  private balance: Balance = {
    income: 0,
    outcome: 0,
    total: 0,
  };

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.balance;
  }

  public create({ title, value, type }: TransactionsDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    if (type === 'income') {
      this.balance.income += value;
    } else if (type === 'outcome') {
      this.balance.outcome += value;
    }

    this.balance.total = this.balance.income - this.balance.outcome;

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
