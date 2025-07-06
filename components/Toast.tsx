import React from 'react';
import { Toast as ToastType } from '../types';
import { CheckCircleIcon, XCircleIcon, InfoIcon, XIcon } from './icons';

const icons = {
  success: <CheckCircleIcon className="w-6 h-6 text-green-400" />,
  error: <XCircleIcon className="w-6 h-6 text-red-400" />,
  info: <InfoIcon className="w-6 h-6 text-blue-400" />,
};

const bgColors = {
  success: 'bg-green-500/10 border-green-500/30',
  error: 'bg-red-500/10 border-red-500/30',
  info: 'bg-blue-500/10 border-blue-500/30',
};

const Toast: React.FC<{ toast: ToastType; onDismiss: () => void }> = ({ toast, onDismiss }) => {
  return (
    <div className={`flex items-start gap-4 p-4 rounded-xl border bg-slate-800/80 backdrop-blur-sm shadow-lg animate-fade-in-right ${bgColors[toast.type]}`}>
      <div className="flex-shrink-0 pt-0.5">{icons[toast.type]}</div>
      <div className="flex-1 text-slate-200 text-sm font-medium">{toast.message}</div>
      <button onClick={onDismiss} className="text-slate-400 hover:text-white transition-colors duration-200">
        <XIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Toast;
