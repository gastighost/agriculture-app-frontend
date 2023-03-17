import Link from "next/link";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                <Link href="/" className="flex">
                  <div className="border-transparent text-gray-500 hover:text-green-700 hover:border-green-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    <p>Home</p>
                  </div>
                </Link>
                <Link href="/locations/" className="flex">
                  <div className="border-transparent text-gray-500 hover:text-green-700 hover:border-green-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    <p>Locations</p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Link href="/login/">
                <button className="bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Log in
                </button>
              </Link>
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                type="button"
                className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                {/* Heroicon name: menu */}
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
