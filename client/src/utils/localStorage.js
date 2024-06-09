export const getTripIds = () => {
    const savedTripIds = localStorage.getItem('saved_trips')
      ? JSON.parse(localStorage.getItem('saved_trips'))
      : [];
  
    return savedTripIds;
  };
  
  export const saveTripIds = (tripIdArr) => {
    if (tripIdArr.length) {
      localStorage.setItem('saved_trips', JSON.stringify(tripIdArr));
    } else {
      localStorage.removeItem('saved_trips');
    }
  };
  
  export const removeTripId = (tripId) => {
    const savedTripIds = localStorage.getItem('saved_trips')
      ? JSON.parse(localStorage.getItem('saved_trips'))
      : null;
  
    if (!savedTripIds) {
      return false;
    }
  
    const updatedSavedTripIds = savedTripIds?.filter((savedTripId) => savedTripId !== tripId);
    localStorage.setItem('saved_trips', JSON.stringify(updatedSavedTripIds));
  
    return true;
  };