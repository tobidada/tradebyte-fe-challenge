const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="h-28 w-full flex justify-center items-center bg-almond-300 text-almond">
      <div>© {currentYear} Git Search</div>
    </footer>
  );
};

export default Footer;
