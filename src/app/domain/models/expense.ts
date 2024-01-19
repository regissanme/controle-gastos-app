export interface Expense {
  id: number;
  mes: string;
  valor: number;
  descricao?: string;
  tipoPagamentoId: number;
  tipoDespesaId: number;
  userId: number;
}
