import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import './layout.css'

interface LayoutInterface {
    children: React.ReactNode;
}
// Layout para toda la main page
const Layout: FunctionComponent<LayoutInterface> = ({children}) => {
    return (
        <div className="layout">
            <aside className="sidebar" style={{ display: "flex" }}>
                <nav>
                    <Link to="/" className="sidebar-link">
                        <img src="./home.png" alt="Inicio" />
                    </Link>

                    <Link to="/personal" className="sidebar-link">
                        <img src="./group.png" alt="Usuarios" />
                    </Link>

                    <Link to="/calendar" className="sidebar-link">
                        <img src="./calendar.png" alt="Calendario" />
                    </Link>
                </nav>
            </aside>
            <main style={{ display:'flex', padding: "20px", width: "70vw",  }}>
                {children}
            </main>
        </div>
    );
};

export default Layout;
