import { TextInput, Checkbox, Button } from "flowbite-react";
import { Link } from "react-router-dom";
const LoginPage = () => {
  return (
    <div className="flex min-h-screen">
      {/* Form Section */}
      <div className="w-1/2 bg-gray-200 flex flex-col justify-center px-12">
        <div className="mb-6">
          <div className="bg-gray-400 w-12 h-12 rounded"></div>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Selamat Datang Kembali!</h2>
        <p className="text-gray-600 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <form className="w-full">
          <TextInput
            type="email"
            placeholder="Email"
            className="mb-4"
            required
          />
          <TextInput
            type="password"
            placeholder="Password"
            className="mb-4"
            required
          />
          <div className="flex justify-between items-center mb-4">
            <Checkbox id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-sm">
              Lorem ipsum
            </label>
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Lorem ipsum?
            </a>
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <p className="text-sm mt-4">
          Lorem ipsum dolor sit amet?{" "}
          <Link
            to="/registeruser"
            className="text-blue-500 hover:underline font-semibold"
          >
            consectetur
          </Link>
        </p>
      </div>

      {/* Image Section */}
      <div className="w-1/2 bg-gray-100"></div>
    </div>
  );
};

export default LoginPage;
