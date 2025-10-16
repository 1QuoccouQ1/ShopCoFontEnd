export const API_URL = 'http://localhost:1337/api';

export async function fetchAPI(endpoint, method = 'GET', body = null) {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
    });
    return response.json();
}