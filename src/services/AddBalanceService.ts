import TransactionsRepository from '../repositories/TransactionsRepository';

interface AddBalanceDTO{
    value:number;
    type: "income" | "outcome";
}

class AddBalanceService{

    private transactionRepository:TransactionsRepository;

    constructor(transactionRepository:TransactionsRepository){
        this.transactionRepository = transactionRepository;
    }

    public execute({value,type}:AddBalanceDTO):void{
        const balance = this.transactionRepository.getBalance();
        if(type == "income"){
            balance.income += value;
            balance.total += value;
        }else{
            if(value > balance.total){
                throw Error('dont have enough balance');
            }
            balance.outcome += value;
            balance.total -= value;
        }
    }

}

export default AddBalanceService;