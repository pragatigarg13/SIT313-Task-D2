function Projects() {
  return (
    <section id="work" className="Projects">

      <h2 className="text-4xl text-center p-3 text-cyan-700">
        <strong>Here's what I have done so far</strong>
      </h2>

      <div className="Project flex flex-col md:flex-row items-center gap-6">

        <img
          src="/images/bmi calculator.png"
          alt="bmi calculator"
          className="w-full max-w-xs md:w-48 h-32 object-cover"
        />

        <div>

          <h3 className="text-center text-xl md:text-2xl text-rose-800">
            <strong>BMI calculator</strong>
          </h3>

          <p className="text-center text-sm md:text-xl p-4 max-w-2xl mx-auto">
            A simple BMI calculator website that calculates BMI using height and weight
          </p>

          <a
            href="https://github.com/pragatigarg13/BMI-using-TailwindCSS"
            className="text-center text-blue-600 underline block"
          >
            View on GitHub
          </a>

        </div>
      </div>

      <div className="Project flex flex-col md:flex-row items-center gap-6">

        <img
          src="/images/Studentform.png"
          alt="Student form"
          className="w-full max-w-xs md:w-48 h-32 object-cover pt-2"
        />

        <div>

          <h3 className="text-center text-xl md:text-2xl text-rose-800">
            <strong>Student Registration Form</strong>
          </h3>

          <p className="text-center text-sm md:text-xl p-4 max-w-2xl mx-auto">
            A student registration website created using HTML, CSS and JavaScript
          </p>

          <a
            href="https://github.com/pragatigarg13/Student-Registration-Form"
            className="text-center text-blue-600 underline block"
          >
            View on GitHub
          </a>

        </div>
      </div>

      <hr className="w-35 mx-auto my-6 border-t-3 border-cyan-700" />
    </section>
    
  );
}

export default Projects;