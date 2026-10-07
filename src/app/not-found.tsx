import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="flex items-center gap-2 text-sm font-semibold text-faulted">
        <span className="h-2 w-2 rounded-full bg-faulted" aria-hidden />
        Connector not found
      </p>
      <h1 className="display mt-4 max-w-2xl text-[2.4rem] font-bold sm:text-[3.2rem]">
        There&apos;s no page at this address.
      </h1>
      <p className="mt-5 max-w-lg text-lg leading-relaxed">
        The link may be old or mistyped. Start again from the home page, or
        tell us what you were looking for.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="rounded-xl bg-ink px-5 py-3 font-semibold text-white hover:bg-volt">
          Go to the home page
        </Link>
        <Link href="/contact" className="rounded-xl px-5 py-3 font-semibold text-ink ring-1 ring-line-strong hover:ring-ink">
          Contact us
        </Link>
      </div>
    </section>
  );
}
