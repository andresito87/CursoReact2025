
import { useRef } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomLogo } from "@/components/custom/CustomLogo";

export const CustomHeader = () => {

    const [searchParams, setSearchParams] = useSearchParams(); // obtenemos parámetros opcionales de la url 
    const { gender } = useParams(); // obtenemos el segmento de ruta

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

    return <header className="sticky top-0 z-50 w-full border-b backdrop-blur bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
            <div className="flex h-16 items-center justify-between">
                {/* Logo */}
                <CustomLogo />

                {/* Navigation - Desktop */}
                <nav className="hidden md:flex items-center space-x-8">
                    <Link to="/" className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        !gender ? 'underline underline-offset-4' : ''
                    )}>
                        Todos
                    </Link>
                    <Link to="/gender/men" className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        gender === 'men' ? 'underline underline-offset-4' : ''
                    )}>
                        Hombres
                    </Link>
                    <Link to="/gender/women" className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        gender === 'women' ? 'underline underline-offset-4' : ''
                    )}>
                        Mujeres
                    </Link>
                    <Link to="/gender/kids" className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        gender === 'kids' ? 'underline underline-offset-4' : ''
                    )}>
                        Niños
                    </Link>
                </nav>

                {/* Search and Cart */}
                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex items-center space-x-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                ref={inputRef}
                                placeholder="Buscar productos..."
                                className="pl-9 w-64 h-9 bg-white"
                                onKeyDown={handleSearch}
                                defaultValue={query}
                            />
                        </div>
                    </div>

                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Search className="h-5 w-5" />
                    </Button>

                    <Link to='/auth/login'>
                        <Button variant="default" size="sm" className="ml-2">
                            Login
                        </Button>
                    </Link>

                    <Link to='/admin'>
                        <Button variant="destructive" size="sm" className="ml-2">
                            Admin
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    </header>;
};