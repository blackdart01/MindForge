import { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';

const PdfViewer = ({ url }) => {
    const [pdfData, setPdfData] = useState(null);

    const fetchPdf = async () => {
        console.log("url==", url);
        
        try {
            const response = await fetch(`http://localhost:8090/api/short/report?url=${url}`);
            // const response = await fetch(`${url}`);
            console.log("response -> ", response);
            
            const blob = await response.blob();
            const pdfUrl = URL.createObjectURL(blob);

            setPdfData(pdfUrl);
        } catch (error) {
            console.error("Error fetching PDF:", error);
        }
    };

    useEffect(() => {
        fetchPdf();
    }, [url]);


    return (
        <div>
            {url && (
                // <iframe
                //     src={url}
                //     title="PDF Viewer"
                //     width="800"
                //     height="600"
                // />
                <Document file={pdfData}>
                    <Page>
                    </Page>
                </Document>
            )}
        </div>
    );
};

export default PdfViewer;