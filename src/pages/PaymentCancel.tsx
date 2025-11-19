import { Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";

const PaymentCancel = () => {

  // Google Ads Conversion Tracking
  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: "AW-17738011487/AHbXCNq8ksMbEN-mkopC",
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 grid place-items-center pt-24">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold">Payment canceled</h1>
          <p className="text-muted-foreground">
            You can retry the deposit any time.
          </p>
          <Link
            to="/payments"
            className="text-primary underline-offset-4 hover:underline"
          >
            Try again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;