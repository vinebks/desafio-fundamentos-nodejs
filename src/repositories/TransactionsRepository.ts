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

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(balance: Balance): Balance {
    this.transactions.map(transaction => {
      if (transaction.type.toUpperCase() === 'INCOME') {
        balance.income += transaction.value;
      } else {
        balance.outcome += transaction.value;
      }

      balance.total = balance.income - balance.outcome;
    });
    return balance;
  }

  public create({ title, value, type }: TransactionsDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    console.log(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
