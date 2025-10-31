import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import Logo from "../assets/logo.svg";

interface NavbarProps {
  onSearch?: (query: string) => void;
  showSearch?: boolean;
}

export function Navbar({ onSearch, showSearch = false }: NavbarProps) {
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-6">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={Logo} alt="Highway Delite" className="h-12 w-auto mr-3" />
          </div>

          {showSearch && (
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search experiences"
                  className="pl-10 bg-gray-50 border-gray-300 w-full min-w-[140px] sm:min-w-48 lg:min-w-80 focus:ring-2 focus:ring-[#FFD643] focus:border-transparent"
                  onChange={(e) => onSearch?.(e.target.value)}
                />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
              </div>
              <Button className="bg-[#FFD643] hover:bg-[#FFD643] text-black font-medium px-6 py-2">
                <span className="hidden sm:inline">Search</span>
                <Search className="sm:hidden" size={18} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
