// Image
import HeaderImage from '../assets/Daco_4694045.png'

const Header = () => {
    return (
        <header>
            <div className="wrapper headerFlex">
                <h1>Pokédex</h1>
                <img src={HeaderImage} alt="a happy Pikachu waving" />
            </div>
        </header>
    )
}

export default Header;