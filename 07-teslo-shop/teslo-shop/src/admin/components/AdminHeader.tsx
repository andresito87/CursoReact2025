import { useAuthStore } from '@/auth/store/auth.store';
import { Input } from '@/components/ui/input';
import { Search, Bell, MessageSquare, Settings } from 'lucide-react';
import { useRef } from 'react';
import { useSearchParams } from 'react-router';

export const AdminHeader: React.FC = () => {

  const { user } = useAuthStore();

  const [searchParams, setSearchParams] = useSearchParams(); // obtenemos parámetros opcionales de la url

  const inputRef = useRef<HTMLInputElement>(null); // utilizamos ref para evitar rerenders cuando cambia el valor del input cuando el usuario ingrese algo
  const query = searchParams.get('query') || '';

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {

    if (event.key !== 'Enter') return; // sino presionaron el enter, que no haga nada
    const query = inputRef.current?.value;
    const newSearchParams = new URLSearchParams();
    if (!query) {
      // el usuario borró el valor del input, reiniciamos la búsqueda borrando el query param correspondiente
      newSearchParams.delete('query');
    } else {
      // actualizamos el query params de la URL a lo que tenemos como valor en el input después de que el usuario pulsó ENTER
      newSearchParams.set('query', query);
      newSearchParams.delete("page");
    }

    setSearchParams(newSearchParams);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Buscar productos..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              onKeyDown={handleSearch}
              defaultValue={query}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <MessageSquare size={20} />
          </button>

          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings size={20} />
          </button>

          <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:shadow-lg transition-shadow">
            {user?.fullName.substring(0, 2).toLocaleUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
};