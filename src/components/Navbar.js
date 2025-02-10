import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          EventHub
        </Link>
        <div>
          {user ? (
            <>
              <Link to="/dashboard" className="text-white mr-4">
                Dashboard
              </Link>
              <button onClick={logout} className="text-white">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white mr-4">
                Login
              </Link>
              <Link to="/register" className="text-white">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

