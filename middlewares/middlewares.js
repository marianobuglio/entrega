function isAdmin(req,res,next){
    const admin = true
    if(!admin){
      res.status(401).send({error:{message:"No tiene permisos de administrador para acceder a la ruta",ruta:req.originalUrl}})  
    }
    next()
}
export default  {
    isAdmin,
};

