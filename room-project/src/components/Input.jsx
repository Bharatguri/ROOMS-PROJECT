// export default function Input({ type = "text", placeholder }) {
//   return (
//     <input
//       type={type}
//       placeholder={placeholder}
//       className="w-full px-4 py-2 border rounded-lg
//       focus:outline-none focus:ring-2 focus:ring-blue-500"
//     />
//   );
// }



import { forwardRef } from "react";

const Input = forwardRef(
  ({ type = "text", placeholder, className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        {...props}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      />
    );
  }
);

export default Input;
