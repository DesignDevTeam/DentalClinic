import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main>
        <h1 className="text-slate-700 font-bold -tracking-tighter  ">
          {" "}
          My Next App{" "}
        </h1>
      </main>
    </div>
  );
}
