
import { PhoneCall } from 'lucide-react';

interface PrimaryActionButtonProps {
  label: string;
  onClick?: () => void;
  isDestructive?: boolean;
}

export function PrimaryActionButton({ label, onClick, isDestructive }: PrimaryActionButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-bold rounded-lg shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors w-full sm:w-auto ${
        isDestructive 
          ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' 
          : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
      }`}
    >
      <PhoneCall className="w-4 h-4 mr-2" />
      {label}
    </button>
  );
}
