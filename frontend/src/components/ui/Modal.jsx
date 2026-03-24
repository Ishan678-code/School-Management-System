/**
 * Modal.jsx - Overlay modal with backdrop blur, close button, scrollable content, optional footer.
 * Centered positioning, responsive sizing, accessible close on backdrop click.
 * Usage: <Modal isOpen={showModal} onClose={setShowModal.bind(null, false)} title="Edit Student">
 *   <TextInput label="Name" />
 * </Modal>
 */

import React from 'react';
import { cn } from '../../lib/utils';

const Modal = ({ isOpen, onClose, title, children, className, footer }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm" onClick={onClose} />
      <div className={cn('fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 max-w-lg w-[95vw] max-h-[90vh] overflow-y-auto', className)}>
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-lg font-bold text-slate-800">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100">
            ✕
          </button>
        </div>
        <div className="space-y-4 mb-6">{children}</div>
        {footer && <div className="pt-4 border-t border-slate-200">{footer}</div>}
      </div>
    </>
  );
};

export { Modal };
