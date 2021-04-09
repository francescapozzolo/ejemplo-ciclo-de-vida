import React from 'react'

class App extends React.Component {
  state = {
    productos: [],
    loading: true
  }

  componentDidMount() {
    this.fetchearApi()
  }

  fetchearApi = () => {
    fetch('https://apipetshop.herokuapp.com/api/articulos')
    .then(response => response.json())
    .then(data => {
      this.setState({
        productos: data.response,
        loading: false
      })

    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.productos.length > 0) {
      if (nextState.productos[0].nombre !== this.state.productos[0].nombre) {
        return false
      }
    }    
    return true
  }

  render() {
    console.log("RENDER")
    if (this.state.loading) {
      return <h1>CARGANDO....</h1>
    }

    return (
      <div style={{width: '80vw', height: '80vh', margin: '3vh auto', backgroundColor: 'yellow'}}>
        <button onClick={this.fetchearApi}>Pedir productos de nuevo</button>
       {this.state.productos.length === 0
       ? <h1>No hay productos</h1>
       : this.state.productos.map(producto => {
        return (
          <h1>{producto.nombre} ({producto.tipo})</h1>
        )
       })}
      </div>
    )
  }
}

export default App
