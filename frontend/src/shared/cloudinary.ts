import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";

export const cloudinary = (image?: string) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUD_NAME,
    },
  });

  const uwConfig = {
    cloudName: import.meta.env.VITE_CLOUD_NAME,
    uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
    sources: ["local"],
    multiple: false,
    showCompletedButton: true,
    singleUploadAutoClose: false,
    clientAllowedFormats: ["jpg", "jpeg", "png", "webp", "avif"],
    maxImageFileSize: 5000000,
  };

  const myImage = cld.image(image ?? "sample");
  myImage.resize(fill().width(610).height(510));

  return { myImage, uwConfig, cld };
};

