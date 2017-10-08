import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


const SearchEntry = (props) => {
  const clickHandler = () => {
    props.onAdd(props.Result);
  }

  return(
    <div>
      <Card className='cardStyle'>
        <CardMedia>
          <img src={props.Result.image} alt="" />
        </CardMedia>
        <CardTitle title={props.Result.name} subtitle={props.Result.artists[0].name} />
        <CardActions>
          <div>
            <FloatingActionButton onClick={clickHandler} mini={true}>
              <ContentAdd />
            </FloatingActionButton>
          </div>
        </CardActions>
      </Card>
    </div>
  )
}

export default SearchEntry;