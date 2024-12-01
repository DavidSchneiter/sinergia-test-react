import { FunctionComponent } from "react";
import Layout from "../layout/Layout";
import PersonalList from "./components/PersonalList";
import PersonalForm from "./components/PersonalForm";


const PersonalPage: FunctionComponent = () => {
    
    return (
        <Layout>
            <PersonalList />
            <PersonalForm />
        </Layout>
    );
};

export default PersonalPage;
