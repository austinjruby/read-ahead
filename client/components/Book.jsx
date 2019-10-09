import React, { Component } from 'react';

const Book = (props) => {
  const {
    id, title, author, genre, hasRead, deleteBook
  } = props;
  return (
    <div className={`book book-${id}`}>
      <button id={id} className="delete-button" type="button" onClick={deleteBook}>X</button>
      <p>{title}</p>
      <p>{author}</p>
      <p>{genre}</p>
      <button className="read-button" type="button" />
    </div>
  );
};

export default Book;
