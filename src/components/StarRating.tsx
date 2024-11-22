import StarIcon from "@/assets/img/star.png";
import StarIcon_Gary from "@/assets/img/star_gray.png";

type StarRatingProps = {
  maxStars?: number;
  iconSize?: number;
  isNormal?: boolean;
  gap?: number;
};

const StarRating = ({
  maxStars = 5,
  iconSize = 20,
  isNormal = true,
  gap = 0,
}: StarRatingProps) => {
  return (
    <>
      {Array.from({ length: maxStars }).map((_, index) => (
        <img
          key={index}
          src={isNormal ? StarIcon : StarIcon_Gary}
          style={{
            width: `${iconSize}px`,
            height: `${iconSize}px`,
            // paddingRight: `${gap}px`,
          }}
        />
      ))}
    </>
  );
};

export default StarRating;
