import React from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Input,
  ModalFooter,
  Button,
} from "reactstrap";

const PostModal = ({ isOpen, toggle, mode, onSubmit, onChange, post }) => {
  return (
    <Modal centered isOpen={isOpen}>
      <ModalHeader toggle={toggle}>{mode} Post</ModalHeader>
      <ModalBody>
        {mode === "Delete" ? (
          <h4>Are you sure you want to delete?</h4>
        ) : (
          <>
            <Input
              type="text"
              name="title"
              value={post.title}
              onChange={onChange}
              placeholder="Enter Post Title"
              required
            />
            <br />
            <Input
              type="number"
              name="userId"
              value={post.userId}
              onChange={onChange}
              placeholder="Enter User Id"
              required
            />
            <br />
            <Input
              type="textarea"
              name="body"
              value={post.body}
              onChange={onChange}
              placeholder="Enter Post Body"
              required
            />
            <br />
          </>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>{" "}
        <Button
          color="primary"
          onClick={onSubmit}
          disabled={!post.userId || !post.title || !post.body}
        >
          {mode === "Delete" ? "Continue" : "Submit"}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default PostModal;
