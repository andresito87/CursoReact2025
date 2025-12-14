import { memo } from "react";

interface Props {
    subtitle: string;

    // callMyApi: (myValue: string) => void; // evitar re-renders pasando funcion con un parámetro y memorizar
    callMyAPI: () => void;
}

export const MySubtitle = memo((
    { subtitle,
        // callMyApi,
        callMyAPI
    }: Props) => {

    console.log("My subtitle re-render");

    return (
        <>
            <h6 className="text-2xl font-bold">{subtitle}</h6>

            <button
                className="bg-indigo-500 text-white px-2 py-1 rounded-md cursor-pointer"
                // onClick={() => callMyApi(subtitle)}
                onClick={callMyAPI}
            >
                Llamar a función
            </button>
        </>
    );
});
