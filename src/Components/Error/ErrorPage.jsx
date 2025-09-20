import React from "react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  let message= "Unknown error occured";

  if (isRouteErrorResponse(error)) {
    message = error.statusText || "An error occurred";
  } else if (error instanceof Error) {
    message = error.message;
  } else {
    message = "Unknown error occurred";
  }

  return (
    <main>
      <section>
        <div className="error-page">
          <h1>Page Error</h1>
          <p>Something broke while loading</p>
          <pre className="error-code">{message}</pre>
        </div>
      </section>
    </main>
  );
};

export default ErrorPage;



