import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const filterIcome = this.transactions.filter(
      item => item.type === 'income',
    );
    const filterOutcome = this.transactions.filter(
      item => item.type === 'outcome',
    );

    const percorreIcome =
      filterIcome.length > 0 ? filterIcome.map(item => item.value) : false;
    const percorreOutcome =
      filterOutcome.length > 0 ? filterOutcome.map(item => item.value) : false;

    const somaIncome = percorreIcome
      ? percorreIcome.reduce((accum, cur) => accum + cur)
      : 0;
    const somaOutcome = percorreOutcome
      ? percorreOutcome.reduce((accum, cur) => accum + cur)
      : 0;

    const total = somaIncome - somaOutcome;

    const object = {
      income: somaIncome,
      outcome: somaOutcome,
      total,
    };

    return object;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
