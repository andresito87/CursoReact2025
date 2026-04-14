import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomLogo } from "@/components/custom/CustomLogo";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "@/auth/store/auth.store";
import { useState, type SubmitEvent } from "react";
import { toast } from "sonner";
import type { AuthErrorResponse } from "@/auth/interfaces/auth.response";

export const RegisterPage = () => {
    const navigate = useNavigate();
    const { register } = useAuthStore();

    const [isRegistering, setIsRegistering] = useState(false);

    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsRegistering(true);

        const formData = new FormData(event.currentTarget);
        const fullName = formData.get("fullName") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            await register(fullName, email, password);
            navigate("/");
        } catch (error) {
            const authError = error as AuthErrorResponse;

            const errorMessage = Array.isArray(authError.message)
                ? authError.message[0]
                : authError.message;

            toast.error(errorMessage || "Error en el registro");
            setIsRegistering(false);
        }
    };

    return (
        <div className={"flex flex-col gap-6"}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <CustomLogo />
                                <p className="text-balance text-muted-foreground">Crear una cuenta</p>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="fullName">Nombre completo</Label>
                                <Input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    placeholder="Tu nombre"
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Correo</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="mail@example.com"
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Contraseña</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="•••••••••"
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full" disabled={isRegistering}>
                                {isRegistering ? "Creando cuenta..." : "Crear cuenta"}
                            </Button>

                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                    O continua con
                                </span>
                            </div>

                            <div className="text-center text-sm">
                                ¿Ya tienes una cuenta?{" "}
                                <Link to="/auth/login" className="underline underline-offset-4">
                                    Ingresar aquí
                                </Link>
                            </div>
                        </div>
                    </form>

                    <div className="relative hidden bg-muted md:block">
                        <img
                            src="/placeholder.svg"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                Haciendo clic para continuar, aceptas nuestros <a href="#">Términos de uso</a> y <a href="#">Políticas de privacidad</a>.
            </div>
        </div>
    );
};