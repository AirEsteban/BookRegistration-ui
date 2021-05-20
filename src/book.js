import React, { useState } from 'react';
const Book = (props) => {
    const [allBooks, setAllBooks] = useState([])
    const [newBook, setNewBook] = useState({
        id:0,
        title: ''
    })
    const [isUpdated,setIsUpdated] = useState(false)
    const getBooks = () => {
        fetch("http://localhost:5000/api/books").then(async res => res.json())
        .then(result => setAllBooks(result))
        .then(result => setIsUpdated(false))
        .then(setNewBook({id:0, title:''}))
        .catch(console.log);
    };
    const setBook = (e) => {
        setNewBook({
            id: newBook.id,
            title: e.target.value
        });
    }
    const addBook = () =>{
        fetch("http://localhost:5000/api/books/addOneBook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBook)
        })
        .then(setNewBook({id: 0, title:''}))
        .then(getBooks())
    }

    const getBookId = (e, bookId) => {
        fetch("http://localhost:5000/api/books/" + parseInt(bookId)).then(async res => res.json())
        .then(result => {setNewBook({
            id: parseInt(bookId),
            title: result[0].name,
        })}).then(result => {setIsUpdated(true)})
        .catch(console.log);
    }

    const updateBook = () =>{
        fetch("http://localhost:5000/api/books/" + newBook.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBook)
        }).then(
            getBooks()
        )
    }

    const deleteBookId = (e, bookId) => {
        // code here
        return 0;
    }
    return  (
    <div className="container">
        <span className="title-bar">
            <button type="button" className="btn btn-primary" onClick={() => getBooks()}>Get Books</button>
            <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Book</button>
        </span>
        <table className="table table-straped">
            <thead>
                <tr>
                    <td>#</td>
                    <td>Title</td>
                    <td>Action</td>
                </tr>
            </thead> 
            <tbody>
                {
                    allBooks && allBooks.map(book => (
                    <tr key={book.id}>
                        <td>{book.id}</td>
                        <td>{(book.name === "") ? book.name : book.title}</td>
                        <td>
                            <button type="button" onClick={(e) => getBookId(e, book.id)} className="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Update
                            </button>
                            <button type="button" onClick={(e) => deleteBookId(e, book.id)} className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Delete
                            </button>
                        </td>
                    </tr>
                    ))
                }
            </tbody>
        </table>
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <label htmlFor="title">Title: </label>
                <input type="text" id="title" name="title" placeholder="Title" 
                    value={newBook.title} onChange={(event) => setBook(event)}></input>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" onClick={() => (isUpdated) ? updateBook() : addBook()} className="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
        </div>
    </div>
    );
}; 
export default Book;