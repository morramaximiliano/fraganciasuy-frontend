import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center px-6">
      <section className="w-full max-w-xl rounded-2xl border border-gray-800 bg-gray-900/70 p-8 text-center shadow-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
          Error
        </p>
        <h1 className="mt-3 text-6xl font-extrabold text-white">404</h1>
        <p className="mt-4 text-lg text-gray-300">
          No encontramos la pagina que buscabas.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Puede que el enlace este roto o que la pagina ya no exista.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700"
        >
          Volver al inicio
        </Link>
      </section>
    </main>
  );
};

export default NotFoundPage;
