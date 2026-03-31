import { Link } from "react-router";

interface Props {
    subTitle?: string;
}

export const CustomLogo = ({ subTitle = "Shop" }: Props) => {
    return (
        <Link to="/" className="inline-flex items-center gap-2 whitespace-nowrap">
            <span className="font-montserrat text-xl font-bold leading-none">
                Teslo
            </span>

            <span className="leading-none text-xl font-bold">|</span>

            <span className="text-sm leading-none text-muted-foreground self-center">
                {subTitle}
            </span>
        </Link>
    );
};