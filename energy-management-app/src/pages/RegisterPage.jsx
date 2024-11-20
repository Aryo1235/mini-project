import { TextInput, Button } from "flowbite-react";
import { Link } from "react-router-dom";
const RegisterUser = () => {
  return (
    <div className="flex min-h-screen">
      {/* Image Section */}
      <div className="w-1/2 bg-gray-100"></div>

      {/* Form Section */}
      <div className="w-1/2 bg-gray-200 flex flex-col justify-center px-12">
        <div className="mb-6">
          <div className="bg-gray-400 w-12 h-12 rounded"></div>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Selamat Datang!</h2>
        <p className="text-gray-600 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <form className="w-full">
          <TextInput
            type="text"
            placeholder="Nama Lengkap"
            className="mb-4"
            required
          />
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
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
        <p className="text-sm mt-4">
          Sudah punya akun?{" "}
          <Link
            to="/loginuser"
            className="text-blue-500 hover:underline font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterUser;
