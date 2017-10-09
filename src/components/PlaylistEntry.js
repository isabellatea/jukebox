import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';

const PlaylistEntry = (props) => {
  const handleUpVote = () => {
    props.upVote(props.Song);
  }

  const handleDownVote = () => {
    props.downVote(props.Song);
  }

  const handlePlayButtonClick = () => {
    props.handlePlay(props.Song);
  }



  return (
      <div>
        <Card style={cardStyle}>
        <FloatingActionButton style={indexStyle}>{props.index}</FloatingActionButton>
          <CardMedia>
            <img src={props.Song.image} alt="" />
          </CardMedia>
          <CardTitle title={props.Song.name} subtitle={props.Song.artist} />
          <CardText>
            Added by: {props.Song.userName}
          </CardText>
          <CardActions>
            <div style={divStyle}>
              <FloatingActionButton style={buttonStyle} onClick={handleUpVote} mini={true}>
                +{props.Song.upVoteCount}
              </FloatingActionButton>
              <FloatingActionButton style={buttonStyle} onClick={handleDownVote} mini={true} secondary={true}>
                -{props.Song.downVoteCount}
              </FloatingActionButton>
            </div>
          </CardActions>
      </Card>
    </div>
  )
}

export default PlaylistEntry;