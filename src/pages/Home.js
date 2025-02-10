import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="container mx-auto mt-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to EventHub</h1>
      <p className="mb-4">Manage your events with ease</p>
      <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded mr-2">
        Login
      </Link>
      <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded">
        Register
      </Link>
    </div>
  )
}

export default Home

