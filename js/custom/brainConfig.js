    /* Principal global variables
        root = Change css global variables
        temaOscuro = to validate if the dark theme is activated
    */
    let root = document.documentElement;
    let temaOscuro=false;
    let cssString = '';
    let resultado=0;
    let fondoOscuro="#24263b"
    let fondoBlanco="#FFFF"

    /*Reset*/
    let prefab
    let prefab2
    let prefab3


    /*
      Configure the brain with the answers, these answers will serve to select the color of the text
    */
    let network = new brain.NeuralNetwork();
        network.train([{input:{rojo:0,verde:0,azul:0}, output:{color:1}},
        {input:{rojo:1,verde:1,azul:1}, output:{color:0}},
        {input:{rojo:0,verde:1,azul:0}, output:{color:0}},
        {input:{rojo:0,verde:.43,azul:1}, output:{color:1}},    
        {input:{rojo:1,verde:0,azul:0}, output:{color:1}},
        ]);



    function update(color) {
      /* If the dark theme is activated it will be deactivated to be able to see the color you are selecting */
        if (temaOscuro==true){
            tema()
        }
        /* An object is created and sent to the brain */
        let rgb = [color.channels.r,color.channels.g,color.channels.b];
        let entrada = {
            rojo: rgb[0]/255,
            verde: rgb[1]/255,
            azul: rgb[2]/255,
        };
        resultado = network.run(entrada);
        /* Depending on the answer, the color of the text will be selected */
        if (resultado.color > .5) {
            root.style.setProperty('--white-color', "white");
         }else{
            root.style.setProperty('--white-color', "black");
         }

        hexACssHsl(color.toHEXString());
    }
    

      /* It is required to pass the selected color from hex to hsl to be able to switch to dark theme */
      function tema() {
        if(temaOscuro==false){
            let cssActual =root.style.getPropertyValue('--color');
            let cssArray = cssActual.split(',');
            /* The brightness of the color is lowered */
            let cssNuevo = cssArray[0] +","+ cssArray[1] +","+ "30%)";
            /* Colors are changed */
            root.style.setProperty('--color', cssNuevo);
            root.style.setProperty('--first-color', cssNuevo);

            root.style.setProperty('--white-color', "white");
            root.style.setProperty('--body-color', fondoOscuro);
            temaOscuro=true
        }else{
            /* If the text is white it changes to black and if it is black it changes to white */
            root.style.setProperty('--color', cssString);
            root.style.setProperty('--first-color', cssString);

            if (resultado.color > .5) {
                root.style.setProperty('--white-color', "white");
             }else{
                root.style.setProperty('--white-color', "black");
             }
             root.style.setProperty('--body-color', fondoBlanco);
            temaOscuro=false
        }   
    }

    /* Process to do the calculations to pass from hex to hsl */    
    function hexACssHsl(hex, valuesOnly = false) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        var r = parseInt(result[1], 16);
        var g = parseInt(result[2], 16);
        var b = parseInt(result[3], 16);
        
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;
        if (max == min) {
          h = s = 0; 
        } else {
          var d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
          }
          h /= 6;
        }
        
        h = Math.round(h * 360);
        s = Math.round(s * 100);
        l = Math.round(l * 100);
        
        cssString = h + ',' + s + '%,' + l + '%';
        cssString = !valuesOnly ? 'hsl(' + cssString + ')' : cssString;
        root.style.setProperty('--color', cssString);
        root.style.setProperty('--first-color', cssString);
        return cssString;
      }
    
