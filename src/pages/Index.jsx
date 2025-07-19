import BentoDashboard from "@/components/BentoDashboard";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    const triggerCryptoUpdate = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${import.meta.env.VITE_REPO_OWNER}/${
            import.meta.env.VITE_REPO_NAME
          }/dispatches`,
          {
            method: "POST",
            headers: {
              Accept: "application/vnd.github.v3+json",
              Authorization: `token ${import.meta.env.VITE_PAT_TOKEN}`,
            },
            body: JSON.stringify({
              event_type: "website_request",
            }),
          }
        );

        console.log("Response status:", response.status);
        const data = await response.text();
        console.log("Response data:", data);

        if (!response.ok) {
          throw new Error("Failed to trigger workflow");
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
