import React, { Component } from 'react';

const Book = (props) => {
  const {
    id, title, author, genre, hasRead, deleteBook, getBookIdForUpdate
  } = props;
  return (
    <div className={`book book-${id}`}>
      <button id={id} className="delete-button" type="button" onClick={deleteBook}>X</button>
      <p>{title}</p>
      <p>{author}</p>
      <p>{genre}</p>
      <button className="read-button" type="button" />
      <button id={id} className="update-button" type="button" onClick={getBookIdForUpdate}>update</button>
    </div>
  );
};

export default Book;
