import { FunctionComponent } from "react";
import Layout from "../../layout/Layout";

const HomePage: FunctionComponent = () => {
    return (
        <Layout>
            <div
                style={{
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <h1>Home Page</h1>
                <h2>Bienvenido a la Home Page</h2>
            </div>
        </Layout>
    );
};

export default HomePage;
