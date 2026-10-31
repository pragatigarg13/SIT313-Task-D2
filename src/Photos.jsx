function Photos() {
  return (
    <section className="My Photos">

      <h3 className="text-4xl text-center p-3 text-cyan-700">
        <strong>My Photos</strong>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">

        <img
          src="/images/nature1.jpg"
          alt="nature1"
          className="w-full h-48 object-cover"
        />

        <img
          src="/images/nature2.jpg"
          alt="nature2"
          className="w-full h-48 object-cover"
        />

        <img
          src="/images/nature3.jpeg"
          alt="nature3"
          className="w-full h-48 object-cover"
        />

        <img
          src="/images/nature4.jpg"
          alt="nature4"
          className="w-full h-48 object-cover"
        />

      </div>
      <hr className="w-35 mx-auto my-6 border-t-3 border-cyan-700" />
    </section>
  );
}

export default Photos;