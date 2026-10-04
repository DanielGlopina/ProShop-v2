import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

type ProductRatingProps = {
  value: number;
  text: string;
};

const ProductRating = ({ value, text }: ProductRatingProps) => {
  return (
    <>
      <div className="flex items-center gap-0.5 text-yellow-500">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>
            {value >= i + 1 ? (
              <FaStar />
            ) : value >= i + 0.5 ? (
              <FaStarHalfAlt />
            ) : (
              <FaRegStar />
            )}
          </span>
        ))}
      </div>
      <span className="reating-text">{text && text}</span>
    </>
  );
};

export default ProductRating;
