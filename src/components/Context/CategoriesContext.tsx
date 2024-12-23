"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getCategories, createCategory, deleteCategory, CreateCategoryDto } from "@/helpers/categories";

interface Category {
  id: number;
  name: string;
  description?: string;
  isExpenseCategory: boolean;
}

interface ApiError {
  message: string;
  statusCode?: number;
}

interface CategoriesContextType {
  categories: Category[];
  addCategory: (category: CreateCategoryDto) => Promise<void>;
  removeCategory: (id: number) => Promise<void>;
  fetchCategories: (isExpenseCategory?: boolean, name?: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

interface CategoriesProviderProps {
  children: ReactNode;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error("useCategories debe ser usado dentro de un CategoriesProvider");
  }
  return context;
};

export const CategoriesProvider: React.FC<CategoriesProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async (isExpenseCategory?: boolean, name?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const categoriesData = await getCategories(isExpenseCategory, name);
      setCategories(categoriesData);
    } catch (err: unknown) {
      const error = err as ApiError;
      setError(`Error al obtener las categorías: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const addCategory = async (category: CreateCategoryDto) => {
    setIsLoading(true);
    setError(null);

    try {
      const newCategory = await createCategory(category);
      setCategories([...categories, newCategory]);
    } catch (err: unknown) {
      const error = err as ApiError;
      setError(`Error al crear la categoría: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const removeCategory = async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      await deleteCategory(id);
      setCategories(categories.filter((category) => category.id !== id));
    } catch (err: unknown) {
      const error = err as ApiError;
      setError(`Error al eliminar la categoría: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CategoriesContext.Provider value={{ categories, addCategory, removeCategory, fetchCategories, isLoading, error }}>
      {children}
    </CategoriesContext.Provider>
  );
};

