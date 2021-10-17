import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';
import Loader from './components/Loader';
import ErrorResponse from './components/ErrorResponse';
import { fetchImages } from './servises/app';

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('resolved');
  const [largeImage, setLargeImage] = useState(null);

  useEffect(() => {
    if (!inputValue) {
      return;
    }

    setStatus(Status.PENDING);
    fetchImages(inputValue, page)
      .then(res => {
        if (res.length < 1 && page !== 1) {
          return toast.error(`Sorry, that's all there is to your request. `);
        }
        if (res.length < 1) {
          return toast.error('Sorry, no results were found.');
        }
        setImages(prevState => [...prevState, ...res]);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      })
      .finally(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  }, [inputValue, page]);

  const removeImages = () => {
    setImages([]);
  };

  const resetState = () => {
    setInputValue('');
    setImages([]);
    setPage(1);
    setError(null);
  };

  const toggleModal = largeImage => {
    setShowModal(!showModal);
    setLargeImage(largeImage);
  };

  const onLoadMore = event => {
    setInputValue(inputValue);
    setPage(page + 1);
  };

  return (
    <div className="container">
      <Searchbar
        onSubmitApp={setInputValue}
        removeImagesApp={removeImages}
        resetStateApp={resetState}
      />
      {status === 'pending' && <Loader />}
      {status === 'rejected' && <ErrorResponse message={error.message} />}

      <ImageGallery onOpen={toggleModal} images={images} />
      {images.length > 0 && <Button onLoadMore={onLoadMore} />}

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImage} alt={inputValue} className="LargeImg" />
        </Modal>
      )}
      <ToastContainer autoClose={2500} />
    </div>
  );
}
