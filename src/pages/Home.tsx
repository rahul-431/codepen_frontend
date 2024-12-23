import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <main className="bg-primary h-full w-full p-10 flex flex-col sm:flex-row items-center gap-6">
      <div className="flex flex-col items-start justify-center sm:gap-10 gap-4">
        <h1 className="text-3xl sm:text-4xl md:text-6xl text-white font-extrabold">
          The best place to build, test, and discover front-end code
        </h1>
        <Button className="text-md bg-green-700 hover:bg-green-600" size="lg">
          Sign Up for free
        </Button>
      </div>
      <p className="text-white text-lg">
        CodePen is a social development environment for front-end designers and
        developers. Build and deploy a website, show off your work, build test
        cases to learn and debug, and find inspiration.
      </p>
    </main>
  );
};

export default Home;
