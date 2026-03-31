import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const SIZES = [
    { id: "xs", label: "XS" },
    { id: "s", label: "S" },
    { id: "m", label: "M" },
    { id: "l", label: "L" },
    { id: "xl", label: "XL" },
    { id: "xxl", label: "XXL" },
] as const;

const VALID_SIZE_IDS = new Set(SIZES.map((size) => size.id));

const PRICES = [
    { value: "any", label: "Cualquier precio" },
    { value: "0-50", label: "$0 - $50" },
    { value: "50-100", label: "$50 - $100" },
    { value: "100-200", label: "$100 - $200" },
    { value: "200+", label: "$200+" },
] as const;

const VALID_PRICES = new Set(PRICES.map((price) => price.value));

// Función que nos crea la cadena con los query params a utilizar en la url
function buildSearch(params: URLSearchParams) {
    const search = params.toString();
    return search ? `?${search}` : "";
}

// Función que nos valida los query params de la url, si alguno tiene inconsistencias los limpia o los resetea a su valor por default
function normalizeSearchParams(input: URLSearchParams) {
    const params = new URLSearchParams(input);

    const normalizedSizes = Array.from(
        new Set(
            (params.get("sizes") ?? "")
                .split(",")
                .map((size) => size.trim().toLowerCase())
                .filter((size) => size.length > 0 && VALID_SIZE_IDS.has(size as (typeof SIZES)[number]["id"]))
        )
    );

    const price = params.get("price");
    const page = params.get("page");

    if (!price || !VALID_PRICES.has(price as (typeof PRICES)[number]["value"])) {
        params.delete("price");
    }

    if (normalizedSizes.length > 0) {
        params.set("sizes", normalizedSizes.join(","));
    } else {
        params.delete("sizes");
    }

    if (!page || !/^\d+$/.test(page) || Number(page) < 1) {
        params.delete("page");
    }

    return params;
}

export const FilterSidebar = () => {

    const [searchParams, setSearchParams] = useSearchParams(); // &viewMode=grid (parametro en la url)
    const navigate = useNavigate();
    const location = useLocation();

    // Validamos los query params de la url
    const normalizedParams = normalizeSearchParams(searchParams);

    // Obtenemos los tamaños actuales y rango de precios del query param
    const currentSizes = normalizedParams.get("sizes")?.split(",").filter(Boolean) ?? []; // &sizes=xs,s,l,xl (parametro en la url)
    const currentPrice = normalizedParams.get("price") ?? "any";  // &price=0-50 (parametro en la url)

    useEffect(() => {
        const current = searchParams.toString();
        const normalized = normalizedParams.toString();

        if (current !== normalized) {
            navigate(
                {
                    pathname: location.pathname,
                    search: buildSearch(normalizedParams),
                },
                { replace: true }
            );
        }
    }, [searchParams, normalizedParams, navigate, location.pathname]);

    const updateParams = (updater: (params: URLSearchParams) => void) => {
        setSearchParams((prev) => {
            const next = normalizeSearchParams(prev);
            updater(next);
            return normalizeSearchParams(next);
        });
    };

    // Creamos un array distinto cada vez que los sizes cambian(añadiendolo o retirandolo del array original) 
    // y actualizamos los parametros de la url
    const handleSizeChanged = (size: string) => {
        updateParams((params) => {
            const sizes = params.get("sizes")?.split(",").filter(Boolean) ?? [];

            const nextSizes = sizes.includes(size)
                ? sizes.filter((s) => s !== size)
                : [...sizes, size];

            params.set("page", "1"); // al cambiar los filtros, queremos navegar a la primera página, actualizamos el parámetro de la url

            if (nextSizes.length > 0) {
                params.set("sizes", nextSizes.join(","));
            } else {
                params.delete("sizes");
            }
        });
    };

    // Ejecutamos este helper cuando el usuario cambia los filtros de precios
    const handlePriceChange = (price: string) => {

        updateParams((params) => {
            params.set("price", price);
            params.set("page", "1"); // al cambiar los filtros, queremos navegar a la primera página, actualizamos el parámetro de la url
        });
    };

    return (
        <div className="w-64 space-y-6">
            <div>
                <h3 className="font-semibold text-lg mb-4">Filtros</h3>
            </div>

            {/* Sizes */}
            <div className="space-y-4">
                <h4 className="font-medium">Tallas</h4>
                <div className="grid grid-cols-3 gap-2">
                    {SIZES.map((size) => (
                        <Button
                            key={size.id}
                            variant={currentSizes.includes(size.id) ? 'default' : 'outline'}
                            size="sm"
                            className="h-8"
                            onClick={() => handleSizeChanged(size.id)}
                        >
                            {size.label}
                        </Button>
                    ))}
                </div>
            </div>

            <Separator />

            {/* Price Range */}
            <div className="space-y-4">
                <h4 className="font-medium">Precio</h4>
                <RadioGroup defaultValue="" className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem
                            value="any"
                            id="priceAny"
                            checked={currentPrice === 'any'}
                            onClick={() => handlePriceChange('any')}
                        />
                        <Label htmlFor="priceAny" className="text-sm cursor-pointer">Cualquier precio</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem
                            value="0-50"
                            id="price1"
                            checked={currentPrice === '0-50'}
                            onClick={() => handlePriceChange('0-50')}
                        />
                        <Label htmlFor="price1" className="text-sm cursor-pointer">$0 - $50</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem
                            value="50-100"
                            id="price2"
                            checked={currentPrice === '50-100'}
                            onClick={() => handlePriceChange('50-100')}
                        />
                        <Label htmlFor="price2" className="text-sm cursor-pointer">$50 - $100</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem
                            value="100-200"
                            id="price3"
                            checked={currentPrice === '100-200'}
                            onClick={() => handlePriceChange('100-200')}
                        />
                        <Label htmlFor="price3" className="text-sm cursor-pointer">$100 - $200</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem
                            value="200+"
                            id="price4"
                            checked={currentPrice === '200+'}
                            onClick={() => handlePriceChange('200+')}
                        />
                        <Label htmlFor="price4" className="text-sm cursor-pointer">$200+</Label>
                    </div>
                </RadioGroup>
            </div>
        </div>
    );
};