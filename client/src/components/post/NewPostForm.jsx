import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { isEmpty, timestampParser } from "../Utils";

const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState("");
  const [video, setVideo] = useState("");
  const [file, setFile] = useState(null);
  const userData = useSelector((state) => state.user.userReducer);

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
  }, [userData]);

  const handlePicture = () => {};
  const handlePost = () => {};
  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setVideo("");
  };

  //7:52min:21

  return (
    <div className="post-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <div className="data">
            <p>
              <span>
                {(userData.following && userData.following.length) || 0}
              </span>{" "}
              <span>
                Following
                {userData.following && userData.following.length > 1 && "s"}
              </span>
            </p>
            <p>
              <span>
                {(userData.followers && userData.followers.length) || 0}
              </span>{" "}
              <span>
                Followers
                {userData.followers && userData.followers.length > 1 && "s"}
              </span>
            </p>
          </div>

          <NavLink exact to="/profile">
            <div className="user-info">
              <img src={userData.picture} alt="user-img" />
            </div>
          </NavLink>
          <div className="post-form">
            <textarea
              name="message"
              id="message"
              placeholder="What's the new?"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            ></textarea>
            {(message.length || postPicture.length || video.length > 20) && (
              <li className="card-container">
                <div className="card-left">
                  <img src={userData.picture} alt="user-pic" />
                </div>
                <div className="card-right">
                  <div className="card-header">
                    <div className="pseudo">
                      <h3>{userData.pseudo}</h3>
                    </div>
                    <span>{timestampParser(Date.now())}</span>
                  </div>
                  <div className="content">
                    <p>{message}</p>
                    <img src={postPicture} alt="" />
                    {video && (
                      <iframe
                        src={video}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={video}
                      ></iframe>
                    )}
                  </div>
                </div>
              </li>
            )}

            <div className="footer-form">
              <div className="icon">
                {isEmpty(video) && (
                  <>
                    <img src="./img/icons/picture.svg" alt="img" />
                    <input
                      type="file"
                      id="file-upload"
                      name="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => handlePicture(e)}
                    />
                  </>
                )}
                {video && (
                  <button onClick={() => setVideo("")}>Delete video</button>
                )}
              </div>
              <div className="btn-send">
                {(message.length ||
                  postPicture.length ||
                  video.length > 20) && (
                  <button className="cancel" onClick={cancelPost}>
                    Cancel
                  </button>
                )}
                <button className="send" onClick={handlePost}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewPostForm;
