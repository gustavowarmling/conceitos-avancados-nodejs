import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request{
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  };

  public execute({title, value, type}: Request): Transaction {
    const balance = this.transactionsRepository.getBalance();

    if (type == "outcome" && value > balance.total)
      throw Error("You don't have enought balance for this transaction!");

    const Transaction = this.transactionsRepository.create({
      title,
      value,
      type
    });

    return Transaction;
  }
}

export default CreateTransactionService;
