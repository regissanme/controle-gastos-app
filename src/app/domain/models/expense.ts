export interface Expense {
  id: number;
  data: string;
  valor: number;
  parcelas: number;
  parcelaAtual?: number;
  descricao?: string;
  tipoPagamentoId: number;
  tipoDespesaId: number;
  userId: number;
}
