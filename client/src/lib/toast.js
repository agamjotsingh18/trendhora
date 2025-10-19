import toast from 'react-hot-toast';

// A small wrapper to keep toast styles and defaults consistent
export const success = (msg, opts = {}) =>
  toast.success(msg, {
    duration: 3000,
    position: 'top-right',
    style: {
      borderRadius: '8px',
      background: '#ffffff',
      color: '#111827',
      boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
      border: '1px solid rgba(0,0,0,0.04)'
    },
    icon: '✅',
    ...opts,
  });

export const error = (msg, opts = {}) =>
  toast.error(msg, {
    duration: 4000,
    position: 'top-right',
    style: {
      borderRadius: '8px',
      background: '#ffffff',
      color: '#111827',
      boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
      border: '1px solid rgba(0,0,0,0.04)'
    },
    icon: '⚠️',
    ...opts,
  });

export default toast;