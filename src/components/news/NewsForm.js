import React, { useContext, useState, useEffect } from "react"
import { NewsContext } from "./NewsProvider"
import { UserContext } from "../users/UserProvider"


export default props => {
  const { addNews, news, editNews } = useContext(NewsContext)
  const [singleNews, setSingleNews] = useState({})

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
            url: singleNews.url,
            date: singleNews.date,
            userId: parseInt(localStorage.getItem("nutshell_user"))
        })
            .then(() => props.history.push("/"))
    } else {

      let formattedDate = new Date().toString()
      formattedDate = formattedDate.split(" ")
      formattedDate[0] += "."
      formattedDate[1] += "."
      let formattedTime = formattedDate[4].split(":")
      let formattedHour = parseInt(formattedTime[0], 10)
      if (formattedHour > 11) {
          formattedHour -= 12
          if (formattedHour = 0) {
              formattedHour = 12
          }
          formattedTime[0] = formattedHour.toString()
          formattedDate[5] = "PM"
      } else {
          formattedDate[5] = "AM"
      }
      formattedDate[4] = formattedTime.slice(0, 2).join(":")
      formattedDate = formattedDate.slice(0, 6).join(" ")
        addNews({
            title: singleNews.title,
            synopsis: singleNews.synopsis,
            url: singleNews.url,
            date: formattedDate,
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