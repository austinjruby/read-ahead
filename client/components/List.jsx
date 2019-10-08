import React, { Component } from 'react';
import Book from './Book';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [
        {
          id: 1,
          title: 'The Painted Bird',
          author: 'Jerzy Kosinski',
          genre: null,
          hasRead: false,
        },
        {
          id: 2,
          title: 'Men Without Women',
          author: 'Ernest Hemingway',
          genre: 'literary fiction',
          hasRead: false,
        },
      ],
    };
  }

  render() {
    const booksTags = [];
    const { books } = this.state;
    for (let i = 0; i < books.length; i++) {
      const {
        id, title, author, genre, hasRead,
      } = books[i];
      booksTags.push(<Book id={id} title={title} author={author} genre={genre} hasRead={hasRead} key={id} />);
    }
    return (
      <div className="list">
        {booksTags}
      </div>
    );
  }
}

export default List;
