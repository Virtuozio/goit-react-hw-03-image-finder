import { Component } from 'react';
import api from './services/api';
// import { Audio } from 'react-loader-spinner';
import { Loader } from './Loader';

export class ImageGalleryItem extends Component {
  state = {
    articles: [],
    isLoading: false,
    error: null,
  };

  async componentDidUpdate(prevProps) {
    const searchText = this.props.searchQuery.trim();
    const currentPage = this.props.currentPage;
    if (prevProps.searchQuery !== searchText && searchText) {
      this.setState({ isLoading: true });
      try {
        const articles = await api.fetchArticlesWithQuery(searchText, 1);
        console.log(articles);

        this.setState({ articles });
        this.props.addButton(articles);
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
    if (prevProps.currentPage !== currentPage) {
      this.setState({ isLoading: true });
      try {
        const articles = await api.fetchArticlesWithQuery(
          searchText,
          currentPage
        );
        console.log(articles);

        this.setState(prevState => ({
          articles: [...prevState.articles, ...articles],
        }));
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }
  render() {
    const { articles, isLoading, error } = this.state;
    return (
      <>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && <Loader />}
        {articles &&
          articles.map(({ id, webformatURL, largeImageURL, tags }) => (
            <li className="ImageGalleryItem" key={id}>
              <a className="link" href={largeImageURL}>
                <div className="photo-card">
                  <img
                    className="ImageGalleryItem-image"
                    src={webformatURL}
                    alt={tags}
                    loading="lazy"
                  />
                </div>
              </a>
            </li>
          ))}
      </>
    );
  }
}
