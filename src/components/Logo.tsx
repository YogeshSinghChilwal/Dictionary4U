import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="italic font-bold text-xl">
      <Link to={"/"}>Dictionary4U.com</Link>
    </div>
  );
};

export default Logo;
