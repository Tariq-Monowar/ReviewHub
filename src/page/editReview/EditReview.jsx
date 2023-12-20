import { useEffect, useState } from "react";
import { useFirebase } from "../../context/Firebase";
import "./editreview.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate, Link } from "react-router-dom";

const EditReview = () => {
  const navigate = useNavigate();
  const firebase = useFirebase();
  //
  const [userName, setUserName] = useState(firebase.forUpdateData.userName);
  const [content, setContent] = useState(firebase.forUpdateData.content);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    const { id } = firebase.forUpdateData;

    try {
      e.preventDefault();
      setLoading(true) //async (id, userName, content, avatar, avatarPath)
      await firebase.updateData(
        id,
        userName,
        content,
        firebase.forUpdateData.avatar,
        avatar
      );
      console.log("Success....");
      navigate("/");
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false) 
    }
  };

  return (
    <div className="container">
      <div className="addreviewform">
        <p>Update Review...</p>
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

            {
              // avatar?<span>{`${avatar.name.substring(0, 4)}${avatar.name.substring(avatar.name.length - 10, avatar.name.length - 0)}`}</span>:""
            }
            {
              // avatar?<img className='selectadeImage' src={URL.createObjectURL(avatar)} alt="" />:""
            }
          </div>

          <button className="submitbtn" type="submit">
            {loading ? "Editing...." : "Edite"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditReview;
