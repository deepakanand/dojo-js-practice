require([
    "src/ParasiticSuperClass",
   	"src/ParasiticSubClass"

], function (ParasiticSuperClass, ParasiticSubClass) {

    var subClassInstance = ParasiticSubClass();
    subClassInstance.count()
    subClassInstance.talk();
    subClassInstance.count();            

});