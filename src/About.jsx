function About() {
  return (
    <>
      <div className="relative group">
        <img
          src="https://images.shiksha.com/mediadata/images/articles/1677833564phpqmRljD.jpeg"
          alt="Deakin University"
          className="w-full h-60 md:h-96"
        />

        <div className="absolute bottom-0 left-0 w-full bg-black text-white text-center p-3 hidden group-hover:block">
          Hey, I'm Pragati
        </div>
      </div>

      <section id="about">
        <img
          src="https://i.pinimg.com/474x/8b/48/ba/8b48bab9a654b1da6e10912db1ca4012.jpg"
          alt="Author"
          className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full object-cover pt-1"
        />

        <p className="text-center text-sm md:text-xl p-4 max-w-2xl mx-auto">
          I am Pragati, a student pursuing a B.E. in Software Engineering.
          I am interested in technology, programming, and developing new
          skills.
        </p>
      </section>
      <hr className="w-35 mx-auto my-6 border-t-3 border-cyan-700" />
    </>
  );
}

export default About;