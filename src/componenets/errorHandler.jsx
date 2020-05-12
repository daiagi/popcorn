import React from 'react';
import { useHistory } from 'react-router-dom';
import Page404 from './404';


// A context will be the way that we allow components lower down
// the tree to trigger the display of an error page
const ErrorStatusContext = React.createContext();
const LoadingStautsContext = React.createContext();

// The top level component that will wrap our app's core features
export const ErrorHandler = ({ children }) => {
  const history = useHistory();
  const [errorStatusCode, setErrorStatusCode] = React.useState();
  const [loadingStatus, setLoadingStatus] = React.useState(undefined);

  // Make sure to "remove" this status code whenever the user
  // navigates to a new URL. If we didn't do that, then the user
  // would be "trapped" into error pages forever
  React.useEffect(() => {
    // Listen for changes to the current location.
    const unlisten = history.listen(() => setErrorStatusCode(undefined));
    // cleanup the listener on unmount
    return unlisten;
  }, []);

  // This is what the component will render. If it has an
  // errorStatusCode that matches an API error, it will only render
  // an error page. If there is no error status, then it will render
  // the children as normal
  const renderContent = () => {
    if (errorStatusCode === 404) {
      return <Page404 />;
    }

    // ... more HTTP codes handled here

    return children;
  };

  // We wrap it in a useMemo for performance reasons. More here:
  // https://kentcdodds.com/blog/how-to-optimize-your-context-value/
  const errorContextPayload = React.useMemo(
    () => ({ setErrorStatusCode }),
    [setErrorStatusCode]
  );

  const loadingContextPayload = React.useMemo(
    () => ({ loadingStatus, setLoadingStatus }),
    [loadingStatus]
  );
  // We expose the context's value down to our components, while
  // also making sure to render the proper content to the screen
  return (
    <ErrorStatusContext.Provider value={errorContextPayload}>
      <LoadingStautsContext.Provider value={loadingContextPayload}>
        {renderContent()}
      </LoadingStautsContext.Provider>
    </ErrorStatusContext.Provider>
  );
};

// A custom hook to quickly read the context's value. It's
// only here to allow quick imports
export const useErrorStatus = () => React.useContext(ErrorStatusContext);
export const useLoadingStatus = () => React.useContext(LoadingStautsContext);
