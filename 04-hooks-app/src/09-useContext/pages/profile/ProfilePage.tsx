import { use } from "react";
import { UserContext } from "@/09-useContext/context/UserContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export const ProfilePage = () => {

    const { user, logout } = use(UserContext);
    const navigation = useNavigate();

    const handleLogout = () => {
        logout();
        navigation('/login');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl">Perfil del usuario</h1>
            <hr />

            <pre className="my-4 w-[40%] overflow-x-auto">{JSON.stringify(user, null, 2)}</pre>

            <Button
                variant='destructive'
                onClick={handleLogout}
            >
                Salir
            </Button>

        </div>
    );
};
