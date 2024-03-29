import "./contact.css";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ContactImage from "../../assets/img/Mail-sent.svg";
import "animate.css";
import TrackVisibility from "react-on-screen";

interface FormDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export const Contact: React.FC = () => {
  const formInitialDetails: FormDetails = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  };

  const [formDetails, setFormDetails] =
    useState<FormDetails>(formInitialDetails);
  const [buttonText, setButtonText] = useState<string>("Send");
  const [status, setStatus] = useState<{ success: boolean; message: string }>({
    success: false,
    message: "",
  });

  const onFormUpdateHandler = (category: keyof FormDetails, value: string) => {
    setFormDetails({
      ...formDetails,
      [category]: value,
    });
  };

  const submitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonText("Sending...");
    let response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(formDetails),
    });
    setButtonText("Send");
    let result = await response.json();
    setFormDetails(formInitialDetails);
    if (result.code === 200) {
      setStatus({ success: true, message: "Message sent successfully" });
    } else {
      setStatus({
        success: false,
        message: "Something went wrong, please try again later.",
      });
    }
  };

  return (
    <section className="contact" id="contact">
      <Container>
        <Row className="alein-item-center">
          <h2 className="title">Get in touch</h2>
          <Col xs={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <img
                  className={
                    isVisible ? "animate__animated animate__rotateIn" : ""
                  }
                  src={ContactImage}
                  alt="Contact Us"
                />
              )}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__rotateIn" : ""
                  }
                >
                  <form className="form" onSubmit={submitFormHandler}>
                    <Row>
                      <Col xs={12} sm={6} className="px-1">
                        <input
                          type="text"
                          value={formDetails.firstName}
                          placeholder="First Name"
                          onChange={(e) =>
                            onFormUpdateHandler("firstName", e.target.value)
                          }
                        />
                      </Col>
                      <Col xs={12} sm={6} className="px-1">
                        <input
                          type="text"
                          value={formDetails.lastName}
                          placeholder="Last Name"
                          onChange={(e) =>
                            onFormUpdateHandler("lastName", e.target.value)
                          }
                        />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="email"
                          defaultValue={formDetails.email}
                          placeholder="Please enter your email address"
                          onChange={(e) =>
                            onFormUpdateHandler("email", e.target.value)
                          }
                        />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="tel"
                          defaultValue={formDetails.phone}
                          placeholder="Please enter your phone number"
                          onChange={(e) =>
                            onFormUpdateHandler("phone", e.target.value)
                          }
                        />
                      </Col>
                      <Col>
                        <textarea
                         
                          defaultValue={formDetails.message}
                          placeholder="Please enter your message"
                          onChange={(e) =>
                            onFormUpdateHandler("message", e.target.value)
                          }
                        ></textarea>
                        <button type="submit">
                          <span>{buttonText}</span>
                        </button>
                      </Col>
                      <Col>
                        <p
                          className={
                            status.success === false ? "danger" : "success"
                          }
                        >
                          {status.message}
                        </p>
                      </Col>
                    </Row>
                  </form>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
