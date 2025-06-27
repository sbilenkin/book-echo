import 'bootstrap/dist/css/bootstrap.css';
import ReviewCard from './ReviewCard';

function ReviewList({ reviews }) {
    return (
        <div className="ReviewList">
            {/* <h2>My Reviews</h2> */}
            <ul className="review-cards list-group">
                {reviews.map((review, index) => (<ReviewCard review={review} />))}
            </ul>
        </div>
    );
}

export default ReviewList;