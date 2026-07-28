// ============================================
// UI UTILITIES
// ============================================

const UI = {
    // Show loading spinner
    showLoading(container, message = 'Загрузка...') {
        container.innerHTML = `
            <div class="loading-state">
                <div class="spinner"></div>
                <p>${message}</p>
            </div>
        `;
    },
    
    // Hide loading
    hideLoading(container) {
        const loading = container.querySelector('.loading-state');
        if (loading) loading.remove();
    },
    
    // Show empty state
    showEmptyState(container, icon, title, message, actionText, actionCallback) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">${icon}</div>
                <h3>${title}</h3>
                <p>${message}</p>
                ${actionText ? `<button class="btn btn-primary" onclick="${actionCallback}">${actionText}</button>` : ''}
            </div>
        `;
    },
    
    // Show toast notification
    showToast(message, type = 'info', duration = 5000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <span class="toast-icon">${this.getToastIcon(type)}</span>
            <span class="toast-message">${message}</span>
            <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => this.hideToast(toast), duration);
    },
    
    hideToast(toast) {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    },
    
    getToastIcon(type) {
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };
        return icons[type] || icons.info;
    },
    
    // Show confirmation dialog
    showConfirm(title, message, confirmCallback, cancelCallback) {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.innerHTML = `
            <div class="modal modal-sm">
                <div class="modal-header">
                    <h3 class="modal-title">${title}</h3>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <p>${message}</p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline" id="cancelBtn">Отмена</button>
                    <button class="btn btn-error" id="confirmBtn">Подтвердить</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        document.getElementById('cancelBtn').onclick = () => {
            overlay.remove();
            if (cancelCallback) cancelCallback();
        };
        
        document.getElementById('confirmBtn').onclick = () => {
            overlay.remove();
            if (confirmCallback) confirmCallback();
        };
    },
    
    // Format date
    formatDate(date, format = 'DD.MM.YYYY HH:mm') {
        const d = new Date(date);
        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const year = d.getFullYear();
        const hours = d.getHours().toString().padStart(2, '0');
        const minutes = d.getMinutes().toString().padStart(2, '0');
        
        return format
            .replace('DD', day)
            .replace('MM', month)
            .replace('YYYY', year)
            .replace('HH', hours)
            .replace('mm', minutes);
    },
    
    // Format currency
    formatCurrency(amount, currency = '¥') {
        return `${currency}${amount.toLocaleString()}`;
    },
    
    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

window.UI = UI;
