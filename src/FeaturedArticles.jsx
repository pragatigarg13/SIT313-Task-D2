import ArticleCard from "./ArticleCard";

function FeaturedArticles() {
  const articles = [
    {
      id: 1,
      title: "Introduction to React",
      description: "Learn the basics of React and how to create components.",
      image: "/images/article1.jpg",
      rating: 4.5,
      author: "Rita",
    },
    {
      id: 2,
      title: "Learning JavaScript",
      description: "Understand the basic concepts of JavaScript programming.",
      image: "/images/article2.png",
      rating: 4.6,
      author: "Sanjana",
    },
    {
      id: 3,
      title: "Web Development Basics",
      description: "Learn the basic technologies used to build websites.",
      image: "/images/article3.jpg",
      rating: 4.7,
      author: "Meena",
    },
  ];

  return (
    <section id="articles" className="p-6 bg-gray-50">

      <h2 className="text-4xl text-center p-3 text-cyan-700">
        <strong>Featured Articles</strong>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
          />
        ))}

      </div>

      <div className="text-center p-4">
        <a
            href="#articles"
            className="inline-block bg-cyan-700 text-white px-6 py-2 rounded"
        >
        See all articles
        </a>
      </div>
      <hr className="w-35 mx-auto my-6 border-t-3 border-cyan-700" />
    </section>
  );
}

export default FeaturedArticles;