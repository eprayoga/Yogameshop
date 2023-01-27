import { useCallback, useEffect, useState } from "react";
import GameItem from "../../molecules/GameItem";
import { getFeaturedGame } from "../../../services/player";
import { GameItemTypes } from "../../../services/data-types";
import Skeleton from "react-loading-skeleton";

export default function FeaturedGame() {
  const [isLoading, setIsLoading] = useState(true);
  const [gameList, setGameList] = useState([]);

  const getFeatureGameList = useCallback(async () => {
    const data = await getFeaturedGame();
    setGameList(data);
  }, [getFeaturedGame]);

  useEffect(() => {
    getFeatureGameList();
    if (gameList) {
      setIsLoading(false);
    }
  }, []);

  const API_IMG = process.env.NEXT_PUBLIC_IMG;
  return (
    <section className="featured-game pt-50 pb-50">
      <div className="container-fluid">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">
          Our Featured
          <br /> Games This Year
        </h2>

        {isLoading ? (
          <div
            style={{ minHeight: "270px" }}
            className="d-flex flex-row flex-lg-wrap overflow-setting justify-content-lg-between gap-lg-3 gap-4"
          >
            <Skeleton width={205} height={270} borderRadius={30} />
            <Skeleton width={205} height={270} borderRadius={30} />
            <Skeleton width={205} height={270} borderRadius={30} />
            <Skeleton width={205} height={270} borderRadius={30} />
            <Skeleton width={205} height={270} borderRadius={30} />
          </div>
        ) : (
          <div
            style={{ minHeight: "270px" }}
            className="d-flex flex-row flex-lg-wrap overflow-setting justify-content-lg-between gap-lg-3 gap-4"
          >
            {gameList.map((item: GameItemTypes) => (
              <GameItem
                key={item._id}
                title={item.name}
                category={item.category.name}
                thumbnail={`${API_IMG}/${item.thumbnail}`}
                id={item._id}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
