import { useEffect, useRef, useState } from "react";
import "./separatedata.css";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../../context/Firebase";
import { MdDeleteSweep } from "react-icons/md";
import { FaPenNib } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

const SeparateData = (props) => {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const [url, setUrl] = useState(null);
  const [openCardSettings, setOpenCardSettings] = useState(false);

  const cardSettingsIconRef = useRef();
  const cardSettingsBarRef = useRef();

  const openCardSettingsOutside = () => {
    setOpenCardSettings(!openCardSettings);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cardSettingsIconRef.current &&
        !cardSettingsIconRef.current.contains(event.target) &&
        cardSettingsBarRef.current &&
        !cardSettingsBarRef.current.contains(event.target)
      ) {
        setOpenCardSettings(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cardSettingsIconRef, cardSettingsBarRef]);

  useEffect(() => {
    firebase.getImage(props.avatar).then((url) => setUrl(url));
  }, [firebase, props.avatar]);

  const deleteData = () => {
    var userResponse = window.confirm("Delete your Data?");
    if (userResponse) {
      firebase.deleteData(props.id, props.avatar);
      props.onDeleteData(props.id);
    }
  };

  const updateReview = (e) => {
    firebase.setForUpdateData(e);
    navigate("/editreview");
  };

  return (
    <div className="card">
      <div className="card-top">
        <div className="userImageContainer">
          <img className="userImage" src={url} alt={props.userName} />
        </div>
        <p>{props.userName}</p>
        {openCardSettings && (
          <div className="settingsBar" ref={cardSettingsBarRef}>
            <button onClick={() => updateReview(props)} className="deleteBtn">
              Edit
            </button>
            <br />
            <button onClick={deleteData} className="updateBtn">
              Delete
            </button>
          </div>
        )}
        <span
          ref={cardSettingsIconRef}
          onClick={openCardSettingsOutside}
          className="deleteOrUpdateButton"
        >
          <BsThreeDotsVertical />
        </span>
      </div>
      <p className="card-paragraph">{props.content}</p>
    </div>
  );
};

export default SeparateData;
