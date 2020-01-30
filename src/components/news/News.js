import React, { useContext } from "react";
import { NewsContext } from "./NewsProvider";


export default ({news}) => {
  const { deleteNews } = useContext(NewsContext);
  return (
    <section className="newsCard">
      <div>Title: {news.title} </div>
      <div>Synopsis: {news.synopsis} </div>
      <a href="{news.url}">{news.url}</a>
      <div>Date: {news.date}</div>
      <button onClick={() => {
                props.history.push(`/editNews/${news.id}`)
            }}>Edit</button>
      <button onClick={
        () => {
          deleteNews(news);
        }
      }>Delete News</button>
    </section>
  );
};