function getSessionData(req){
    const sessionData = req.session.flashedData;
    req.session.flashedData = null;
    return sessionData;
}

function flashDataToSession(req,data,action){
    req.session.flashedData ={
        email:data.email,
        name:data.name,
        confirmEmail: data.confirmEmail,
        address:data.address,
        password:data.password,
        city:data.city,
        postal:data.postal,
        errorMessage:data.errorMessage
    };
    req.session.save(action);
}

module.exports={
    getSessionData:getSessionData,
    flashDataToSession:flashDataToSession
}