export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50">

      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center text-white">

        {/* LOGO */}
        <h1 className="text-2xl tracking-widest font-semibold">
          RAVIZ
        </h1>

        {/* MENU */}
        <ul className="hidden md:flex gap-10 text-sm tracking-wide">
          <li>
            <a href="#about">ABOUT</a>
          </li>

          <li>
            <a href="#collections">COLLECTIONS</a>
          </li>

          <li>
            <a href="#gallery">GALLERY</a>
          </li>

          <li>
            <a href="#contact">CONTACT</a>
          </li>
        </ul>

      </div>

    </nav>
  );
}