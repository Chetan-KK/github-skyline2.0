import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigate(`/${username}`);
  };

  return (
    <div className="bg-purple-950 min-h-screen">
      <h1 className="text-4xl font-bold text-center py-5 text-white">
        Github-Skyline 2.0
      </h1>
      <form
        action=""
        className="flex justify-center items-center flex-col gap-3 mt-9"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter github Username"
          id="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
        />
        <button
          type="submit"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Home;
