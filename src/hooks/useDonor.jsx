import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useDonor = () => {
    const axiosSecure = useAxiosSecure();
	const { user } = useAuth();
	const { data: userOwn = [], refetch } = useQuery({
		queryKey: ["userDonationData",user?.email],
		queryFn: async () => {
			const res = await axiosSecure.get(`/users-donation?email=${user.email}`);
            console.log(res.data)

			return res.data;
           
		},
	});
    return [userOwn];
};

export default useDonor;