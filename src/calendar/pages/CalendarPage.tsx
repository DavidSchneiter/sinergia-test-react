import { FunctionComponent } from "react";
import Layout from "../../layout/Layout";

const CalendarPage: FunctionComponent = () => {
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
                <h1>Calendar Page</h1>
                <h2>En construccion</h2>
            </div>
        </Layout>
    );
}
 
export default CalendarPage;