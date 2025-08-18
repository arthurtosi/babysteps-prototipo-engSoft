import { Link, useLocation } from "react-router-dom";

const DashboardHeader = () => {
  const location = useLocation();
  
  const menuItems = [
    { label: "Aulas", path: "/dashboard/aulas" },
    { label: "Simulador", path: "/dashboard/simulador" },
    { label: "Perfil", path: "/dashboard/perfil" },
    { label: "Suporte", path: "/dashboard/suporte" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/dashboard" 
            className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
          >
            BabyStep$
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-foreground/70 hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* Mobile menu button could go here */}
          <button className="md:hidden text-foreground/70 hover:text-primary">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;