export interface CardHeaderData {
  type: 'receitas' | 'despesas' | 'saldo';
  value: string;
  route: string;
  new: string;
  tip: string;
}
