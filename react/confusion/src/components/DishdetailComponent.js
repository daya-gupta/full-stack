import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

import { Modal, ModalHeader, ModalBody, Row, Col, Label, Button } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            name: '',
            rating: '',
            comment: '',
        }
    }

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit = (values) => {
        console.log(values);
        alert(JSON.stringify(values));
    }

    render() {
        return (
            <div className="">
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={this.handleSubmit}>
                            <Row className="form-group">
                                <Col xl={12}><Label htmlFor="rating">Rating</Label></Col>
                                <Col xl={12}>
                                    <Control.select
                                        model=".rating"
                                        id="rating"
                                        name="rating"
                                        className="form-control"
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col xl={12}><Label htmlFor="name">Your Name</Label></Col>
                                <Col xl={12}>
                                    <Control.text
                                        model=".name"
                                        name="name"
                                        id="name"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            
                            <Row>
                                <Col xl={12}><Label htmlFor="comment">Comment</Label></Col>
                                <Col xl={12}>
                                    <Control.textarea
                                        model=".comment"
                                        name="comment"
                                        id="comment"
                                        validators={{
                                            minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                        style={{ width: '100%', minHeight: '80' }}
                                    />
                                </Col>
                            </Row>
                            <Button className="mt-2" type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

function RenderDish({dish} = {dish: null}) {
    if (dish != null)
        return(
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    else
        return(
            <div></div>
        );
}

function RenderComments({comments} = { comments: [] }) {
    if (comments && comments.length)
        return(
            <div>
                <h4>Comments</h4>
                {comments.map(item => {
                    const date = new Date(item.date);
                    const formattedDate = date.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric' })
                    return (
                        <li className="list-unstyled" key={item.id}>
                            <p>{item.comment}</p>
                            <p>-- {item.author} , {formattedDate}</p>
                        </li>
                    )
                })}
                <CommentForm />
            </div>
        );
    else
        return(
            <div></div>
        );
}

const DishDetail = (props) => {
    return (
        <div className="container">
        <div className="row">
            <Breadcrumb>
                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{(props.dish||{}).name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{(props.dish||{}).name}</h3>
                <hr />
            </div>                
        </div>
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish={props.dish} />
            </div>
            <div className="col-12 col-md-5 m-1">
                <RenderComments comments={props.comments} />
            </div>
        </div>
        </div>
    );
}

export default DishDetail;