import React from 'react';
import styles from './ImagePanel.module.css';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CancelIcon from '@mui/icons-material/Cancel';
import { getImageUrl } from '../../helpers/ImageHelper';
import ImageUpload from '../ImageUpload/ImageUpload';

function ImagePanel({ images, addImage, removeImage }) {
  return (
    <div className={styles.layout}>
      <ImageUpload onImageSelected={addImage}/>
      <div>Images</div>
      <ImageList className={styles.imageWrapper} sx={{ minWidth: '100%'}} cols={7} rowHeight={140}>
        {images.map((image) => (
          <ImageListItem key={image.id} className={styles.imageItem}>
            <img
              height="100"
              width="100"
              src={getImageUrl(image)}
              loading="lazy"
            />
            <CancelIcon
              className={styles.cancelIcon}
              onClick={() => {
                removeImage(image.id);
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

export default ImagePanel;
