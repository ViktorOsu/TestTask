import { useState } from "react";
import s from "./Tweet.module.scss";
import PropTypes from "prop-types";
import logo from "../../images/Vector.png";
import dialog from "../../images/question.png";
import ring from "../../images/borderRing.png";
import bar from "../../images/bar.png";
import { usePutUserMutation } from "@/api/store";
import { useDispatch, useSelector } from "react-redux";
import { setFollow, removeFollow } from "@/api/slice";

const format = (value) => {
  const form = new Intl.NumberFormat("en", {
    style: "decimal",
    useGrouping: "false",
  }).format(value);

  return form;
};

const Tweet = ({
  id = null,
  avatar = null,
  followers = null,
  tweets = null,
}) => {
  const selectFollowings = useSelector((state) => state.followers.follows);
  const checker = selectFollowings.some((item) => item?.id === id);
  const [isFollowing, setIsFollowing] = useState(checker);
  const [putUser, { isSuccess, isLoading }] = usePutUserMutation();
  const dispatch = useDispatch();

  const handleButtonClick = (id, followers) => {
    !isFollowing && dispatch(setFollow(id));
    isFollowing && dispatch(removeFollow(id));
    putUser({
      id,
      followers: isFollowing ? followers - 1 : followers + 1,
    }).unwrap();
    setIsFollowing(!isFollowing);
  };

  const buttonStyle = {
    backgroundColor: checker ? "#5CD3A8" : "#EBD8FF",
  };

  return (
    <li id={id} className={s.wrapper}>
      <div className={s.bgLogo}>
        <img src={logo} alt="logo" />
      </div>
      <div className={s.bgDialog}>
        <img src={dialog} alt="dialog background" />
      </div>
      <div className={s.bgBar}>
        <img src={bar} alt="backround bar" />
      </div>
      <div className={s.bgRing}>
        <img src={ring} alt="background ring" />
      </div>
      <img loading="lazy" src={avatar} alt="avatar" className={s.avatar} />
      <p className={s.tweets}>{format(tweets)} Tweets</p>
      <p className={s.followers}>{format(followers)} Followers</p>
      <button
        type="button"
        className={s.button}
        onClick={() => handleButtonClick(id, followers)}
        style={buttonStyle}
        disabled={isLoading && !isSuccess}
      >
        {isFollowing ? "FOLLOWING" : "FOLLOW"}
      </button>
    </li>
  );
};

export default Tweet;

Tweet.propTypes = {
  id: PropTypes.string,
  avatar: PropTypes.string,
  followers: PropTypes.number,
  tweets: PropTypes.number,
};
