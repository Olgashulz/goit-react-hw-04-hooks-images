export const fetchImages = async (inputValue, page) => {
  const dataImages = await fetch(
    `https://pixabay.com/api/?key=10507999-623e060cae639baa9b9819f90&q=${inputValue}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject({
      error: new Error(`Your request ${inputValue} did not return any results`),
    });
  });
  return dataImages.hits;
};
