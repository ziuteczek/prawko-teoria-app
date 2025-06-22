import { Link } from "react-router";

function Page404() {
  return (
    <>
      <p>Error 404</p>
      <Link
        to={{
          pathname: "/",
        }}
      >Dashboard</Link>
    </>
  );
}
export default Page404;
