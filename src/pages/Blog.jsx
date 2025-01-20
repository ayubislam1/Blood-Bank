import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Card, CardHeader } from "@/components/ui/card";

const Blog = () => {
  const axiosPublic = useAxiosPublic();
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

  const filterBlogs = blogs?.filter((blog) => blog.status === "published");

  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <div>
      <div className="p-6 bg-red-50 min-h-screen">
        <h1 className="text-3xl font-bold text-red-700 text-center">Published Blog</h1>

        {isLoading ? (
          <div className="text-red-700 mt-6">Loading blogs...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filterBlogs?.map((blog) => (
              <Card
                key={blog._id}
                className="bg-white shadow-md rounded-lg border border-red-300"
              >
                <CardHeader className="p-4 border-b border-red-200">
                  <h2 className="text-xl font-bold text-red-700">{blog.title}</h2>
                </CardHeader>

                <div className="p-4">
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <div
                    className="overflow-hidden text-ellipsis line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: `${blog.content}`,
                    }}
                  />
                  <button
                    className="mt-4 text-white bg-red-700 px-4 py-2 rounded-md hover:bg-red-800"
                    onClick={() => setSelectedBlog(blog)}
                  >
                    Read More
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

 
      {selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-2/3 lg:w-1/2">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedBlog(null)}
            >
              ✖
            </button>
            <img
              src={selectedBlog.thumbnail}
              alt={selectedBlog.title}
              className="w-full h-64 object-cover rounded-md mb-6"
            />
            <h2 className="text-3xl font-bold text-red-700 mb-4">{selectedBlog.title}</h2>
            <div
              className="text-gray-700 text-lg"
              dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
            />
            <button
              className="mt-6 text-white bg-red-700 px-4 py-2 rounded-md hover:bg-red-800"
              onClick={() => setSelectedBlog(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
