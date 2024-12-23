"use client";

import React, { useState } from 'react';
import { CreateCategoryDto } from '@/helpers/categories';
import { useCategories } from '../Context/CategoriesContext';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ isOpen, onClose }) => {
  const { addCategory, isLoading } = useCategories();
  
  const [formData, setFormData] = useState<CreateCategoryDto>({
    name: '',
    description: '',
    isExpenseCategory: true
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Manejar el checkbox por separado
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.name.trim()) {
      alert('El nombre de la categoría es obligatorio');
      return;
    }

    try {
      await addCategory(formData);
      // Reiniciar el formulario y cerrar el modal
      setFormData({
        name: '',
        description: '',
        isExpenseCategory: true
      });
      onClose();
    } catch (error) {
      console.error('Error al agregar la categoría', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl mb-4 font-bold">Agregar Nueva Categoría</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">Nombre de la Categoría</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Ingrese el nombre de la categoría"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block mb-2">Descripción (Opcional)</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Ingrese una descripción para la categoría"
              rows={3}
            />
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="isExpenseCategory"
              name="isExpenseCategory"
              checked={formData.isExpenseCategory}
              onChange={handleInputChange}
              className="mr-2"
            />
            <label htmlFor="isExpenseCategory">Es una categoría de gastos</label>
          </div>

          <div className="flex justify-between">
            <button 
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black p-2 rounded hover:bg-gray-400 transition duration-300"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={isLoading}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
            >
              {isLoading ? 'Agregando...' : 'Agregar Categoría'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
