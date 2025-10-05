const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="h-28 w-full mt-12 flex justify-center items-center italic text-autumn-700">
      © {currentYear} Git Search
    </footer>
  );
};

export default Footer;
