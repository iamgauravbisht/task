import { useEffect, useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [res, setRes] = useState("");
  const [logedIn, setLogedIn] = useState(false);

  const storeToken = (token) => {
    document.cookie = `token=${token}`;
  };

  useEffect(() => {
    if (document.cookie.includes("token")) {
      setLogedIn(true);
    }
  }, [logedIn]);

  async function Signin(email, password) {
    const res = await fetch("http://localhost:3000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    setRes(data.message);
    storeToken(data.token);
    setLogedIn(true);

    console.log(data);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    Signin(email, password);
  };

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    setLogedIn(false);
  };

  return (
    <div className="w-screen min-h-screen justify-center items-center flex flex-row gap-4">
      <div className=" flex flex-col bg-black w-[300px] p-4 text-white">
        <h1 className="text-center w-full">Sign in</h1>
        <label htmlFor=" ">email</label>
        <input
          type="text"
          className="border text-black px-2 py-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="">password </label>
        <input
          type="password"
          className="border text-black px-2 py-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-2  mt-3 rounded-md"
        >
          Submit
        </button>
      </div>
      {logedIn && (
        <div className=" flex flex-col bg-black w-[300px] p-4 text-white">
          <h1 className="text-center w-full">{res}</h1>

          <button
            onClick={handleLogout}
            className="bg-blue-500 text-white p-2  mt-3 rounded-md"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
