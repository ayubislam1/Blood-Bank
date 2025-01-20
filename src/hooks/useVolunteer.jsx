import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useVolunteer = () => {
    const axiosSecure = useAxiosSecure();
	const { user, loading } = useAuth();
	const { data: isVolunteer, isPending } = useQuery({
		queryKey: [user?.email, "isVolunteer"],
		enabled: !loading,

		queryFn: async () => {
			const res = await axiosSecure.get(`/all-users/Volunteer/${user.email}`);
			console.log(res.data);
			return res.data.isVolunteer;
		},
	});
	return [isVolunteer, isPending];
};

export default useVolunteer;