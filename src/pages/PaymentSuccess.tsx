import { useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const session_id = params.get("session_id");
      if (!session_id) return;
      const { data, error } = await supabase.functions.invoke("verify-deposit", {
        body: { session_id },
      });
      if (error) {
        console.error(error);
        return;
      }
      if (data?.paid) {
        localStorage.setItem("consultationDepositPaid", "true");
        navigate("/#ai-consultation", { replace: true });
      }
    };
    verify();
  }, [params, navigate]);

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold">Payment successful</h1>
        <p className="text-muted-foreground">Finalizing your consultation...</p>
        <Link to="/" className="text-primary underline-offset-4 hover:underline">Go home</Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
