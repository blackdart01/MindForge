import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { GoogleLogin } from 'react-oauth/google';
import { FilePond, registerPlugin } from 'filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImagePreview);

const clientId = '623735642772-r81tft1i58ecnm503kell0np34hdbvi2.apps.googleusercontent.com';

function GoogleDriveFileViewer() {
    const { register, handleSubmit } = useForm();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [accessToken, setAccessToken] = useState(null);
    const [folderFiles, setFolderFiles] = useState([]);

    useEffect(() => {
        const storedAccessToken = localStorage.getItem('accessToken');
        if (storedAccessToken) {
            setAccessToken(storedAccessToken);
            setIsLoggedIn(true);
            fetchFolderFiles();
        }
    }, []);

    const handleLogin = async (response) => {
        setAccessToken(response.access_token);
        localStorage.setItem('accessToken', response.access_token);
        setIsLoggedIn(true);
        fetchFolderFiles();
    };

    const fetchFolderFiles = async () => {
        try {
            const response = await fetch('https://www.googleapis.com/drive/v3/files', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch files from Google Drive');
            }

            const data = await response.json();
            setFolderFiles(data.files);

        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    return (
        <div>
            {!isLoggedIn && (
                <GoogleLogin
                    clientId={clientId}
                    onSuccess={handleLogin}
                    onError={(error) => console.error(error)}
                />
            )}

            {isLoggedIn && (
                <div>
                    <h3>Files in Google Drive:</h3>
                    <ul>
                        {folderFiles.map((file) => (
                            <li key={file.id}>{file.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default GoogleDriveFileViewer;