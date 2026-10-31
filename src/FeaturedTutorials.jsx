import TutorialCard from "./TutorialCard";

function FeaturedTutorials() {
  const tutorials = [
    {
      id: 1,
      title: "Create Your First React Component",
      description: "Learn how to create a simple component in React.",
      image: "/images/tutorial1.png",
      rating: 4.5,
      username: "Ravi",
    },
    {
      id: 2,
      title: "Learn HTML Basics",
      description: "Learn how to use basic HTML tags to build a webpage.",
      image: "/images/tutorial2.jpg",
      rating: 4.6,
      username: "Anu",
    },
    {
      id: 3,
      title: "Getting Started with CSS",
      description: "Learn how CSS can be used to style a simple webpage.",
      image: "/images/tutorial3.png",
      rating: 4.7,
      username: "Raj",
    },
  ];

  return (
    <section id="tutorials" className="p-6 bg-gray-50">

      <h2 className="text-4xl text-center p-3 text-cyan-700">
        <strong>Featured Tutorials</strong>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {tutorials.map((tutorial) => (
          <TutorialCard
            key={tutorial.id}
            tutorial={tutorial}
          />
        ))}

      </div>

      <div className="text-center p-4">
        <a
        href="#tutorials"
        className="inline-block bg-cyan-700 text-white px-6 py-2 rounded"
        >
        See all tutorials
        </a>
      </div>
      <hr className="w-35 mx-auto my-6 border-t-3 border-cyan-700" />

    </section>
  );
}

export default FeaturedTutorials;