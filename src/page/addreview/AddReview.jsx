import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this line
import "./addreview.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useFirebase } from "../../context/Firebase";

const AddReview = () => {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const [userName, setUserName] = useState("");
  const [content, setContent] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      await firebase.createData(userName, content, avatar);
      console.log("Success");
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };
  return (
    <div className="container">
      <div className="addreviewform">
        <p>Create Review...</p>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            required
            type="text"
            name="userName"
            placeholder="name..."
          />
          <textarea
            onChange={(e) => setContent(e.target.value)}
            value={content}
            required
            placeholder="content..."
            name="content"
            maxLength={180}
          />
          <input
            onChange={(e) => setAvatar(e.target.files[0])}
            type="file"
            name="avata"
            id="images"
          />
          <div>
            {avatar ? (
              <div className="uploadeShow">
                <span onClick={() => setAvatar(null)} className="crosImage">
                  <IoClose className="crosImageIcon" />
                </span>
                <img
                  className="selectadeImage"
                  src={URL.createObjectURL(avatar)}
                  alt={avatar.name}
                />
              </div>
            ) : (
              <div className="uploadeSystem">
                <label htmlFor="images">
                  <FaCloudUploadAlt />
                </label>
                <span>Uploade a image</span>
              </div>
            )}
          </div>

          <button className="submitbtn" type="submit">
            {loading ? "submitting...." : "submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
