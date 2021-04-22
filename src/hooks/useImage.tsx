import { useMemo, FC } from "react";

import { images, ImageFile } from "../components/ModalImages/images";

export const useImage = (name?: string) => {
  const image = useMemo<ImageFile>(() => {
    const findImageByName = images.find((image) => image.name === name);
    return findImageByName || ({} as ImageFile);
  }, [name]);

  return { image };
};
