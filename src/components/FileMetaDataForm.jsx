import React, { useState } from 'react';
import api from '../services/api';

const FileMetadataForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        uri: '',
        tags: [],
        uploadDate: new Date(),
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: name === 'tags' ? value.split(',') : value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await api.saveDocumentData(formData);
            console.log('File metadata created successfully:', response.data);
        } catch (error) {
            console.error('Error creating file metadata:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="type">Type:</label>
                <input
                    type="text"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="uri">URI:</label>
                <input
                    type="text"
                    id="uri"
                    name="uri"
                    value={formData.uri}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="tags">Tags (comma-separated):</label>
                <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags.join(',')}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default FileMetadataForm;