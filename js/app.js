// document.addEventListener('DOMContentLoaded', function(name) {
//    let nombre = prompt('Escribe tu nombre');

//    if (nombre !== '') {
//       alert('Bienvenido ' + nombre + ' a mi primer juego con Javascript!!!')
//    }else{
//       alert('Por favor, debes escribir tu nombre...')
//    }

// }, false);

const App = new Vue({
   el: '#app',
   data:
   {
      header:
      {
         title: 'Juegos Web con HTML5 y Javascript',
         subtitle: 'Canal de youtube de "Sistemas y Micros"'
      },
      footer:
      {
         link:
         {
            title: 'Referencia "Adivina la Fruta"',
            href: 'https://www.youtube.com/watch?v=HSkl-A7QSrs'
         },
         img:
         {
            title: 'Youtube',
            alt: 'Ícono Youtube',
            src: 'https://logodownload.org/wp-content/uploads/2014/10/youtube-logo-5-2.png'
         }
      },
      juego: false,
      win: false,
      lose: false,
      contador_aciertos: 0,
      contador_errores: 0,
      win_contador: 0,
      lose_contador: 0,
      aleatorio: 0,
      palabra_escrita: [],
      botones: [],
      color_botones: [],
      letras: 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ',
      palabras: 
      [
         'manzana',
         'pera',
         'banana',
         'naranja',
         'mandarina',
         'durazno',
         'mora',
         'anana',
         'kiwi',
         'pomelo',
         'frambuesa',
         'melocoton',
         'cereza',
         'frutilla',
         'arandano',
         'melon',
         'papaya',
         'platano',
         'tamarindo',
         'mango',
         'limon',
         'palta',
         'tomate',
         'pepino',
         'zapallito',
         'zapallo',
         'berenjena',
         'morron',
         'ciruela',
         'maracuya',
         'uva',
         'sandia',
         'coco'
      ]
   },
   methods: 
   {
      generarAleatorio: function() {
         this.juego = true,
         this.win = false,
         this.lose = false,
         this.contador_aciertos = 0,
         this.contador_errores = 0,
         this.aleatorio = Math.floor(Math.random() * this.palabras.length);
         this.palabra_escrita = [],
         this.botones = [],
         this.color_botones = []

         for (let i = 0; i < this.palabras[this.aleatorio].length; i++) {
            this.palabra_escrita.push('')
         }
         return this.aleatorio;
      },
      comparar: function(caracter, posicion) {
         if (this.juego) {
            this.botones[posicion] = true;
            let flat = 0;
            
            for (i = 0; i <= this.palabra_generada.length; i++) {    
               if (caracter.toLowerCase() === this.palabra_generada[i]) {
                  this.palabra_escrita[i] = caracter;
                  this.contador_aciertos++;
                  flat++;
               }     
            }

            if (flat == 0) {
               this.contador_errores++;
               this.color_botones[posicion] = 'rojo';
            }else{
               this.color_botones[posicion] = 'verde';
            }

            if (this.contador_aciertos === this.palabra_generada.length) {
               this.win = true;
               this.juego = false;
               this.win_contador++;
            }

            if (this.contador_errores === 5) {
               this.lose = true;
               this.juego = false;
               this.lose_contador++;
            }

            console.log('Generada: '+ this.palabra_generada.length);
            console.log('Escrita: '+ this.palabra_escrita.length);
            console.log('Ganado: '+ win_contador + ' Perdido: ' + lose_contador);
         }
      },
   },
   computed:
   {
      palabra_generada: function() {
         return this.palabras[this.aleatorio];
      }
   },
   created: function() {

   }
});
