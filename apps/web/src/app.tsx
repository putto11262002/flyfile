import { useEffect, useState } from "react";
import client from "./api/client";

function App() {
  const [status, setStatus] = useState<
    | { status: string; isLoading: false }
    | { status?: undefined; isLoading: true }
  >({ isLoading: true });

  useEffect(() => {
    getStatus();
  }, []);

  const getStatus = async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const res = await client.api.health.$get();
    const data = await res.json();
    setStatus({ status: data.status, isLoading: false });
  };

  return (
    <div className="text-center py-4">
      {status.isLoading ? (
        <p className="text-grey-50">Loading...</p>
      ) : (
        <p>
          Server Status{" "}
          <span className="py-1 px-3 bg-gray-200 rounded-md font-medium shadow">
            {status.status}
          </span>
        </p>
      )}
    </div>
  );
}

export default App;
