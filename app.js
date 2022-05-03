let autos = require('./autos/choches');

let concesionaria = {
   autos: autos,

   buscarAuto: function(patente){
        let marca = null;
        for(let i = 0 ; i<this.autos.length ; i++){
            let auto = this.autos[i];
            if(auto.patente === patente){
                marca = auto;
            }
        }
        return (marca);
    },
    venderAuto: function(patente){
        let auto = this.buscarAuto(patente);
        if(auto !== null){
            auto.vendido = true;
        }
    },
    autosParaLaVenta : ()=> concesionaria.autos.filter(function(auto){
        return auto.vendido === false;
    }),
    autosNuevos : function (){
        let array = this.autosParaLaVenta();
        let disponibles = array.filter(function(autos){
            return autos.km < 100;
        })
        return disponibles;
    },
    listaDeVentas : function(){
        let precio = []
        autos = this.autos;
        for (let i = 0 ; i<autos.length ; i++){
            if (autos[i].vendido === true){
                precio.push(autos[i].precio)
            }
        }
        return precio;
    },
    totalDeVentas : function (){
        let sumatoria = this.listaDeVentas();
        if(sumatoria.length === 0){
            return 0
        }else{
            var total = sumatoria.reduce(function(contador, num){
                return contador + num;
            })
        }return total 
    },
    puedeComprar : function (auto, persona){
        return ((auto.precio<persona.capacidadDePagoTotal) && ((auto.precio/auto.cuotas)<persona.capacidadDePagoEnCuotas))
    },
    autosQuePuedeComprar : function(persona){
        let autoEnVenta = this.autosParaLaVenta();
        let autos = [];
        for (let i = 0 ; i<autoEnVenta.length ; i++){
           let autosAprobados = this.puedeComprar(autoEnVenta[i], persona);
            if(autosAprobados === true){
                autos.push(autoEnVenta[i])
            }
        }
        return autos;
    }
}