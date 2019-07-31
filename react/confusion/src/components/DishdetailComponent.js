import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';

export default class dishDetail extends React.Component {
    renderDish(dish) {
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

    renderComments(dish) {
        const comments = dish && dish.comments;
        if (dish && dish.comments.length)
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

    render = () => (
        <div className="row">
            <div  className="col-12 col-md-5 m-1">
                {this.renderDish(this.props.selectedDish)}
            </div>
            <div  className="col-12 col-md-5 m-1">
                {this.renderComments(this.props.selectedDish)}
            </div>
        </div>
  
    )
}