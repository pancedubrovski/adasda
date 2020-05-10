const LocalStogrageService = (()=>{

    let _service;

    const _getService = () =>{
        if(_service){
            _service = this;
        }
        return _service

    };
    const _getToken = () =>{
     return  localStorage.getItem("token");
    };

    const _setToken = (token) =>{
        localStorage.setItem("token",token);
    };
    const _removeToken = () =>{
        localStorage.removeItem("token");
    };
    return {
        getService:  _getService,
        getToken: _getToken,
        setToken: _setToken,
        removeToken: _removeToken
    }

}); export default LocalStogrageService;
