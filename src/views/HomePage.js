import React from 'react';
import { Paper, Grid, Typography, IconButton, 
        InputBase, Button, CircularProgress
} from '@material-ui/core';
import Arrow from '@material-ui/icons/Search';
import MoneyRounded from '@material-ui/icons/MoneyRounded';
import ListIcon from '@material-ui/icons/List';
import DirectionsIcon from '@material-ui/icons/Directions';
import ImageIcon from '@material-ui/icons/Image';
import MaskedInput from 'react-text-mask';
import axios from 'axios';

// input form
function TextMaskCustom(props) {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={ref => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
}

let youtubes = [
    {
        title : "PyTorch in 5 Minutes",
        image : "https://www.analyticsindiamag.com/wp-content/uploads/2018/12/Pytorch-banner-main.png"
    },
    {
        title : "Applied Deep Learning with PyTorch - Full Course",
        image : "https://www.analyticsindiamag.com/wp-content/uploads/2018/12/Pytorch-banner-main.png"
    }
]


export default class HomePage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            clicked: false,
            subtopics: []
        }
    }

    handleSubmit = (event) => {
        const {query} = this.state;

        this.setState({subtopics:[]});

        axios.post(`https://cors-anywhere.herokuapp.com/https://0e50cdc2.ngrok.io/post`,{
            query : query
        })
        .then((response) => 
            this.setState({subtopics: response.data.subtopics}))
        
          .catch(function (error) {
            console.log(error);
          });

        this.setState({clicked: true})
        event.preventDefault();
    }

    

    handleChange = (event) => {
        this.setState({ query: event.target.value });
        // this.setState({ textmask: event.target.value });
        // let y = this.state.textmask.replace(/^\|+\|(\|-\|)|\|+$/g, '');
    }

    renderTopics = (props,index) => (
        <Button key={index} style={{marginLeft: '1%', marginTop:'2%'}} variant="contained">
            {props}
        </Button>
    )

    renderYoutube = () => {
            return youtubes.map((youtube,index) => {
                return (
                    <div key={index} className="home-card">
                        <img className="home-card-img" src={youtube.image} alt=""/>

                        <div className="home-card-text">
                            <h3 className="home-h3">{youtube.title}</h3>
                            {/* <h4 className="home-h4">{youtube.date}</h4>
                            <p className="home-p">{youtube.content}</p> */}
                        </div>
                    </div>
                );
            });
    }
    render(){
        return(
            <div style={{flex: 1}}>
            <div className="home-top-paper"> 
                <Grid container direction="column" style={{paddingTop: '5%'}} alignItems="center">
                <h1 className="home-header">Finding Resources?</h1>
                {/* <p className="home-header">
                    Enter here! 
                </p> */}
                <Paper className="home-paper-search">
                <form onSubmit={this.handleSubmit}>
                    <IconButton className="home-iconButton" aria-label="Menu">
                    </IconButton>
                        {/* <Input
                            value={textmask}
                            onChange={this.handleChange}    
                            id="formatted-text-mask-input"
                            inputComponent={TextMaskCustom}
                        /> */}
                    <InputBase className="home-input" onChange={this.handleChange} placeholder='Enter here' />
                    
                    <IconButton onClick={this.handleSubmit} color="primary" className="home-iconButton" aria-label="Directions">
                        <Arrow />
                    </IconButton>
                </form>
                </Paper>
                {
                    this.state.clicked && this.state.subtopics.length < 1 &&
                    <div style={{marginTop: "3%"}}>
                        <CircularProgress/>
                    </div>
                    }
                {
                    this.state.subtopics.length > 0 &&
                    <div>
                        <Grid container direction="row" justify="center" style={{ flexGrow: 1}}>
                            {   
                                this.state.subtopics.map((topic,index) => (this.renderTopics(topic,index)))
                            }
                        </Grid>
                        <Grid container justify="center" >
                            <Paper className="poor-divider"/>
                        </Grid>
                        <Grid container style={{paddingTop: '3%', paddingLeft:'2%'}}>
                            <h1 style={{paddingBottom:"1%", color:"white"}}>Top Videos</h1> 
                            {
                                this.renderYoutube()
                            }
                        </Grid>
                    </div>
                } 
                </Grid>
            </div>
            <div className="home-middle-paper">
                <Grid container direction="column" alignItems="center">
                    <Typography variant='h3' style={{marginTop: '10%', color:'white'}}>How It Works</Typography>
                    <p className="home-middle-subheader">
                        Something....
                    </p>
                    <Grid style={{marginTop: '10%'}} container direction="row" justify="space-evenly" alignItems="center">
                    <Paper className="home-paper-card">
                        <Grid container direction="column" justify="space-evenly" style={{marginLeft: '10%'}}>
                            <MoneyRounded style={{fontSize: 70, marginTop: '7%'}} />
                            <Typography variant='h4' style={{marginTop: '7%'}}>Something....</Typography>
                            <Typography variant='subtitle1' style={{marginTop: '7%'}}>Something</Typography>
                        </Grid>
                    </Paper>
                    <Paper className="home-paper-card">
                        <Grid container direction="column" justify="space-evenly" style={{marginLeft: '10%'}}>
                            <DirectionsIcon style={{fontSize: 70, marginTop: '7%'}} />
                            <Typography variant='h4' style={{marginTop: '7%'}}>Something....</Typography>
                            <Typography variant='subtitle1' style={{marginTop: '7%'}}>Something</Typography>
                        </Grid>
                    </Paper>
                    <Paper className="home-paper-card">
                        <Grid container direction="column" justify="space-evenly" style={{marginLeft: '10%'}}>
                            <ListIcon style={{fontSize: 70, marginTop: '7%'}} />
                            <Typography variant='h4' style={{marginTop: '7%'}}>Something....</Typography>
                            <Typography variant='subtitle1' style={{marginTop: '7%'}}>Something....</Typography>
                        </Grid>
                    </Paper>
                    </Grid>
                </Grid>
            </div>
            </div>
        )
    }
}
