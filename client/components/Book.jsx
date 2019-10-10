import React, { Component } from 'react';

const Book = (props) => {
  const {
    id, title, author, genre, read, deleteBook, readBook
  } = props;
  return (
    <div className={`book book-${id}`}>
      <button id={id} className="delete-button" type="button" onClick={deleteBook}>X</button>
      <p>{title}</p>
      <p>{author}</p>
      <p>{genre}</p>
      <button id={id} className={`read-button-${read}`} type="button" onClick={readBook}/>
    </div>
  );
};

export default Book;
