const app = new Vue({
   el: '#app',
   data: {
      title: 'Sintaxis de Javascript',
      subtitle: 'con VueJS',
      outStock: 'Sin Stock',
      productos: [],
      nuevoId: 1,
      nuevoProducto: '',
      nuevaCantidad: 0,
      total: 0,
      errorMSG: '',
      exitoMSG: '',
      disabled: false
   },
   mounted() {
      if (localStorage.getItem('productos')) {
         try {
            this.productos = JSON.parse(localStorage.getItem('productos'));
         }catch(e) {
            localStorage.removeItem('productos');
         }
      }
   },
   watch: {
      productos(loadproductos) {
         localStorage.productos = JSON.stringify(loadproductos);
      }
   },
   methods: {
      agregarProducto() {
            this.productos.push({
               id: this.nuevoId++,
               nombre: this.nuevoProducto,
               cantidad: this.nuevaCantidad + '\t'
            })
         this.persist();
         this.nuevoId = this.nuevoId;
         this.nuevoProducto = '';
         this.nuevaCantidad = '';
      },
      validation() {
         let error = false;
         if(this.nuevoProducto === '') {
            this.errorMSG = 'Productos no puede estar vacío \n';
            error = true;
         }else if(!isNaN(this.nuevoProducto)) {
            this.errorMSG = 'Productos no puede ser numérico \n';
            error = true;
         }else if(this.nuevoProducto.length < 3 || this.nuevoProducto.length > 15) {
            this.errorMSG = 'Productos debe tener mínimo 3 carácteres y máximo 15 \n';
            error = true;
         }else if(isNaN(this.nuevaCantidad)) {
            this.errorMSG = 'Cantidad solo pueser ser numérico \n';
            error = true;
         }else if(error) {
            this.errorMSG.push();
            error = false;
         }else{
            this.agregarProducto();
            this.exitoMSG.push('Productos agregado satisfactoriamente \n');
            error = false;
         }
      },
      eliminarProducto(index) {
         this.productos.splice(index, 1);
         this.saveProductos();
      },
      timer(){
         setTimeout( () => {
            this.exitoMSG = '';
            this.errorMSG = '';
         }, 5000);
      },
      saveProductos() {
         let exito = false;
         if(localStorage.productos) {
            document.getElementsById('add__product-input').innerHTML='';
            document.getElementsById('add__cant-input').innerHTML='';
            const parsed = JSON.stringify(this.productos);
            localStorage.setItem('productos', parsed);
            exito = true;
            this.exitoMSG = '¡Guardado! \n';
            
         }else{
            exito = false;
            this.errorMSG = 'No hay datos para guardar \n';
         }
         if (exito){
            this.agregarProducto();
            this.exitoMSG.push();
            exitoMSG = false;
         }else{
            this.errorMSG.push();
            errorMSG = false;
         }
      },
      persist() {
         const parsed = JSON.stringify(this.productos);
         localStorage.setItem('productos', parsed);
      },
      exportData() {
         var item = localStorage.csv = JSON.stringify(this.productos);
         var blob = new Blob([localStorage.getItem('csv')], {type: "text/csv"});
         var url = URL.createObjectURL(blob);
         var a = document.querySelector("#export");
         a.href = url;
         a.download = "Productos.csv";
     }
   },
   computed: {
      sumarStock() {
         this.total = 0;
         for(producto of this.productos){
            this.total = this.total + producto.cantidad;
         }
         return this.total;
      }
   }
});
