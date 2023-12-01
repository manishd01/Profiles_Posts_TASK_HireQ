const Profile = require("../model/profile");

const createProfile = async (req, res) => {
  const { userid, biotext } = req.body;
  console.log(req.body);
  try {
    // Check if the profile already exists for the user
    const existingProfile = await Profile.findOne({ user: userid });

    if (existingProfile) {
      return res
        .status(400)
        .json({ message: "Profile already exists for this user" });
    }

    // Create a new profile
    const newProfile = new Profile({
      user: userid,
      bio: biotext,
    });

    console.log("idhr tak", newProfile);
    await newProfile.save();

    res.status(201).json({ message: "Profile created successfully" });
  } catch (error) {
    if (error.name === "ValidationError") {
      // Handle validation errors
      return res.status(400).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllProfile = async (req, res) => {
  try {
    // Retrieve all posts
    const profilesall = await Profile.find();

    res.status(200).json(profilesall);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProfile = async (req, res) => {
  try {
    const userid = req.params.userId;
    console.log(userid + "sssss");

    const profile = await Profile.findOne({ user: userid });
    console.log("sssss");
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    console.log(profile, "cccc");
    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { bio } = req.body;

    // Find and update the profile for the given user ID
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: userId },
      { bio },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Delete the profile for the given user ID
    const deletedProfile = await Profile.findOneAndDelete({ user: userId });

    if (!deletedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createProfile,
  getProfile,
  getAllProfile,
  updateProfile,
  deleteProfile,
};
