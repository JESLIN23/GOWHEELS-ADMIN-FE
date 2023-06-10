export const getImageUrl = (image) => {
  return image.url || getLocalFileUrl(image.file);
};

const getLocalFileUrl = (file) => {
  if (!file.size) {
    return;
  }
  return URL.createObjectURL(file);
};
