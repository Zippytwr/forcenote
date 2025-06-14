import { Outlet, Link } from "react-router-dom";
import { Header } from "../../../widgets/header/ui/Header";

export default function Layout() {
    return (
        <div>
            <Header />
            <main className="p-4">
                <Outlet />
            </main>
        </div>
    );
}
