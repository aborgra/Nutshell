import React, { useContext, useState, useEffect, useRef } from "react"
import { MessageContext } from "./MessageProvider"


export default props => {
  const { addMessages, messages, editMessage } = useContext(MessageContext)
  const [singleMessage, setSingleMessage] = useState({})
  const messageText = useRef("")
  

  // const editMode = props.match.params.hasOwnProperty("messageId")
  

  const handleControlledInputChange = (event) => {
    /*
        When changing a state object or array, always create a new one
        and change state instead of modifying current one
    */
    const newSingleMessage = Object.assign({}, singleMessage)
    newSingleMessage[event.target.name] = event.target.value
    setSingleMessage(newSingleMessage)
  }

  const setDefaults = () => {
   
      const messageId = parseInt(props.match.params.messageId)
      const selectedMessage = messages.find(m => m.id === messageId) || {}
      setSingleMessage(selectedMessage)
    
  }

  useEffect(() => {
    setDefaults()
  }, [messages])

  const constructNewMessage = () => {
    // if (editMode) {
        editMessage({
            id: singleMessage.id,
            message: singleMessage.message,
            userId: parseInt(localStorage.getItem("nutshell_user"))
        })
            .then(() => props.history.push("/"))
    // } else {
    //   const date = new Date();
    //   const currentDate = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) +
    //   '-' + date.getDate().toString().padStart(2, 0);
    //     addNews({
    //         title: newsTitle.current.value,
    //         synopsis: newsSynopsis.current.value,
    //         url: newsUrl.current.value,
    //         date: new Date(currentDate).toLocaleDateString('en-US'),
    //         userId: parseInt(localStorage.getItem("nutshell_user"))
    //     })
    //         .then(() => props.history.push("/"))
    // }

  }

  return (
    <form className="newsForm">
      <h2 className="newsForm__title">"Slowly Edit"</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Message: </label>
          <input type="text" name="message" required autoFocus className="form-control"
            ref= {messageText}
            proptype="varchar"
            placeholder="News Title"
            defaultValue={singleMessage.message}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
     
      <button type="submit"
        onClick={evt => {
          evt.preventDefault()
          constructNewMessage()
        }}
        className="btn btn-primary">
        "Save those changes"
      </button>
    </form>
  )
}