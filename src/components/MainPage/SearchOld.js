import { Input, message } from 'antd'
import React from 'react'
import { withRouter } from 'react-router-dom'
import Cart from './Cart'
import Header from './Header/Header'
import Product from './Product'
import { Row, Col } from 'antd'
import Footer from './Footer'
import './Search.css'
import { getApiResponse } from '../utils/apiHandler'
import routes, { BASE_URL } from '../config/config'

class Search extends React.Component {
  constructor() {
    super()
    this.cartRef = React.createRef()
    this.debounceTimeout = 0
    this.products = []
    this.state = {
      loading: false,
      loggedIn: false,
      filteredProducts: [],
    }
  }

  validateResponse = (errored, response) => {
    if (errored || (!response.length && !response.message)) {
      message.error(
        'Could not fetch products. Check that the backend is running, reachable and returns valid JSON.'
      )
      return false
    }

    if (!response.length) {
      message.error(response.message || 'No products found in database')
      return false
    }

    return true
  }

  performAPICall = async () => {
    let response = {}
    let errored = false

    this.setState({
      loading: true,
    })

    try {
      // response = await (await fetch(`${BASE_URL}/products`)).json();
      response = await getApiResponse(`${BASE_URL}/products`)
    } catch (e) {
      errored = true
    }

    this.setState({
      loading: false,
    })

    if (this.validateResponse(errored, response)) {
      return response
    }
  }

  getProducts = async () => {
    const filteredProducts = await this.performAPICall()
    if (filteredProducts.length !== 0) {
      this.products = filteredProducts
      this.setState({ filteredProducts: [...this.products] })
    }
  }

  componentDidMount() {
    // console.log(this.cartRef);

    localStorage.getItem('token') && this.setState({ loggedIn: true })
    this.getProducts()
    // this.loggedIn && this.setState({ loggedIn: true });
  }

  search = (text) => {
    const filteredProducts = this.products.filter(
      (product) =>
        product.name.toLowerCase().includes(text.toLowerCase().trim()) ||
        product.category.toLowerCase().includes(text.toLowerCase().trim())
    )
    this.setState({ filteredProducts })
  }

  debounceSearch = (event) => {
    let value = event.target.value
    this.debounceTimeout && clearTimeout(this.debounceTimeout)
    this.debounceTimeout = setTimeout(() => this.search(value), 300)
  }

  getProductElement = (product) => {
    return (
      <Col xs={24} sm={12} xl={6} key={product._id + Math.random()}>
        <Product
          product={product}
          addToCart={() => {
            if (this.state.loggedIn) {
              this.cartRef.current.pushToCart(product._id, 1, true)
              // this.cartRef.current.getCart();
            } else {
              this.props.history.push(routes.loginRoute)
            }
          }}
        />
      </Col>
    )
  }

  /**
   * JSX and HTML goes here
   * We require a text field as the search (optionally along with a button for submitting the search query)
   * We also iterate over the filteredProducts list and display each product as a component
   * Display Cart sidebar component if user is logged in
   */
  render() {
    return (
      <>
        {/* Display Header with Search bar */}
        <Header history={this.props.history}>
          {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}

          <Input.Search
            placeholder='Search'
            onSearch={this.search}
            onChange={this.debounceSearch}
            enterButton={true}
          />
        </Header>

        {/* Use Antd Row/Col components to display products and cart as columns in the same row*/}
        <Row>
          {/* Display products */}
          <Col xs={{ span: 24 }} md={{ span: 16 }}>
            <div className='search-container '>
              {/* Display each product item wrapped in a Col component */}
              <Row>
                {this.products.length !== 0 ? (
                  this.state.filteredProducts.map((product) =>
                    this.getProductElement(product)
                  )
                ) : this.state.loading ? (
                  <div className='loading-text'>Loading products...</div>
                ) : (
                  <div className='loading-text'>No products to list</div>
                )}
              </Row>
            </div>
          </Col>

          {this.state.loggedIn && this.products.length && (
            <Col xs={{ span: 24 }} md={{ span: 8 }} className='search-cart'>
              <div>
                {/* TODO: CRIO_TASK_MODULE_CART - Add a Cart to the products page */}
                <Cart
                  history={this.props.history}
                  products={this.products}
                  ref={this.cartRef}
                ></Cart>
              </div>
            </Col>
          )}
        </Row>
        <Footer></Footer>
      </>
    )
  }
}

export default withRouter(Search)
