import { useEffect, useState } from "react";
import api from "../services/api";
import FileMetadataForm from "./FileMetaDataForm";

const Admin = () => {

    const [responseData, setResponseData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await api.getData();
            setResponseData(response.data);
        } catch (error) {
            setError(error);
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); 

    const renderData = () => {
        if (isLoading) {
            return <p>Loading data...</p>;
        }

        if (error) {
            return <p>Error: {error.message}</p>;
        }

        return responseData.map((item) => (
            <div key={item.id} className="data-item">
                <p>Name: {item.name}</p>
                <p>Type: {item.type}</p>
                <p>URI: <a href={item.uri} target="_blank" rel="noopener noreferrer">{item.uri}</a></p>
                <p>Tags: {item.tags.join(", ")}</p>
                <p>Upload Date: {new Date(item.uploadDate).toLocaleDateString()}</p>
            </div>
        ));
    };


    return (
        <>
            <div className="data-container">
                <FileMetadataForm></FileMetadataForm>
            </div>
        </>
    );
}

export default Admin;