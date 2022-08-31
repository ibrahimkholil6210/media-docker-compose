const MediaCard = ({ media }) => {
  return (
    <div className="MediaCard">
      <img src={media?.src} alt="img" width={"100%"} />
    </div>
  );
};

export default MediaCard;
