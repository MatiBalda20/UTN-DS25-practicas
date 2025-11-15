import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, clearToken } from '../helpers/auth';

export function useFetch(url, options = {}, { requireAuth = false } = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();

        async function fetchData() {
            setLoading(true);
            setError(null);

            try {
                const token = getToken();
                const headers = {
                    'Content-Type': 'application/json',
                    ...(options.headers || {}),
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                };

                const res = await fetch(url, { 
                    ...options, 
                    headers, 
                    signal: controller.signal 
                });

                // Si requiere auth y hay error 401, limpiar sesión
                if (res.status === 401 && requireAuth) {
                    clearToken();
                    navigate("/login");
                    return;
                }

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || res.statusText);
                }

                const json = await res.json();
                setData(json);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err);
                    console.error('Error en fetch:', err);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchData();

        return () => controller.abort();
    }, [url, requireAuth]);

    return { data, loading, error };
}