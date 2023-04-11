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
  };

  async componentDidUpdate(prevProps) {
    const searchText = this.props.searchQuery.trim();
    const currentPage = this.props.currentPage;
    if (prevProps.searchQuery !== searchText && searchText) {
      this.setState({ isLoading: true });
      try {
        const articles = await api.fetchArticlesWithQuery(searchText, 1);
        console.log(articles);
        const images = articles.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );
        console.log(images);
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
        const images = articles.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );

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
    console.log(index);
    const largeImage = images[index].largeImageURL;
    console.log(largeImage);
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
            images.map(({ id, webformatURL, largeImageURL, tags }) => (
              <li className="ImageGalleryItem" key={id}>
                <ImageGalleryItem
                  webformatURL={webformatURL}
                  largeImageURL={largeImageURL}
                  tags={tags}
                />
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
  // onSubmit: PropTypes.func.isRequired,
};
