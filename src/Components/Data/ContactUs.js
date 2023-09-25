import {  Container, Form } from "react-bootstrap";
import { useState, useRef, useContext } from "react";
import './styleSheet.css';
import ExpenseContext from "../Store/ExpenseContext";

function ContactUs() {
  const [showForm, setShowMessege] = useState(false)
  const nameRef = useRef('');
  const emailRef = useRef('');
  const teleRef = useRef('');
  const messageRef = useRef('');
  const ctx = useContext(ExpenseContext)

  const addAFormHandler = (event) => {
    event.preventDefault();
    const user = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      number: teleRef.current.value,
      message: messageRef.current.value,
    }

    console.log(user);
    ctx.contactForm(user)
    teleRef.current.value = '';
    nameRef.current.value = '';
    emailRef.current.value = '';
    messageRef.current.value = "";

  }
  const showFormHandler = () => {
    setShowMessege(true);
  }

  return (
    <div className="contactbackground">
      <Container>
        <h2 className="contacthead">Facing any issue Or Want to give feedback</h2>
        {
          !showForm &&
          <button className="contactbtn" onClick={showFormHandler}>
            feel free to connect
          </button>
        }

        {
          showForm &&
          <Form onSubmit={addAFormHandler}>
            <div className="FormContact">
              <Form.Group controlId="formName">
                <Form.Control
                  type="text"
                  name="name"
                  ref={nameRef}
                  placeholder="Enter Name"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Control
                  type="email"
                  name="email"
                  ref={emailRef}
                  placeholder="enter Email Address"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formMessage">
                <Form.Control
                  as="textarea"
                  name="message"
                  ref={messageRef}
                  rows={4}
                  placeholder=" Type Message Here"
                  required
                />
              </Form.Group>
            </div>
            <br />
            <button className="contactbtn" type="submit">
              Send Message
            </button>
          </Form>

        }
        <hr />

      </Container>
    </div>
  );
}

export default ContactUs;
