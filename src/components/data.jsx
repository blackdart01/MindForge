import { useEffect, useState } from "react";
import api from "../services/api";
import PdfViewer from "./pdfViewer";
import PDFInlineView from "./PDFInlineView";

const Data = () => {

    const [responseData, setResponseData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [openDoc, setOpenDoc] = useState(false);


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

    // const updateOpenStateDoc = () => {
    //     setOpenDoc(!openDoc);
    // }

    const updateOpenStateDoc = (itemId) => {
        // Update the openState property for the specific item using itemId
        setResponseData(responseData.map((item) =>
            item.id === itemId ? { ...item, openState: !item.openState } : item
        ));
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
                {isLoading ? (
                    <p>Loading data...</p>
                ) : error ? (
                    <p>Error: {error.message}</p>
                ) : (
                    responseData.map((item) => (
                        <div key={item.id} className="data-item">
                            <p>Name: {item.name}</p>
                            <p>Tags: {item.tags.join(', ')}</p>
                            <button onClick={() => updateOpenStateDoc(item.id)}
                                // onClick={() => {
                                //     window.location.hash = '';
                                //     window.open(item.uri, '_blank', 'noopener noreferrer');
                                // }}
                            >
                                {!item.openState && "Open URI"}
                            </button>
                            {item.openState && <PDFInlineView url={item.uri}></PDFInlineView>}
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default Data;