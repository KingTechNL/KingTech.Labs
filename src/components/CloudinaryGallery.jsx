import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/image-gallery.css';

export function isAbsoluteUrl(value) {
  if (!value) {
    return false;
  }

  return value.startsWith('http://') || value.startsWith('https://');
}

export function trimTrailingSlash(value) {
  if (!value) {
    return '';
  }

  return value.endsWith('/') ? value.slice(0, -1) : value;
}

export function trimLeadingSlash(value) {
  if (!value) {
    return '';
  }

  return value.startsWith('/') ? value.slice(1) : value;
}

export function toImageUrl(imageName, baseUrl) {
  if (!imageName) {
    return '';
  }

  if (isAbsoluteUrl(imageName) || imageName.startsWith('/')) {
    return imageName;
  }

  const normalizedBaseUrl = trimTrailingSlash(baseUrl);
  const normalizedImageName = trimLeadingSlash(imageName);
  return normalizedBaseUrl ? normalizedBaseUrl + '/' + normalizedImageName : normalizedImageName;
}

export function toGalleryItems(images, options) {
  const safeImages = images || [];
  const safeOptions = options || {};
  const basePath = safeOptions.basePath || '';
  const originalBaseUrl = safeOptions.originalBaseUrl || '';
  const thumbnailBaseUrl = safeOptions.thumbnailBaseUrl || '';

  return safeImages.map((imageName) => {
    const original = toImageUrl(imageName, originalBaseUrl || basePath);
    const thumbnail = toImageUrl(imageName, thumbnailBaseUrl || originalBaseUrl || basePath);
    return { original, thumbnail };
  });
}

export default function CloudinaryGallery(props) {
  const safeProps = props || {};
  const images = safeProps.images || [];
  const basePath = safeProps.basePath || '';
  const originalBaseUrl = safeProps.originalBaseUrl || '';
  const thumbnailBaseUrl = safeProps.thumbnailBaseUrl || '';
  const lazyLoad = safeProps.lazyLoad !== undefined ? safeProps.lazyLoad : true;

  const items = toGalleryItems(images, {
    basePath,
    originalBaseUrl,
    thumbnailBaseUrl,
  });

  if (!items.length) {
    return null;
  }

  return <><ImageGallery items={items} lazyLoad={lazyLoad} /><br /></>;
}
