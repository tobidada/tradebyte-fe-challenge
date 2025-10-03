import { UserSearch } from "lucide-react";
import { Link } from "react-router";

const Header = () => {
  return (
    <header>
      <div className="page-max py-4 flex items-center px-4 cursor-pointer">
        <Link to="/" aria-label="Go to homepage">
          <UserSearch size={40} strokeWidth={3} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
