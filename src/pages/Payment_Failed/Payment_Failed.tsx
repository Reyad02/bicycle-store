import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Payment_Failed = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5); 

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timer = setTimeout(() => {
      navigate("/cart");
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-red-100">
      <h2 className="text-2xl font-semibold text-red-600">❌ Payment Failed</h2>
      <p className="text-lg text-gray-700 mt-2">
        Please check your cart and try again.
      </p>
      <p className="text-sm text-gray-500 mt-1">
        Redirecting to cart in <strong>{countdown} seconds...</strong>
      </p>
    </div>
  );
};

export default Payment_Failed;
