function TutorialCard(props) {
  return (
    <article className="border border-gray-300 p-4 rounded-lg shadow-sm hover:shadow-lg transition">
      <img
        src={props.tutorial.image}
        alt={props.tutorial.title}
        className="w-full h-48 object-cover rounded"
      />

      <h3 className="text-xl font-bold p-2 text-cyan-700">
        {props.tutorial.title}
      </h3>

      <p className="p-2">
        {props.tutorial.description}
      </p>

      <p className="p-2">
        Rating: {props.tutorial.rating}/5
      </p>

      <p className="p-2">
        Username: {props.tutorial.username}
      </p>
    </article>
  );
}

export default TutorialCard;