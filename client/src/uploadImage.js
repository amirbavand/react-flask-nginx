import React, { Component } from 'react';
import axios from 'axios';


class ReactUploadImage extends Component {

    state = {
        file: null,
        xtoken: null
      };
    

    constructor(props) {
        super(props);

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        console.log('hi');
        const token = localStorage.getItem('challange_token');
        console.log(token);
        this.state.xtoken=token;

    }


    onFormSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        console.log(this.state.xtoken);
        formData.append('myImage',this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'x-access-token': this.state.xtoken
            }
        };
        axios.post("api/upload",formData,config)
        .then((response) => {
            console.log(response.data)
        //    alert("The file is successfully uploaded");
        }).catch((error) => {
    });




    }
    onChange(e) {
        this.setState({file:e.target.files[0]});
        console.log(e.target.files[0]);
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <h1>File Upload</h1>
                <input type="file" name="myImage" onChange= {this.onChange} />
                <button type="submit">Upload</button>
            </form>
        )
    }
}

export default ReactUploadImage
