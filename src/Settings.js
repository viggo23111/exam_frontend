function Settings(){
    const URL = "https://vikhub.dk/tomcat/exam/"

    function getUrl() {return URL;}

    return{getUrl}
}
const settings = Settings();
export default settings;