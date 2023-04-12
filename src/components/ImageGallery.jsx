import { Component } from 'react';
import api from './services/api';
import { Loader } from './Loader';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Modal } from './Modal';

export class ImageGallery extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    isShowModal: false,
    largeImgURL: '',
    page: 1,
    isLoadMore: true,
  };

  async componentDidUpdate(prevProps) {
    const searchText = this.props.searchQuery.trim();
    const currentPage = this.props.currentPage;
    if (prevProps.searchQuery !== searchText && searchText) {
      this.setState({
        currentPage: 1,
        images: [],
        isLoadMore: true,
        isLoading: true,
      });
      try {
        const articles = await api.fetchArticlesWithQuery(searchText, 1);
        const images = articles.hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );
        this.setState({ images });
        this.props.addButton(images);
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
        const images = articles.hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );
        this.props.addButton(images);
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
        }));
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }
  imageClick = e => {
    const imageSrc = e.target.src;
    const { images } = this.state;
    const index = images.findIndex(image => image.webformatURL === imageSrc);
    const largeImage = images[index].largeImageURL;
    this.setState({ largeImgURL: largeImage, isShowModal: true });
  };
  closeModal = () => {
    this.setState({ isShowModal: false });
  };
  render() {
    const { images, isLoading, error, isShowModal, largeImgURL } = this.state;
    return (
      <>
        {isShowModal && (
          <Modal largeImageURL={largeImgURL} closeModal={this.closeModal} />
        )}
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && this.props.currentPage === 1 && <Loader />}
        <ul className="ImageGallery" onClick={e => this.imageClick(e)}>
          {images &&
            images.map(({ id, webformatURL, tags }) => (
              <li className="ImageGalleryItem" key={id}>
                <ImageGalleryItem webformatURL={webformatURL} tags={tags} />
              </li>
            ))}
        </ul>
        {isLoading && <Loader />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  addButton: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
};
