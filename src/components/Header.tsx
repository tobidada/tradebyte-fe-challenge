const Header = () => {
  return (
    <header>
      <div className="page-max py-4 flex items-center px-4 cursor-pointer">
        <a href="/" aria-label="Go to homepage">
          <i className="pi pi-github" style={{ fontSize: "3rem" }}></i>
          {/*<span>Github Search</span>*/}
        </a>
      </div>
    </header>
  );
};

export default Header;
