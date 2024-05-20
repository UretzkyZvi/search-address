"use client";
import dynamic from "next/dynamic";
const SearchAddress = dynamic(() => import("@/components/ui/search-address"), {
  ssr: false,
});

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <SearchAddress
          onSelectLocation={(location) => {
            console.log(location);
          }}
        />
      </div>
    </main>
  );
}
