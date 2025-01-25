/*

Why a hook for the HTTP requests?
> Because we cannot use hooks in Normal functions (e.g. for fetching results)
> We have GET and POST methods => code duplication


*/

import { useCallback, useState } from "react";

const useHttp = (requestConfig, applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    let response = {};

    try {
      let url = requestConfig ? requestConfig.url : 'https://swapi.dev/api/people/1';
      response = await fetch(url, {
        //method: requestConfig.method ? requestConfig.method : "GET",
        //headers: requestConfig.headers ? requestConfig.headers : {},
       // body: JSON.stringify(requestConfig.body)
       //   ? JSON.stringify(requestConfig.body)
        //  : {},
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, [requestConfig, applyData]);

  return {
    isLoading: isLoading,
    error: error,
    sendRequest: sendRequest,
  };
};
export default useHttp;