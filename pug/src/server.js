

class Productos{
    constructor(title,price,thumbnail){
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }
   /* productos = [
        {
            id: 1,
            title: "Camisa Hombre",
            price: 6500,
            thumbnail: "https://cardon.com.ar/wp-content/uploads/2022/09/DSC02799-1000x1353.jpg"
        }
    ];


    */

    productos = [];
    getProductos(){
        return this.productos;
    }
    getProductById(id){
        const product = this.productos.find(producto =>producto.id == id);
        if(product == undefined){
            return {error: "Producto no encontrado con el id ingresado"};
        }else{
            return product;
        }
    }
    addProduct(product){
        if(this.productos.length > 0){
            const auxId = this.productos[this.productos.length - 1].id+1;
            const obj = {
                id: auxId,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail
            }
            this.productos.push(obj);
            return obj;
        }else{
            const obj = {
                id: 1,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail
            }
            this.productos.push(obj);
            return obj;
        }
    }
    updateProduct(product){
        const obj = {
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail
        }
        const products = this.productos.find(producto=>producto.id === product.id);
        if(products==undefined){
            return {error: "No existe producto con ID ingresado"};
        }else{
            const filteredProducts = this.productos.filter(producto=>producto.id!==product.id);
            filteredProducts.push(obj);
            this.productos = filteredProducts;
            return {success: "Se actualizo el producto",products: this.productos};
        }
    }
    deleteProduct(id){
        const products = this.productos.find(producto=>producto.id==id);
        if(products==undefined){
            return {error: "No existe producto con el numero de id especificado"};
        }else{
            const filteredProducts = this.productos.filter(producto=>producto.id!=id);
            console.log(filteredProducts);
            this.productos = filteredProducts;
            return {success: `Se eliminado el producto con id numero: ${id}`,productosNuevos: this.productos};
        }
    }
}

const producto = new Productos();

const express = require('express');

const app = express();
const puerto = 8080;

const path = require ('path');
const dirViews = path.join(__dirname, "views");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(puerto, () => {  console.log(`EL Servidor esta escuchando en el puerto ${puerto}`)});

app.set("views",dirViews);
app.set("view engine", "pug");

app.get('/', (req, res) => {
	res.render("productos");
});
app.get('/productos', (req, res) => {

if (producto.getProductos().length > 0) {
    res.render("listado",{
   product: producto.getProductos()     
    });
}else {
    res.render("listadoVacio");
}
});


app.post("/productos", (req,res)=> {
    
 producto.addProduct(req.body);
console.log(producto.getProductos());
res.redirect("/");
});


