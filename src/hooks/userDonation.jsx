import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const userDonation = () => {
    const axiosSecure = useAxiosSecure();
	
	const { data: userDonationData = [], isLoading,refetch} = useQuery({
		queryKey: ["userDonationData",],
		queryFn: async () => {
			const res = await axiosSecure.get(`/users-donation`);
			return res.data;
		},
	});
    return [userDonationData,isLoading,refetch];
};

export default userDonation;