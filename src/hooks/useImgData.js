import { useEffect, useMemo, useState } from 'react';
import imagesData from '../imageData.json';

const useImageData = sourceName => {
  const fallback = useMemo(() => ({
    src: sourceName,
    width: 0,
    height: 0,
    placeholder: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJnb3JnZXVyIi8+PC9zdmc+',
  }), [sourceName]);

  const [imgData, setImgData] = useState({ ...fallback });

  useEffect(() => {
    if (!imagesData) return;
    setImgData(imagesData.find(({ src }) => src === sourceName) || { ...fallback });
  }, [sourceName, fallback]);

  return imgData;
};

export default useImageData;
