import { Navigate, useLocation } from "react-router";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";




const AdminRoute = ( {children} ) => {
	const [isAdmin, isPending] = useAdmin();
	const location = useLocation();

	const { user, loading } = useAuth();
	if (loading || isPending) {
		return <div>Loading....</div>;
	}
	if (user && isAdmin) {
		return children;
	}
	return <Navigate to={"/"} state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
