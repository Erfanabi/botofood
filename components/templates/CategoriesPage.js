/* eslint-disable @next/next/no-img-element */
import styles from "./CategoriesPage.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Card from "../modules/Card";

function CategoriesPage({ data }) {
  const router = useRouter();

  const [difficulty, setDifficulty] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    setDifficulty(router.query.difficulty);
    setTime(router.query.time);
  }, []);

  const searchHandler = () => {
    router.push({
      pathname: "/categories",
      query: { difficulty, time },
    });
  };

  return (
    <div className={styles.container}>
      <h2>Categories</h2>
      <div className={styles.subContainer}>
        <div className={styles.select}>
          <select
            name="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            <option value="">Cooking Time</option>
            <option value="more">More than 30 min</option>
            <option value="less">Less than 30 min</option>
          </select>
          <button onClick={searchHandler}>Search</button>
        </div>
        <div>
          {!data.length ? (
            <img
              src="/images/search.png"
              alt="Category"
              className={styles.search}
            />
          ) : (
            <div className={styles.cards}>
              {data.map((food) => (
                <Card key={food.id} {...food} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage;

{
  /* <div className={styles.cards}>
          {!data.length ? (
            <img src="/images/search.png" alt="Category" />
          ) : null}
          {data.map((food) => (
            <Card key={food.id} {...food} />
          ))}
        </div> */
}
