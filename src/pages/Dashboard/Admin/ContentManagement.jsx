import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
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

const ContentManagement = () => {
	const [filter, setFilter] = useState("all");
	const [isLoading, setIsLoading] = useState(true); // Loading state
	const navigate = useNavigate();
	const axiosPublic = useAxiosPublic();

	const { data: blogs, refetch } = useQuery({
		queryKey: ["all-users"],
		queryFn: async () => {
			const res = await axiosPublic.get("/blogs");
			setIsLoading(false);
			return res.data;
		},
	});

	const filteredBlogs =
		filter === "all" ? blogs : blogs.filter((blog) => blog.status === filter);

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
			await axiosPublic.delete(`/blogs/${id}`);
			refetch();
		} catch (error) {
			console.error("Error deleting blog:", error);
		}
	};

	return (
		<div className="p-6 bg-gray-50 min-h-screen">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">Content Management</h1>
				<Button
					onClick={() => navigate("/dashboard/add-blog")}
					className="bg-blue-500 text-white"
				>
					Add Blog
				</Button>
			</div>

			<Select onValueChange={setFilter} value={filter}>
				<SelectTrigger className="w-48">
					<SelectValue placeholder="Filter Blogs" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">All</SelectItem>
					<SelectItem value="draft">Draft</SelectItem>
					<SelectItem value="published">Published</SelectItem>
				</SelectContent>
			</Select>

			{isLoading ? (
				<div>Loading blogs...</div>
			) : (
				<Table>
					<thead>
						<tr>
							<th>Title</th>
							<th>Status</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{filteredBlogs.map((blog) => (
							<tr key={blog._id}>
								<td>{blog.title}</td>
								<td>{blog.status}</td>
								<td>
									<Button
										onClick={() => handlePublish(blog._id)}
										disabled={blog.status === "published"}
									>
										Publish
									</Button>
									<Button
										onClick={() => handleUnpublish(blog._id)}
										disabled={blog.status === "draft"}
									>
										Unpublish
									</Button>
									<Button onClick={() => handleDelete(blog._id)}>Delete</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</div>
	);
};

export default ContentManagement;
