
interface InformationBoxProps {
  src: string;
  width?: number | string;
  height?: number | string;
  title: string;
  desc?: string;
}

const InformationBox = ({
  src,
  width = 24,
  height = 24,
  title,
  desc = "",
}: InformationBoxProps) => {
  return (
    <div className="information-box">
      <img src={src} width={width} height={height} alt="" />
      <div className="information-box_info">
        <span className="fy27 title">{title}</span>
        <span className="desc">{desc}</span>
      </div>
    </div>
  );
};

export default InformationBox;
