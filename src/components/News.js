import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pagesize: 5,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsBlitz`;
  }

  async updateNews() {
    this.props.setProgress(10);
    // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8a421de88bcd4ce19b914f012724b828&page=${this.state.page}&pageSize=${this.props.pagesize}`;
    const url = `https://saurav.tech/NewsAPI/top-headlines/category/${this.props.category}/${this.props.country}.json`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading:false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  // handlePrevClick = async()=>{
  //   this.setState({ page: this.state.page - 1});
  //   this.updateNews()
  // }
  // handleNextClick = async()=>{
  //   this.setState({ page: this.state.page + 1});
  //   this.updateNews();
  // }

  fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8a421de88bcd4ce19b914f012724b828&page=${this.state.page}&pageSize=${this.props.pagesize}`;
    this.setState({ page: this.state.page + 1 });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "30px 0px", marginTop: "80px" ,background: "linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"}}>
          News Blitz - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h1>
  
        {this.state.loading && <Spinner/>}
        {this.state.articles && this.state.articles.length > 0 ? (
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner/>}
          >
            <div className="container">
              <div className="row">
                {this.state.articles.map((elem, index) => {
                  return (
                    <div className="col-md-4" key={elem.url+index}>
                      <NewsItem
                        title={elem.title ? elem.title.slice(0,67) + ".." : ""}
                        description={elem.description ? elem.description.slice(0,110) + "..." : ""}
                        imageUrl={elem.urlToImage}
                        newsUrl={elem.url}
                        author={elem.author}
                        date={elem.publishedAt}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </InfiniteScroll>
        ) : (
          <div>No articles to display</div>
        )}
      </>
    );
  }  
}

export default News;
