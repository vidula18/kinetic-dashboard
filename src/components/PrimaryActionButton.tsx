
import { PhoneCall } from 'lucide-react';

interface PrimaryActionButtonProps {
  label: string;
  onClick?: () => void;
}

export function PrimaryActionButton({ label, onClick }: PrimaryActionButtonProps) {
  return (
    <button 
      onClick={onClick}
      className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-bold rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors w-full sm:w-auto"
    >
      <PhoneCall className="w-4 h-4 mr-2" />
      {label}
    </button>
  );
}
