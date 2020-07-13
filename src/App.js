import React from 'react';
import axios from 'axios';
import moment from 'moment';
import parse from 'html-react-parser'
import './App.scss';

/*
 * @info BlogPosts Component
 */
class BlogPosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      /* Loaded added for error checking on request failure. */
      loaded: false
    };
  }

  componentDidMount() {

    axios.get('https://admin.insights.ubuntu.com/wp-json/wp/v2/posts?per_page=3&page=1&_embed=True')
      .then(response => {

        /* Map each post item to return a structure post object.  */
        const posts = response.data.map(post => {

          return {
            id: post.id, /* Unique ID */
            title: parse(post.title.rendered),
            link: post.link,
            thumbnail: {
              image: post._embedded['wp:featuredmedia'][0].source_url,
              alt_text: post._embedded['wp:featuredmedia'][0].alt_text
            },
            date: moment(post.date).format('DD MMMM YYYY'),
            author: {
              name: post._embedded.author[0].name,
              link: post._embedded.author[0].link
            }
          }

        });

        this.setState({
          posts,
          Loaded: true
        });
      });
  }

  render() {
    return (
      <div className="row u-equal-height">
        {this.state.posts.map(post => 
          <div className="col-4 p-card--highlighted blog-item-p-card" key={post.id.toString()}>
              <header className="blog-item-p-card__header">
                <h5 className="blog-item-p-card__category p-muted-heading u-no-margin--bottom u-no-margin--top">Cloud and Server</h5>
              </header>
              <div className="blog-item-p-card__content">
                <a href={post.link}>
                  <img src={post.thumbnail.image} alt={post.thumbnail.alt_text} className="blog-item-p-card__thumbnail"/>
                </a>
                <h3 className="p-card__title blog-item-p-card__heading">
                  <a href={post.link}>{post.title}</a>
                </h3>
                <p className="u-no-margin--top blog-item-p-card__info u-no-padding--top">
                  <em>By <a href={post.author.link}>{post.author.name}</a> {post.date}</em>
                </p>
              </div>
              <footer className="blog-item-p-card__footer">
                <p className="blog-item-p-card__type">Article</p>
              </footer>
          </div>
        )}
      </div>
    );
  }
}


export default BlogPosts;
