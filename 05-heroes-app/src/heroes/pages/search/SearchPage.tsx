import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs";

export const SearchPage = () => {
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
        </>
    );
};

export default SearchPage;