import React, { useContext, useState, useEffect } from "react"
import { NewsContext } from "./NewsProvider"
import { UserContext } from "../users/UserProvider"


export default props => {
    const { users } = useContext(UserContext)
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
            // if (editMode) {
            //     editNews({
            //         id: news.id,
            //         title: animal.name,
            //         synopsis: animal.breed,
            //         date: locationId,
            //         userId: parseInt(localStorage.getItem("nutshell_user"))
            //     })
            //         .then(() => props.history.push("/"))
            // } else {
            //     addNews({
            //         title: animal.name,
            //         synopsis: animal.breed,
            //         date: locationId,
            //         userId: parseInt(localStorage.getItem("nutshell_user"))
            //     })
            //         .then(() => props.history.push("/"))
            // }
        
    }

    return (
        <form className="newsForm">
            <h2 className="newsForm__title">{editMode ? "edit Title" : "Give your news a title"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">news Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        proptype="varchar"
                        placeholder="title"
                        defaultValue={news.title}
                        onChange={handleControlledInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="name">news Url: </label>
                    <input type="text" name="url" required autoFocus className="form-control"
                        proptype="varchar"
                        placeholder="url"
                        defaultValue={news.url}
                        onChange={handleControlledInputChange}
                    />
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