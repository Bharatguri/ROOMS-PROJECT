function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      <div className="hidden md:flex flex-col justify-center items-center
      bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-10">

        <h1 className="text-4xl font-extrabold tracking-wide mb-4">
          CityNest
        </h1>

        <p className="text-lg text-center max-w-sm opacity-90">
          Verified stays & home-style food for students and professionals.
        </p>
      </div>

      <div className="flex items-center justify-center bg-gray-100">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            {title}
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            {subtitle}
          </p>

          {children}
        </div>
      </div>

    </div>
  );
}

export default AuthLayout;
