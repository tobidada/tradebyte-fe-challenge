const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="h-28 w-full flex justify-center items-center bg-black text-white bottom-0 fixed">
            <div>© {currentYear} Git Search</div>
        </footer>
    );
}

export default Footer