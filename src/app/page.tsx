import SearchAddress from "@/components/ui/search-address";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <SearchAddress />
      </div>
    </main>
  );
}
