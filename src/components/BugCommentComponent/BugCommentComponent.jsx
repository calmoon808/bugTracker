import React, { useState, useEffect } from 'react';
import { Comment, Header, Form, Button, Icon } from "semantic-ui-react";
import { timeToMeta, postComment, getBugComments } from '../../actions';
import { useAuth } from "../../context/auth";
import styles from "./BugCommentComponent.module.scss";

const BugCommentComponent = (props) => {
  const { authTokens } = useAuth();
  const [newComment, setNewComment] = useState("");
  const [bugComments, setBugComments] = useState([]);

  useEffect(() => {
    getBugComments(props.bugId)
    .then((response) => {
      setBugComments(response);
    })
  }, [props.bugId])

  const mapComments = (commentsArr) => {
    if (commentsArr.length === 0) {
      return (
        <div className={styles.noComments}>
          <Icon className={styles.icon} size="massive" name="comment outline" />
          <br/><br/>
          <p>Add a comment below</p>
        </div>
      )
    }
    return commentsArr.map(comment => {
      return (
        <Comment key={comment.id}>
          <Comment.Content>
            <Comment.Author as='a'>{`${comment.poster.first_name} ${comment.poster.last_name}`}</Comment.Author>
            <Comment.Metadata>
              <div>{timeToMeta(comment.created_at)}</div>
            </Comment.Metadata>
            <Comment.Text>
              {comment.comment}
            </Comment.Text>
          </Comment.Content>
        </Comment>
      )
    })
  }

  const handleCommentSubmit = (e) => {
    if (!newComment) return false;
    let commentData = {
      bug_id: props.bugId,
      poster_id: authTokens.id,
      comment: newComment
    };
    postComment([commentData, props.projectId])
    .then(() => {
      getBugComments(props.bugId)
      .then((response) => {
        setBugComments(response);
      })
    })
    setNewComment("");
  }

  return (
    <Comment.Group className={styles.comments}>
      <Header as='h3' dividing>
        Comments
      </Header>
      <div className={styles.commentContainer}>
        {mapComments(bugComments)}
      </div>
      <Form onSubmit={handleCommentSubmit}>
        <Form.TextArea
          value={newComment} 
          onChange={(e) => setNewComment(e.target.value)}
          />
        <Button 
          content='Add Comment' 
          labelPosition='right' 
          icon='edit' 
          primary  
        />
      </Form>
    </Comment.Group>
  );
};

export default BugCommentComponent;