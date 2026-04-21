import React from "react";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  accentColor?: "purple" | "cyan" | "pink" | "green";
  className?: string;
}

const Section: React.FC<SectionProps> = ({ 
  title, 
  children, 
  accentColor = "purple",
  className = "" 
}) => {
  const accentColors = {
    purple: "bg-purple-600",
    cyan: "bg-cyan-600",
    pink: "bg-pink-600",
    green: "bg-green-600",
  };

  return (
    <section className={`space-y-6 ${className}`}>
      <div className="flex items-center gap-3">
        <div className={`w-1.5 h-6 ${accentColors[accentColor]} rounded-full`}></div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>
      {children}
    </section>
  );
};

export default Section;
