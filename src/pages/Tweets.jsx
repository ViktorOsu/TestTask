/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Tweet from "../components/Tweet/Tweet";
import Filter from "../components/Filter/Filter";
import { useGetUsersQuery } from "@/api/store";
import { useSearchParams, useParams } from "react-router-dom";
import s from "../pages/Tweets.module.scss";
import { useSelector } from "react-redux";

const Tweets = () => {
  const { data = [] } = useGetUsersQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const idiesArr = useSelector((state) => state.followers.follows);
  const idies = idiesArr.map((el) => el.id);

  const filterName = searchParams.get("filter") ?? "all";
  console.log(filterName);
  useEffect(() => {
    setSearchParams({ filter: filterName });
  }, []);

  const change = (filter) => setSearchParams({ filter });

  return (
    <div className={s.container}>
      <Filter change={change} urlValue={filterName} />

      <ul className={s.tweetsList}>
        {filterName === "followings" &&
          data
            .filter((user) => idies.includes(user.id))
            .map((user) => (
              <Tweet
                key={user.id}
                id={user.id}
                avatar={user.avatar}
                followers={user.followers}
                tweets={user.tweets}
              />
            ))}

        {filterName === "follow" &&
          data
            .filter((user) => !idies.includes(user.id))
            .map((user) => (
              <Tweet
                key={user.id}
                id={user.id}
                avatar={user.avatar}
                followers={user.followers}
                tweets={user.tweets}
              />
            ))}

        {filterName === "all" &&
          data.map((user) => (
            <Tweet
              key={user.id}
              id={user.id}
              avatar={user.avatar}
              followers={user.followers}
              tweets={user.tweets}
            />
          ))}
      </ul>
    </div>
  );
};

export default Tweets;
