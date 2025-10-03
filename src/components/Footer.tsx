const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="h-28 w-full mt-12 flex justify-center items-center bg-autumn-600 text-autumn-100">
      <div>© {currentYear} Git Search</div>
    </footer>
  );
};

export default Footer;
