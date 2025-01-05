import React from 'react';
import { Clock, BookOpen } from 'lucide-react';
import type { School } from '../../types';

interface AssignmentOptionsProps {
  school: School;
  onAssign: () => void;
  onHold: () => void;
  isOnHold: boolean;
}

export function AssignmentOptions({ school, onAssign, onHold, isOnHold }: AssignmentOptionsProps) {
  return (
    <div className="mt-4 flex gap-3">
      <button
        onClick={onAssign}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        <BookOpen className="h-4 w-4" />
        Assign Now
      </button>
      <button
        onClick={onHold}
        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md ${
          isOnHold
            ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
        }`}
      >
        <Clock className="h-4 w-4" />
        {isOnHold ? 'Remove Hold' : 'Put on Hold'}
      </button>
    </div>
  );
}