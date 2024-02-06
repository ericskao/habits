import Link from "next/link";

const Header = () => {
  return (
    <nav className="flex justify-between w-full p-3 border-b">
      <Link href="/" className="font-semibold text-xl">
        🗓 CorgiCal
      </Link>
      <div className="flex gap-3">
        <Link href="/profile">Profile</Link>
      </div>
    </nav>
  );
};

export default Header;
