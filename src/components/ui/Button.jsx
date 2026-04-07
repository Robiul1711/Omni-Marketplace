import React from "react";

const Button = ({ 
  children, 
  className = "", 
  variant = "primary", 
  type = "button",
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center transition-all duration-200 font-host-grotesk active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-[#335cff] text-white hover:bg-[#2849cc] shadow-lg shadow-blue-500/20",
    secondary: "bg-white text-[#171717] border border-gray-200 hover:bg-gray-50",
    outline: "bg-transparent border-2 border-[#335cff] text-[#335cff] hover:bg-[#335cff] hover:text-white",
    ghost: "bg-transparent text-[#525866] hover:bg-gray-100",
  };

  const currentVariant = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      className={`${baseStyles} ${currentVariant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
export { Button };
