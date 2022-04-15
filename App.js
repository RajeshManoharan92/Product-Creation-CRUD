import React from "react";
import axios from "axios";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Grid } from "@mui/material";
import TextField from '@mui/material/TextField';
import './index.css'


class CRUD extends React.Component {

  constructor() {
    super();
    this.state = {
      Product: [],
      ProductName: '',
      Productcompany: '',
      Productprice: '',
      id: '',
    }
  }

  async componentDidMount() {
    var response = await axios.get('https://62530f93c534af46cb933fa1.mockapi.io/Product/Products')
    await this.setState({ Product: response.data })

  }

  render() {
    const onsubmit = async (e) => {
      e.preventDefault()

      if (this.state.id) {
        var response = await axios.put(`https://62530f93c534af46cb933fa1.mockapi.io/Product/Products/${this.state.id}`,
          {
            ProductName: this.state.ProductName,
            Productcompany: this.state.Productcompany,
            Productprice: this.state.Productprice
          })
        var index = this.state.Product.findIndex((row) => row.id === this.state.id)
        var Product = [...this.state.Product]
        Product[index] = response.data
        this.setState({ Product, ProductName: '', Productcompany: '', Productprice: '' })
      }
      else {
        var post = await axios.post('https://62530f93c534af46cb933fa1.mockapi.io/Product/Products', {
          ProductName: this.state.ProductName,
          Productcompany: this.state.Productcompany,
          Productprice: this.state.Productprice
        })
        var Product = [...this.state.Product];
        Product.push(post.data);
        this.setState({ Product, ProductName: '', Productcompany: '', Productprice: '' });
      }
    }

    const Update = async (id) => {
      var selectedData = await this.state.Product.filter((row) => row.id == id)[0]
      this.setState({
        ProductName: selectedData.ProductName,
        Productcompany: selectedData.Productcompany,
        Productprice: selectedData.Productprice,
        id: selectedData.id
      })
    }

    const Delete = (id) => {
      var response = axios.delete(`https://62530f93c534af46cb933fa1.mockapi.io/Product/Products/${id}`)
      var Product = this.state.Product.filter((row) => row.id !== id)
      this.setState({ Product })
    }

    return (

      <>
        <div >
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar >
                <span className="Box">Product creation with CRUD</span>
              </Toolbar>
            </AppBar>
          </Box>
        </div>

        <div className="form">
          <form onSubmit={(e) => onsubmit(e)}>
            <div>
              <label >Product Name</label>
              <span className="input1" >
                <TextField variant="filled" label="Product Name" type='text' value={this.state.ProductName} onChange={(e) => this.setState({ ProductName: e.target.value })} ></TextField>
              </span>
            </div> <br />
            <div>
              <label >Product Company</label>
              <span className="input2" >
                <TextField variant="filled" label="Product Company" className="input2" type='text' value={this.state.Productcompany} onChange={(e) => this.setState({ Productcompany: e.target.value })}></TextField> <br></br>
              </span>
            </div> <br />
            <div>
              <label >Product Price</label>
              <span className="input3" >
                <TextField variant="filled" label="Product Price" className="input3" type='text' value={this.state.Productprice} onChange={(e) => this.setState({ Productprice: e.target.value })}></TextField> <br></br>
              </span>
            </div> <br />
            <div className="Submitbutton">
              <Stack spacing={2} direction="row">
                <Button variant="contained" type="submit">submit</Button>
              </Stack>
            </div> <br></br>
          </form>

          <div className="grid">
            <Grid container spacing={2}>
              <Grid xs={8}>
                <Table striped bordered hover variant="primary" border='1'>
                  <thead>
                    <tr>
                      <td> id </td>
                      <td> ProductName </td>
                      <td> Productcompany </td>
                      <td> Productprice </td>
                      <td> Actions </td>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.Product.map((row) => (
                      <tr>
                        <td> {row.id} </td>
                        <td> {row.ProductName} </td>
                        <td> {row.Productcompany} </td>
                        <td> {row.Productprice} </td>
                        <td> <Button variant="contained" onClick={() => Update(row.id)}>Edit</Button> &nbsp; &nbsp; &nbsp;
                          <Button variant="contained" onClick={() => Delete(row.id)}>Delete</Button></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Grid>
            </Grid>
          </div>
          <div />
        </div>
      </>
    )
  }
}

export default CRUD
