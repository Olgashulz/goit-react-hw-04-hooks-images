import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';
import Loader from './components/Loader';
import ErrorResponse from './components/ErrorResponse';
import { fetchImages } from './servises/app';

export default class App extends Component {
  state = {
    inputValue: '',
    images: [],
    page: 1,
    showModal: false,

    error: null,
    status: 'resolved',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { inputValue, page } = this.state;

    if (prevState.inputValue !== inputValue || prevState.page !== page) {
      try {
        this.setState({ status: 'pending' });
        const gallery = await fetchImages(inputValue, page);

        if (gallery.length < 1 && page !== 1) {
          return toast.error(`Sorry, that's all there is to your request. `);
        }

        if (gallery.length < 1) {
          return toast.error('Sorry, no results were found.');
        }

        this.setState({ status: 'resolved' });
        this.setState(prevState => ({
          images: [...prevState.images, ...gallery],
        }));

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }
  }

  handleSearchSubmit = inputValue => {
    console.log(inputValue);
    this.setState({ inputValue });
  };

  //  handleSearchSubmit = inputValue => {
  //   console.log(inputValue);
  //   this.setState({ inputValue, images: [], page: 1 });
  // };

  removeImages = () => {
    this.setState({ images: [] });
  };

  onLoadMore = event => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    this.handleSearchSubmit(this.state.inputValue);
  };

  toggleModal = largeImage => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    this.setState({ largeImage: largeImage });
  };

  resetState = () => {
    this.setState({
      images: [],
      page: 1,
      error: null,
    });
  };

  render() {
    const { status, error, inputValue, showModal, largeImage, images } =
      this.state;
    return (
      <div className="container">
        <Searchbar
          onSubmit={this.handleSearchSubmit}
          removeImages={this.removeImages}
          resetState={this.resetState}
        />

        {status === 'pending' && <Loader />}
        {status === 'rejected' && <ErrorResponse message={error.message} />}

        <ImageGallery onOpen={this.toggleModal} images={images} />

        {images.length > 0 && <Button onLoadMore={this.onLoadMore} />}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImage} alt={inputValue} className="LargeImg" />
          </Modal>
        )}
        <ToastContainer autoClose={2500} />
      </div>
    );
  }
}
