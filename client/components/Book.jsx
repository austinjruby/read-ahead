import React, { Component } from 'react';

// class Book extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     console.log(this.props);
//     return (
//       <div className={`book-${this.props.bookInfo.id}`}>
//         I am a book, bittttttttcxccccccccccccccc
//       </div>
//     );
//   }
// }

const Book = (props) => {
  const {
    id, title, author, genre, hasRead,
  } = props;
  return (
    <div className={`book book-${id}`}>
      <button className="delete-button" type="button">X</button>
      <p>{title}</p>
      <p>{author}</p>
      <p>{genre}</p>
      <button className="read-button" type="button" />
    </div>
  );
};

export default Book;
