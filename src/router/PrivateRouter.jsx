import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivateRouter = ({ children }) => {
	const location = useLocation();


	const { user, loading } = useAuth();


	if (loading) {
		return (
			<div className="flex h-screen w-full items-center justify-center">
				<div className="flex flex-col items-center space-y-4">
					<div className="h-8 w-8 animate-spin text-gray-500 dark:text-gray-400" />
					<p className="text-gray-500 dark:text-gray-400">Loading...</p>
				</div>
			</div>
		);
	}
    if (user) {
		return children;
	}

	return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
};

export default PrivateRouter;
