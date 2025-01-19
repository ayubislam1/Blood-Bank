import { useState } from "react";
import { useNavigate } from "react-router";
import JoditEditor from "jodit-react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const AddBlog = () => {
	const [title, setTitle] = useState("");
	const [thumbnail, setThumbnail] = useState(null);
	const [content, setContent] = useState("");
	const navigate = useNavigate();
	const axiosPublic = useAxiosPublic();

	const image_host_key = import.meta.env.VITE_Image;
	const image_host_Api = `https://api.imgbb.com/1/upload?key=${image_host_key}`;

	const handleImageUpload = async (file) => {
		const formData = new FormData();
		formData.append("image", file);

		try {
			const res = await axiosPublic.post(image_host_Api, formData);
			if (res.data.success) {
				return res.data.data.display_url; // Return the uploaded image URL.
			} else {
				console.error("Image upload failed. Please try again.");
				return null;
			}
		} catch (error) {
			console.error("Error uploading image:", error);
			return null;
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!title || !thumbnail || !content) {
			alert("Please fill in all the fields.");
			return;
		}

		try {
			const imageUrl = await handleImageUpload(thumbnail);
			if (!imageUrl) {
				alert("Failed to upload thumbnail. Please try again.");
				return;
			}
            

			const newBlog = {
				title,
				thumbnail: imageUrl,
				content,
				status: "draft",
			};
			console.log(newBlog)
			const response = await axiosPublic.post("/blogs", newBlog);

			if (response.status === 200) {
				alert("Blog created successfully!");
				navigate("/dashboard/content-management");
			} else {
				console.error("Failed to create blog.", response);
				alert("Failed to create blog. Please try again.");
			}
		} catch (error) {
			console.error("Error submitting blog:", error);
			alert("An error occurred. Please try again.");
		}
	};

	return (
		<div className="p-6 bg-white min-h-screen">
			<h1 className="text-3xl font-bold mb-6">Add Blog</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<input
					type="text"
					placeholder="Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="w-full p-2 border rounded"
				/>
				<input
					type="file"
					accept="image/*"
					onChange={(e) => setThumbnail(e.target.files[0])}
					className="w-full p-2"
				/>
				<JoditEditor value={content} onChange={setContent} />
				<button
					type="submit"
					className="bg-blue-500 text-white px-4 py-2 rounded"
				>
					Create
				</button>
			</form>
		</div>
	);
};

export default AddBlog;
