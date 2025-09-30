import gitHubLogo from '../../public/github-logo.jpg'

const Header = () => {
    return (
        <header className="bg-white">
            <div className="page-max py-4 flex items-center px-4 cursor-pointer">
                <a
                    href="/"
                    aria-label="Go to homepage"
                >
                    <img src={gitHubLogo} alt='logo' className="w-24" />
                </a>
            </div>
        </header>
    )
}

export default Header