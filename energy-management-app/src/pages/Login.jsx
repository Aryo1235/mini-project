import { TextInput, Checkbox, Button } from "flowbite-react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/image.jpg')" }}
      ></div>

      {/* Form Section */}
      <div className="relative z-10 flex min-h-screen">
        <div className="w-1/2 bg-gray-200 flex items-center justify-center rounded-e-xl px-12">
          <div className="w-96 flex flex-col items-center justify-center text-center">
            <div className="pb-2">
              <img src="/logo2.png" alt="logo" />
            </div>
            {/* Judul */}
            <h2 className="text-3xl font-bold mb-4 leading-5">
              Selamat Datang Kembali!
            </h2>

            {/* Sub Judul */}
            <p className="text-gray-600 mb-6 leading-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>

            {/* Form */}
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
                <div className="flex items-center">
                  <Checkbox id="remember" color="customBlue" />
                  <label htmlFor="remember" className="text-sm ml-2">
                    Lorem ipsum
                  </label>
                </div>
                <a href="#" className="text-sm text-blue-500 hover:underline">
                  Lorem ipsum?
                </a>
              </div>
              <Button color="customBlue" type="submit" className="w-full">
                Login
              </Button>
            </form>

            {/* Link ke Register */}
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
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
