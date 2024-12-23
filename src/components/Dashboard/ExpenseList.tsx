"use client";

import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useExpenses } from '../Context/ExpensesContext';
import { useCategories } from '../Context/CategoriesContext';
import { Pagination } from './Pagination';
import { Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import Swal from 'sweetalert2'; // Importa SweetAlert2

const ITEMS_PER_PAGE = 10;

const ExpenseList: React.FC = () => {
  const { expenses, fetchExpenses, isLoading, error, deleteExpense } = useExpenses();
  const { categories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.createdAt);
    return (
      (selectedCategory === 'all' || expense.category.id === Number(selectedCategory)) &&
      (selectedMonth === 'all' || expenseDate.getMonth() === Number(selectedMonth) - 1) &&
      (selectedYear === 'all' || expenseDate.getFullYear() === Number(selectedYear))
    );
  });

  const totalPages = Math.ceil(filteredExpenses.length / ITEMS_PER_PAGE);
  const paginatedExpenses = filteredExpenses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDeleteExpense = async (id: number) => {
    // Mostrar SweetAlert2 para confirmar eliminación
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Este gasto será eliminado permanentemente!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      // Eliminar el gasto si el usuario confirma
      await deleteExpense(id);
      fetchExpenses();
      Swal.fire(
        'Eliminado',
        'El gasto ha sido eliminado correctamente.',
        'success'
      );
    }
  };

  if (isLoading) return <div className="text-center mt-6">Cargando gastos...</div>;
  if (error) return <div className="text-red-500 text-center mt-6">{error}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Gastos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 mb-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Todas las Categorías" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las Categorías</SelectItem>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Todos los Meses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los Meses</SelectItem>
              {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                <SelectItem key={month} value={month.toString()}>
                  {new Date(2000, month - 1).toLocaleString('es-ES', { month: 'long' })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Todos los Años" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los Años</SelectItem>
              {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descripción</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead className="text-right">Importe</TableHead>
              <TableHead>Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedExpenses.map(expense => (
              <TableRow key={expense.id}>
                <TableCell>{expense.description}</TableCell>
                <TableCell>{expense.category.name || "Categoría Desconocida"}</TableCell>
                <TableCell className="text-right">
                  {expense.amount.toLocaleString('es-ES', { style: 'currency', currency: 'ARG' })}
                </TableCell>
                <TableCell>
                  {new Date(expense.createdAt).toLocaleDateString('es-ES')}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteExpense(expense.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredExpenses.length === 0 && (
          <div className="text-center mt-6 text-gray-500">
            No se encontraron gastos. ¡Añade tu primer gasto!
          </div>
        )}
        <Pagination
          className="mt-4"
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </CardContent>
    </Card>
  );
};

export default ExpenseList;
