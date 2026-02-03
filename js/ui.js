// js/ui.js

// Toast Notification System
export function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');

    // Base styles
    let bgColors = 'bg-gray-800';
    let icon = 'ℹ️';

    if (type === 'success') {
        bgColors = 'bg-green-600';
        icon = '✅';
    } else if (type === 'error') {
        bgColors = 'bg-red-500';
        icon = '⚠️';
    }

    toast.className = `flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg shadow-black/20 text-white transform translate-y-10 opacity-0 transition-all duration-300 ${bgColors}`;
    toast.innerHTML = `
        <span class="text-lg">${icon}</span>
        <span class="font-medium text-sm">${message}</span>
    `;

    container.appendChild(toast);

    // Animate In
    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
    });

    // Remove after 3s
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-4');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Confirmation Modal
export function showConfirm(title, message, onConfirm) {
    const modal = document.getElementById('confirmation-modal');
    if (!modal) {
        if (confirm(`${title}\n\n${message}`)) {
            onConfirm();
        }
        return;
    }

    const titleEl = document.getElementById('confirm-title');
    const msgEl = document.getElementById('confirm-message');
    const confirmBtn = document.getElementById('confirm-yes-btn');
    const cancelBtn = document.getElementById('confirm-no-btn');
    const backdrop = document.getElementById('confirm-backdrop');
    const content = document.getElementById('confirm-content');

    titleEl.textContent = title;
    msgEl.textContent = message;

    // Show
    modal.classList.remove('hidden');
    setTimeout(() => {
        backdrop.classList.remove('opacity-0');
        content.classList.remove('opacity-0', 'scale-95');
    }, 10);

    const close = () => {
        backdrop.classList.add('opacity-0');
        content.classList.add('opacity-0', 'scale-95');
        setTimeout(() => modal.classList.add('hidden'), 200);
    };

    // Handlers
    const handleConfirm = () => {
        onConfirm();
        close();
        cleanup();
    };

    const handleCancel = () => {
        close();
        cleanup();
    };

    const cleanup = () => {
        confirmBtn.removeEventListener('click', handleConfirm);
        cancelBtn.removeEventListener('click', handleCancel);
        backdrop.replaceWith(backdrop.cloneNode(true)); // rapid cleanup of backdrop click
        document.getElementById('confirm-backdrop').addEventListener('click', handleCancel); // re-attach clean
    };

    confirmBtn.addEventListener('click', handleConfirm);
    cancelBtn.addEventListener('click', handleCancel);
    backdrop.addEventListener('click', handleCancel);
}
