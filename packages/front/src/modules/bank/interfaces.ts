export interface IBank {
  code: string;
  name: string;
  icon: string;
}

export enum BankAccountType {
  current = 'CONTA_CORRENTE',
  savings = 'CONTA_POUPANCA',
  easy = 'CONTA_FACIL',
}
