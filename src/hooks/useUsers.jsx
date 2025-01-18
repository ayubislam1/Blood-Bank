import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useUsers = () => {
    const axiosSecure = useAxiosSecure();
	const { user } = useAuth();
	const { data: userData = [], refetch } = useQuery({
		queryKey: ["user",user?.email],
		queryFn: async () => {
			const res = await axiosSecure.get(`/all-users?email=${user.email}`);
			return res.data[0];
		},
	});
    return [userData];
};

export default useUsers;