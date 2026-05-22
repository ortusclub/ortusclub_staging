import Image from "next/image";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
};

export default function PageHero({ eyebrow, title, description, image }: PageHeroProps) {
  return (
    <section className="relative bg-black text-white pt-32 pb-20 px-6 lg:px-12 overflow-hidden">
      {image && (
        <>
          <Image
            src={image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </>
      )}

      <div className="relative z-10 max-w-5xl mx-auto">
        {eyebrow && (
          <div className="text-white/60 text-xs tracking-widest uppercase mb-4">{eyebrow}</div>
        )}
        <h1
          className="text-4xl md:text-6xl leading-tight mb-6"
          style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}
        >
          {title}
        </h1>
        {description && (
          <p className="text-white/80 text-base md:text-lg max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
