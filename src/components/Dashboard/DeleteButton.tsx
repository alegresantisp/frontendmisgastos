import { FiTrash2 } from "react-icons/fi";

type DeleteButtonProps = {
  onClick: () => void;
};

export default function DeleteButton({ onClick }: DeleteButtonProps) {
  return (
    <button
      onClick={onClick}
      className="text-red-600 hover:text-red-800 transition-colors"
      aria-label="Eliminar categoría"
    >
      <FiTrash2 size={20} />
    </button>
  );
}
