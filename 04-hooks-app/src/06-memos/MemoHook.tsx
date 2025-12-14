import { useCallback, useState } from "react";
import { MyTitle } from "./ui/MyTitle";
import { MySubtitle } from "./ui/MySubtitle";

// Si la función está fuera no se re-renderiza, no necesitamos usar memo
// const handleMyApiCall = (myValue: string) => { 
//     console.log("Llamar a mi API ", myValue);
// };

export const MemoHook = () => {

    const [title, setTitle] = useState('Hola');
    const [subtitle, setSubtitle] = useState('Mundo');

    const handleMyAPIcall = useCallback(() => {
        console.log('Llamar a mi API -', subtitle);
    }, [subtitle]);

    return (
        <div className="bg-gradient flex flex-col gap-4">
            <h1 className="text-2xl font-thin text-white">MemoApp</h1>

            <MyTitle title={title} />

            <MySubtitle subtitle={subtitle} callMyAPI={handleMyAPIcall} />

            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
                onClick={() => setTitle("Hello, " + Date.now().toString())}
            >
                Cambiar título
            </button>

            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
                onClick={() => setSubtitle("World")}
            >
                Cambiar subtítulo
            </button>
        </div>
    );
};
