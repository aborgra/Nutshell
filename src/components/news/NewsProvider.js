import React, { useState, useEffect } from "react"

/*
    The context is imported and used by individual components
    that need data
*/

export const NewsContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const NewsProvider = (props) => {
    const [news, setNews] = useState([])

    const getNews = () => {
        return fetch("http://localhost:3000/news")
            .then(res => res.json())
            .then(setNews)
    }

    const addNews = article => {
        return fetch("http://localhost:3000/news", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(article)
        })
        .then(getNews)
    }

    const deleteNews = article => {
        return fetch(`http://localhost:3000/news/${article.id}`, {
            method: "DELETE"
        })
            .then(getNews)
    }

    const editNews = article => {
        return fetch(`http://localhost:3000/news/${article.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(article)
        })
        .then(getNews)
    }

    /*
        Load all news when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
   useEffect(() => {
       getNews()
   }, [])

   useEffect(() => {
    console.log("****  NEWS APPLICATION STATE CHANGED  ****")
    console.log(news)
   }, [news])

   return (
       <NewsContext.Provider value={{
           news, addNews, deleteNews, editNews
       }}>
           {props.children}
       </NewsContext.Provider>
   )
}