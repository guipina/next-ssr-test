import {useQuery} from "@apollo/client";
import styles from '../styles/Home.module.css';

import { QUERY_GET_REVIEWS } from "../graphql/Queries";

const Review = ({review}) => {
    const {title, comment, rating, date} = review;

    return (
      <div className={`${styles.card} ${styles.review}`}>
        <h4>{title}</h4>
        <p>rating: {rating} - date: {date}</p>
        <p>{comment}</p>
      </div>
    );
  };

export default function Reviews() {
    
    const { data, loading, error } = useQuery(QUERY_GET_REVIEWS);

  if (loading) {
    return (<h2><a href="#loading" aria-hidden="true" className="aal_anchor" id="loading"></a>Loading...</h2>);
  }

  if (error) {
    console.error(error);
    return null;
  }

  const {reviews} = data;
  return (
    <section className={`${styles.products}`}>
        {reviews && reviews.map((r) => (<Review key={r.id} review={r}/>))}
    </section>
    );
};