import { RouterProvider } from "react-router-dom";
import Router from "./Routes/Router";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'bg-white text-black dark:bg-gray-800 dark:text-white',
        }}
      />
			<RouterProvider router={Router} />
    </>
	);
}

export default App
