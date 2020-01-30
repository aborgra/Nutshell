import React, { useContext, useState, useEffect, useRef } from "react"
import { NewsContext } from "./NewsProvider"
import { UserContext } from "../users/UserProvider"


export default props => {
  const { addNews, news, editNews } = useContext(NewsContext)
  const [singleNews, setSingleNews] = useState({})
  const newsTitle = useRef("")
  const newsUrl = useRef("")
  const newsSynopsis = useRef("")

  const editMode = props.match.params.hasOwnProperty("newsId")
  

  const handleControlledInputChange = (event) => {
    /*
        When changing a state object or array, always create a new one
        and change state instead of modifying current one
    */
    const newSingleNews = Object.assign({}, singleNews)
    newSingleNews[event.target.name] = event.target.value
    setSingleNews(newSingleNews)
  }

  const setDefaults = () => {
    if (editMode) {
      const newsId = parseInt(props.match.params.newsId)
      const selectedNews = news.find(n => n.id === newsId) || {}
      setSingleNews(selectedNews)
    }
  }

  useEffect(() => {
    setDefaults()
  }, [news])

  const constructNewNews = () => {
    if (editMode) {
        editNews({
            id: singleNews.id,
            title: singleNews.title,
            synopsis: singleNews.synopsis,
            url: newsUrl.current.value,
            date: singleNews.date,
            userId: parseInt(localStorage.getItem("nutshell_user"))
        })
            .then(() => props.history.push("/"))
    } else {
      const date = new Date();
      const currentDate = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) +
      '-' + date.getDate().toString().padStart(2, 0);
        addNews({
            title: newsTitle.current.value,
            synopsis: newsSynopsis.current.value,
            url: newsUrl.current.value,
            date: new Date(currentDate).toLocaleDateString('en-US'),
            userId: parseInt(localStorage.getItem("nutshell_user"))
        })
            .then(() => props.history.push("/"))
    }

  }

  return (
    <form className="newsForm">
      <h2 className="newsForm__title">{editMode ? "Slowly Edit" : "Add some sloth news"}</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">news Title: </label>
          <input type="text" name="title" required autoFocus className="form-control"
            ref= {newsTitle}
            proptype="varchar"
            placeholder="News Title"
            defaultValue={singleNews.title}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">news Url: </label>
          <input type="text" name="url" required autoFocus className="form-control"
            ref= {newsUrl}
            proptype="varchar"
            placeholder="url"
            defaultValue={singleNews.url}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="treatment">Synopsis: </label>
          <textarea type="text" name="synopsis" className="form-control"
            ref= {newsSynopsis}
            proptype="varchar"
            placeholder="What's slothing?"
            value={singleNews.synopsis}
            onChange={handleControlledInputChange}>
          </textarea>
        </div>
      </fieldset>
      <button type="submit"
        onClick={evt => {
          evt.preventDefault()
          constructNewNews()
        }}
        className="btn btn-primary">
        {editMode ? "Save those changes" : "Add that News!"}
      </button>
    </form>
  )
}