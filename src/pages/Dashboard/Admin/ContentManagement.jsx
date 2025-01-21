import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import { useNavigate } from "react-router";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAdmin from "../../../hooks/useAdmin";

const ContentManagement = () => {
	const [filter, setFilter] = useState("all");
	const navigate = useNavigate();
	const axiosPublic = useAxiosPublic();
	const [isAdmin] = useAdmin();
	const {
		data: blogs,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["all-blogs"],
		queryFn: async () => {
			const res = await axiosPublic.get("/blogs");
			return res.data;
		},
	});

	const filteredBlogs =
		filter === "all" ? blogs : blogs?.filter((blog) => blog.status === filter);

	const handlePublish = async (id) => {
		try {
			await axiosPublic.patch(`/blogs/${id}/publish`);
			refetch();
		} catch (error) {
			console.error("Error publishing blog:", error);
		}
	};

	const handleUnpublish = async (id) => {
		try {
			await axiosPublic.patch(`/blogs/${id}/unpublish`);
			refetch();
		} catch (error) {
			console.error("Error unpublishing blog:", error);
		}
	};

	const handleDelete = async (id) => {
		try {
			const result = await Swal.fire({
				title: "Are you sure?",
				text: "You won't be able to revert this!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#d33",
				cancelButtonColor: "#3085d6",
				confirmButtonText: "Yes, delete it!",
			});

			if (result.isConfirmed) {
				await axiosPublic.delete(`/blogs/${id}`);
				Swal.fire("Deleted!", "Your blog has been deleted.", "success");
				refetch();
			}
		} catch (error) {
			console.error("Error deleting blog:", error);
			Swal.fire("Error", "There was an error deleting the blog.", "error");
		}
	};

	return (
		<div className="p-6 pl-10 min-h-screen">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold text-red-700">Content Management</h1>
				<Button
					onClick={() => navigate("/dashboard/add-blog")}
					className="bg-red-600 text-white hover:bg-red-700"
				>
					Add Blog
				</Button>
			</div>

			<Select onValueChange={setFilter} value={filter}>
				<SelectTrigger className="w-48 border-red-600">
					<SelectValue placeholder="Filter Blogs" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">All</SelectItem>
					<SelectItem value="draft">Draft</SelectItem>
					<SelectItem value="published">Published</SelectItem>
				</SelectContent>
			</Select>

			{isLoading ? (
				<div className="text-red-700 mt-6">Loading blogs...</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
					{filteredBlogs?.map((blog) => (
						<Card
							key={blog._id}
							className="bg-white shadow-md rounded-lg border border-red-300 flex flex-col"
						>
							<CardHeader className="p-4 border-b border-red-200">
								<h2 className="text-xl font-bold text-red-700">{blog.title}</h2>
								<p className="text-gray-700">Status: {blog.status}</p>
							</CardHeader>

							<div className="p-4 flex-1 flex flex-col">
								<img
									src={blog.thumbnail}
									alt={blog.title}
									className="w-full h-44 object-cover rounded-md mb-4"
								/>
								<div
									className="overflow-y-auto h-24"
									style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
									dangerouslySetInnerHTML={{
										__html: `${blog.content}`,
									}}
								/>
							</div>

							<CardFooter className="flex flex-wrap justify-between items-center p-4 border-t border-red-200 gap-2">
								<Button
									onClick={() => handlePublish(blog._id)}
									className="flex-1 bg-green-500 text-white hover:bg-green-600 min-w-0"
									disabled={blog.status === "published"}
								>
									<FaCheck className="" /> Publish
								</Button>
								<Button
									onClick={() => handleUnpublish(blog._id)}
									className="flex-1 bg-yellow-500 text-white hover:bg-yellow-600  px-1"
									disabled={blog.status === "draft"}
								>
									<FaTimes className="" />
									Unpublish
								</Button>
								{isAdmin ? (
									<Button
										onClick={() => handleDelete(blog._id)}
										className="flex-1 bg-red-500 text-white hover:bg-red-600 min-w-0"
									>
										<FaTrash className="" /> Delete
									</Button>
								) : (
									<Button
										className="flex-1 bg-red-500 text-white hover:bg-red-600 min-w-0"
										disabled
									>
										<FaTrash className="mr-2" /> Delete
									</Button>
								)}
							</CardFooter>
						</Card>
					))}
				</div>
			)}
		</div>
	);
};

export default ContentManagement;
