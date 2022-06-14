function Settings(){
    const URL = "http://localhost:8080/exam_war_exploded"

    function getUrl() {return URL;}

    return{getUrl}
}
const settings = Settings();
export default settings;