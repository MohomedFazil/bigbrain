import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
  return (
    <div className="py-8 box-container">
      <header className="py-2 bg-white rounded-2xl w-full">
        <nav className="flex justify-center items-center">
          <Link href="#" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Logo"
              width={50}
              height={50}
              className="h-auto"
            />
            <div className="flex flex-col">
              <h3 className="text-blue-400 text-lg">BigBrain</h3>
              <span className="text-sm">by Fazil</span>
            </div>
          </Link>
        </nav>
      </header>
    </div>
  )
}

export default Navbar