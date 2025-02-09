import Button from "@/components/Button";
import LogoImg from "@/assets/nexusLogo.png";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="py-4 px-48 border-b border-white/15 md:border-none sticky top-0 z-10">
      <div className="absolute inset-0 backdrop-blur -z-10 md:hidden"></div>
      <div className="container">
        <div className="flex justify-between items-center md:border border-white/15 md:p-2.5 rounded-xl max-w-2xl mx-auto relative">
          <div className="absolute inset-0 backdrop-blur -z-10 hidden md:block"></div>
          <div>
            <div className="border border-white/15 h-10 w-10 rounded-lg inline-flex justify-center items-center p-1">
              <Image
                src={LogoImg}
                alt="zkLocus Logo"
                width={32}
                height={32}
                priority
                className="object-contain"
              />
            </div>
          </div>
          <div className="hidden md:block">
            <nav className="flex gap-8 text-sm">
              <a
                href="/dashboard"
                className="text-white/70 hover:text-white transition"
              >
                Dashboard
              </a>
              <a
                href="/home"
                className="text-white/70 hover:text-white transition"
              >
                Explore Hack
              </a>
              <a
                href="/groups"
                className="text-white/70 hover:text-white transition"
              >
                Options
              </a>
            </nav>
          </div>
          <div className="flex gap-4 items-center">
            <Button>Try Now!</Button>
            {/* Replace the Menu icon with text or a different icon */}
            <span className="md:hidden text-white text-sm font-semibold">
              Menu
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
