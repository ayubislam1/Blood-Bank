import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useDonor = () => {
    const axiosSecure = useAxiosSecure();
	const { user } = useAuth();
	const { data: isDonor = [], refetch } = useQuery({
		queryKey: ["userDonationData",user?.email],
		queryFn: async () => {
			const res = await axiosSecure.get(`/all-users/donor/${user.email}`);
            console.log(res.data.isDonor)

			return res.data.isDonor;
           
		},
	});
    return [isDonor];
};

export default useDonor;