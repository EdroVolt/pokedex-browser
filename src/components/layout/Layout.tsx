interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function Layout({ children, className = "" }: LayoutProps) {
  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-green-50 to-blue-50 ${className}`}
    >
      <div className="container mx-auto px-4 py-8 max-w-7xl">{children}</div>
    </div>
  );
}
