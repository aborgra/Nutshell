import React, { useContext } from "react";
import { NewsContext } from "./NewsProvider";
import "./News.css"



export default ({ news, props, friendStatus }) => {
  const { deleteNews } = useContext(NewsContext);
  let newsSectionClass = 'newsCard'
  let deleteNewsButton = ""
  let editNewsButton = ""
  if (friendStatus === false) {
    deleteNewsButton = <>
      <button onClick={
        () => {
          deleteNews(news);
        }
      }>Delete News</button>
       <button onClick={() => {
        props.history.push(`/editNews/${news.id}`)
      }}>Edit</button>
      
    </>
  } 
  if (friendStatus === true) {
    newsSectionClass= "friendsClass"
  }

  return (
    <section className={newsSectionClass}>
      <div>Title: {news.title} </div>
      <div>Synopsis: {news.synopsis} </div>
      <a href="{news.url}">{news.url}</a>
      <div>Date: {news.date}</div>
      {deleteNewsButton}
      {editNewsButton}
    </section>
  );
};


//italicize font and cornsilk background