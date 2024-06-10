// Needed a formate date function because of unix epoch strings
export const formatDate = (timestamp) => {
    const date = new Date(Number(timestamp));
    if (isNaN(date)) {
      return 'Invalid Date';
    }
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };
  
  export const formatTime = (timestamp) => {
    const date = new Date(Number(timestamp));
    if (isNaN(date)) {
      return 'Invalid Time';
    }
    // This part should make it only do hour and minute, like 9:30 instead of 9:30:00
    const options = { hour: 'numeric', minute: 'numeric' }; 
    return date.toLocaleTimeString(undefined, options);
  };
  