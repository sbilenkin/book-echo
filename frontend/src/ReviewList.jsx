import 'bootstrap/dist/css/bootstrap.css';
import ReviewCard from './ReviewCard';

function ReviewList({ reviews }) {
    return (
        <div className="ReviewList">
            <h2>My Reviews</h2>
            {/* <ul className="review-cards list-group">
                {reviews.map((review, index) => {<ReviewCard review={review} />})}
            </ul> */}
            {reviews.length > 0 && <div>test!!!!!</div>}
        </div>
    );
}

export default ReviewList;