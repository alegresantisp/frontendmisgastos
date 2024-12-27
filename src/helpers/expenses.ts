const API_URL = 'https://backendmisgastos-2.onrender.com';

export const getExpenses = async (categoryId?: number) => {
    const token = localStorage.getItem("token");
    const query = categoryId ? `?categoryId=${categoryId}` : ""; // Si categoryId está presente, lo añadimos a la query
    const response = await fetch(`${API_URL}/expenses${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error al obtener los gastos");
    }
    return response.json();
  };
  

export const createExpense = async (dto: CreateExpenseDto) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dto),
  });
  if (!response.ok) {
    throw new Error("Error al crear el gasto");
  }
  return response.json();
};

export const deleteExpense = async (id: number) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/expenses/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Error al eliminar el gasto");
  }
  return response.json();
};

  
  // DTO para crear un gasto
  export type CreateExpenseDto = {
    amount: number | null;
    description: string;
    categoryId: number; // Relacionado con la categoría
  };
  