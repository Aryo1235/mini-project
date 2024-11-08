// ToastNotification.js

import { Toast } from "flowbite-react";
import { HiCheckCircle } from "react-icons/hi";

const ToastNotification = ({ message,}) => {
  return (
    <div className="fixed bottom-5 right-5 z-50">
      <Toast>
        <div className="inline-flex items-center justify-center w-10 h-10 text-green-500 bg-green-100 rounded-lg">
          <HiCheckCircle size={24} />
        </div>
        <div className="ml-3 mr-2 text-sm font-normal">{message}</div>
        <Toast.Toggle />
      </Toast>
    </div>
  );
};

export default ToastNotification;
