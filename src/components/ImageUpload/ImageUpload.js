import React, { useState } from 'react';
import styles from './ImageUpload.module.css';

import { Button } from '@mui/material';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import { nanoid } from 'nanoid';

function ImageUpload({
  preSelectedImage,
  onImageSelected,
  shouldClearOnSubmit = true,
  autoSubmit = false,
}) {
  const [selectedImage, setSelectedImage] = useState(null);

  const onImageSelectedHandler = (event) => {
    const image = event.currentTarget.files[0];
    setSelectedImage(image);
    if (autoSubmit) {
      onImageSelected(image);
    }
  };

  const onSubmitHandler = (image) => {
    onImageSelected({ file: image, id: nanoid() });
    if (shouldClearOnSubmit) {
      setSelectedImage(null);
    }
  };

  return (
    <div className={styles.uploadWrapper}>
      {selectedImage ? (
        <>
          <div className={styles.uploadSection}>
            <img
              src={URL.createObjectURL(selectedImage) || preSelectedImage}
              alt=""
              className={styles.carImage}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5}}>
            <Button
              variant="contained"
              color="success"
              onClick={() => onSubmitHandler(selectedImage)}
            >
              Add Image
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={() => setSelectedImage(null)}
            >
              Clear Image
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.uploadSection}>
            <BackupOutlinedIcon className={styles.uploadIcon} />
            <span className={styles.message}>Upload the image...</span>
          </div>
          <input
            id="upload-image"
            type="file"
            hidden
            onChange={onImageSelectedHandler}
          />
          <label htmlFor="upload-image" className={styles.uploadBtn}>
            Select Image
          </label>
        </>
      )}
    </div>
  );
}

export default ImageUpload;
