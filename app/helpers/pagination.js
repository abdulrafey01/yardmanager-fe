export const displayData = (data, pageNumber) => {
  // Total Length
  let dataToShow = [];
  let dataLength = data.length;
  console.log(dataLength);
  //  Max to Display on single page
  let maxData = 2;
  // Start index to display data
  let dataStart = (pageNumber - 1) * maxData;
  if (dataLength > maxData) {
    let newData = data.slice(dataStart, maxData + dataStart);
    console.log(newData);
    dataToShow = newData;
  }
  // Total Number of pages
  let totalPage = Math.ceil(dataLength / maxData);

  return { dataToShow, totalPage };
};
