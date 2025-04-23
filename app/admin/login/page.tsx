"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEnvelope, FaLock, FaArrowLeft, FaSpinner } from "react-icons/fa";
import RaihanLogo from "@/app/components/admin/RaihanLogo";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store admin info in localStorage
        localStorage.setItem("adminEmail", email);
        localStorage.setItem("adminToken", data.token);
        
        router.push("/admin/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <div className="flex justify-center mb-6">
              <RaihanLogo size="lg" />
            </div>
            
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
              بوابة المشرف
            </h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6b7f3e] focus:border-transparent"
                    placeholder="البريد الإلكتروني"
                  />
                </div>
              </div>
              
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6b7f3e] focus:border-transparent"
                    placeholder="كلمة المرور"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-[#4a5a2b] hover:bg-[#6b7f3e] text-white rounded-md transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin h-5 w-5 mr-2" />
                    جاري تسجيل الدخول...
                  </>
                ) : (
                  "تسجيل الدخول"
                )}
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <Link href="/" className="text-[#4a5a2b] hover:text-[#6b7f3e] flex items-center justify-center">
            <FaArrowLeft className="mr-2" />
            العودة إلى الموقع
          </Link>
        </div>
      </div>
    </div>
  );
} 