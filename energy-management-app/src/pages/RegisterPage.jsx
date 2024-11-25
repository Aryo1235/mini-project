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
      <div className="relative z-10 flex min-h-screen justify-end">
        <div className="w-1/2 bg-gray-200 flex items-center justify-center rounded-s-3xl px-12 dark:bg-gray-800">
          <div className="w-96 flex flex-col items-center justify-center text-center">
            {/* Logo */}
            <div className="pb-2">
              <img src="/logo2.png" alt="logo" />
            </div>

            {/* Judul */}
            <h2 className="text-3xl font-bold mb-4 leading-5 dark:text-white">
              Buat Akun Baru!
            </h2>

            {/* Sub Judul */}
            <p className="text-gray-600 mb-6 leading-5">
              Bergabunglah dengan kami untuk menikmati berbagai layanan
              eksklusif.
            </p>

            {/* Form */}
            <form className="w-full">
              {/* Nama Depan dan Nama Belakang */}
              <div className="flex gap-2 mb-4">
                <TextInput
                  type="text"
                  placeholder="Nama Depan"
                  className="w-1/2"
                  required
                />
                <TextInput
                  type="text"
                  placeholder="Nama Belakang"
                  className="w-1/2"
                  required
                />
              </div>
              {/* Email */}
              <TextInput
                type="email"
                placeholder="Email"
                className="mb-4"
                required
              />
              {/* Password */}
              <TextInput
                type="password"
                placeholder="Password"
                className="mb-4"
                required
              />
              <Button color="customBlue" type="submit" className="w-full">
                Register
              </Button>
            </form>

            {/* Link ke Login */}
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
    </div>
  );
};

export default RegisterUser;
