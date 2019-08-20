import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

import { Modal, ModalHeader, ModalBody, Row, Col, Label, Button } from 'reactstrap';
import { Control, LocalForm, Errors, actions } from 'react-redux-form';
// import { Control, Form, Errors, actions } from 'react-redux-form';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            author: '',
            rating: '',
            comment: '',
        }
    }

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    // handleSubmit = (values) => {
    //     console.log(values);
    //     alert(JSON.stringify(values));
    // }

    handleSubmit = (values) => {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        // event.preventDefault();
    }

    render() {
        const { props } = this;
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
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
                                <Col xl={12}><Label htmlFor="author">Your Name</Label></Col>
                                <Col xl={12}>
                                    <Control.text
                                        model=".author"
                                        name="author"
                                        id="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
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
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
        );
    else
        return(
            <div></div>
        );
}

function RenderComments({comments, postComment, dishId}) {
    if (comments && comments.length)
        return(
            <div>
                <h4>Comments</h4>
                <Stagger in>
                    {comments.map((comment) => {
                        return (
                            <Fade in>
                            <li key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                            </li>
                            </Fade>
                        );
                    })}
                </Stagger>
                <CommentForm dishId={dishId} postComment={postComment} />
            </div>
        );
    else
        return(
            <div></div>
        );
}

const DishDetail = (props) => {
    if (!props.dish) {
        return null;
    }
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
                <RenderComments comments={props.comments}
                    postComment={props.postComment}
                    dishId={props.dish.id}
                />
            </div>
        </div>
        </div>
    );
}

export default DishDetail;