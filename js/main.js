document.addEventListener('DOMContentLoaded', function() {

    // --- Productos ---
    const productos = [
        { id: 1, nombre: "Torta de Chocolate", precio: 4000 , unidad: "1 entero (1Kg)", img: "./img/torta-de-chocolate.jpg", tipo: "Pastel" },
        { id: 2, nombre: "Alfajor Clásico", precio: 500, unidad: "1 unidad (50gr)", img: "./img/alfajores-clasicos.jpg", tipo: "Galleta" },
        { id: 3, nombre: "Brownie de Chocolate", precio: 1000, unidad: "1 porcion (100gr)", img: "./img/Brownie.jpg", tipo: "Postre" },
        { id: 4, nombre: "Cupcakes", precio: 3000, unidad: "6 unidades" , img: "./img/cupcakes.jpg", tipo: "Pastelito" },
        { id: 5, nombre: "Cookies", precio: 1500, unidad: "6 unidades (40gr c/u)" , img: "./img/galles-con-chips.jpg", tipo: "Galleta" },
        { id: 6, nombre: "Postresitos variados", precio: 1000, unidad: "1 unidad", img: "./img/postresitos.jpg", tipo: "Postre" },
        { id: 7, nombre: "Cheesecake de Frutilla", precio: 6000, unidad: "1 entero (1kg)" , img: "./img/chesscake-frutilla.jpg", tipo: "Tarta" },
        { id: 8, nombre: "Mini Donas", precio: 2000, unidad: "6 unidades", img: "./img/mini-donas.jpg", tipo: "Postre" },
        { id: 9, nombre: "Lemon Pie", precio: 5000, unidad: "1 entero (1kg)", img: "./img/lemon-pay.jpg", tipo: "Galleta" },
        { id: 10, nombre: "Trufas", precio: 3000, unidad: "10 unidades", img: "./img/trufas.jpg", tipo: "Postre" },
        { id: 11, nombre: "Tiramisú", precio: 2500, unidad: "1 porcion (150gr)", img: "./img/tiramisu.jpg", tipo: "Postre" },
        { id: 12, nombre: "Cake Pops", precio: 3000, unidad: "10 unidades", img: "./img/cakepops.jpg", tipo: "Postre" },
    ];

    const productosNavidad = [
        { id: 101, nombre: "Galletas de Jengibre", precio: 1200, unidad: "5 unidades (120gr c/u)", img: "./img/galletas-de-jengibre.jpg", tipo: "Galleta" },
        { id: 102, nombre: "Pan Dulce", precio: 1800, unidad: "1 unidad (400gr)", img: "./img/pan-dulce.jpg", tipo: "Pastel" },
        { id: 103, nombre: "Mantecol Marmolado", precio: 2000, unidad: "1 unidad (420gr)", img: "./img/mantecol.jpg", tipo: "Dulce" },
        { id: 104, nombre: "Budín Navideño", precio: 1500, unidad: "1 unidad (200gr)", img: "./img/budin.jpg", tipo: "Budín" },
        { id: 105, nombre: "Tronco Navideño", precio: 4000, unidad: "1 unidad (1kg)", img: "./img/tronco-navideño.jpg", tipo: "Postre" },
    ];

    // --- Detectar si estamos en index o producto.html ---
    const contenedorPadre = document.getElementById("productosNormales");
    const contenedorNavidad = document.getElementById("productosNavidad");
    const carritoItems = document.getElementById("carritoItems");
    const btn_vaciar = document.getElementById("btn_vaciar");
    const carritoLink = document.getElementById("carritoLink");
    const carritoMenu = document.getElementById("carritoMenu");
    const salirButton = document.getElementById("salirButton");

    // --- Función para renderizar el carrito ---
    function renderCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoItems.innerHTML = '';
        carrito.forEach((producto, index) => {
            const item = document.createElement("li");
            item.classList.add("li_carrito");
            item.innerHTML = `
                ${producto.nombre} - $${producto.precio} 
                <button class="btn_carrito" data-index="${index}">Eliminar</button>
            `;
            carritoItems.appendChild(item);
        });

        // Botones "Eliminar"
        document.querySelectorAll('.btn_carrito').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = this.dataset.index;
                let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                carrito.splice(index, 1);
                localStorage.setItem('carrito', JSON.stringify(carrito));
                renderCarrito();
            });
        });
    }

    // --- Función para agregar al carrito ---
    function agregarAlCarrito(producto) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderCarrito();
    }

    // Renderiza carrito al cargar
    renderCarrito();

    // --- Generar cards (solo si estamos en index.html) ---
    if(contenedorPadre && contenedorNavidad){
        function crearCard(producto, contenedor) {
            const card = document.createElement("div");
            card.classList.add("card");

            const nombre = document.createElement("h3");
            nombre.textContent = producto.nombre;
            card.appendChild(nombre);

            const imagen = document.createElement("img");
            imagen.src = producto.img;
            imagen.alt = producto.nombre;
            card.appendChild(imagen);

            const precio = document.createElement("p");
            precio.textContent = `Precio: $${producto.precio}`;
            card.appendChild(precio);

            const cantidad = document.createElement("p");
            cantidad.textContent = `Cantidad: ${producto.unidad}`;
            card.appendChild(cantidad);

            // Botón agregar al carrito
            const btn_card = document.createElement("button");
            btn_card.textContent = "Agregar al carrito";
            btn_card.classList.add("card_btn");
            btn_card.addEventListener('click', function() {
                agregarAlCarrito(producto);
            });
            card.appendChild(btn_card);

            // Botón detalles
            const btn_info = document.createElement("button");
            btn_info.textContent = "Detalles";
            btn_info.classList.add("card_btn");
            btn_info.addEventListener('click', function() {
                window.location.href = `producto.html?id=${producto.id}`;
            });
            card.appendChild(btn_info);

            contenedor.appendChild(card);
        }

        productos.forEach(p => crearCard(p, contenedorPadre));
        productosNavidad.forEach(p => crearCard(p, contenedorNavidad));
    }

    // --- Si estamos en producto.html ---
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));
    const productoSeleccionado = productos.concat(productosNavidad).find(p => p.id === id);

    if(productoSeleccionado){
        const nombreProd = document.getElementById('nombreProducto');
        const imgProd = document.getElementById('imagenProducto');
        const tipoProd = document.getElementById('tipoProducto');
        const precioProd = document.getElementById('precioProducto');
        const btnAgregar = document.getElementById('agregarAlCarrito');

        if(nombreProd) nombreProd.textContent = productoSeleccionado.nombre;
        if(imgProd){ 
            imgProd.src = productoSeleccionado.img;
            imgProd.alt = productoSeleccionado.nombre;
        }
        if(tipoProd) tipoProd.textContent = `Tipo: ${productoSeleccionado.tipo}`;
        if(precioProd) precioProd.textContent = `Precio: $${productoSeleccionado.precio}`;
        if(btnAgregar){
            btnAgregar.addEventListener('click', function(){
                agregarAlCarrito(productoSeleccionado);
            });
        }
    }

    // --- Botones del carrito ---
    if(btn_vaciar) btn_vaciar.addEventListener('click', function(){ 
        localStorage.removeItem('carrito');
        carritoItems.innerHTML = ''; 
    });

    if(carritoLink) carritoLink.addEventListener('click', function(e){ 
        e.preventDefault(); 
        carritoMenu.style.display = "block"; 
    });

    if(salirButton) salirButton.addEventListener('click', function(){ 
        carritoMenu.style.display = "none"; 
    });

    // --- Menu hamburguesa ---
    const hamburgerButton = document.getElementById('hamburgerButton');
    const menu = document.getElementById('menu');
    if(hamburgerButton && menu){
        function toggleMenu() {
            if(menu.style.display === 'block'){ 
                menu.style.display = 'none'; 
                hamburgerButton.innerHTML = '&#9776;'; 
            } else { 
                menu.style.display = 'block'; 
                hamburgerButton.innerHTML = '✖'; 
            }
        }
        hamburgerButton.addEventListener('click', toggleMenu);
        window.addEventListener('resize', function(){
            if(window.innerWidth > 600){ 
                menu.style.display = 'flex'; 
                hamburgerButton.innerHTML = '&#9776;'; 
            } else { 
                menu.style.display = 'none'; 
            }
        });
    }

});
