export default ({news}) => {
  return (
    <section className="newsCard">
      <div>Title: {news.title} </div>
      <div>Synopsis: {news.synopsis} </div>
      <a href="{news.url}">{news.url}</a>
      <div>Date: {news.date}</div>
      <button>Edit News</button>
      {/*  need to add button functionality  */}
      <button>Delete News</button>
      {/*  need to add button functionality  */}
    </section>
  )
};