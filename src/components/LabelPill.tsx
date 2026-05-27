
import type { LabelColor } from '../data/labelConfig';

interface LabelPillProps {
  color: LabelColor;
  children: React.ReactNode;
  className?: string;
}

export function LabelPill({ color, children, className = '' }: LabelPillProps) {
  const colorStyles = {
    green: 'bg-green-100 text-green-700 border-green-200',
    orange: 'bg-orange-100 text-orange-700 border-orange-200',
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    gray: 'bg-gray-100 text-gray-700 border-gray-200',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorStyles[color]} ${className}`}>
      {children}
    </span>
  );
}
