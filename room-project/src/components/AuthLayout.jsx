function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      <div className="hidden md:flex flex-col justify-center items-center
      bg-gradient-to-br from-blue-200 -700 text-lightblue p-10">

        <h1 className="text-7xl font-extrabold tracking-wide mb-4">
          Beast House
              💀
        </h1>
        
             <br />
             <br />
             <br />

        <p className="text-lg text-center max-w-sm opacity-90">
         “Don’t compare yourself to others. Compare yourself to the person you were yesterday.”
        </p>
      </div>

      <div className="flex items-center justify-center bg-gray-50">
        <div className="bg-white-50 w-full max-w-md p-8 rounded-2xl shadow-2xl">
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
