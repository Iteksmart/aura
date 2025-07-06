import React from 'react';
import { Toast as ToastType } from '../types';
import Toast from './Toast';

interface ToastContainerProps {
  toasts: ToastType[];
  setToasts: React.Dispatch<React.SetStateAction<ToastType[]>>;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, setToasts }) => {
  const handleDismiss = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <div className="fixed top-5 right-5 z-50 space-y-3 w-96">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onDismiss={() => handleDismiss(toast.id)} />
      ))}
    </div>
  );
};

export default ToastContainer;
