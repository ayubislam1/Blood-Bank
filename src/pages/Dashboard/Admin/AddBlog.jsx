import { useState } from "react";
import { useNavigate } from "react-router";
import JoditEditor from "jodit-react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

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
        return res.data.data.display_url; 
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
      Swal.fire("Please fill in all the fields.");
      return;
    }

    try {
      const imageUrl = await handleImageUpload(thumbnail);

      const newBlog = {
        title,
        thumbnail: imageUrl,
        content,
        status: "draft",
      };
      console.log(newBlog);
      const response = await axiosPublic.post("/blogs", newBlog);

      if (response.status === 200) {
        Swal.fire("Blog created successfully!");
        navigate("/dashboard/content-management");
      } else {
        console.error("Failed to create blog.", response);
      }
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-4xl font-semibold text-red-500 text-center mb-6">Add Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg border border-red-300">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-red-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files[0])}
          className="w-full p-3 border border-red-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <JoditEditor value={content} onChange={setContent} />
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded-lg shadow-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
