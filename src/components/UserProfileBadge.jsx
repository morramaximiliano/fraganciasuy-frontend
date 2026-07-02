import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const UserProfileBadge = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  if (!isAuthenticated || !user) return null;

  const initial = user.firstName ? user.firstName.charAt(0).toUpperCase() : "U";
  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 text-sm text-white hover:border-gray-700 transition-all focus:outline-none"
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white tracking-wider">
            {initial}
          </div>
          <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-gray-950" />
        </div>

        <div className="hidden md:block text-left">
          <p className="text-xs font-semibold text-gray-200">
            {user.firstName}
          </p>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider">
            {user.role}
          </p>
        </div>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 mt-2 w-48 rounded-xl bg-gray-950 border border-gray-800 p-2 shadow-xl z-20 space-y-1">
            <div className="px-3 py-2 border-b border-gray-900">
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>

            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/");
                logout();
              }}
              className="w-full text-left rounded-lg px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </>
      )}
    </div>
  );
};
