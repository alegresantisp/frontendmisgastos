"use client";

import React from 'react';
import Header from './Header';
import Cards from './Cards';
import ExpenseList from './ExpenseList';
import AddExpenseForm from './AddExpenseForm';
import { CategoriesProvider } from '../Context/CategoriesContext';
import { ExpensesProvider } from '../Context/ExpensesContext';


const Dashboard: React.FC = () => {
  return (
    <CategoriesProvider>
      <ExpensesProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Cards />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <AddExpenseForm />
              <ExpenseList />
            </div>
          </main>
        </div>
      </ExpensesProvider>
    </CategoriesProvider>
  );
};

export default Dashboard;
