// helpers/categories.ts

const API_URL = 'https://backendmisgastos-2.onrender.com'; // URL base del backend

// Función para obtener todas las categorías
export const getCategories = async (isExpenseCategory?: boolean, name?: string) => {
  const token = localStorage.getItem('token');  // Obtener el token
  const query = new URLSearchParams();
  if (isExpenseCategory !== undefined) query.append('isExpenseCategory', String(isExpenseCategory));
  if (name) query.append('name', name);
  
  const response = await fetch(`${API_URL}/categories?${query.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,  // Usar el token aquí
    },
  });

  if (!response.ok) {
    throw new Error('Error fetching categories');
  }

  return response.json();
};

// Función para crear una nueva categoría
export const createCategory = async (category: CreateCategoryDto) => {
  const token = localStorage.getItem('token');  // Obtener el token
  console.log(token)
  const response = await fetch(`${API_URL}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,  // Usar el token aquí
    },
    body: JSON.stringify(category),
  });

  if (!response.ok) {
    throw new Error('Error creating category');
  }

  return response.json();
};

// Función para obtener una categoría por ID
export const getCategoryById = async (id: number) => {
  const token = localStorage.getItem('token');  // Obtener el token
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,  // Usar el token aquí
    },
  });

  if (!response.ok) {
    throw new Error('Error fetching category');
  }

  return response.json();
};

// Función para actualizar una categoría
export const updateCategory = async (id: number, category: UpdateCategoryDto) => {
  const token = localStorage.getItem('token');  // Obtener el token
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,  // Usar el token aquí
    },
    body: JSON.stringify(category),
  });

  if (!response.ok) {
    throw new Error('Error updating category');
  }

  return response.json();
};

// Función para eliminar una categoría
export const deleteCategory = async (id: number) => {
  const token = localStorage.getItem("token"); // Obtener el token

  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Usar el token aquí
    },
  });

  if (!response.ok) {
    throw new Error("Error eliminando la categoría");
  }

  // Si no se devuelve ningún contenido, no intentes parsear JSON
  return;
};


// DTO para la categoría
export interface CreateCategoryDto {
  name: string;
  description?: string;
  isExpenseCategory: boolean;
}

export interface UpdateCategoryDto {
  name?: string;
  description?: string;
  isExpenseCategory?: boolean;
}
