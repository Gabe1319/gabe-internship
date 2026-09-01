import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import Countdown from "../UI/Countdown";

const ExploreItems = () => {
  const [itemCount, setItemCount] = React.useState(8);
  const [ exploreItems, setExploreItems] = useState([]);
  const [skeletonLoading, setSkeletonLoading] = useState(true);

  const getExploreItems = async () => {
    const { data } = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/explore');
    setExploreItems(data);}

    async function filterItems(filter) {
      setSkeletonLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`,
    );
    setExploreItems(data);
    setSkeletonLoading(false);
  }

  useEffect(() => {
    getExploreItems();
  }, []);
  return (
    <>
      <div>
        <select id="filter-items" defaultValue=""
        onChange={(event) => filterItems(event.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {exploreItems.length !== 0 && !skeletonLoading ? (
        <>
          {exploreItems.slice(0, itemCount).map((item, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {item.expiryDate && <Countdown expiryDate={item.expiryDate} />}

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${item.nftid}`}>
                    <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${item.nftid}`}>
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="col-md-12 text-center">
            {itemCount !== 16 && (
              <Link
                onClick={() => setItemCount(itemCount + 4)}
                to=""
                id="loadmore"
                className="btn-main wow fadeInUp lead"
              >
                Load more
              </Link>
            )}
          </div>
        </>
      ) : (
        <>
          {new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            >
              <Skeleton width="100%" height="400px" />
            </div>
          ))}
        </>

      )}
    </>
  );
};

export default ExploreItems;
