import Users from "../models/userModel.js";

const followUser = async (followerId, followeeId) => {
  console.log(followerId, followeeId)
  try {
    await Users.findByIdAndUpdate(followerId, { $addToSet: { following: followeeId } });
    await Users.findByIdAndUpdate(followeeId, { $addToSet: { followers: followerId } });

    return "User followed successfully";
  } catch (error) {
    console.error(error);
    throw new Error("Failed to follow user");
  }
};

const unfollowUser = async (followerId, followeeId) => {
  
  try {
    await Users.findByIdAndUpdate(followerId, { $pull: { following: followeeId } });
    await Users.findByIdAndUpdate(followeeId, { $pull: { followers: followerId } });

    return "User unfollowed successfully";
  } catch (error) {
    console.error(error);
    throw new Error("Failed to unfollow user");
  }
};

const checkFollowing = async (loggedInUserId, viewedUserId) => {
  try {
    const loggedInUser = await Users.findById(loggedInUserId);
    const isFollowing = loggedInUser.following.includes(viewedUserId);

    return { isFollowing };
  } catch (error) {
    console.error("Failed to check following status:", error);
    throw new Error("Failed to check following status");
  }
};

export { followUser, unfollowUser, checkFollowing };
