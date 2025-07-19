export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${process.env.REPO_OWNER}/${process.env.REPO_NAME}/dispatches`,
      {
        method: "POST",
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `token ${process.env.PAT_TOKEN}`,
        },
        body: JSON.stringify({
          event_type: "website_request",
        }),
      }
    );

    if (response.ok) {
      res.status(200).json({ message: "Crypto tracker update triggered" });
    } else {
      throw new Error("Failed to trigger workflow");
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Failed to trigger crypto tracker update" });
  }
}
