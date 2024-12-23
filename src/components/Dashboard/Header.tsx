"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trash2 } from 'lucide-react';
import { useCategories } from '../Context/CategoriesContext';
import { useExpenses } from '../Context/ExpensesContext';

const Header: React.FC = () => {
  const { categories, removeCategory } = useCategories();
  const { expenses } = useExpenses();
  const [showCategories] = useState(false);

  const expensesByCategory = categories.map(category => ({
    ...category,
    totalAmount: expenses
      .filter(expense => expense.categoryId === category.id)
      .reduce((sum, expense) => sum + expense.amount, 0)
  }));

  const handleDeleteCategory = async (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
      await removeCategory(id);
    }
  };

  return (
    <header className="bg-blue-600 text-white p-6 shadow-lg">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4">Panel de Control de Gastos</h1>
        <div className="flex justify-between items-start">
          
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary">Mostrar Categorías</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                {expensesByCategory.map(category => (
                  <DropdownMenuItem key={category.id} className="justify-between">
                    <span>{category.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {showCategories && (
          <Card className="mt-4">
            <CardContent>
              <h2 className="text-xl mb-2 font-semibold">Categorías</h2>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category.id} className="flex justify-between items-center bg-blue-500 rounded p-2">
                    <span>{category.name}</span>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </header>
  );
};

export default Header;

