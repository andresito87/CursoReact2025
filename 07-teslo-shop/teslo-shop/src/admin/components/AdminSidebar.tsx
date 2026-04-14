import {
  Home,
  Users,
  BarChart3,
  Settings,
  FileText,
  ShoppingCart,
  Bell,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { CustomLogo } from '@/components/custom/CustomLogo';
import { Link, useLocation } from 'react-router';
import { useAuthStore } from '@/auth/store/auth.store';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const AdminSidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggle,
}) => {

  const { user } = useAuthStore();
  const { pathname } = useLocation(); // hook que permite obtener ruta de donde nos encontramos dentro del sitio web

  const menuItems = [
    { icon: Home, label: 'Dashboard', to: '/admin' },
    { icon: BarChart3, label: 'Productos', to: '/admin/products' },
    { icon: Users, label: 'Usuarios' },
    { icon: ShoppingCart, label: 'Órdenes' },
    { icon: FileText, label: 'Reportes' },
    { icon: Bell, label: 'Notificaciones' },
    { icon: Settings, label: 'Ajustes' },
    { icon: HelpCircle, label: 'Ayuda' },
  ];

  const isActiveRoute = (to: string) => {

    if (pathname.includes('/admin/products/') && to === '/admin/products')
      return true;

    return pathname === to;
  };

  return (
    <div
      className={`flex flex-col border-r border-gray-200 bg-white transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'
        }`}
    >
      {/* Header */}
      <div className="flex h-18 items-center justify-between border-b border-gray-200 px-4">
        {!isCollapsed && <CustomLogo subTitle="Admin" />}

        <button
          onClick={onToggle}
          className="rounded-lg p-2 transition-colors hover:bg-gray-100"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <li key={index}>
                <Link
                  to={item.to || '/admin'}
                  className={`flex min-h-10 items-center rounded-lg px-3 py-2 transition-all duration-200 
                    ${isActiveRoute(item.to || '/xxxxx')
                      ? 'border-r-2 border-blue-600 bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } ${isCollapsed ? 'justify-center' : 'gap-3'}`}
                >
                  <span className="flex h-5 w-5 items-center justify-center shrink-0">
                    <Icon size={20} />
                  </span>

                  {!isCollapsed && (
                    <span className="leading-none font-medium">
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      {!isCollapsed && (
        <div className="border-t border-gray-200 p-4">
          <div className="flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-50">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-600 font-semibold text-white">
              {user?.fullName.substring(0, 2).toLocaleUpperCase()}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium leading-none text-gray-900">
                {user?.fullName}
              </p>
              <p className="truncate text-xs text-gray-500">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};