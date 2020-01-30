import React, { useContext } from "react";
import { NewsContext } from "./NewsProvider";

export default ({ news, props, friendStatus }) => {
  const { deleteNews } = useContext(NewsContext);
  let deleteNewsButton = ""
  let editNewsButton = ""
  if (friendStatus === false) {
    deleteNewsButton = <>
      <button onClick={
        () => {
          deleteNews(news);
        }
      }>Delete News</button>
    </>
  }
  if (friendStatus === false) {
    editNewsButton = <>
      <button onClick={() => {
        props.history.push(`/editNews/${news.id}`)
      }}>Edit</button>
    </>
  }
  return (
    <section className="newsCard">
      <div>Title: {news.title} </div>
      <div>Synopsis: {news.synopsis} </div>
      <a href="{news.url}">{news.url}</a>
      <div>Date: {news.date}</div>
      {deleteNewsButton}
      {editNewsButton}
    </section>
  );
};

