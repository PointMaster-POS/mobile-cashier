const colors = {
    primary: '#00ADB5',
    secondary: '#A6E3E9',
    danger: '#e74c3c',
    warning: '#f39c12',
    success: '#2ecc71',
    info: '#3498db',
    dark: '#393E46',
    light: '#EEEEEE',
};

export const getColor = (colorName) => {
    return colors[colorName] || '#000000'; 
};