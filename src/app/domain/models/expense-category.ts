import { ExpenseType } from "./expense-type";

export interface ExpenseCategory {
  id: number;
  descricao: string;
  tiposDespesas: ExpenseType[];
}
