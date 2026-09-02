import React, { useState, useEffect } from "react";

import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";

import axios from "axios";

const Author = () => {
  const [authordata, setAuthordata] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function fetchAuthor() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`,
      );

      setAuthordata(data);
    }

    fetchAuthor();
  }, [id]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${authordata.authorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {authordata.authorImage ? (
                        <img src={authordata.authorImage} alt="" />
                      ) : (
                        <Skeleton
                          width="150px"
                          height="150px"
                          borderRadius="50%"
                        />
                      )}

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        {authordata ? (
                        <h4>
                          {authordata.authorName}
                          <span className="profile_username">
                            @{authordata.tag}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {authordata.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>) : (<h4>
                          <Skeleton width="200px" />
                          <span className="profile_username">
                            <Skeleton width="100px" />
                          </span>
                          <span id="wallet" className="profile_wallet">
                            <Skeleton width="250px" />
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>)}
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {authordata ? (
                        <>
                          <div className="profile_follower">
                            {authordata.followers + (isFollowing ? 1 : 0)}
                            {""} followers
                          </div>
                          {isFollowing ? (
                            <Link
                              to="#"
                              className="btn-main"
                              onClick={() => setIsFollowing(!isFollowing)}
                            >
                              unfollow
                            </Link>
                          ) : (
                            <Link
                              to="#"
                              className="btn-main"
                              onClick={() => setIsFollowing(!isFollowing)}
                            >
                              Follow
                            </Link>
                          )}
                        </>
                      ) : (
                        <div className="profile_follower">
                          <Skeleton width="150px" height="40px" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorData={authordata} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
