import type { ReactNode } from "react";

export default function PageHeader({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className="shell pt-12 pb-12 lg:pt-20 lg:pb-16">
      <h1 className="display max-w-4xl text-[2.4rem] font-bold sm:text-[3.4rem] lg:text-[4rem]">
        {title}
      </h1>
      {children ? (
        <div className="mt-6 max-w-2xl text-lg leading-relaxed">{children}</div>
      ) : null}
    </section>
  );
}
