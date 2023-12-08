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
        const productoId = target.dataset.productoId;
        const producto = productos.find(p => p.id === productoId);

        console.log("Producto:", producto);

        if (producto && producto.carrusel) {
            console.log("Carrusel del Producto:", producto.carrusel);
            cargarCarrusel(productoId, producto.titulo);
            modal.show();
        } else {
            console.error("El producto no tiene la propiedad 'carrusel' definida o es indefinido.");
        }
    }
});


function cargarCarrusel(productoId, productoTitulo) {
    const carruselInner = document.querySelector(".carousel-inner");
    carruselInner.innerHTML = "";

    // Crea un párrafo con el título del producto
    const tituloParrafo = document.createElement("p");
    tituloParrafo.classList.add("producto-titulo-carrusel");
    tituloParrafo.innerText = productoTitulo;
    carruselInner.appendChild(tituloParrafo);

    // Encuentra el producto por su id
    const producto = productos.find(p => p.id === productoId);

    if (producto && producto.carrusel) {
        // Agrega las imágenes al carrusel
        Object.values(producto.carrusel).forEach((imagen, index) => {
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
    } else {
        console.error("No se pudo cargar el carrusel para el producto con id:", productoId);
    }
}

function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach((producto) => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio.toLocaleString('es-CL')}</p>
                <p class="producto-stock ${producto.stock === 'disponible' ? 'disponible' : 'agotado'}">${producto.stock}</p>
                <button class="producto-agregar" data-bs-toggle="modal" data-bs-target="#exampleModal" data-producto-id="${producto.id}">Mostrar Más</button>
            </div>
        `;

        contenedorProductos.append(div);
    });


    console.log("Productos cargados:", productosElegidos);
}

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        const categoriaSeleccionada = e.currentTarget.id;
        const productosBoton = categoriaSeleccionada !== "todos" ? productos.filter(producto => producto.categoria.id === categoriaSeleccionada) : productos;

        tituloPrincipal.innerText = categoriaSeleccionada !== "todos" ? e.currentTarget.innerText : "Todos los productos";

        cargarProductos(productosBoton);
    });
});

