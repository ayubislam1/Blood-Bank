import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
	const axiosSecure = useAxiosSecure();
	const { user, loading } = useAuth();
	const { data: isAdmin, isPending } = useQuery({
		queryKey: [user?.email, "isAdmin"],
		enabled: !loading,

		queryFn: async () => {
			const res = await axiosSecure.get(`/all-users/admin/${user.email}`);
			
			return res.data.isAdmin;
		},
	});
	return [isAdmin, isPending];
};

export default useAdmin;
