import logout from "@/handlers/logout";
import Button from "../Button/Button";

export default function Header() {
    return <>
        <header>
            <nav>
                <span>BeeWeb</span>
                <Button variant="first" text="Log Out" onClick={() => logout()}/>
            </nav>
        </header>
    </>
}