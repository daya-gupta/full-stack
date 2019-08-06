import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

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