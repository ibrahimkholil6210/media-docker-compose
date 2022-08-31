import "../App.css";

const Pagination = ({
    listPerPage,
    totalData,
    paginateData,
    className,
  }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalData / listPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className={className}>
        {pageNumbers.map((page, index) => (
          <button key={index} onClick={() => paginateData(page)} label={page}>
            {page}
          </button>
        ))}
      </div>
    );
  };
  

export default Pagination