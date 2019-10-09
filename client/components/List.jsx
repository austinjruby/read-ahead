import React, { Component } from 'react';
import Book from './Book';

class List extends Component {
  constructor(props) {
    super(props);
    this.deleteBook = this.deleteBook.bind(this);
    this.state = {
      books: null,
    };
  }

  deleteBook(eventObj) {
    const bookId = eventObj.target.id;
    fetch(`/api/${bookId}`, {
      method: 'DELETE',
    }).then(() => {
      fetch('/api').then(response => response.json())
        .then(books => this.setState({books}))
        .catch(err => console.log(err));
      })
  }

  componentDidMount() {
    fetch('/api').then(response => response.json())
      .then(books => this.setState({books}))
      .catch(err => console.log(err));
  }

  render() {
    const booksTags = [];
    const { books } = this.state;
    if (books) {
      for (let i = 0; i < books.length; i++) {
        const {
          id, title, author, genre, hasRead,
        } = books[i];
        booksTags.push(<Book id={id} title={title} author={author} genre={genre} hasRead={hasRead} deleteBook={this.deleteBook} key={i} />);
      }
    }
    return (
      <div className="list">
        {booksTags}
      </div>
    );
  }
}

export default List;
