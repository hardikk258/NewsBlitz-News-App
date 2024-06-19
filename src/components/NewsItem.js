import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, author, date} = this.props;
    return (
      <div className="container my-3">
        <div className="card shadow p-2 mb-5 bg-light rounded">
          <img src={!imageUrl ? "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png" :imageUrl} className="card-img-top rounded" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {!author?"Unkown":author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} /*target="_blank"*/ className="btn btn-sm btn-dark mt-auto" style={{background: "linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)"}}>Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
