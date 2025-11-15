export function getToken() {
    return localStorage.getItem("token");
}

export function setToken(token) {
    localStorage.setItem("token", token);
}

export function clearToken() {
    localStorage.removeItem("token");
}

export function getUserFromToken() {
    const token = getToken();
    if (!token) return null;
    
    try {
        // Decodificar el payload del JWT (segunda parte)
        const payload = JSON.parse(atob(token.split('.')[1]));
        return {
            id: payload.id,
            email: payload.email,
            role: payload.role
        };
    } catch (error) {
        console.error('Error decodificando token:', error);
        return null;
    }
}

export function isAuthenticated() {
    return !!getToken();
}

export function isAdmin() {
    const user = getUserFromToken();
    return user?.role === 'ADMIN';
}