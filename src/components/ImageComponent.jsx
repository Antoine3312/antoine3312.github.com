import { useEffect, useState } from 'react';
import '../assets/ImageComponent.scss';
import useImageData from '../hooks/useImgData';

const ImageComponent = ({ src, alt, rest }) => {
  const [isLoaded, setLoaded] = useState(false);
  const imgData = useImageData(src);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setLoaded(true);
    };
  }, [src]);

  return (
    <img
      src={isLoaded ? src : imgData.placeholder}
      style={{
        aspectRatio: imgData.width / imgData.height || 0,
      }}
      alt={alt}
      {...rest}
    />
  );
};

export default ImageComponent;
