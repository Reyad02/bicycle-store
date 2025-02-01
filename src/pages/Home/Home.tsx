import About_Section from "../../components/About_Section/About_Section";
import Hero from "../../components/Hero/Hero";

const Home = () => {
  return (
    <>
      <div>
        <Hero />
      </div>
      <div className="max-w-7xl mx-auto py-20"><About_Section></About_Section></div>
    </>
  );
};

export default Home;
