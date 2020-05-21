import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, Modal, StyleSheet, Button } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';
import { postComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  }
}

const mapDispatchToProps = dispatch => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
});

function RenderDish(props) {
  const dish = props.dish;

  if (dish != null) {
    return(
      <Card
          featuredTitle={dish.name}
          image={{uri: baseUrl + dish.image}}>
          <Text style={{margin: 10}}>
              {dish.description}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'center',}}>
            <Icon
                raised
                reverse
                name={ props.favorite ? 'heart' : 'heart-o'}
                type='font-awesome'
                color='#f50'
                onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
             />
             <Icon
                 raised
                 reverse
                 name='pencil'
                 type='font-awesome'
                 color='#512DA8'
                 onPress={() => props.toggleCommentModal() }
              />
            </View>
      </Card>

    );
  } else {
    return(<View></View>);
  }
}

function RenderComments(props) {
  const comments = props.comments;

  const renderCommentItem = ({item, index}) => {

      return (
          <View key={index} style={{margin: 10}}>
              <Text style={{fontSize: 14}}>{item.comment}</Text>
              <Rating
                readonly
                ratingCount={5}
                imageSize={15}
                style={{paddingVertical: 5, flexDirection: 'row', justifyContent: 'flex-start'}}
                startingValue={item.rating}
              />
              <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
          </View>
      );
  };


  return(
    <Card title="Comments">
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={item => item.id.toString()}
      />
    </Card>
  );
}


class DishDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showCommentModal: false,
      rating: 1,
      author: '',
      comment: ''
    }

    this.toggleCommentModal = this.toggleCommentModal.bind(this);
    this.ratingCompleted = this.ratingCompleted.bind(this);
  }

  markFavorite(dishId) {
    //console.log("DishID: " + dishId);
    this.props.postFavorite(dishId);
  }

  toggleCommentModal() {
    this.setState({ showCommentModal: !this.state.showCommentModal });
  }

  ratingCompleted(rating) {
    this.setState({
      'rating': rating
    });
  }

  handleComment(dishId) {
    // Close modal window
    this.toggleCommentModal();

    // Output for debugging
    //console.log(JSON.stringify(this.state));
    //console.log("DishID: " + dishId);

    // Post to reducer
    this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
  }

  static navigationOptions = {
    title: 'Dish Details'
  }

  render() {
    const { dishId } = this.props.route.params;

    return(
      <ScrollView>
          <RenderDish dish={this.props.dishes.dishes[+dishId]}
              favorite={this.props.favorites.some(el => el === dishId)}
              onPress={() => this.markFavorite(dishId)}
              toggleCommentModal={this.toggleCommentModal}
              />
          <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
          <Modal animationType = {"slide"} transparent = {false}
                  visible = {this.state.showCommentModal}
                  onRequestClose = {() => this.toggleModal() }>
            <View style={styles.modal}>
              <Rating
                showRating
                ratingCount={5}
                style={{ paddingVertical: 10 }}
                startingValue={this.state.rating}
                onFinishRating={this.ratingCompleted}
              />
              <Input
                placeholder='Author'
                value={this.state.author}
                onChangeText={(text) => this.setState({author: text})}
                leftIcon={
                  <Icon
                    name='user'
                    type='font-awesome'
                    size={24}
                    color='black'
                    containerStyle={{margin: 10}}
                  />
                }
              />
              <Input
                placeholder='Comment'
                value={this.state.comment}
                onChangeText={(text) => this.setState({comment: text})}
                leftIcon={
                  <Icon
                    name='comments'
                    type='font-awesome'
                    size={24}
                    color='black'
                    containerStyle={{margin: 10}}
                  />
                }
              />
              <Button
                onPress={() => { this.handleComment(dishId); } }
                color='#512DA8'
                raised
                title='Submit'
              />
              <Button
                onPress={() => { this.toggleCommentModal(); } }
                title='Cancel'
              />
            </View>
          </Modal>
      </ScrollView>
    );
  }


}

const styles = StyleSheet.create({
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20
  },
  formLabel: {
    fontSize: 18,
    flex: 2
  },
  formItem: {
    flex: 1
  },
  modal: {
    justifyContent: 'center',
    margin: 20
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#512DA8',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20
  },
  modalText: {
    fontSize: 18,
    margin: 10
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);