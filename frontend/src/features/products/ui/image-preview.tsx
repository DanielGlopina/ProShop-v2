import { Image } from "react-bootstrap";
import { cloudinary } from "@/shared/cloudinary";

const ImagePreview = ({ publicId }: { publicId: string }) => {
  return (
    <div
      className="image-preview"
      style={{ width: "800px", margin: "20px auto" }}
    >
      <Image
        style={{ maxWidth: "100%" }}
        src={cloudinary(publicId).myImage.toURL()}
      />
    </div>
  );
};

export default ImagePreview;
