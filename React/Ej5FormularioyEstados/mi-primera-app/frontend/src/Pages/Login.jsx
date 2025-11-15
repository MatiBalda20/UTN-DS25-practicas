import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { setToken } from "../helpers/auth";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch(`${API_BASE_URL}/users/login`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Error en login");
            }

            if (data.success && data.data?.token) {
                setToken(data.data.token);
                navigate("/");
            } else {
                setError(data.message || "Error al iniciar sesión");
            }
        } catch (err) {
            setError(err.message || "Error de conexión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#fcfcfc] p-6">
            <form 
                onSubmit={handleSubmit} 
                className="bg-white shadow-md rounded-lg p-8 w-full max-w-md space-y-4"
            >
                <h2 className="text-2xl font-bold text-center text-black mb-6">
                    Iniciar Sesión
                </h2>

                {/* Error del servidor */}
                {error && (
                    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded text-center">
                        ❌ {error}
                    </div>
                )}

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block font-semibold">Correo Electrónico:</label>
                    <input 
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="w-full border border-gray-300 rounded px-3 py-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password" className="block font-semibold">Contraseña:</label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="w-full border border-gray-300 rounded px-3 py-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                </div>

                {/* Submit */}
                <div className="text-center mt-6">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition disabled:opacity-50 flex items-center justify-center"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Ingresando...
                            </>
                        ) : (
                            "Iniciar Sesión"
                        )}
                    </button>
                </div>

                {/* Link registro */}
                <div className="text-center mt-4">
                    <p className="text-gray-600">
                        ¿No tienes una cuenta?{" "}
                        <Link to="/registro" className="text-blue-500 hover:underline">
                            Regístrate aquí
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}
