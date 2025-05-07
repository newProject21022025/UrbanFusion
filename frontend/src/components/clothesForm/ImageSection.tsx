import { useState, useRef } from 'react';
import axios from 'axios';
import styles from './ClothesForm.module.css';

interface ImageSectionProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function ImageSection({ formData, handleChange, setFormData }: ImageSectionProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    setIsUploading(true);
    setUploadProgress(0);
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
    formData.append('folder', process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER!);
  
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            setUploadProgress(percentCompleted);
          },
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      setFormData((prev: any) => ({
        ...prev,
        mainImage: {
          ...prev.mainImage,
          url: response.data.secure_url,
        },
      }));
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className={styles.formSection}>
      <h3>Main Image</h3>
      
      <div className={styles.formGroup}>
        <label>Upload Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          ref={fileInputRef}
          disabled={isUploading}
        />
        {isUploading && (
          <div className={styles.progressBar}>
            <div style={{ width: `${uploadProgress}%` }}></div>
          </div>
        )}
      </div>

      <div className={styles.formGroup}>
        <label>Image URL:</label>
        <input
          type="url"
          name="mainImage.url"
          value={formData.mainImage?.url ?? ''}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Alt Text (English):</label>
        <input
          type="text"
          name="mainImage.alt.en"
          value={formData.mainImage?.alt.en ?? ''}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Alt Text (Ukrainian):</label>
        <input
          type="text"
          name="mainImage.alt.uk"
          value={formData.mainImage?.alt.uk ?? ''}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
}


