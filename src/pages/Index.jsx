import BentoDashboard from "@/components/BentoDashboard";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    const triggerCryptoUpdate = async () => {
      try {
        const response = await fetch("/api/trigger-crypto-update", {
          method: "POST",
        });
        if (!response.ok) {
          throw new Error("Failed to trigger crypto update");
        }
      } catch (error) {
        console.error("Error triggering crypto update:", error);
      }
    };

    triggerCryptoUpdate();
  }, []);
  return <BentoDashboard />;
};

export default Index;
