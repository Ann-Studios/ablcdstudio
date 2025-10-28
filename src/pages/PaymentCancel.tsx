import { Link } from "react-router-dom";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold">Payment canceled</h1>
        <p className="text-muted-foreground">You can retry the deposit any time.</p>
        <Link to="/payments" className="text-primary underline-offset-4 hover:underline">Try again</Link>
      </div>
    </div>
  );
};

export default PaymentCancel;
