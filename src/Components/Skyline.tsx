import { useParams } from "react-router-dom";

const Skyline = () => {
  const { username } = useParams();

  return <div>{username}</div>;
};

export default Skyline;
