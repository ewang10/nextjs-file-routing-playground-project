import classes from './comment-list.module.css';

const CommentList = ({ comments }) => (
    <ul className={classes.comments}>
        {
            comments.map(({ _id, text, name }) => (
                <li key={_id}>
                    <p>{text}</p>
                    <div>
                        By <address>{name}</address>
                    </div>
                </li>
            ))
        }
    </ul>
);

export default CommentList;
