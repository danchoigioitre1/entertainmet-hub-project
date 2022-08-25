import "./Header.css"

const Header = () => {
    const goToTop = () => {window.scroll(0,0)}
    return <span onClick={()=>goToTop()} className="header"> Entertainment Hub</span>
}

export default Header