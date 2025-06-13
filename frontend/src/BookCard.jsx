import 'bootstrap/dist/css/bootstrap.css';

function BookCard({ book }) {
    return (
        <li className="list-group-item book-card">
            <div className="book-card-row">
                <div className="book-card-info">
                    <h5 className="book-title">{book.title}</h5>
                    <p className="book-author">Author: {book.author}</p>
                </div>
                <button className="btn btn-secondary book-select-button">Select</button>
            </div>
        </li>
    );
}

export default BookCard;