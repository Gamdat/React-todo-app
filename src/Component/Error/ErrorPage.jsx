import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <main>
        <section>
                    <div className="">
        <h1> Page Error</h1>
        <p>Something broke while loading</p>
            <pre className="error-code">{error.statusText || error.message}</pre>
        </div>
        </section>
</main>
    )
}

export default ErrorPage;