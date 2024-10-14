import Link from 'next/link';

const Navigation = () => {
  return (
    <nav className="bg-black text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link href="/movies" className="hover:underline">
            Movies
          </Link>
        </li>
        <li>
          <Link href="/tvshows" className="hover:underline">
            TV Shows
          </Link>
        </li>
        <li>
       </li>
      </ul>
    </nav>
  );
};

export default Navigation;