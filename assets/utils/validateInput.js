// validateInput.js

const validateInput = (value, type, options = {}) => {
    switch (type) {
        case 'text':
            return value.trim().length >= 3;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
        case 'picker':
            return value !== null && value !== undefined && value !== '';
        case 'password':
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            return passwordRegex.test(value);
        case 'phone':
            // This regex will validate an international phone number with optional + prefix
            const phoneRegex = /^\+?\d{1,3}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
            const digitsOnly = value.replace(/\D/g, ''); // Remove non-digit characters
            return phoneRegex.test(value) && digitsOnly.length >= 10;
        case 'username':
            const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;
            return usernameRegex.test(value);

        default:
            return false;
    }
};

export default validateInput;