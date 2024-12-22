import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  CustomButton,
  EditProfile,
  FriendsCard,
  Loading,
  PostCard,
  ProfileCard,
  TextInput,
  TopBar,
} from "../components";
import { suggest, requests, posts } from "../assets/data";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";
import { BsFiletypeGif, BsPersonFillAdd } from "react-icons/bs";
import { BiImages, BiSolidVideo } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { SetPosts } from "../redux/postSlice";
import { imageDB } from "../firebase/imageDb";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import CampaignIcon from "@mui/icons-material/Campaign";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import welcome from "../assets/welcome.png";

const Home = () => {
  const { user, edit } = useSelector((state) => state.user);
  const [friendRequest, setFriendRequest] = useState(requests);
  const [suggestedFriends, setSuggestedFriends] = useState(suggest);
  const [errMsg, setErrMsg] = useState("");
  const [file, setFile] = useState(null);
  const [posting, setPosting] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [showImage, setShowImage] = useState(true); //WELCOME IMAGE SHOW

  const [image, setImage] = useState("");
  const [postText, setPostText] = useState("");

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const uid = user?._id;
  

  useEffect(() => {
    
    if (localStorage.getItem("wel") === "1") {
      setShowImage(false);
    } else {
      setShowImage(true);
      localStorage.setItem("wel", "1");
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  // const handlePostSubmit = async (data) => {
  //   try {
  //     setErrMsg("");
  //     setPosting(true);

  //     const formData = new FormData();
  //     formData.append("description", data.description);
  //     formData.append("userId", user._id);
  //     console.log(user._id);
  //     console.log(data.description);
  //     if (file) {
  //       formData.append("image", file);
  //     }

  //     // Include user information in the request body
  //     formData.append("userId", user._id);

  //     const response = await fetch("http://localhost:8800/posts/create-post", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //       body: formData,
  //     });

  //     if (response.status === 201) {
  //       const responseData = await response.json();
  //       console.log("Post created successfully:", responseData.data);
  //     } else {
  //       const errorData = await response.json();
  //       console.error("Failed to create post:", errorData.message);
  //       setErrMsg({ message: errorData.message, status: "failed" });
  //     }
  //   } catch (error) {
  //     console.error("An error occurred during post creation:", error.message);
  //     setErrMsg({
  //       message: "Error occurred during post creation",
  //       status: "failed",
  //     });
  //   } finally {
  //     setPosting(false);
  //   }
  // };

  const [fetchedPosts, setFetchedPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        // Make a request to fetch posts
        const response = await axios.post(
          // "http://localhost:8800/posts/"
          "http://localhost:8800/posts/"
        );

        if (response.status === 200) {
          setFetchedPosts(response.data.data);
          console.log(response.data.data);
          console.log(response.data);
        } else {
          console.error("Failed to fetch posts:", response.data.message);
        }
      } catch (error) {
        console.error("An error occurred during post fetching:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // const storage = firebase.storage();
  // const storageRef = storage.ref();

  const handlePostSubmit = async (data) => {
    try {
      setErrMsg("");
      setPosting(true);

      // If an image is selected, upload it to Firebase Storage first
      let imageUrl = null;

      if (image) {
        try {
          const imageRef = ref(imageDB, `file/${v4()}`);
          await uploadBytes(imageRef, image);

          // Get the download URL of the uploaded image
          imageUrl = await getDownloadURL(imageRef);
        } catch (uploadError) {
          console.error(
            "Error uploading image to Firebase Storage:",
            uploadError
          );
          setErrMsg({
            message: "Image upload error occurred!",
            status: "failed",
          });
          return;
        }
      }

      // Create post data including image URL
      const postData = {
        userId: user._id,
        description: data.description,
        image: imageUrl,
      };
      console.log(postData);

      console.log(imageUrl);

      // Post data to your backend
      const response = await axios.post(
        "http://localhost:8800/posts/create-post",
        // "http://localhost:8800/posts/create-post",
        postData
      );

      if (response.status === 201) {
        setDescription("");
        setErrMsg({
          status: "success",
          message: "Post created successfully!",
        });
        window.location.reload();

        // Optionally reload the page or update state as needed
      } else {
        const errorData = response.data;
        console.error("Failed to create post:", errorData.message);
        setErrMsg({ message: errorData.message, status: "failed" });
      }
    } catch (error) {
      console.error("An error occurred during post creation:", error.message);
      setErrMsg({
        message: "Error occurred during post creation",
        status: "failed",
      });
    } finally {
      setPosting(false);
      setImage(null); // Reset image state
      setDescription("");
    }
  };

  // Handle image input change

  // const handlePostSubmit = async (data) => {
  //   try {
  //     setErrMsg("");
  //     setPosting(true);

  //     const user = JSON.parse(localStorage.getItem("user"));

  //     const postData = {
  //       userId: user._id,
  //       description: data.description,
  //     };

  //     const response = await axios.post('http://localhost:8800/posts/create-post', postData);

  //     if (response.status === 201) {
  //       setDescription("");
  //       setPostText("");
  //       setErrMsg({
  //         status: "success",
  //         message: "Post created successfully!",
  //       });
  //       const responseData = response.data;
  //       console.log("Post created successfully:", responseData.data);
  //       window.location.reload();

  //     } else {
  //       const errorData = response.data;
  //       console.error("Failed to create post:", errorData.message);
  //       setErrMsg({ message: errorData.message, status: "failed" });
  //     }
  //   } catch (error) {
  //     console.error("An error occurred during post creation:", error.message);
  //     setErrMsg({
  //       message: "Error occurred during post creation",
  //       status: "failed",
  //     });
  //   } finally {
  //     setPosting(false);
  //     setDescription("");
  //   }
  // };

  //GRADIENT FOR BOTTOM AI
  const gradientStyle = {
    fontSize: "25px",
    background: "linear-gradient(to right, violet, blue)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  const handleClose = () => {
    // Set the key in local storage to indicate that the image has been shown
    localStorage.setItem("hasShownImage", "true");
    setShowImage(false);
  };

  return (
    <>
      <div className="w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden">
        <TopBar />

        <div className="mt-3 mr-3 ml-3">
          {showImage && isMobile && (
            <img src={welcome} style={{ borderRadius: "10px" }} alt="" />
          )}
        </div>

        <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full">
          {/* LEFT */}
          <div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto">
            <ProfileCard user={user} />
            <FriendsCard friends={user?.friends} />
          </div>

          {/* CENTER */}
          <div className="flex-1 h-full px-4 flex flex-col gap-6 overflow-y-auto rounded-lg">
            <form
              onSubmit={handleSubmit(handlePostSubmit)}
              className="bg-primary px-4 rounded-lg"
            >
              <div className="w-full flex items-center gap-2 py-4 border-b border-[#66666645]">
                <img
                  src={user?.profileUrl ?? NoProfile}
                  alt="User Image"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <TextInput
                  styles="w-full rounded-full py-5"
                  placeholder="What's on your mind...."
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  register={register("description", {
                    required: "Write something about post",
                  })}
                  error={errors.description ? errors.description.message : ""}
                />
              </div>
              {errMsg?.message && (
                <span
                  role="alert"
                  className={`text-sm ${
                    errMsg?.status === "failed"
                      ? "text-[#f64949fe]"
                      : "text-[#2ba150fe]"
                  } mt-0.5`}
                >
                  {errMsg?.message}
                </span>
              )}

              <div className="flex items-center justify-between py-4">
                <label
                  htmlFor="imgUpload"
                  className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                >
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e)}
                    className="hidden"
                    id="imgUpload"
                  />
                  <BiImages />
                  <span>Image</span>
                </label>

                <label
                  className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                  htmlFor="videoUpload"
                >
                  <input
                    type="file"
                    data-max-size="5120"
                    onChange={handleFileChange}
                    className="hidden"
                    id="videoUpload"
                    accept=".mp4, .wav"
                  />
                  <BiSolidVideo />
                  <span>Video</span>
                </label>

                <div>
                  {posting ? (
                    <Loading />
                  ) : (
                    <CustomButton
                      type="submit"
                      title="Post"
                      containerStyles="bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm"
                    />
                  )}
                </div>
              </div>
            </form>

            {loading ? (
              <Loading />
            ) : fetchedPosts?.length > 0 ? (
              fetchedPosts
                .slice()
                .reverse()
                .map((post) => (
                  <PostCard
                    key={post?._id}
                    post={post}
                    user={user}
                    deletePost={() => {}}
                    likePost={() => {}}
                  />
                ))
            ) : (
              <div className="flex w-full h-full items-center justify-center">
                <p className="text-lg text-ascent-2">No Post Available</p>
              </div>
            )}
          </div>

          {isMobile && (
            <div
              style={{ height: "60px" }}
              className="fixed bottom-0 left-0 w-full bg-primary p-4 flex justify-around items-center text-blue"
            >
              {/* Update your bottom navigation items with icons */}
              <Link
                to="/"
                className="text-xl flex flex-col items-center"
                style={{ fontSize: "15px", color: "grey" }}
              >
                <LocalFireDepartmentIcon
                  style={{ fontSize: "25px", color: "grey" }}
                />
                Feed
              </Link>

              <Link
                to="/ai"
                className="text-xl flex flex-col items-center"
                style={{ fontSize: "15px", color: "#f5c000" }}
              >
                <AutoAwesomeIcon
                  style={{ fontSize: "25px", color: "#f5c000" }}
                />
                Clu.ai
              </Link>

              <Link
                to={`/profile/${uid}`}
                className="text-xl flex flex-col items-center"
                style={{ fontSize: "15px", color: "grey" }}
              >
                <AccountCircleIcon
                  style={{ fontSize: "25px", color: "grey" }}
                />
                Profile
              </Link>

              <Link
                to="/notifications"
                className="text-xl flex flex-col items-center"
                style={{ fontSize: "15px", color: "grey" }}
              >
                <CampaignIcon style={{ fontSize: "25px", color: "grey" }} />
                Updates
              </Link>
            </div>
          )}
          {/* RIGHT */}
          <div className="hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
            {/* FRIEND REQUEST */}
            <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
              <div className="flex items-center justify-between text-xl text-ascent-1 pb-2 border-b border-[#66666645]">
                <span> Friend Request</span>
                <span>{friendRequest?.length}</span>
              </div>

              <div className="w-full flex flex-col gap-4 pt-4">
                {friendRequest?.map(({ _id, requestFrom: from }) => (
                  <div key={_id} className="flex items-center justify-between">
                    <Link
                      to={"/profile/" + from._id}
                      className="w-full flex gap-4 items-center cursor-pointer"
                    >
                      <img
                        src={from?.profileUrl ?? NoProfile}
                        alt={from?.firstName}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                      <div className="flex-1">
                        <p className="text-base font-medium text-ascent-1">
                          {from?.firstName} {from?.lastName}
                        </p>
                        <span className="text-sm text-ascent-2">
                          {from?.profession ?? "No Profession"}
                        </span>
                      </div>
                    </Link>

                    <div className="flex gap-1">
                      <CustomButton
                        title="Accept"
                        containerStyles="bg-[#0444a4] text-xs text-white px-1.5 py-1 rounded-full"
                      />
                      <CustomButton
                        title="Deny"
                        containerStyles="border border-[#666] text-xs text-ascent-1 px-1.5 py-1 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SUGGESTED FRIENDS */}
            <div className="w-full bg-primary shadow-sm rounded-lg px-5 py-5">
              <div className="flex items-center justify-between text-lg text-ascent-1 border-b border-[#66666645]">
                <span>Friend Suggestion</span>
              </div>
              <div className="w-full flex flex-col gap-4 pt-4">
                {suggestedFriends?.map((friend) => (
                  <div
                    className="flex items-center justify-between"
                    key={friend._id}
                  >
                    <Link
                      to={"/profile/" + friend?._id}
                      key={friend?._id}
                      className="w-full flex gap-4 items-center cursor-pointer"
                    >
                      <img
                        src={friend?.profileUrl ?? NoProfile}
                        alt={friend?.firstName}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                      <div className="flex-1 ">
                        <p className="text-base font-medium text-ascent-1">
                          {friend?.firstName} {friend?.lastName}
                        </p>
                        <span className="text-sm text-ascent-2">
                          {friend?.profession ?? "No Profession"}
                        </span>
                      </div>
                    </Link>

                    <div className="flex gap-1">
                      <button
                        className="bg-[#0444a430] text-sm text-white p-1 rounded"
                        onClick={() => {}}
                      >
                        <BsPersonFillAdd size={20} className="text-[#0f52b6]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {edit && <EditProfile />}
    </>
  );
};

export default Home;
