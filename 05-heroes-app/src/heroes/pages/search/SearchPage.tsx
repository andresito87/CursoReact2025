import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadcrumbs";
import { useQuery } from "@tanstack/react-query";
import { searchHeroesAction } from "@/heroes/actions/search-heroes.action";
import { useSearchParams } from "react-router";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import type { Hero } from "@/heroes/types/hero.interface";

export const SearchPage = () => {

    // buscamos los parámetros de búsqueda en la url
    const [searchParams] = useSearchParams();
    const name = searchParams.get('name') ?? '';
    const strength = searchParams.get('strength') ?? '';

    // utilizamos tansstack para recuperar los heroes que coinciden con los términos de búsqueda
    const { data: heroes, isLoading, isFetching, isError, error } = useQuery<Hero[]>({
        queryKey: ["search", { name, strength }],
        queryFn: () => searchHeroesAction({ name, strength }),
        staleTime: 1000 * 60 * 5 // 5 minutos
    });

    if (isLoading || isFetching) return <div>Cargando...</div>;

    if (isError) {
        return (
            <div style={{ padding: 12 }}>
                <h3>Error cargando héroes</h3>
                <pre>{String(error)}</pre>
            </div>
        );
    }

    return (
        <>
            {/* Header */}
            <CustomJumbotron
                title="Búsqueda de Superhéroes"
                description="Descubre, explora y administra super héroes y villanos"
            />

            {/* Migas de pan(Breadcrumbs) */}
            <CustomBreadCrumbs
                currentPage="Buscador de héroes"
            // Ejemplo de comportamiento de unas migas de pan de varios niveles de profundidad y como se mostrarían en la interfaz
            // breadcrumbs={[
            //     { label: 'Home', to: '/' },
            //     { label: 'Home2', to: '/' },
            //     { label: 'Home3', to: '/' }
            // ]}
            />

            {/* Stats Dashboard */}
            <HeroStats />

            {/* Filter and search */}
            <SearchControls />

            {
                heroes && (<HeroGrid heroes={heroes} />)
            }

        </>
    );
};

export default SearchPage;