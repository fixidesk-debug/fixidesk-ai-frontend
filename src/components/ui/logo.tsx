import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  clickable?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "h-8 w-auto",
  md: "h-12 w-auto", 
  lg: "h-16 w-auto"
};

export function Logo({ size = "md", clickable = true, className }: LogoProps) {
  const logoContent = (
    <div className={cn("flex items-center gap-2", className)}>
      <img 
        src="/fixidesk-logo-light.svg"
        alt="FixiDesk - AI-powered customer service"
        className={cn(sizeClasses[size], "block dark:hidden")}
      />
      <img 
        src="/fixidesk-logo-dark.svg"
        alt="FixiDesk - AI-powered customer service"
        className={cn(sizeClasses[size], "hidden dark:block")}
      />
    </div>
  );

  if (clickable) {
    return (
      <Link to="/" className="transition-opacity hover:opacity-80">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}