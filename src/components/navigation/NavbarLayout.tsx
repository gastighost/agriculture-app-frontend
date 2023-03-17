import Navbar from "./Navbar";

const NavbarLayout = ({ children }: any) => {
  return (
    <div>
      <Navbar />
      <div className="mt-16">{children}</div>
    </div>
  );
};

export default NavbarLayout;
