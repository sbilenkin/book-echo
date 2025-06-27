import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';

function ReviewCard({ review, onEdit, onDelete }) {
    console.log('ReviewCard:', review);
    const coverUrl = `https://covers.openlibrary.org/b/id/${review.book.cover_i}-M.jpg` || null;
    return (
        <li className="list-group-item review-card">
            <div className="review-card-row">
                {coverUrl && (<img src={coverUrl}
                    alt={`Cover for ${review.book.title}`}
                    className="book-cover" />)}
                <div className="title-and-author">
                    <div><b>{review.book.title}</b></div>
                    <div>{review.book.author}</div>
                </div>
                <div className="star-rating">
                    {[...Array(5 - review.rating)].map((_, i) => (<i key={i} className="far fa-star"></i>))}
                    {[...Array(review.rating)].map((_, i) => (<i key={i} className="fas fa-star"></i>))}
                </div>
                {review.status === "draft" && (
                    <i
                        className="fas fa-pencil corner-pencil"
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            zIndex: 2
                        }}
                        onClick={onEdit}
                    />
                )}
                <i className="fas fa-trash corner-trash"
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        zIndex: 2
                    }}
                    onClick={onDelete} />
            </div>
            <div className="review-text">
                {review.comment}
            </div>
        </li>
    );
}

export default ReviewCard;