import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black">
      <Link
        href="https://youtube.com/@pccfreespace"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-6 transition-opacity hover:opacity-80"
      >
        <div className="relative h-40 w-40 overflow-hidden rounded-full sm:h-52 sm:w-52">
          <Image
            src="/pccfs.png"
            alt="PCC Free Space Logo"
            fill
            className="object-cover"
            priority
          />
        </div>
        <h1 className="text-2xl font-light tracking-widest text-zinc-800 dark:text-zinc-200 sm:text-3xl">
          PCC Free Space
        </h1>
      </Link>
    </div>
  );
}
