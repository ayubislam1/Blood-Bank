import axios from "axios";


const axiosSecure = axios.create({
	baseURL: "http://localhost:7000",
});
const useAxiosSecure = () => {
	return axiosSecure;
};

export default useAxiosSecure;
