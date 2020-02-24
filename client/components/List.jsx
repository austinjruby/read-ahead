import React, { Component } from 'react';
import Book from './Book';

class List extends Component {
  constructor(props) {
    super(props);
    this.addBook = this.addBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.readBook = this.readBook.bind(this);
    this.state = {
      updateBookId: null,
      books: null,
    };
  }

  componentDidMount() {
    fetch(`/api/${this.props.userId}`)
      .then((response) => response.json())
      .then((books) => this.setState({ books }))
      .catch((err) => console.log(err));
  }

  addBook(eventObj) {
    eventObj.preventDefault();
    const form = document.querySelector('.add-book-form');
    const title = form.title.value;
    const author = form.author.value;
    const myBody = {
      userId: this.props.userId,
      title,
      author,
    };
    // console.log(myBody)
    fetch('/api', {
      method: 'POST',
      body: JSON.stringify(myBody),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
      .then((books) => this.setState({ books }))
      .catch((err) => console.log(err));
  }

  deleteBook(eventObj) {
    const bookId = eventObj.target.id;
    const myBody = {
      userId: this.props.userId,
      bookId,
    };
    fetch('/api/', {
      method: 'DELETE',
      body: JSON.stringify(myBody),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
      .then((books) => this.setState({ books }))
      .catch((err) => console.log(err));
  }

  readBook(eventObj) {
    const bookId = eventObj.target.id;
    const myBody = {
      userId: this.props.userId,
      bookId,
    };
    fetch('/api', {
      method: 'PATCH',
      body: JSON.stringify(myBody),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
      .then((books) => this.setState({ books }))
      .catch((err) => console.log(err));
  }

  render() {
    const booksTags = [];
    const { books } = this.state;
    if (books) {
      for (let i = 0; i < books.length; i++) {
        const {
          id, title, author, genre, read,
        } = books[i];
        booksTags.push(<Book id={id} title={title} author={author} genre={genre} read={read} deleteBook={this.deleteBook} readBook={this.readBook} key={`book${i}`} />);
      }
    }
    return (
      <div className="list">
        <form className="add-book-form">
          Title:
          <input type="text" name="title" />
          Author:
          <input type="text" name="author" />
          <input type="submit" value="Add Book" onClick={this.addBook} />
        </form>
        {booksTags}
      </div>
    );
  }
}

export default List;
