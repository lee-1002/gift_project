import { useState } from "react";
import { Link } from "react-router-dom";

const BasicMenu = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header className="bg-white">
      {/* Top bar: Logo + User actions */}
      <div className="container mx-auto flex items-center justify-between py-2 px-4 border-b border-gray-200">
        <div className="flex-shrink-0">
          <Link to="/">
            <img src="/logo3.png" alt="Gifree 로고" className="h-10 w-auto" />
          </Link>
        </div>
        <div className="flex space-x-2 text-sm lg:text-base">
          <Link
            to="/login"
            className="border-2 border-blue-500 text-blue-500 px-3 py-1 rounded-full hover:bg-blue-50"
          >
            로그인 / 회원가입
          </Link>
          <Link
            to="/mypage"
            className="border-2 border-blue-500 text-blue-500 px-3 py-1 rounded-full hover:bg-blue-50"
          >
            장바구니
          </Link>
        </div>
      </div>

      {/* Search row */}
      <div className="container mx-auto px-4 py-2">
        <div className="flex">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="flex-1 bg-gray-100 border border-gray-300 rounded-l-full px-4 py-2 focus:outline-none"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-r-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Category nav */}
      <nav className="bg-gray-100 border-b-2 border-gray-300">
        <div className="container mx-auto px-4 py-2 flex items-center">
          {/* mobile hamburger */}
          <button
            className="sm:hidden bg-teal-400 p-2 rounded mr-2"
            onClick={() => setNavOpen((o) => !o)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* menu items */}
          <ul
            className={`${
              navOpen ? "block" : "hidden"
            } sm:flex flex-wrap justify-center space-x-4`}
          >
            <li>
              <Link
                to="/category"
                className="block py-1 px-2 text-gray-700 font-medium hover:text-blue-500"
              >
                카테고리
              </Link>
            </li>
            <li>
              <Link
                to="/selling"
                className="block py-1 px-2 text-gray-700 font-medium hover:text-blue-500"
              >
                기프티콘 판매
              </Link>
            </li>
            <li>
              <Link
                to="/board"
                className="block py-1 px-2 text-gray-700 font-medium hover:text-blue-500"
              >
                게시판
              </Link>
            </li>
            <li>
              <Link
                to="/recommended"
                className="block py-1 px-2 text-gray-700 font-medium hover:text-blue-500"
              >
                추천 기프티콘
              </Link>
            </li>
            <li>
              <Link
                to={"/map"}
                className="block py-1 px-2 text-gray-700 font-medium hover:text-blue-500"
              >
                우리 동네 기프티콘
              </Link>
            </li>
            <li>
              <Link
                to="/donation"
                className="block py-1 px-2 text-gray-700 font-medium hover:text-blue-500"
              >
                기부
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default BasicMenu;
