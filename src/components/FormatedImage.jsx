const FormatedImage = ({ thumbnail, format }) => {
  const { path, extension } = thumbnail;
  return <img src={path + "/" + format + "." + extension} alt="" />;
};

export default FormatedImage;
