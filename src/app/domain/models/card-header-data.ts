export interface CardHeaderData {
  type: 'receitas' | 'despesas' | 'saldo';
  value: number;
  route: string;
  new: string;
  tip: string;
}
