export interface Expense {
  id: number;
  amount: number;
  description: string;
  categoryId: number;
  createdAt: string;
  category: Category;
}

// DTO para crear un gasto
export type CreateExpenseDto = {
  amount?: number;
  description: string;
  categoryId: number; // Relacionado con la categoría
};

export interface Category {
  id: number;
  name: string;
  description?: string;
  isExpenseCategory: boolean;
}

