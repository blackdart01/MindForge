import { useState } from "react";
import useDrivePicker from "react-google-drive-picker";

function GoogleDrivePdfSelector() {
    const [openPicker, setOpenPicker] = useDrivePicker();
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleOpenPicker = () => {
        openPicker({
            clientId: "623735642772-r81tft1i58ecnm503kell0np34hdbvi2.apps.googleusercontent.com",
            developerKey: "",
            viewId: "DOCS",
            showUploadView: true,
            showUploadFolders: true,
            supportDrives: true,
            multiselect: true,
            callbackFunction: (data) => {
                if (data.action === "cancel") {
                    console.log("User clicked cancel/close button");
                } else if (data.docs) {
                    console.log(data);
                    setSelectedFiles(data.docs); // Store all file details
                }
            },
        });
    };

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <button onClick={handleOpenPicker} style={{ marginBottom: "20px" }}>
                Open Picker
            </button>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    justifyContent: "center",
                }}
            >
                {selectedFiles.map((file, index) => (
                    <div
                        key={index}
                        style={{
                            border: "1px solid #ccc",
                            padding: "10px",
                            width: "200px",
                            textAlign: "left",
                        }}
                    >
                        <h4 style={{ fontSize: "14px", marginBottom: "10px" }}>
                            {file.name}
                        </h4>
                        <p style={{ fontSize: "12px", marginBottom: "10px" }}>
                            <strong>Type:</strong> {file.mimeType}
                        </p>
                        <a href={file.url} target="_blank" rel="noopener noreferrer">
                            Open File
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GoogleDrivePdfSelector;