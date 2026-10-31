function Footer() {
  return (
    <footer className="bg-cyan-600 p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

      <div>
        <h3 className="text-xl font-bold">Explore</h3>

        <a href="#" className="block">Home</a>
        <a href="#" className="block">Questions</a>
        <a href="#articles" className="block">Articles</a>
        <a href="#tutorials" className="block">Tutorials</a>
      </div>

      <div>
        <h3 className="text-xl font-bold">Support</h3>

        <a href="#" className="block">FAQs</a>
        <a href="#" className="block">Help</a>
        <a href="#contact" className="block">Contact Us</a>
      </div>

      <div>
        <h3 className="text-xl font-bold">Stay Connected</h3>

        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noreferrer"
          className="mr-3"
        >
          Facebook
        </a>

        <a
          href="https://twitter.com"
          target="_blank"
          rel="noreferrer"
          className="mr-3"
        >
          Twitter
        </a>

        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noreferrer"
        >
          Instagram
        </a>
      </div>

      <div className="text-center md:col-span-3">

        <h3 className="font-bold">
          DEV@Deakin 2026
        </h3>

        <a href="#" className="mx-4">
          Privacy Policy
        </a>

        <a href="#" className="mx-4">
          Terms
        </a>

        <a href="#" className="mx-4">
          Code of Conduct
        </a>

      </div>

    </footer>
  );
}

export default Footer;