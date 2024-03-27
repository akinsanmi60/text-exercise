import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import ErrorBoundary from './hooks/errorBoundary';
import Login from './pages/login';
import ViewQuestion from './components/viewQuestion';
import LayoutWrapper from './shared/Layout';
import PrivateRoute from './hooks/privateRoute';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Login />} />
        <Route
          path="/viewquestions/:tab"
          element={
            <PrivateRoute>
              <LayoutWrapper>
                <ViewQuestion />
              </LayoutWrapper>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<>Page Not Found</>} />
      </>,
    ),
  );
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
