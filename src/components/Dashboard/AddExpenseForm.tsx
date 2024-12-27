"use client";

import React, { useState } from 'react';
import AddCategoryModal from './AddCategoryModal';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useExpenses } from '../Context/ExpensesContext';
import { useCategories } from '../Context/CategoriesContext';
import { CreateExpenseDto } from './types';
import Swal from 'sweetalert2'; // Importa SweetAlert2

const AddExpenseForm: React.FC = () => {
  const { addExpense, isLoading: isExpenseLoading } = useExpenses();
  const { categories } = useCategories();

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [formData, setFormData] = useState<CreateExpenseDto>({
    amount: 0,
    description: '',
    categoryId: 0
  });
  const [categoryError, setCategoryError] = useState<string>(''); // Estado para manejar error de categoría

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      categoryId: Number(value)
    }));
    setCategoryError(''); // Reseteamos el error al seleccionar una categoría
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.description || 
        formData.amount === undefined || 
        formData.amount <= 0 || 
        formData.categoryId === 0) {
      if (formData.categoryId === 0) {
        setCategoryError('Debes seleccionar una categoría.');
      }
      
      // Mostrar alerta con SweetAlert2 en lugar de alert()
      Swal.fire({
        title: 'Error',
        text: 'Por favor, selecciona una categoría para el gasto.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      
      return;
    }
  
    try {
      await addExpense(formData);
      setFormData({
        amount: 0,
        description: '',
        categoryId: 0
      });
    } catch (error) {
      console.error('Error al añadir el gasto', error);
    }
  };

  const expenseCategories = categories.filter(cat => cat.isExpenseCategory);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Añadir Nuevo Gasto</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="description">Descripción</Label>
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Introduce la descripción del gasto"
              required
            />
          </div>

          <div>
            <Label htmlFor="amount">Importe</Label>
            <Input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="Introduce el importe del gasto"
              min="0.01"
              step="0.01"
              required
            />
          </div>

          <div>
            <Label htmlFor="categoryId">Categoría</Label>
            <div className="flex items-center space-x-2">
              <Select onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona" />
                </SelectTrigger>
                <SelectContent>
                  {expenseCategories.map(category => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="button" onClick={() => setIsCategoryModalOpen(true)} variant="outline">
                + Añadir Categoría
              </Button>
            </div>
            {categoryError && <p className="text-red-500 text-sm">{categoryError}</p>}
          </div>

          <Button 
            type="submit" 
            disabled={isExpenseLoading || formData.categoryId === 0} // Deshabilitar si no se selecciona categoría
            className="w-full"
          >
            {isExpenseLoading ? 'Añadiendo...' : 'Añadir Gasto'}
          </Button>
        </form>
      </CardContent>

      <AddCategoryModal 
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
      />
    </Card>
  );
};

export default AddExpenseForm;
