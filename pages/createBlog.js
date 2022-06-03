import React, { useRef, useState } from "react";
import { BsFillFileEarmarkTextFill, BsCloudArrowUp } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const CreateBlog = ({ loggedIn }) => {
  const ref = useRef();
  const ref2 = useRef();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [blog, setBlog] = useState("");
  const [date, setDate] = useState("");
  const [isOver, setIsOver] = useState(false);
  const [image, setImage] = useState(undefined);
  
  let file;
  
  const handleFileBrowse = () => {
    file = ref2.current.files[0];
    showFile();
  };
  
  const handleFileDrop = (e) => {
    e.preventDefault();
    file = e.dataTransfer.files[0];
    showFile();
  };
  
  const showFile = () => {
    let fileType = file.type;
    let validExtentions = ["image/png"];
    if (validExtentions.includes(fileType)) {
      let fileReader = new FileReader();
      fileReader.onload = () => {
        let fileUrl = fileReader.result;
        setImage(fileUrl);
      };
      fileReader.readAsDataURL(file);
    } else {
      toast.error("File Type Is InCorrect !", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      isOver(false);
    }
  };
  
  const changeValue = (e) => {
    if (e.target.id == "title") {
      setTitle(e.target.value);
    } else if (e.target.id == "blog") {
      setBlog(e.target.value);
    } else if (e.target.id == "date") {
      setDate(e.target.value);
    } else if (e.target.id == "slug") {
      setSlug(e.target.value);
    }
  };
  
  let blogObj;
  const submitBlog = (e) => {
    e.preventDefault();
    if (title == "" || slug == "" || blog == "" || date == "" || ref.current.value == "select" ) {
      toast.error("Fill Form Correctly!", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    blogObj = {
      title,
      slug,
      blog,
      date,
      blogImg : image,
      category: ref.current.value,
    };
    addBlog(blogObj);
    toast.success("Blog Saved!", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      router.push(`/articles/${blogObj.slug}`);
    }, 3000);
    setBlog("");
    setDate("");
    setSlug("");
    setTitle("");
    setImage(undefined);
    setIsOver(false);
    ref.current.value = "select";
  };
  
  const addBlog = (blog) => {
    const url = `/api/addBlog`;
    fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(blog)
  });
  }

  return (
    <>
      {loggedIn ? (
        <div className="w-full h-[100vh] flex md:flex-row flex-col ">
          <div className="w-full md:w-2/3 h-[100vh]  flex flex-col items-center justify-center">
            <h1 className="text-3xl drop-shadow-lg text-gray-500 py-6">
              Create&nbsp; Blogs
            </h1>
            <form
              action=""
              method="POST"
              className="w-full flex flex-col items-center"
            >
              <div className="w-full flex justify-center mb-8">
                <input
                  type="text"
                  name="title"
                  id="title"
                  spellCheck="false"
                  required
                  value={title}
                  onChange={changeValue}
                  className="w-2/5 border border-gray-300 mx-6 rounded px-2 py-1 focus:outline-none focus:border-blue-600"
                  placeholder="Write Title Here"
                />
                <input
                  type="text"
                  name="slug"
                  id="slug"
                  required
                  spellCheck="false"
                  value={slug}
                  onChange={changeValue}
                  className="w-2/5 border border-gray-300 rounded mx-6 px-2 py-1 focus:outline-none focus:border-blue-600"
                  placeholder="Write Slug Here"
                />
              </div>
              <textarea
                name="blog"
                id="blog"
                cols="30"
                rows="4"
                required
                value={blog}
                spellCheck="false"
                onChange={changeValue}
                placeholder="Write Blog Content Here"
                className="w-[86%] border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-600"
              />
              <div className="w-full flex justify-center my-8">
                <input
                  type="date"
                  name="date"
                  id="date"
                  required
                  spellCheck="false"
                  value={date}
                  onChange={changeValue}
                  className="w-2/5 border text-gray-500 border-gray-300 mx-6 rounded px-2 py-1 focus:outline-none focus:border-blue-600"
                  placeholder="Write Date Here"
                />
                <select
                  ref={ref}
                  className="w-2/5 border border-gray-300 mx-6 rounded px-2 py-1 focus:outline-none focus:border-blue-600"
                  defaultValue="select"
                  required
                >
                  <option disabled value="select">
                    --select Category
                  </option>
                  <option value="Learnings from Books">
                    Learning from Books
                  </option>
                  <option value="Learnings from Life">Learning of Life</option>
                  <option value="Technology">Technology</option>
                </select>
              </div>
            </form>
            <button
              onClick={submitBlog}
              type="submit"
              className="my-4 border border-gray-800 shadow-lg shadow-blue-100 bg-gray-800 text-white rounded px-12 py-1"
            >
              <BsFillFileEarmarkTextFill className="text-yellow-100 inline align-middle mb-1 mr-2" />{" "}
              Add Blog
            </button>
          </div>
          <div className="w-full md:w-1/2 h-[100vh] flex flex-col justify-center items-center">
            {image == undefined ? (
              <div
                onDrop={handleFileDrop}
                onDragOver={(e) => {
                  setIsOver(true);
                  e.preventDefault();
                }}
                onDragLeave={(e) => {
                  setIsOver(false);
                  e.preventDefault();
                }}
                className={`w-2/3 h-[50vh] my-4 rounded bg-white border-2 border-green-400 flex justify-center items-center flex-col ${
                  isOver ? "border-solid" : "border-dashed"
                }`}
              >
                <BsCloudArrowUp className="text-5xl text-green-600" />
                <span className="text-black block my-2">
                  {isOver ? "Release to Upload!" : "Drag & Drop to Upload File"}
                </span>
                {!isOver ? (
                  <>
                    {" "}
                    <span className="text-black block mb-2">OR</span>
                    <button
                      onClick={() => ref2.current.click()}
                      className="bg-gray-800 py-1 rounded px-4 text-white"
                    >
                      Browse File
                    </button>{" "}
                  </>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <img src={image} alt="" />
            )}

            <input
              ref={ref2}
              hidden
              type="file"
              id="blogImg"
              name="blogImg"
              accept="image/png"
              onChange={handleFileBrowse}
            />
          </div>
          <ToastContainer
            position="bottom-left"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      ) : (
        <div className="w-full h-[100vh] flex justify-center items-center">
          <div className="flex">
            <div className="text-2xl px-6  py-3">404</div>
            <div className="p-4 pb-6 border-l-[1px] text-xs border-gray-400">
              This page could not be found.
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateBlog;
