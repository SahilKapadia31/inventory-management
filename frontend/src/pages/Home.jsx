import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Home</h1>
      <div className="flex space-x-4">
        <Link
          to="/inventory"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Go to Inventory
        </Link>
        <Link
          to="/supplier"
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Go to Supplier
        </Link>
      </div>
    </div>
  );
};

export default Home;
