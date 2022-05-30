import { FunctionComponent, lazy, Suspense } from "react"
import { Navigate, Outlet, useRoutes } from "react-router-dom"

function Loadable<T extends object = {}>(Component: FunctionComponent<T>) {
  return (props: T) => {
    return (
      <Suspense>
        <Component {...props} />
      </Suspense>
    )
  }
}

const MainPage = Loadable(lazy(() => import("../views/main")))

const Routes = () => {
  return useRoutes([
    {
      path: "/",
      element: <MainPage />,
    },
  ])
}
export default Routes
