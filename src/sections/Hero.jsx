export default function Hero() {

  return (

    <section className="relative h-screen w-full overflow-hidden">


      {/* VIDEO BACKGROUND */}

      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute w-full h-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>


      {/* DARK OVERLAY */}

      <div className="absolute inset-0 bg-black/40"></div>


      {/* HERO TEXT */}

      <div className="relative h-full flex flex-col justify-center items-center text-white text-center px-6">

        <h1 className="text-6xl md:text-8xl tracking-widest font-semibold">
         VANVERSE
        </h1>

        <p className="mt-6 text-lg md:text-2xl tracking-wide">
          Crafted for Modern Men
        </p>


        {/* SCROLL TEXT */}

        <div className="absolute bottom-10 text-sm tracking-widest animate-bounce">
          SCROLL
        </div>

      </div>


    </section>

  );

}