import { TextInput, Button } from "flowbite-react";
import { Link } from "react-router-dom";

const RegisterUser = () => {
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/image.jpg')" }}
      ></div>

      {/* Form Section */}
      <div className="relative z-10 flex justify-end min-h-screen">
        <div className="w-2/5 bg-gray-200 flex flex-col justify-center rounded-s-xl px-12">
          <div className="mb-6">
            <div className="bg-gray-400 w-12 h-12 rounded"></div>
          </div>
          <h2 className="text-2xl font-semibold mb-4">Selamat Datang!</h2>
          <p className="text-gray-600 mb-6">
            Buat akun Anda untuk mulai menggunakan layanan kami.
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
    </div>
  );
};

export default RegisterUser;
