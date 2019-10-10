import React, { Component } from 'react';
import Book from './Book';

class List extends Component {
  constructor(props) {
    super(props);
    this.addBook = this.addBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.updateBook = this.updateBook.bind(this);
    this.getBookIdForUpdate = this.getBookIdForUpdate.bind(this);
    this.state = {
      updateBookId: null,
      books: null,
    };
  }

  addBook(eventObj) {
    eventObj.preventDefault();
    const form = document.querySelector('.add-book-form');
    const title = form.title.value;
    const author = form.author.value;
    const genre = form.genre.value;
    const myBody = {
      userId: this.props.userId,
      title: title,
      author: author,
      genre: genre
    }
    // console.log(myBody)
    fetch('/api', {
      method: 'POST',
      body: JSON.stringify(myBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(books => this.setState({books}))
      .catch(err => console.log(err))
  }
  
  deleteBook(eventObj) {
    const bookId = eventObj.target.id;
    const myBody = {
      userId: this.props.userId,
      bookId: bookId,
    }
    fetch(`/api/`, {
      method: 'DELETE',
      body: JSON.stringify(myBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(books => this.setState({books}))
      .catch(err => console.log(err));
  }

  updateBook(eventObj) {
    eventObj.preventDefault();
    const form = document.querySelector('.update-book-form');
    const title = form.title.value;
    const author = form.author.value;
    const genre = form.genre.value;
    const myBody = {
      title: title,
      author: author,
      genre: genre
    }
    fetch(`/api/${this.state.updateBookId}`, {
      method: 'PATCH',
      body: JSON.stringify(myBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(books => this.setState({books}))
      .catch(err => console.log(err))
  }

  getBookIdForUpdate(eventObj) {
    const updateBookId = eventObj.target.id;
    this.setState({updateBookId});
  }

  componentDidMount() {
    fetch(`/api/${this.props.userId}`)
      .then(response => response.json())
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
        booksTags.push(<Book id={id} title={title} author={author} genre={genre} hasRead={hasRead} deleteBook={this.deleteBook} getBookIdForUpdate={this.getBookIdForUpdate} key={`book${i}`} />);
      }
    }
    console.log(this.state);
    return (
      <div className="list">
        <form className="add-book-form">
          Title:
          <input type="text" name="title"/>
          Author:
          <input type="text" name="author"/>
          Genre (optional)
          <input type="text" name="genre"/>
          <input type="submit" value="Add Book" onClick={this.addBook}/>
        </form>
        {booksTags}
        <form className="update-book-form">
          Title:
          <input type="text" name="title"/>
          Author:
          <input type="text" name="author"/>
          Genre (optional)
          <input type="text" name="genre"/>
          <input type="submit" value="Update Book" onClick={this.updateBook}/>
        </form>
      </div>
    );
  }
}

export default List;
