import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/tesla-bg.jpg"
          alt="Electric Vehicle"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl leading-tight">
          EV Return of Investment Calculator
        </h1>
        <p className="text-xl md:text-2xl text-gray-100 mb-12 drop-shadow-lg max-w-2xl mx-auto">
          Your EV. Your savings. Your break-even date.
        </p>
        <Link
          href="/vehicle-info"
          className="inline-block bg-white text-gray-900 px-12 py-4 rounded-full text-xl font-semibold hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl hover:scale-105 transform duration-300"
        >
          Continue
        </Link>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent z-5" />
    </main>
  );
}
