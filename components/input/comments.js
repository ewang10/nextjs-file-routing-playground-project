import { useContext, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import NotificationContext from '../../store/notification-context';
import classes from './comments.module.css';

const Comments = ({ eventId }) => {
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [isFetchingComments, setIsFetchingComments] = useState(false);
    const notificationContext = useContext(NotificationContext);

    useEffect(() => {
        if (showComments) {
            setIsFetchingComments(true);

            fetch(`/api/comments/${eventId}`)
            .then((res) => res.json())
            .then(({ comments }) => {
                setIsFetchingComments(false);
                setComments(comments)
            });
        }
    }, [showComments]);

    const toggleCommentsHandler = () => {
        setShowComments((prevStatus) => !prevStatus);
    }

    const addCommentHandler = (commentData) => {
        notificationContext.showNotification({
            title: 'Sending comment...',
            message: 'Your comment is currently being stored.',
            status: 'pending'
        });

        fetch(`/api/comments/${eventId}`, {
            method: 'POST',
            body: JSON.stringify(commentData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }

            return res.json().then((data) => {
               throw new Error(data.message || 'Something went wrong!'); 
            });
        })
        .then((data) => {
            notificationContext.showNotification({
                title: 'Success!',
                message: 'Your comment was saved!',
                status: 'success'
            });
        })
        .catch((error) => {
            notificationContext.showNotification({
                title: 'Error!',
                message: error.message || 'Something went wrong!',
                status: 'error'
            });
        });
    }

    return (
        <section className={classes.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? 'Hide' : 'Show'} Comments
            </button>
            {showComments && <NewComment onAddComment={addCommentHandler} />}
            {showComments && !isFetchingComments && <CommentList comments={comments} />}
            {showComments && isFetchingComments && <p>Loading...</p>}
        </section>
    );
}

export default Comments;
