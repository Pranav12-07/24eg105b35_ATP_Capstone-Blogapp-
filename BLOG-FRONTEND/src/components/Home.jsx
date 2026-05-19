import { Link } from "react-router-dom";
import { headingClass, primaryBtn, secondaryBtn } from "../styles/common";

function Home() {
  return (
    <main className="py-16">
      <section className="max-w-3xl">
        <h1 className="text-5xl font-bold text-[#2f2f2f] tracking-tight leading-tight mb-5">
          A simple space for thoughtful articles.
        </h1>
        <p className="text-[#6f6f6f] leading-relaxed mb-8">
          Discover fresh ideas from writers, publish your own posts, and keep your articles organized in one clean place.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link to="/register" className={primaryBtn}>
            Start writing
          </Link>
          <Link to="/login" className={secondaryBtn}>
            Login
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
