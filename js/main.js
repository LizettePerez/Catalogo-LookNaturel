let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    });

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
const modal = new bootstrap.Modal(document.getElementById('exampleModal'));

contenedorProductos.addEventListener("click", (e) => {
    const target = e.target;

    if (target.classList.contains("producto-agregar")) {
        const productoIndex = target.dataset.productoIndex;
        const producto = productos[productoIndex];

        console.log("Producto:", producto);

        if (producto && producto.carrusel) {
            console.log("Carrusel del Producto:", producto.carrusel);
            cargarCarrusel(producto.carrusel, producto.titulo);
            modal.show();
        } else {
            console.error("El producto no tiene la propiedad 'carrusel' definida o es indefinido.");
        }
    }
});



function cargarCarrusel(productoCarrusel) {
    const carruselInner = document.querySelector(".carousel-inner");
    carruselInner.innerHTML = "";

    Object.values(productoCarrusel).forEach((imagen, index) => {
        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
        if (index === 0) {
            carouselItem.classList.add("active");
        }
        carouselItem.innerHTML = `
      <img src="${imagen}" class="d-block w-100" alt="...">
    `;
        carruselInner.append(carouselItem);
    });
}

function cargarCarrusel(productoCarrusel, productoTitulo) {
    const carruselInner = document.querySelector(".carousel-inner");
    carruselInner.innerHTML = "";

    // Crea un párrafo con el título del producto
    const tituloParrafo = document.createElement("p");
    tituloParrafo.classList.add("producto-titulo-carrusel");
    tituloParrafo.innerText = productoTitulo;
    carruselInner.appendChild(tituloParrafo);

    // Agrega las imágenes al carrusel
    Object.values(productoCarrusel).forEach((imagen, index) => {
        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
        if (index === 0) {
            carouselItem.classList.add("active");
        }
        carouselItem.innerHTML = `
            <img src="${imagen}" class="d-block w-100" alt="...">
        `;
        carruselInner.append(carouselItem);
    });
}





function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach((producto, index) => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio.toLocaleString('es-CL')}</p>
                <button class="producto-agregar" data-bs-toggle="modal" data-bs-target="#exampleModal" data-producto-index="${index}">Mostrar Más</button>

                </div>
        `;

        contenedorProductos.append(div);
    });
}

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});
